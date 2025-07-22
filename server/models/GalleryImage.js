const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  thumbnailUrl: {
    type: String
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['team', 'events', 'office', 'testimonials', 'other']
  },
  tags: [{
    type: String
  }],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  altText: {
    type: String,
    required: [true, 'Please add alternative text for accessibility']
  },
  dimensions: {
    width: Number,
    height: Number
  }
}, { timestamps: true });

// Indexes for faster queries
galleryImageSchema.index({ category: 1, status: 1 });
galleryImageSchema.index({ isFeatured: 1, sortOrder: 1 });

module.exports = mongoose.model('GalleryImage', galleryImageSchema);