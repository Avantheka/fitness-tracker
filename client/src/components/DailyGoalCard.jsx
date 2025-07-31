import React from "react";
import "../components/Auth.css";

const DailyGoalCard = () => {
  return (
      <div className="goal-card">
        <div className= "goal-container">
          <h3>Today's Fitness Goals</h3>
          </div>
        <ul>
          <li>
          💧 Water Intake Goal: <strong>3L</strong> <span className="status">✅</span>
          </li>
          <li>
          🏃 Cardio: <strong>30 min</strong> <span className="status">❌</span>
          </li>
          <li>
          👟 Steps: <strong>10,000</strong> <span className="status">✅</span>
          </li>
        </ul>
      </div>
    
  );
};

export default DailyGoalCard;
