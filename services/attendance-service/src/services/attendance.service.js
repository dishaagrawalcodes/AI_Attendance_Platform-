const Attendance = require("../models/Attendance");

const markAttendance = async (attendanceData) => {
  const response = await fetch(
    `http://student-service:5001/api/students/${attendanceData.studentId}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      const error = new Error("Student not found");
      error.statusCode = 404;
      throw error;
    }

    const error = new Error("Unable to verify student");
    error.statusCode = 503;
    throw error;
  }

  const attendance = await Attendance.create(attendanceData);

  return attendance;
};

const getAllAttendance = async () => {
  return await Attendance.find().sort({ date: -1 });
};

const getAttendanceById = async (id) => {
  return await Attendance.findById(id);
};

module.exports = {
  markAttendance,
  getAllAttendance,
  getAttendanceById,
};