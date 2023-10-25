import ImageUpload from './ImageUpload';
const AddToDB = () => {
    return (
      <div>
        <h2>Here we add to db</h2>
        <p>
          Change code
        </p>
        <p>
          Is this a protected route?
        </p>
        <ImageUpload /> {/* Add the ImageUpload component here */}
      </div>
    );
  };
  
  export default AddToDB;