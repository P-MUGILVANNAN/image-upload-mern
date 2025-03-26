import React, { useState } from 'react';
import axios from 'axios';

function AddPhoto() {
  const [imageName, setImageName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]); // Store the actual file
      setPreviewImage(URL.createObjectURL(event.target.files[0])); // Preview Image
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!imageName || !selectedImage) {
      alert("Please enter an image name and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('imageName', imageName);
    formData.append('image', selectedImage); // Sending the file

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(response.data.message);

      // Reset form after successful upload
      setImageName('');
      setSelectedImage(null);
      setPreviewImage(null);

      // Reset file input field manually (important)
      document.getElementById('fileInput').value = "";
    } catch (error) {
      console.error('Error uploading image:', error);
      alert("Error uploading image. Please try again.");
    }
  };

  return (
    <div className='container mt-5 d-flex justify-content-center'>
      <div className='w-50'>
        <h2 className='text-warning text-center'>Add Photos</h2>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <p>Image Name: 
            <input 
              type="text" 
              className='form-control' 
              name='imageName' 
              placeholder='Enter Image Name' 
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
            />
          </p>
          <p>Image: 
            <input 
              id="fileInput"  // Add ID for resetting input
              type="file" 
              className='form-control' 
              onChange={handleImageChange} 
            />
          </p>
          {previewImage && (
            <div className='mt-3'>
              <img src={previewImage} alt="Selected" className='img-thumbnail' style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
          )}
          <p>
            <button type='submit' className='btn btn-primary'>Add Photo</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AddPhoto;
