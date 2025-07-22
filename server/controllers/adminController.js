const User = require('../models/User');
const Counsellor = require('../models/Counsellor');
const Appointment = require('../models/Appointment');
const Review = require('../models/Review');
const WithdrawalRequest = require('../models/WithdrawalRequest');
const Blog = require('../models/Blog');
const Video = require('../models/Video');
const GalleryImage = require('../models/GalleryImage');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin only)
exports.getUsers = async (req, res, next) => {
  try {
    // Build query
    let query = {};
    
    // Filter by role
    if (req.query.role) {
      query.role = req.query.role;
    }
    
    // Filter by active status
    if (req.query.active !== undefined) {
      query.active = req.query.active === 'true';
    }
    
    // Filter by email verification status
    if (req.query.isEmailVerified !== undefined) {
      query.isEmailVerified = req.query.isEmailVerified === 'true';
    }
    
    // Search by name or email
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Sort options
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Execute query
    const users = await User.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(startIndex)
      .limit(limit);
    
    // Get total count
    const total = await User.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: users.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/admin/users/:id
// @access  Private (Admin only)
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create user
// @route   POST /api/admin/users
// @access  Private (Admin only)
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorResponse('Email already registered', 400));
    }
    
    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
      isEmailVerified: true // Admin-created users are automatically verified
    });
    
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private (Admin only)
exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, role, active } = req.body;
    
    // Build update object
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (role) updateFields.role = role;
    if (active !== undefined) updateFields.active = active;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }
    
    // Check if user is an admin
    if (user.role === 'admin') {
      return next(new ErrorResponse('Cannot delete admin user', 403));
    }
    
    // Delete user
    await user.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all counsellors
