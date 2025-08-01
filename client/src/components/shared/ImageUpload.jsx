import { useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { uploadAPI } from '../../services/api';

const ImageUpload = ({ 
  type = 'avatar', 
  currentImage, 
  onImageUploaded, 
  className = '',
  size = '100px',
  accept = 'image/*'
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    try {
      let response;
      switch (type) {
        case 'avatar':
          response = await uploadAPI.uploadAvatar(file);
          break;
        case 'profile':
          response = await uploadAPI.uploadProfilePicture(file);
          break;
        case 'blog':
          response = await uploadAPI.uploadBlogImage(file);
          break;
        case 'featured':
          response = await uploadAPI.uploadFeaturedImage(file);
          break;
        case 'gallery':
          response = await uploadAPI.uploadGalleryImage(file);
          break;
        default:
          response = await uploadAPI.uploadAvatar(file);
      }

      const imageUrl = response.data.data.url;
      setPreview(imageUrl);
      onImageUploaded?.(imageUrl);
    } catch (error) {
      console.error('Upload failed:', error);
      setPreview(currentImage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`text-center ${className}`}>
      <div className="mb-3">
        <Image
          src={preview || '/default-avatar.png'}
          roundedCircle={type === 'avatar'}
          style={{ 
            width: size, 
            height: size, 
            objectFit: 'cover',
            border: '2px solid #dee2e6'
          }}
        />
      </div>
      <Form.Control
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        disabled={uploading}
        size="sm"
      />
      {uploading && (
        <div className="mt-2">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Uploading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;