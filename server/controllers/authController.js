import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db/db.js";

// Register new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  await db.read();
  const existingUser = db.data.users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.data.users.push({ name, email, password: hashedPassword });
  await db.write();

  return res.status(201).json({ message: "User registered successfully" });
};

// Login existing user
// Login existing user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  await db.read();
  const user = db.data.users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // 👇 Include the name in response
  return res.status(200).json({ message: "Login successful", token, name: user.name });
};

