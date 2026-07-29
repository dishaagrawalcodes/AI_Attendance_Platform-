const express = require("express");

const router = express.Router();

const { register, login } = require("../controllers/auth.controller");

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Auth Service is Healthy",
  });
});

router.post("/register", register);
router.post("/login", login);
module.exports = router;