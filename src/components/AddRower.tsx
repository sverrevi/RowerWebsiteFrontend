export {};
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

const AddRower: React.FC = () => {
  const [rowerData, setRowerData] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male',
    height: 0,
    weight: 0,
    clubName: '',
  });

  // Handle input changes for text fields and select box
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRowerData({
      ...rowerData,
      [name]: value,
    });
  };

  // Handle creating a new rower
  const handleCreateRower = () => {
    // Get the authentication token from session storage
    const token = sessionStorage.getItem("token");

    // Set up the request configuration
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    // Prepare the rower data to send in the request
    const rowerDataToSend = {
      firstName: rowerData.firstName,
      lastName: rowerData.lastName,
      gender: rowerData.gender,
      height: rowerData.height,
      weight: rowerData.weight,
      rowingClubs: [
        {
          clubName: rowerData.clubName,
        },
      ],
    };

    // Send a POST request to create a new rower
    axios.post(`https://rowerwebsite.azurewebsites.net/api/Rower/`, rowerDataToSend, config)
      .then((response) => {
        // Handle a successful response
        console.log("Rower created:", response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error creating rower:", error);
      });
  };

  return (
    <div>
      <h2>Add Rower</h2>
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={rowerData.firstName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={rowerData.lastName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <select name="gender" value={rowerData.gender} onChange={handleInputChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div>
        <input
          type="number"
          name="height"
          placeholder="Height"
          value={rowerData.height}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="number"
          name="weight"
          placeholder="Weight"
          value={rowerData.weight}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="clubName"
          placeholder="Club Name"
          value={rowerData.clubName}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleCreateRower}>Create Rower</button>
    </div>
  );
};

export default AddRower;
