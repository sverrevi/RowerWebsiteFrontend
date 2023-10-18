// NavigationBar.tsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../App.css';

interface NavigationBarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

function NavigationBar({ isLoggedIn, onLogout }: NavigationBarProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    // Update local state when isLoggedIn prop changes
    if (!isLoggedIn) {
      setUsername('');
    }
  }, [isLoggedIn]);

  return (
    <div className="navbar">
      <NavLink to="/" className="nav-link" onClick={() => handleNavigation('/')}>
        Home
      </NavLink>
      <NavLink to="/rowers" className="nav-link" onClick={() => handleNavigation('/rowers')}>
        Rowers
      </NavLink>
      <NavLink to="/rowingclubs" className="nav-link" onClick={() => handleNavigation('/rowingclubs')}>
        Rowing Clubs
      </NavLink>
      <div className="login-section">
        {isLoggedIn ? (
          <div>
            <span>Welcome, {username}!</span>
            <button onClick={onLogout}>Logout</button>
            <NavLink to="/protected" className="nav-link" onClick={() => handleNavigation('/protected')}>
              Protected Page
            </NavLink>
          </div>
        ) : (
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default NavigationBar;
