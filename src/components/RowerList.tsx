import React, { useState, useEffect } from 'react';
import { sanitizeUrl } from '../helperFunctions/sanitizeUrl';
import { ClipLoader } from 'react-spinners';
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
  const [filteredRowers, setFilteredRowers] = useState<Rower[]>([]);
  const [loading, setLoading] = useState(true);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [heightFilter, setHeightFilter] = useState<string>('');

  useEffect(() => {
    fetch('https://rowerwebsite.azurewebsites.net/api/rower')
      .then(response => response.json())
      .then(data => {
        setRowers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = rowers
      .filter(rower => (genderFilter ? rower.gender === genderFilter : true))
      .sort((a, b) => {
        if (heightFilter === 'asc') {
          return a.height - b.height;
        } else if (heightFilter === 'desc') {
          return b.height - a.height;
        }
        return 0;
      });
    setFilteredRowers(filtered);
  }, [genderFilter, heightFilter, rowers]);

  const handleGenderFilterChange = (selectedGender: string) => {
    setGenderFilter(selectedGender);
  };

  const handleHeightFilterChange = (selectedHeight: string) => {
    setHeightFilter(selectedHeight);
  };

  const resetFilters = () => {
    setGenderFilter(null);
    setHeightFilter('');
  };

  return (
    <div style={{ paddingLeft: '20px' }}>
      {loading ? (
        <div className="loader-container">
          <ClipLoader size={50} color={'#123abc'} loading={loading} />
          <p>Loading rowers, hang on tight</p>
        </div>
      ) : (
        <div>
          <h1>Rowers</h1>
          <div>
            <label style={{ marginRight: '8px' }}>Filter by Gender: </label>
            <select value={genderFilter || ''} onChange={(e) => handleGenderFilterChange(e.target.value)}>
              <option value="">Any</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <label style={{ marginLeft: '16px', marginRight: '8px' }}>Filter by Height: </label>
            <select value={heightFilter} onChange={(e) => handleHeightFilterChange(e.target.value)}>
              <option value="">Any</option>
              <option value="asc">Height Ascending</option>
              <option value="desc">Height Descending</option>
            </select>

            <button onClick={resetFilters}>
              Reset Filters
            </button>
          </div>

          <ul>
            {filteredRowers.map((rower, index) => (
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
                        <a href={sanitizeUrl(club.clubWebsiteURL)} target="_blank" rel="noopener noreferrer">
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
      )}
    </div>
  );
}

export default RowerList;
