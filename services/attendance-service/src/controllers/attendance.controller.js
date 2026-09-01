const attendanceService = require("../services/attendance.service");

// Mark Attendance
const markAttendance = async (req, res) => {
  try {
    const attendanceData = {
      ...req.body,
      markedBy: req.headers["x-user-id"],
    };

    const attendance =
      await attendanceService.markAttendance(attendanceData);

    return res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: attendance,
    });
  } catch (error) {
    console.error("Mark attendance error:", error);

    // Duplicate attendance
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Attendance already marked for this student on this date",
      });
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Attendance
const getAllAttendance = async (req, res) => {
  try {
    console.log("Controller: getAllAttendance called");

    const attendance = await attendanceService.getAllAttendance();

    console.log("Controller: data received");
    console.log("Records:", attendance.length);

    return res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    console.error("Get all attendance error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Attendance By ID
const getAttendanceById = async (req, res) => {
  try {
    const attendance = await attendanceService.getAttendanceById(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    console.error("Get attendance by ID error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  markAttendance,
  getAllAttendance,
  getAttendanceById,
};