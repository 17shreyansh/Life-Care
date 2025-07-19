const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/available-slots', appointmentController.getAvailableSlots);

// Protected routes - client only
router.post('/book', protect, authorize('client'), appointmentController.bookAppointment);
router.get('/my-appointments', protect, authorize('client'), appointmentController.getClientAppointments);

module.exports = router;