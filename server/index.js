import dotenv from "dotenv";
dotenv.config(); // ✅ Load .env variables

import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

import { initDB } from "./db/db.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

await initDB();

app.use(cors());
app.use(express.json());

// Public routes
app.use("/api", authRoutes);

// Protected routes
app.use("/api", authMiddleware, dashboardRoutes);
app.use("/api", authMiddleware, trackingRoutes);
app.use("/api", authMiddleware, progressRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
