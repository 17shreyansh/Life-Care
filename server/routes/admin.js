const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getCounsellors,
  getCounsellor,
  verifyCounsellor,
  getAppointments,
  updatePaymentStatus,
  getWithdrawals,
  processWithdrawal,
  getBlogs,
  updateBlog,
  getDashboardStats
} = require('../controllers/adminController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply protection to all routes
router.use(protect);
router.use(authorize('admin'));

// Dashboard route
router.get('/dashboard', getDashboardStats);

// User routes
router.route('/users')
  .get(getUsers)
  .post(createUser);

router.route('/users/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

// Counsellor routes
router.get('/counsellors', getCounsellors);
router.get('/counsellors/:id', getCounsellor);
router.put('/counsellors/:id/verify', verifyCounsellor);

// Appointment routes
router.get('/appointments', getAppointments);
router.put('/appointments/:id/payment', updatePaymentStatus);

// Withdrawal routes
router.get('/withdrawals', getWithdrawals);
router.put('/withdrawals/:id', processWithdrawal);

// CMS routes
router.get('/cms/blogs', getBlogs);
router.put('/cms/blogs/:id', updateBlog);

module.exports = router;