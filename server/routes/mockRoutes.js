const express = require('express');
const router = express.Router();

// Mock counsellor data
const mockCounsellors = [
  {
    _id: '60d0fe4f5311236168a109ca',
    name: 'Dr. Jane Smith',
    specialization: 'Cognitive Behavioral Therapy',
    experience: 8,
    fees: 1500,
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    availability: {
      monday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
      tuesday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
      wednesday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
      thursday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
      friday: { isAvailable: true, startTime: '09:00', endTime: '17:00' }
    }
  },
  {
    _id: '60d0fe4f5311236168a109cb',
    name: 'Dr. John Davis',
    specialization: 'Family Therapy',
    experience: 12,
    fees: 1800,
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    availability: {
      monday: { isAvailable: true, startTime: '10:00', endTime: '18:00' },
      wednesday: { isAvailable: true, startTime: '10:00', endTime: '18:00' },
      friday: { isAvailable: true, startTime: '10:00', endTime: '18:00' }
    }
  }
];

// Get all mock counsellors
router.get('/counsellors', (req, res) => {
  res.status(200).json({
    success: true,
    count: mockCounsellors.length,
    counsellors: mockCounsellors
  });
});

// Get mock counsellor by ID
router.get('/counsellors/:id', (req, res) => {
  const counsellor = mockCounsellors.find(c => c._id === req.params.id);
  
  if (!counsellor) {
    return res.status(404).json({
      success: false,
      message: 'Counsellor not found'
    });
  }
  
  res.status(200).json({
    success: true,
    counsellor
  });
});

// Get available slots
router.get('/appointments/available-slots', (req, res) => {
  const { counsellorId, date } = req.query;
  
  // Generate mock slots
  const slots = [
    { startTime: '09:00', endTime: '10:00' },
    { startTime: '10:00', endTime: '11:00' },
    { startTime: '11:00', endTime: '12:00' },
    { startTime: '14:00', endTime: '15:00' },
    { startTime: '15:00', endTime: '16:00' },
    { startTime: '16:00', endTime: '17:00' }
  ];
  
  res.status(200).json({
    success: true,
    slots
  });
});

// Book appointment (mock)
router.post('/appointments/book', (req, res) => {
  const { counsellorId, date, startTime, endTime, sessionType, notes } = req.body;
  
  // Mock response
  res.status(201).json({
    success: true,
    message: 'Appointment booked successfully',
    appointment: {
      _id: Math.random().toString(36).substring(2, 15),
      counsellorId,
      date,
      startTime,
      endTime,
      sessionType,
      notes,
      status: 'pending',
      createdAt: new Date()
    }
  });
});

module.exports = router;