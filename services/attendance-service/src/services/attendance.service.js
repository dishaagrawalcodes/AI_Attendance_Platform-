const Attendance = require("../models/Attendance");

const markAttendance = async (attendanceData) => {
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