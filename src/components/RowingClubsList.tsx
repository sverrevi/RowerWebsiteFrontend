import React, { useState, useEffect } from 'react';

interface Club {
  clubName: string;
  clubLocation: string;
  clubWebsiteURL: string;
  memberCount: number;
}

function RowingClubList() {
  const [clubs, setClubs] = useState<Club[]>([]); // Use the Club interface as the type

  useEffect(() => {
    // Fetch data from the API here
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
            <p>Website: <a href={club.clubWebsiteURL}>{club.clubWebsiteURL}</a></p>
            <p>Members: {club.memberCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RowingClubList;


//'https://rowerwebsite.azurewebsites.net/api/rowingclub'