require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const attendanceRoutes = require("./routes/attendance.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/attendance", attendanceRoutes);

connectDB();

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "attendance-service",
    message: "Attendance Service is running",
  });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Attendance Service running on port ${PORT}`);
});