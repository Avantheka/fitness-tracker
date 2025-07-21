const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

// Register function
exports.registerUser = (req, res) => { 
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  return res.status(201).json({ message: "User registered successfully" });
};


//Login function 
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const mockUser = {
    email: "test@example.com",
    password: "123456"
  };

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  if (email !== mockUser.email || password !== mockUser.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  //Generate JWT token

  const token = jwt.sign({ email }, "mysecretkey", { expiresIn: "1h" });

  return res.status(200).json({ message: "Login successful", token });
};