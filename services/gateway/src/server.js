const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const authMiddleware = require("./middleware/auth.middleware");
const authorizeRoles = require("./middleware/authorize.middleware");
const app = express();

app.use(cors());

const PORT = process.env.PORT || 4000;

// Auth Service
app.use(
  "/api/auth",
  createProxyMiddleware({
  target: "http://auth-service:5000",
    changeOrigin: true,
    pathRewrite: (path) => `/api/auth${path}`,
  })
);

// Student Service
app.use(
  "/api/students",
  authMiddleware,
  createProxyMiddleware({
    target: "http://student-service:5001",
    changeOrigin: true,
    pathRewrite: (path) => `/api/students${path}`,
  })
);

// Attendance Service
app.use(
  "/api/attendance",
  authMiddleware,
  (req, res, next) => {
    if (req.method === "GET") {
      return next();
    }

    return authorizeRoles("admin", "faculty")(req, res, next);
  },
  createProxyMiddleware({
    target: "http://attendance-service:5002",
    changeOrigin: true,
    pathRewrite: (path) => `/api/attendance${path}`,
  })
);
// Analytics Service
app.use(
  "/api/analytics",
  authMiddleware,
  createProxyMiddleware({
    target: "http://analytics-service:5003",
    changeOrigin: true,
    pathRewrite: (path) => `/api/analytics${path}`,
  })
);
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API Gateway is Healthy",
  });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});