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

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Protect route: if no token, redirect to login
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
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    try {
      const response = await axios.post("/track", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Tracking saved:", response.data);
      setSuccess("Tracking data saved successfully!");
      setError("");
      handleClear();
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

          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tracking;
