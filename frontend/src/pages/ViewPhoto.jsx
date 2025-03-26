import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewPhoto() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/photos');
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/photos/${id}`);
      setPhotos(photos.filter(photo => photo._id !== id)); // Remove from UI
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete the image. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div className="col-md-4 mb-4" key={photo._id}>
              <div className="card shadow-lg" style={{ width: "18rem", height: "22rem" }}>
                <img 
                  src={photo.imageUrl} 
                  className="card-img-top" 
                  alt={photo.imageName} 
                  style={{ width: "100%", height: "250px", objectFit: "cover" }} 
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{photo.imageName}</h5>
                  <button className="btn btn-danger" onClick={() => handleDelete(photo._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No images found.</p>
        )}
      </div>
    </div>
  );
}

export default ViewPhoto;
