import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { sanitizeUrl } from '../helperFunctions/sanitizeUrl';
interface Club {
  clubName: string;
  clubLocation: string;
  clubWebsiteURL: string;
  memberCount: number;
  clubLogoFileName: string;
}

function RowingClubList() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://rowerwebsite.azurewebsites.net/api/rowingclub')
    .then(response => response.json())
    .then(data => {
      setClubs(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, []);
  return (
    <div style={{ paddingLeft: '15px' }}>
      {loading ? (
      <div className="loader-container">
          <ClipLoader size={50} color={'#123abc'} loading={loading} />
          <p>Loading rowing clubs, hang on tight</p>
          </div>
        ) : (
        <div>
      <h1>Rowing Clubs</h1>
      <ul>
        {clubs.map((club, index) => (
          <li key={index}>
            <h2>{club.clubName}</h2>
            <img
                  src={`https://rowerwebsite.azurewebsites.net/api/File?name=${encodeURIComponent(
                    club.clubLogoFileName
                  )}`} 
                  alt={`${club.clubName}`}
                  className="rowingClub-image"
                />
            <p>Location: {club.clubLocation}</p>
            <p>
              Website: <a href={sanitizeUrl(club.clubWebsiteURL)} target="_blank" rel="noopener noreferrer">{club.clubWebsiteURL}</a>
            </p>
            <p>Number of members: {club.memberCount}</p>
          </li>
        ))}
      </ul>
        </div>
        )}
    </div>
  );
}

export default RowingClubList;
