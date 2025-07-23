import React from "react";
import "../components/Auth.css";

const GreetingCard = ({ name }) => {
  return (
    <div className="greeting-card">
      <h2>Hello, {name}! 👋</h2>
      <p>Great to see you. Ready to crush your fitness goals today?</p>
    </div>
  );
};

export default GreetingCard;
