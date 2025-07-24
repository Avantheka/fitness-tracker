import { Router } from "express";

const router = Router();

router.get("/dashboard", (req, res) => {
  res.status(200).json({
    name: "Avantheka",
    goals: {
      water: "3L",
      steps: "10,000",
      calories: "500 kcal",
      workout: "30 min",
    },
  });
});

export default router;
