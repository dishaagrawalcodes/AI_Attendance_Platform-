const { body } = require("express-validator");

const createStudentValidation = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required"),

  body("rollNumber")
    .notEmpty()
    .withMessage("Roll Number is required"),

  body("enrollmentNumber")
    .notEmpty()
    .withMessage("Enrollment Number is required"),

  body("department")
  .notEmpty()
  .withMessage("Department is required"),

  body("semester")
    .isInt({ min: 1 })
    .withMessage("Semester must be greater than 0"),

  body("section")
    .notEmpty()
    .withMessage("Section is required"),

  body("batch")
    .notEmpty()
    .withMessage("Batch is required"),
];

module.exports = {
  createStudentValidation,
};