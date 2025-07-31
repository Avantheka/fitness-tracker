import express from "express";
import { getProgressSummary } from "../controllers/progressController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/progress", authMiddleware, getProgressSummary);

export default router;

