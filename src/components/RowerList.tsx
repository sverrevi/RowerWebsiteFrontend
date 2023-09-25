import React, { useState, useEffect } from 'react';
import './RowerList.css';

interface Rower {
  firstName: string;
  lastName: string;
  gender: string;
  height: number;
  weight: number;
  rowingClubs: {
    clubName: string;
    clubLocation: string;
    clubWebsiteURL: string;
  }[];
  photoFileName: string;
}

function RowerList() {
  const [rowers, setRowers] = useState<Rower[]>([]);

  useEffect(() => {
    fetch('https://rowerwebsite.azurewebsites.net/api/rower')
      .then(response => response.json())
      .then(data => setRowers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Rowers</h1>
      <ul>
        {rowers.map((rower, index) => (
          <li key={index}>
            <h2>{rower.firstName} {rower.lastName}</h2>
            <img
              src={`https://rowerwebsite.azurewebsites.net/api/File?name=${encodeURIComponent(
                rower.photoFileName
              )}`} 
              alt={`${rower.firstName} ${rower.lastName}`}
              className="rower-image"
            />
            <p>Gender: {rower.gender}</p>
            <p>Height: {rower.height} cm</p>
            <p>Weight: {rower.weight} kg</p>
            <h3>Rowing Clubs</h3>
            <ul>
              {rower.rowingClubs.map((club, clubIndex) => (
                <li key={clubIndex}>
                  <h4>{club.clubName}</h4>
                  <p>Location: {club.clubLocation}</p>
                  <p>
                    Website:{' '}
                    <a href={club.clubWebsiteURL} target="_blank" rel="noopener noreferrer">
                      {club.clubWebsiteURL}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RowerList;
