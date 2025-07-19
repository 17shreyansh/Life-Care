const express = require('express');
const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Parse JSON bodies
app.use(express.json());

// Mock data
const counsellors = [
  {
    _id: '60d0fe4f5311236168a109ca',
    name: 'Dr. Jane Smith',
    specialization: 'Cognitive Behavioral Therapy',
    experience: 8,
    fees: 1500,
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    _id: '60d0fe4f5311236168a109cb',
    name: 'Dr. John Davis',
    specialization: 'Family Therapy',
    experience: 12,
    fees: 1800,
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
  }
];

// API routes
app.get('/api/counsellors', (req, res) => {
  res.json({
    success: true,
    counsellors
  });
});

app.get('/api/counsellors/:id', (req, res) => {
  const counsellor = counsellors.find(c => c._id === req.params.id);
  
  if (!counsellor) {
    return res.status(404).json({
      success: false,
      message: 'Counsellor not found'
    });
  }
  
  res.json({
    success: true,
    counsellor
  });
});

app.get('/api/appointments/available-slots', (req, res) => {
  const slots = [
    { startTime: '09:00', endTime: '10:00' },
    { startTime: '10:00', endTime: '11:00' },
    { startTime: '11:00', endTime: '12:00' },
    { startTime: '14:00', endTime: '15:00' },
    { startTime: '15:00', endTime: '16:00' }
  ];
  
  res.json({
    success: true,
    slots
  });
});

app.post('/api/appointments/book', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Appointment booked successfully',
    appointment: {
      _id: 'new-appointment-id',
      ...req.body,
      status: 'pending',
      createdAt: new Date()
    }
  });
});

// Root route
app.get('/', (req, res) => {
  res.send(`
    <h1>Basic API Server</h1>
    <p>Available endpoints:</p>
    <ul>
      <li><a href="/api/counsellors">/api/counsellors</a></li>
      <li><a href="/api/counsellors/60d0fe4f5311236168a109ca">/api/counsellors/:id</a></li>
      <li><a href="/api/appointments/available-slots">/api/appointments/available-slots</a></li>
    </ul>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Basic server running on http://localhost:${PORT}`);
});