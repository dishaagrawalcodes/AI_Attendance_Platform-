const Student = require("../models/Student");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");

const createStudent = async (studentData) => {
  const existingStudent = await Student.findOne({
    $or: [
      { userId: studentData.userId },
      { rollNumber: studentData.rollNumber },
      { enrollmentNumber: studentData.enrollmentNumber },
    ],
  });

  if (existingStudent) {
    if (existingStudent.userId.toString() === studentData.userId) {
      throw new ApiError(400, "Student already exists for this user");
    }

    if (existingStudent.rollNumber === studentData.rollNumber) {
      throw new ApiError(400, "Roll number already exists");
    }

    if (
      existingStudent.enrollmentNumber ===
      studentData.enrollmentNumber
    ) {
      throw new ApiError(400, "Enrollment number already exists");
    }
  }

  const student = await Student.create(studentData);

  logger.info(`Student ${student.rollNumber} created`);

  return student;
};

module.exports = {
  createStudent,
};