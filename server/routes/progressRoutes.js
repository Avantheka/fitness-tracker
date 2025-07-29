import express from "express";
import { getProgressSummary } from "../controllers/progressController.js";

const router = express.Router();

router.get("/progress", getProgressSummary);

export default router;
