import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Progress = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const email = "test@example.com";

  useEffect(() => {
    if (!startDate || !endDate) return;

    setLoading(true);

    axios
      .get("/progress", {
        params: {
          email: email,
          start: startDate,
          end: endDate,
        },
      })
      .then((res) => {
        if (res.data && res.data.labels) {
          const chartData = res.data.labels.map((label, index) => ({
            date: label,
            cardio: res.data.cardio[index] || 0,
            waterIntake: res.data.waterIntake[index] || 0,
          }));
          setData(chartData);
        } else {
          setData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setData([]);
        setLoading(false);
      });
  }, [startDate, endDate]);

  return (
    <div style={{ padding: "20px" }}>
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
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="cardio"
              stroke="#8884d8"
              name="Cardio Minutes"
            />
            <Line
              type="monotone"
              dataKey="waterIntake"
              stroke="#82ca9d"
              name="Water Intake"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Progress;
