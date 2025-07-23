import React from "react";
import Header from "../components/Header";
import GreetingCard from "../components/GreetingCard";
import "../components/Auth.css";
 
const GoalCard = ({ icon, label, goal }) => (
<div className="goal-card">
<div className="goal-icon">{icon}</div>
<div className="goal-info">
<p className="goal-label">{label}</p>
<p className="goal-value">{goal}</p>
</div>
</div>
);
 
const Dashboard = () => {
  return (
<div className="dashboard-wrapper">
<Header />
<div className="dashboard-content">
<GreetingCard />
 
        <div className="dashboard-grid">
<GoalCard icon="💧" label="Water Intake" goal="3L" />
<GoalCard icon="🔥" label="Calories Burned" goal="500 kcal" />
<GoalCard icon="👣" label="Steps" goal="10,000" />
<GoalCard icon="⏱️" label="Workout Time" goal="30 min" />
</div>
 
        <div className="dashboard-extras">
<div className="tip">
<em>“Push yourself, because no one else is going to do it for you.”</em>
</div>
 
          <div className="reminder">
            🏋️ <strong>Next Workout:</strong> Full Body – 6:00 PM
</div>
 
          <div className="dashboard-links">
<button onClick={() => window.location.href = "/tracking"}>Track Workout</button>
<button onClick={() => window.location.href = "/progress"}>View Progress</button>
</div>
</div>
</div>
</div>
  );
};
 
export default Dashboard;
