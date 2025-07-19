const express = require('express');
const router = express.Router();
const counsellorController = require('../controllers/counsellorController');

// Public routes
router.get('/', counsellorController.getAllCounsellors);
router.get('/:id', counsellorController.getCounsellorById);

module.exports = router;