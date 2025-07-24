import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";

import { initDB } from "./db/db.js"; 
import db from "./db/db.js"; 
import path from 'path';

const adapter = new JSONFile(path.resolve('./server/db/db.json'));

const app = express();
const PORT = process.env.PORT || 5000;

await initDB(); 

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", trackingRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
