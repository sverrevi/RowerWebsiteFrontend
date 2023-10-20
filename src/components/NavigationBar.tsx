import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { UserContext } from "../lib/context";

interface NavigationBarProps {
  logout: () => void;
}

function NavigationBar({ logout }: NavigationBarProps) {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const username = userContext.username;
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="navbar">
      <NavLink
        to="/"
        className="nav-link"
        onClick={() => handleNavigation("/")}
      >
        Home
      </NavLink>
      <NavLink
        to="/rowers"
        className="nav-link"
        onClick={() => handleNavigation("/rowers")}
      >
        Rowers
      </NavLink>
      <NavLink
        to="/rowingclubs"
        className="nav-link"
        onClick={() => handleNavigation("/rowingclubs")}
      >
        Rowing Clubs
      </NavLink>
      <div className="login-section">
        {username ? (
          <>
            <div>
              <span>Welcome, {username}!</span>
              <button onClick={logout}>Logout</button>
            </div>
            <NavLink
              to="/protected"
              className="nav-link"
              onClick={() => handleNavigation("/protected")}
            >
              Add to database
            </NavLink>
          </>
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
