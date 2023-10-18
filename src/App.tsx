import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import RowingClubList from './components/RowingClubsList';
import RowerList from './components/RowerList';
import HomeContent from './components/HomeContent';
import LoginComponent from './components/LoginComponent'; // Import LoginComponent
import './App.css';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <NavigationBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/rowingclubs" element={<RowingClubList />} />
          <Route path="/rowers" element={<RowerList />} />
          <Route path="/login" element={<LoginComponent onLogin={handleLogin} />} />
          <Route path="/" element={<HomeContent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
