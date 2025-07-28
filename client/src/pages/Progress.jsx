// For Recharts (example)
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Progress = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const data = [
    { date: "2025-07-22", value: 30 },
    { date: "2025-07-23", value: 45 },
    { date: "2025-07-24", value: 60 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Progress Tracker</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>Start Date: </label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label style={{ marginLeft: "10px" }}>End Date: </label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      <hr style={{ margin: "20px 0" }} />

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Progress;