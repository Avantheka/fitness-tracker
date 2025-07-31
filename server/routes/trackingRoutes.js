import express from "express";
import { saveTrackingData } from "../controllers/trackingController.js";
import authMiddleware from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/track", saveTrackingData);
router.post("/track", authMiddleware, saveTrackingData);

export default router;
