import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

const ImageUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [id, setId] = useState<number | null>(null);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const parsedId = parseInt(e.target.value, 10);
    setId(isNaN(parsedId) ? null : parsedId);
  };

  const handleUpload = () => {
    if (selectedFile && id) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      console.log(formData)
      axios.post(`https://rowerwebsite.azurewebsites.net/api/File/upload/${id}`, formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Enter ID"
        value={id !== null ? id.toString() : ''}
        onChange={handleIdChange}
      />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
