import { Router } from "express";
import db from "../db/db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// GET /dashboard (Protected Route)
router.get("/dashboard", authMiddleware, async (req, res) => {
  const userEmail = req.user.email;

  await db.read();

  const user = db.data.users.find((u) => u.email === userEmail);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const allTracking = db.data.tracking || [];
  const latestEntry = allTracking
    .filter((entry) => entry.email === userEmail)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  res.status(200).json({
    name: user.name,
    tracking: latestEntry || {},
  });
});

export default router;
