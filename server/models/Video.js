const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  videoUrl: {
    type: String,
    required: [true, 'Please add a video URL']
  },
  videoType: {
    type: String,
    enum: ['youtube', 'vimeo', 'uploaded'],
    required: [true, 'Please specify video type']
  },
  videoId: {
    type: String // YouTube or Vimeo ID
  },
  thumbnailUrl: {
    type: String
  },
  duration: {
    type: Number // in seconds
  },
  categories: [{
    type: String
  }],
  tags: [{
    type: String
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: {
    type: Date
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: String
  }
}, { timestamps: true });

// Set published date if status is changed to published
videoSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = Date.now();
  }
  
  // Extract video ID from URL if not provided
  if (this.isModified('videoUrl') && !this.videoId) {
    if (this.videoType === 'youtube') {
      // Extract YouTube ID
      const match = this.videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      if (match && match[1]) {
        this.videoId = match[1];
      }
    } else if (this.videoType === 'vimeo') {
      // Extract Vimeo ID
      const match = this.videoUrl.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/);
      if (match && match[2]) {
        this.videoId = match[2];
      }
    }
  }
  
  next();
});

// Indexes for faster queries
videoSchema.index({ status: 1, publishedAt: -1 });
videoSchema.index({ categories: 1 });
videoSchema.index({ author: 1 });

module.exports = mongoose.model('Video', videoSchema);