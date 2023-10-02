import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import RowingClubList from './components/RowingClubsList';
import RowerList from './components/RowerList';
import HomeContent from './components/homeContent';
import './App.css';
function App() {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/rowingclubs" element={<RowingClubList />} />
          <Route path="/rowers" element={<RowerList />} />
          <Route path="/" element={<HomeContent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;