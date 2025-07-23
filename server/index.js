const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");          
const dashboardRoutes = require("./routes/dashboardRoutes"); 

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);        
app.use("/api", dashboardRoutes);   // /api/dashboard

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
