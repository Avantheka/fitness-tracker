import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../api/axios";

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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShouldRedirect(true);
      return;
    }

    axios
      .get("/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Failed to load dashboard:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (shouldRedirect) {
    return <Navigate to="/" replace />;
  }

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="dashboard-wrapper">
      <Header />

      <div className="dashboard-content">
        <GreetingCard name={data?.name || "User"} />

        <div className="dashboard-grid">
          <GoalCard label="Water Intake (L)" goal={data?.goals?.water || "-"} />
          <GoalCard label="Calories Burned" goal={data?.goals?.calories || "-"} />
          <GoalCard label="Steps Taken" goal={data?.goals?.steps?.toLocaleString() || "-"} />
          <GoalCard label="Workout Time (min)" goal={data?.goals?.workout || "-"} />
        </div>

        <div className="dashboard-extras">
          <div className="tip">
            <em>“Push yourself, because no one else is going to do it for you.”</em>
          </div>

          <div className="reminder">
            🏋️ <strong>Next Workout:</strong> Full Body – 6:00 PM
          </div>

          <div className="dashboard-links">
            <button onClick={() => (window.location.href = "/tracking")}>Track Workout</button>
            <button onClick={() => (window.location.href = "/progress")}>View Progress</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
