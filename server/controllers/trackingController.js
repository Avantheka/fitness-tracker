import db from "../db/db.js";

export const saveTrackingData = async (req, res) => {
  const {
    date,
    cardioType,
    cardioDuration,
    cyclingDistance,
    cyclingDuration,
    waterIntake,
    weight,
    waist
  } = req.body;

  const email = req.user?.email;

  if (!email) {
    return res.status(401).json({ message: "Unauthorized: Email not found in token." });
  }

  if (!cardioDuration || !waterIntake || !date) {
    return res.status(400).json({
      message: "Cardio duration, water intake, and date are required."
    });
  }

  await db.read();

  db.data.tracking.push({
    email,              // ✅ Taken from token, not body
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
