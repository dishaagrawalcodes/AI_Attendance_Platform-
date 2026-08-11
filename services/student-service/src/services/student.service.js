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
    if (existingStudent.userId.toString() === studentData.userId)
      throw new ApiError(400, "Student already exists for this user");

    if (existingStudent.rollNumber === studentData.rollNumber)
      throw new ApiError(400, "Roll Number already exists");

    if (
      existingStudent.enrollmentNumber === studentData.enrollmentNumber
    )
      throw new ApiError(400, "Enrollment Number already exists");
  }

  const student = await Student.create(studentData);

  logger.info(`Student ${student.rollNumber} created`);

  return student;
};

const getAllStudents = async (query) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    department,
    semester,
    sort = "createdAt",
    order = "desc",
  } = query;

  const filter = {};

  if (department) {
    filter.department = department;
  }

  if (semester) {
    filter.semester = Number(semester);
  }

  if (search) {
    filter.$or = [
      { rollNumber: { $regex: search, $options: "i" } },
      { enrollmentNumber: { $regex: search, $options: "i" } },
    ];
  }

  const students = await Student.find(filter)
    .sort({ [sort]: order === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Student.countDocuments(filter);

  return {
    students,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
  };
};

const getStudentById = async (id) => {
  const student = await Student.findById(id);

  if (!student)
    throw new ApiError(404, "Student not found");

  return student;
};

const updateStudent = async (id, data) => {
  const student = await Student.findById(id);

  if (!student)
    throw new ApiError(404, "Student not found");

  Object.assign(student, data);

  await student.save();

  logger.info(`Student ${student.rollNumber} updated`);

  return student;
};

const deleteStudent = async (id) => {
  const student = await Student.findById(id);

  if (!student)
    throw new ApiError(404, "Student not found");

  await student.deleteOne();

  logger.info(`Student ${student.rollNumber} deleted`);
};

const getMyProfile = async (userId) => {
  const student = await Student.findOne({ userId });

  if (!student) {
    throw new ApiError(404, "Student profile not found");
  }

  return student;
};
module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getMyProfile,
};