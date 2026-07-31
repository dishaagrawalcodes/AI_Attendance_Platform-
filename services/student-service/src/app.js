const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const studentRoutes = require("./routes/student.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/students", studentRoutes);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Service is Healthy",
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;