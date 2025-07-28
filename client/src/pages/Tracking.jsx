import React, { useState } from "react";
import "../components/Auth.css";
import axios from "../api/axios";
import { Navigate } from "react-router-dom";

const Tracking = () => {
  const [formData, setFormData] = useState({
    cardioType: "",
    cardioDuration: "",
    cyclingDistance: "",
    cyclingDuration: "",
    waterIntake: "",
    weight: "",
    waist: ""
  });

  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [lastSubmittedDate, setLastSubmittedDate] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect to login if no token
  if (!localStorage.getItem("token")) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleClear = () => {
    setFormData({
      cardioType: "",
      cardioDuration: "",
      cyclingDistance: "",
      cyclingDuration: "",
      waterIntake: "",
      weight: "",
      waist: ""
    });
    setDate(new Date().toISOString().split('T')[0]);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.cardioDuration || !formData.waterIntake) {
      setError("Cardio Duration and Water Intake are required");
      setSuccess("");
      return;
    }

    if (isNaN(formData.cardioDuration) || isNaN(formData.waterIntake)) {
      setError("Please enter valid numbers for duration and water intake");
      setSuccess("");
      return;
    }

    const dataToSubmit = { ...formData, date };

    try {
      const response = await axios.post("/track", dataToSubmit, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 201) {
        console.log("Tracking saved:", response.data);
        setSuccess("Tracking data saved successfully!");
        setError("");
        setLastSubmittedDate(date);
        handleClear(); // Reset form after successful submission
      } else {
        setError("Unexpected response from server");
        setSuccess("");
      }

    } catch (err) {
      console.error("Tracking failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess("");
    }
  };

  return (
    <div className="tracking-page">
      <div className="tracking-form-container">
        <h2>Track Your Workout</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <h3>🏃 Cardio</h3>
          <input
            type="text"
            name="cardioType"
            placeholder="Type (e.g., Running)"
            value={formData.cardioType}
            onChange={handleChange}
          />
          <input
            type="text"
            name="cardioDuration"
            placeholder="Duration (minutes)"
            value={formData.cardioDuration}
            onChange={handleChange}
          />

          <h3>🚴 Cycling</h3>
          <input
            type="text"
            name="cyclingDistance"
            placeholder="Distance (km)"
            value={formData.cyclingDistance}
            onChange={handleChange}
          />
          <input
            type="text"
            name="cyclingDuration"
            placeholder="Duration (minutes)"
            value={formData.cyclingDuration}
            onChange={handleChange}
          />

          <h3>💧 Water Intake</h3>
          <input
            type="text"
            name="waterIntake"
            placeholder="Water Intake (litres)"
            value={formData.waterIntake}
            onChange={handleChange}
          />

          <h3>📏 Body Measurements</h3>
          <input
            type="text"
            name="weight"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
          />
          <input
            type="text"
            name="waist"
            placeholder="Waist (cm)"
            value={formData.waist}
            onChange={handleChange}
          />

          <hr style={{ margin: "20px 0" }} />
          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleClear}>Clear</button>
          </div>
        </form>

        {lastSubmittedDate && (
          <p><strong>Last Submitted:</strong> {lastSubmittedDate}</p>
        )}
      </div>
    </div>
  );
};

export default Tracking;