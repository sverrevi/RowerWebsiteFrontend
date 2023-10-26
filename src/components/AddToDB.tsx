import React from 'react';
import ImageUpload from './ImageUpload';
import AddRower from './AddRower'; // Import the AddRower component

const AddToDB = () => {
  return (
    <div>
      <h2>Here we add to db</h2>
      <p>Image Upload</p>
      <ImageUpload /> {/* Use the ImageUpload component here */}
      <hr />
      <AddRower /> {/* Use the AddRower component here */}
    </div>
  );
};

export default AddToDB;
