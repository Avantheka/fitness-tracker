// server/controllers/trackingController.js
import db from "../db/db.js";

export const saveTrackingData = async (req, res) => {
  const {
    cardioType,
    cardioDuration,
    cyclingDistance,
    cyclingDuration,
    waterIntake,
    weight,
    waist
  } = req.body;

  // ✅ Basic validation
  if (!cardioDuration || !waterIntake) {
    return res.status(400).json({
      message: "Cardio duration and water intake are required."
    });
  }

  try {
    await db.read();

    db.data.tracking.push({
      id: Date.now(), // optional unique ID
      date: new Date().toISOString(),
      cardioType,
      cardioDuration,
      cyclingDistance,
      cyclingDuration,
      waterIntake,
      weight,
      waist
    });

    await db.write();

    return res.status(201).json({ message: "Tracking data saved" });
  } catch (err) {
    console.error("Error saving tracking data:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
