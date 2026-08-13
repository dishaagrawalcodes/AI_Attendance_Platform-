const express = require("express");

const router = express.Router();

const {
  markAttendance,
  getAllAttendance,
  getAttendanceById,
} = require("../controllers/attendance.controller");

router.post("/", markAttendance);

router.get("/", getAllAttendance);

router.get("/:id", getAttendanceById);

module.exports = router;