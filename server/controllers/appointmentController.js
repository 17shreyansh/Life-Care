const Appointment = require('../models/Appointment');
const Counsellor = require('../models/Counsellor');

// Get available slots for a specific counsellor on a specific date
exports.getAvailableSlots = async (req, res) => {
  try {
    const { counsellorId, date } = req.query;
    
    // Find counsellor to get their availability
    const counsellor = await Counsellor.findById(counsellorId);
    if (!counsellor) {
      return res.status(404).json({ success: false, message: 'Counsellor not found' });
    }
    
    // Get day of week from date
    const dayOfWeek = new Date(date).getDay();
    const dayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][dayOfWeek];
    
    // Check if counsellor works on this day
    if (!counsellor.availability || !counsellor.availability[dayName] || !counsellor.availability[dayName].isAvailable) {
      return res.status(200).json({ 
        success: true, 
        message: 'Counsellor not available on this day',
        slots: [] 
      });
    }
    
    // Get working hours for this day
    const workingHours = counsellor.availability[dayName];
    const startTime = workingHours.startTime;
    const endTime = workingHours.endTime;
    
    // Generate all possible slots based on counsellor's session duration
    const sessionDuration = counsellor.sessionDuration || 60;
    const slots = [];
    
    let currentSlot = startTime;
    while (currentSlot < endTime) {
      const startHour = parseInt(currentSlot.split(':')[0]);
      const startMinute = parseInt(currentSlot.split(':')[1]);
      
      let endHour = startHour;
      let endMinute = startMinute + sessionDuration;
      
      if (endMinute >= 60) {
        endHour += Math.floor(endMinute / 60);
        endMinute = endMinute % 60;
      }
      
      const endTimeStr = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
      
      if (endTimeStr <= endTime) {
        slots.push({
          startTime: currentSlot,
          endTime: endTimeStr
        });
      }
      
      // Move to next slot
      currentSlot = endTimeStr;
    }
    
    // Find booked appointments for this counsellor on this date
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    const bookedAppointments = await Appointment.find({
      counsellor: counsellorId,
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['pending', 'confirmed'] }
    });
    
    // Filter out booked slots
    const availableSlots = slots.filter(slot => {
      return !bookedAppointments.some(appointment => 
        appointment.startTime === slot.startTime && appointment.endTime === slot.endTime
      );
    });
    
    return res.status(200).json({
      success: true,
      slots: availableSlots
    });
    
  } catch (error) {
    console.error('Error fetching available slots:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching available slots'
    });
  }
};

// Book a new appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { counsellorId, date, startTime, endTime, sessionType, notes } = req.body;
    const clientId = req.user.id; // From auth middleware
    
    // Validate client role
    if (req.user.role !== 'client') {
      return res.status(403).json({
        success: false,
        message: 'Only clients can book appointments'
      });
    }
    
    // Check if slot is available
    const appointmentDate = new Date(date);
    const startOfDay = new Date(appointmentDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(appointmentDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    const existingAppointment = await Appointment.findOne({
      counsellor: counsellorId,
      date: { $gte: startOfDay, $lte: endOfDay },
      startTime,
      endTime,
      status: { $in: ['pending', 'confirmed'] }
    });
    
    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This slot is already booked'
      });
    }
    
    // Create new appointment
    const appointment = new Appointment({
      client: clientId,
      counsellor: counsellorId,
      date: appointmentDate,
      startTime,
      endTime,
      sessionType,
      notes,
      status: 'pending',
      paymentStatus: 'pending'
    });
    
    await appointment.save();
    
    return res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      appointment
    });
    
  } catch (error) {
    console.error('Error booking appointment:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while booking appointment'
    });
  }
};

// Get all appointments for a client
exports.getClientAppointments = async (req, res) => {
  try {
    const clientId = req.user.id;
    
    const appointments = await Appointment.find({ client: clientId })
      .populate('counsellor', 'name profileImage specialization fees')
      .sort({ date: 1, startTime: 1 });
      
    return res.status(200).json({
      success: true,
      count: appointments.length,
      appointments
    });
    
  } catch (error) {
    console.error('Error fetching client appointments:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching appointments'
    });
  }
};