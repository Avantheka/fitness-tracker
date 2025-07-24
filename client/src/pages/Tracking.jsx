import React, { useState } from "react";
import "../components/Auth.css";

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Member C: Replace with Axios POST
  };

  return (
    <div className="tracking-form-container">
      <h2>Track Your Workout</h2>
      <form onSubmit={handleSubmit}>
        <h3>🏃 Cardio</h3>
        <input type="text" name="cardioType" placeholder="Type (e.g., Running)" value={formData.cardioType} onChange={handleChange} />
        <input type="text" name="cardioDuration" placeholder="Duration (minutes)" value={formData.cardioDuration} onChange={handleChange} />

        <h3>🚴 Cycling</h3>
        <input type="text" name="cyclingDistance" placeholder="Distance (km)" value={formData.cyclingDistance} onChange={handleChange} />
        <input type="text" name="cyclingDuration" placeholder="Duration (minutes)" value={formData.cyclingDuration} onChange={handleChange} />

        <h3>💧 Water Intake</h3>
        <input type="text" name="waterIntake" placeholder="Water Intake (litres)" value={formData.waterIntake} onChange={handleChange} />

        <h3>📏 Body Measurements</h3>
        <input type="text" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} />
        <input type="text" name="waist" placeholder="Waist (cm)" value={formData.waist} onChange={handleChange} />

        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleClear}>Clear</button>
        </div>
      </form>
    </div>
  );
};

export default Tracking;
