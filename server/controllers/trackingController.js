import db from "../db/db.js";

export const saveTrackingData = async (req, res) => {
  const {
    email,
    date,
    cardioType,
    cardioDuration,
    cyclingDistance,
    cyclingDuration,
    waterIntake,
    weight,
    waist
  } = req.body;

  if (!cardioDuration || !waterIntake || !date) {
    return res.status(400).json({
      message: "Cardio duration, water intake, and date are required."
    });
  }

  await db.read();
  db.data.tracking.push({
    email,
    date,
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
};