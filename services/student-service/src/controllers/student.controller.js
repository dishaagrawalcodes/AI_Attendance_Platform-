const asyncHandler = require("../utils/asyncHandler");

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getMyProfile,
} = require("../services/student.service");

const create = asyncHandler(async (req, res) => {
  const student = await createStudent(req.body);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: student,
  });
});

const getAll = asyncHandler(async (req, res) => {
  const result = await getAllStudents(req.query);

  res.status(200).json({
    success: true,
    ...result,
  });
});

const getById = asyncHandler(async (req, res) => {
  const student = await getStudentById(req.params.id);

  res.status(200).json({
    success: true,
    data: student,
  });
});

const update = asyncHandler(async (req, res) => {
  const student = await updateStudent(
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student,
  });
});

const remove = asyncHandler(async (req, res) => {
  await deleteStudent(req.params.id);

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
  });
});
const getMe = asyncHandler(async (req, res) => {
  const userId = req.headers["x-user-id"];

  const student = await getMyProfile(userId);

  res.status(200).json({
    success: true,
    data: student,
  });
});
module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  getMe,
};