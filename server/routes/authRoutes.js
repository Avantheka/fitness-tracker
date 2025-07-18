const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/authController");

// POST /api/register
router.post("/register", registerUser);

module.exports = router;
