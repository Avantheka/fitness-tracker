import React from "react";
import "../components/Auth.css";

const Header = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">🏋️‍♂️ FitTrack</h1>
      <div className="user-section">
        <span className="user-name">Hello, User</span>
        <button className="logout-btn">Logout</button>
      </div>
    </header>
  );
};

export default Header;
