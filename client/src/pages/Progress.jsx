import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../components/Auth.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#ffc658", "#82ca9d"];

const Progress = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("email"); 

  useEffect(() => {
  if (!startDate || !endDate) return;

  setLoading(true);

  const formattedStart = new Date(startDate).toISOString().slice(0, 10);
  const formattedEnd = new Date(endDate).toISOString().slice(0, 10);

  axios
    .get("/progress", {
      params: {
        start: formattedStart,
        end: formattedEnd,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const result = res.data;

      const cardio = parseInt(result.cardioTotal) || 0;
      const cycling = parseFloat(result.cyclingTotal) || 0;
      const water = parseFloat(result.averageWater) || 0;

      const chartData = [
        { name: "Cardio (min)", value: cardio },
        { name: "Cycling (km)", value: cycling },
        { name: "Water (L)", value: water },
      ];

      setData(chartData);
    })
    .catch((err) => {
      console.error("Progress fetch failed:", err);
      setData([]);
    })
    .finally(() => setLoading(false));
}, [startDate, endDate]);


  return (
    <div className="page-container"> 
    <div style={{ padding: "20px"}}>
      <h2>Progress Tracker</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label style={{ marginLeft: "10px" }}>End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <hr style={{ margin: "20px 0" }} />

      {loading && <p>Loading...</p>}
      {!loading && data.length === 0 && startDate && endDate && (
        <p>No Data Available for selected range.</p>
      )}

      {!loading && data.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "250px",
            flexWrap: "wrap",
            margin: "65px",
            fontFamily:"Georgia, 'Times New Roman', Times, serif",
          }}
        >
          {/* Pie Chart */}
          <ResponsiveContainer width={400} height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                label
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          {/* Tips or Milestones */}
          <div
            style={{
              flex: "1",
              minWidth: "250px",
              background: "#1f1f1f",
              padding: "20px",
              margin:"10px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              color: "#fff",
            }}
          >
            <h3 style={{ color: "#ffffffff", marginBottom: "10px" }}>🎯 Progress Tips</h3>
            <ul style={{ lineHeight: "2.5" }}>
              <li>
                {data[0]?.value < 60
                  ? "Try to reach at least 60 mins of cardio this week"
                  : "Great job staying consistent with cardio!"}
              </li>
              <li>
                {data[2]?.value < 3
                  ? `You're ${(3 - data[2]?.value).toFixed(1)}L away from your 3L water goal`
                  : "You've met your water intake goal! "}
              </li>
              <li>
                {data[1]?.value < 10
                  ? "Push for a 10 km cycling milestone "
                  : "You've hit a strong cycling streak!"}
              </li>
            </ul>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Progress;
