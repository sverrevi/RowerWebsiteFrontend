import React, { useState, useEffect } from 'react';
import { sanitizeUrl } from '../helperFunctions/sanitizeUrl';
interface Club {
  clubName: string;
  clubLocation: string;
  clubWebsiteURL: string;
  memberCount: number;
}

function RowingClubList() {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    fetch('https://rowerwebsite.azurewebsites.net/api/rowingclub')
      .then(response => response.json())
      .then(data => setClubs(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  return (
    <div>
      <h1>Rowing Clubs</h1>
      <ul>
        {clubs.map((club, index) => (
          <li key={index}>
            <h2>{club.clubName}</h2>
            <p>Location: {club.clubLocation}</p>
            <p>
              Website: <a href={sanitizeUrl(club.clubWebsiteURL)} target="_blank" rel="noopener noreferrer">{club.clubWebsiteURL}</a>
            </p>
            <p>Number of members: {club.memberCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RowingClubList;
