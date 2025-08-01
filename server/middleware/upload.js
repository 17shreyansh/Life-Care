const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;
    
    switch (file.fieldname) {
      case 'avatar':
      case 'profilePicture':
        uploadPath = 'uploads/profiles/';
        break;
      case 'featuredImage':
      case 'blogImage':
        uploadPath = 'uploads/blogs/';
        break;
      case 'galleryImage':
        uploadPath = 'uploads/gallery/';
        break;
      case 'videoThumbnail':
        uploadPath = 'uploads/videos/';
        break;
      case 'documents':
        uploadPath = 'uploads/documents/';
        break;
      default:
        uploadPath = 'uploads/misc/';
    }
    
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const allowedMimes = /image\/(jpeg|jpg|png|gif)/;
  
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedMimes.test(file.mimetype);
  
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

// Create multer instance
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter
});

module.exports = {
  uploadAvatar: upload.single('avatar'),
  uploadProfilePicture: upload.single('profilePicture'),
  uploadFeaturedImage: upload.single('featuredImage'),
  uploadBlogImage: upload.single('blogImage'),
  uploadGalleryImage: upload.single('galleryImage'),
  uploadVideoThumbnail: upload.single('videoThumbnail'),
  uploadDocuments: upload.array('documents', 5),
  uploadGalleryImages: upload.array('galleryImage', 10),
  uploadBlogContent: upload.fields([
    { name: 'featuredImage', maxCount: 1 },
    { name: 'blogImage', maxCount: 5 }
  ])
};