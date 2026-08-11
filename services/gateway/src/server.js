const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 4000;

// Auth Service
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:5000",
    changeOrigin: true,
    pathRewrite: (path) => `/api/auth${path}`,
  })
);

// Student Service
app.use(
  "/api/students",
  createProxyMiddleware({
    target: "http://localhost:5001",
    changeOrigin: true,
    pathRewrite: (path) => `/api/students${path}`,
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