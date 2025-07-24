import express from "express";
import { saveTrackingData } from "../controllers/trackingController.js";

const router = express.Router();

router.post("/track", saveTrackingData);

export default router;
