import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/Auth.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/"); 
  };

  const userEmail = localStorage.getItem("email");

  return (
    <header className="app-header">
      <h1 className="app-title">🏋️‍♂️ FitTrack</h1>
      <div className="user-section">
        <span className="user-name">Hello, {userEmail || "User"}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
