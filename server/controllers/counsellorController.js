const Counsellor = require('../models/Counsellor');

// Get counsellor by ID
exports.getCounsellorById = async (req, res) => {
  try {
    const counsellor = await Counsellor.findById(req.params.id);
    
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
  } catch (error) {
    console.error('Error fetching counsellor:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get all counsellors
exports.getAllCounsellors = async (req, res) => {
  try {
    const counsellors = await Counsellor.find();
    
    res.status(200).json({
      success: true,
      count: counsellors.length,
      counsellors
    });
  } catch (error) {
    console.error('Error fetching counsellors:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};