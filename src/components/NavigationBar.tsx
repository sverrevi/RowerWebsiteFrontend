// NavigationBar.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
      console.log("Hello")
      setUsername('');
    }
  }, [isLoggedIn]);

  return (
    <div className="navbar">
      <Link to="/" className="nav-link" onClick={() => handleNavigation('/')}>
        Home
      </Link>
      <Link to="/rowers" className="nav-link" onClick={() => handleNavigation('/rowers')}>
        Rowers
      </Link>
      <Link to="/rowingclubs" className="nav-link" onClick={() => handleNavigation('/rowingclubs')}>
        Rowing Clubs
      </Link>
      <div className="login-section">
        {isLoggedIn ? (
          <div>
            <span>Welcome, {username}!</span>
            <button onClick={onLogout}>Logout</button>
            <Link to="/protected" className="nav-link" onClick={() => handleNavigation('/protected')}>
              Protected Page
            </Link>
          </div>
        ) : (
          <button className="nav-link" onClick={() => handleNavigation('/login')}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default NavigationBar;
