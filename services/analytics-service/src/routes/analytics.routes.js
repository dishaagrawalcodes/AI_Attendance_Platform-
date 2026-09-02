const express = require("express");

const router = express.Router();

const {
  getStudentAnalytics,
  getDepartmentAnalytics,
} = require("../controllers/analytics.controller");


router.get(
  "/student/:studentId",
  getStudentAnalytics
);


router.get(
  "/department/:department",
  getDepartmentAnalytics
);


module.exports = router;