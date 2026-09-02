require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const analyticsRoutes = require("./routes/analytics.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/analytics", analyticsRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "analytics-service",
    message: "Analytics Service is running",
  });
});

connectDB();

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`Analytics Service running on port ${PORT}`);
});