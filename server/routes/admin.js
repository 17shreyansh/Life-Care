const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  banUser,
  getCounsellors,
  getCounsellor,
  createCounsellor,
  verifyCounsellor,
  getAppointments,
  updatePaymentStatus,
  handleDispute,
  getWithdrawals,
  processWithdrawal,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
  getGallery,
  uploadGalleryImage,
  deleteGalleryImage,
  getReports,
  getDashboardStats,
  getSettings,
  updateSettings
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

router.put('/users/:id/ban', banUser);

// Counsellor routes
router.route('/counsellors')
  .get(getCounsellors)
  .post(createCounsellor);

router.get('/counsellors/:id', getCounsellor);
router.put('/counsellors/:id/verify', verifyCounsellor);

// Appointment routes
router.get('/appointments', getAppointments);
router.put('/appointments/:id/payment', updatePaymentStatus);
router.put('/disputes/:id', handleDispute);

// Withdrawal routes
router.get('/withdrawals', getWithdrawals);
router.put('/withdrawals/:id', processWithdrawal);

// CMS routes
router.route('/cms/blogs')
  .get(getBlogs)
  .post(createBlog);

router.route('/cms/blogs/:id')
  .put(updateBlog)
  .delete(deleteBlog);

router.route('/cms/videos')
  .get(getVideos)
  .post(createVideo);

router.route('/cms/videos/:id')
  .put(updateVideo)
  .delete(deleteVideo);

router.route('/cms/gallery')
  .get(getGallery)
  .post(uploadGalleryImage);

router.delete('/cms/gallery/:id', deleteGalleryImage);

// Reports and Analytics
router.get('/reports', getReports);

// Settings
router.route('/settings')
  .get(getSettings)
  .put(updateSettings);

module.exports = router;