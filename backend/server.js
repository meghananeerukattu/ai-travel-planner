const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");
const generateTravelPlan = require("./utils/gemini");
const app = express();
// Connect Database
connectDB();
// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("AI Travel Planner API Running");
});
// Server
const PORT = process.env.PORT || 5000;
app.get("/test-ai", async (req, res) => {
  try {
    const result = await generateTravelPlan(
      "Tokyo",
      5,
      "Medium",
      ["Food", "Culture"]
    );

    res.json({ result });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});