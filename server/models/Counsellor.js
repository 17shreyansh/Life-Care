const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  isAvailable: {
    type: Boolean,
    default: false
  },
  startTime: {
    type: String,
    default: '09:00'
  },
  endTime: {
    type: String,
    default: '17:00'
  }
});

const counsellorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  fees: {
    type: Number,
    required: true
  },
  profileImage: {
    type: String
  },
  availability: {
    monday: availabilitySchema,
    tuesday: availabilitySchema,
    wednesday: availabilitySchema,
    thursday: availabilitySchema,
    friday: availabilitySchema,
    saturday: availabilitySchema,
    sunday: availabilitySchema
  },
  sessionDuration: {
    type: Number,
    default: 60 // in minutes
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Counsellor', counsellorSchema);