// @route   GET /api/admin/counsellors
// @access  Private (Admin only)
exports.getCounsellors = async (req, res, next) => {
  try {
    // Build query
    let query = {};
    
    // Filter by verification status
    if (req.query.isVerified !== undefined) {
      query.isVerified = req.query.isVerified === 'true';
    }
    
    // Filter by active status
    if (req.query.active !== undefined) {
      query.active = req.query.active === 'true';
    }
    
    // Search by name or specialization
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { specializations: { $in: [new RegExp(req.query.search, 'i')] } }
      ];
    }
    
    // Sort options
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Execute query
    const counsellors = await Counsellor.find(query)
      .populate('user', 'name email avatar')
      .sort({ [sortBy]: sortOrder })
      .skip(startIndex)
      .limit(limit);
    
    // Get total count
    const total = await Counsellor.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: counsellors.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data: counsellors
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single counsellor
// @route   GET /api/admin/counsellors/:id
// @access  Private (Admin only)
exports.getCounsellor = async (req, res, next) => {
  try {
    const counsellor = await Counsellor.findById(req.params.id)
      .populate('user', 'name email avatar phone isEmailVerified active');
    
    if (!counsellor) {
      return next(new ErrorResponse(`Counsellor not found with id of ${req.params.id}`, 404));
    }
    
    res.status(200).json({
      success: true,
      data: counsellor
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update counsellor verification status
// @route   PUT /api/admin/counsellors/:id/verify
// @access  Private (Admin only)
exports.verifyCounsellor = async (req, res, next) => {
  try {
    const { isVerified } = req.body;
    
    if (isVerified === undefined) {
      return next(new ErrorResponse('Please provide verification status', 400));
    }
    
    const counsellor = await Counsellor.findByIdAndUpdate(
      req.params.id,
      { isVerified },
      { new: true }
    );
    
    if (!counsellor) {
      return next(new ErrorResponse(`Counsellor not found with id of ${req.params.id}`, 404));
    }
    
    res.status(200).json({
      success: true,
      data: counsellor
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all appointments
// @route   GET /api/admin/appointments
// @access  Private (Admin only)
exports.getAppointments = async (req, res, next) => {
  try {
    // Build query
    let query = {};
    
    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // Filter by payment status
    if (req.query.paymentStatus) {
      query['payment.status'] = req.query.paymentStatus;
    }
    
    // Filter by date range
    if (req.query.startDate && req.query.endDate) {
      query.date = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    } else if (req.query.startDate) {
      query.date = { $gte: new Date(req.query.startDate) };
    } else if (req.query.endDate) {
      query.date = { $lte: new Date(req.query.endDate) };
    }
    
    // Sort options
    const sortBy = req.query.sortBy || 'date';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Execute query
    const appointments = await Appointment.find(query)
      .populate('client', 'name email avatar')
      .populate({
        path: 'counsellor',
        select: 'user',
        populate: {
          path: 'user',
          select: 'name avatar'
        }
      })
      .sort({ [sortBy]: sortOrder })
      .skip(startIndex)
      .limit(limit);
    
    // Get total count
    const total = await Appointment.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: appointments.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data: appointments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment payment status
// @route   PUT /api/admin/appointments/:id/payment
// @access  Private (Admin only)
exports.updatePaymentStatus = async (req, res, next) => {
  try {
    const { status, method, id } = req.body;
    
    if (!status) {
      return next(new ErrorResponse('Please provide payment status', 400));
    }
    
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return next(new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404));
    }
    
    // Update payment details
    appointment.payment = {
      status,
      method: method || appointment.payment?.method,
      id: id || appointment.payment?.id,
      timestamp: Date.now()
    };
    
    // If payment is completed, update counsellor earnings
    if (status === 'completed' && appointment.status === 'completed') {
      const counsellor = await Counsellor.findById(appointment.counsellor);
      
      if (counsellor) {
        counsellor.earnings.total += appointment.amount;
        counsellor.earnings.pending += appointment.amount;
        await counsellor.save();
      }
    }
    
    // If payment is refunded, update counsellor earnings
    if (status === 'refunded') {
      const counsellor = await Counsellor.findById(appointment.counsellor);
      
      if (counsellor) {
        counsellor.earnings.total -= appointment.amount;
        counsellor.earnings.pending -= appointment.amount;
        await counsellor.save();
      }
      
      // Update cancellation refund status
      if (appointment.cancellation) {
        appointment.cancellation.refundStatus = 'processed';
      }
    }
    
    await appointment.save();
    
    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Process withdrawal request
// @route   PUT /api/admin/withdrawals/:id
// @access  Private (Admin only)
exports.processWithdrawal = async (req, res, next) => {
  try {
    const { status, transactionId, rejectionReason } = req.body;
    
    if (!status) {
      return next(new ErrorResponse('Please provide status', 400));
    }
    
    const withdrawal = await WithdrawalRequest.findById(req.params.id);
    
    if (!withdrawal) {
      return next(new ErrorResponse(`Withdrawal request not found with id of ${req.params.id}`, 404));
    }
    
    // Update withdrawal request
    withdrawal.status = status;
    withdrawal.processedBy = req.user.id;
    withdrawal.processedAt = Date.now();
    
    if (status === 'processed') {
      if (!transactionId) {
        return next(new ErrorResponse('Please provide transaction ID', 400));
      }
      withdrawal.transactionId = transactionId;
    } else if (status === 'rejected') {
      if (!rejectionReason) {
        return next(new ErrorResponse('Please provide rejection reason', 400));
      }
      withdrawal.rejectionReason = rejectionReason;
    }
    
    await withdrawal.save();
    
    // If processed, update counsellor earnings
    if (status === 'processed') {
      const counsellor = await Counsellor.findById(withdrawal.counsellor);
      
      if (counsellor) {
        counsellor.earnings.withdrawn += withdrawal.amount;
        counsellor.earnings.pending -= withdrawal.amount;
        await counsellor.save();
      }
    }
    
    res.status(200).json({
      success: true,
      data: withdrawal
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all withdrawal requests
// @route   GET /api/admin/withdrawals
// @access  Private (Admin only)
exports.getWithdrawals = async (req, res, next) => {
  try {
    // Build query
    let query = {};
    
    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // Sort options
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Execute query
    const withdrawals = await WithdrawalRequest.find(query)
      .populate({
        path: 'counsellor',
        select: 'user',
        populate: {
          path: 'user',
          select: 'name email'
        }
      })
      .populate('processedBy', 'name')
      .sort({ [sortBy]: sortOrder })
      .skip(startIndex)
      .limit(limit);
    
    // Get total count
    const total = await WithdrawalRequest.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: withdrawals.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data: withdrawals
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Manage CMS content (blogs, videos, gallery)
// @route   GET /api/admin/cms/blogs
// @access  Private (Admin only)
exports.getBlogs = async (req, res, next) => {
  try {
    // Build query
    let query = {};
    
    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // Filter by featured
    if (req.query.isFeatured !== undefined) {
      query.isFeatured = req.query.isFeatured === 'true';
    }
    
    // Search by title or content
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Sort options
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Execute query
    const blogs = await Blog.find(query)
      .populate('author', 'name avatar')
      .sort({ [sortBy]: sortOrder })
      .skip(startIndex)
      .limit(limit);
    
    // Get total count
    const total = await Blog.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: blogs.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data: blogs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog status
// @route   PUT /api/admin/cms/blogs/:id
// @access  Private (Admin only)
exports.updateBlog = async (req, res, next) => {
  try {
    const { status, isFeatured } = req.body;
    
    const updateFields = {};
    if (status) updateFields.status = status;
    if (isFeatured !== undefined) updateFields.isFeatured = isFeatured;
    
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );
    
    if (!blog) {
      return next(new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404));
    }
    
    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private (Admin only)
exports.getDashboardStats = async (req, res, next) => {
  try {
    // Get user counts
    const totalUsers = await User.countDocuments();
    const totalClients = await User.countDocuments({ role: 'client' });
    const totalCounsellors = await User.countDocuments({ role: 'counsellor' });
    
    // Get appointment counts
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
    const completedAppointments = await Appointment.countDocuments({ status: 'completed' });
    
    // Get payment stats
    const completedPayments = await Appointment.find({
      'payment.status': 'completed'
    });
    
    let totalRevenue = 0;
    completedPayments.forEach(appointment => {
      totalRevenue += appointment.amount;
    });
    
    // Get pending withdrawals
    const pendingWithdrawals = await WithdrawalRequest.countDocuments({ status: 'pending' });
    
    // Get content stats
    const totalBlogs = await Blog.countDocuments();
    const totalVideos = await Video.countDocuments();
    
    res.status(200).json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          clients: totalClients,
          counsellors: totalCounsellors
        },
        appointments: {
          total: totalAppointments,
          pending: pendingAppointments,
          completed: completedAppointments
        },
        finances: {
          totalRevenue,
          pendingWithdrawals
        },
        content: {
          blogs: totalBlogs,
          videos: totalVideos
        }
      }
    });
  } catch (error) {
    next(error);
  }
};