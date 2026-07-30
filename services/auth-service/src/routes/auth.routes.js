const express = require("express");

const router = express.Router();
const authenticateUser = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/authorize.middleware");
const { register, login } = require("../controllers/auth.controller");
const { registerValidation,loginValidation} = require("../validations/auth.validation");
const validate = require("../middleware/validation.middleware");

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Auth Service is Healthy",
  });
});

router.post(
  "/register",
  registerValidation,
  validate,
  register
);
router.post(
  "/login",
  loginValidation,
  validate,
  login
);

router.get("/profile", authenticateUser, (req, res) => {

    res.json({
        success: true,
        message: "Profile fetched successfully",
        user: req.user
    });

});
router.get(
  "/admin",
  authenticateUser,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

router.get(
  "/faculty",
  authenticateUser,
  authorizeRoles("faculty"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Faculty",
    });
  }
);

router.get(
  "/student",
  authenticateUser,
  authorizeRoles("student"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Student",
    });
  }
);
router.get(
  "/admin-faculty",
  authenticateUser,
  authorizeRoles("admin", "faculty"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin/Faculty",
    });
  }
);
module.exports = router;