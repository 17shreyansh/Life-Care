const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Counsellor = require('./models/Counsellor');

// Load env vars
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lifecare')
.then(() => console.log('MongoDB Connected'))
.catch(err => {
  console.log('MongoDB Connection Error:', err);
  process.exit(1);
});

// Create test data
const createTestData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Counsellor.deleteMany();
    
    // Create test user
    const user = await User.create({
      name: 'Dr. Jane Smith',
      email: 'jane.smith@example.com',
      password: 'password123',
      role: 'counsellor'
    });
    
    // Create test counsellor
    const counsellor = await Counsellor.create({
      user: user._id,
      name: 'Dr. Jane Smith',
      specialization: 'Cognitive Behavioral Therapy',
      experience: 8,
      fees: 1500,
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      availability: {
        monday: {
          isAvailable: true,
          startTime: '09:00',
          endTime: '17:00'
        },
        tuesday: {
          isAvailable: true,
          startTime: '09:00',
          endTime: '17:00'
        },
        wednesday: {
          isAvailable: true,
          startTime: '09:00',
          endTime: '17:00'
        },
        thursday: {
          isAvailable: true,
          startTime: '09:00',
          endTime: '17:00'
        },
        friday: {
          isAvailable: true,
          startTime: '09:00',
          endTime: '17:00'
        },
        saturday: {
          isAvailable: false
        },
        sunday: {
          isAvailable: false
        }
      },
      sessionDuration: 60,
      isVerified: true
    });
    
    console.log('Test data created successfully');
    process.exit();
  } catch (error) {
    console.error('Error creating test data:', error);
    process.exit(1);
  }
};

createTestData();