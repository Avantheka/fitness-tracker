import React from "react";
import Header from "../components/Header";
import GreetingCard from "../components/GreetingCard";
import DailyGoalCard from "../components/DailyGoalCard";
import "../components/Auth.css";

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <Header />
      <div className="dashboard-content">
        <GreetingCard />
        <DailyGoalCard />
      </div>
    </div>
  );
};

export default Dashboard;
