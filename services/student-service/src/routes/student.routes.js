const express = require("express");

const router = express.Router();

const { create } = require("../controllers/student.controller");

const {
  createStudentValidation,
} = require("../validations/student.validation");

const validate = require("../middleware/validation.middleware");

router.post(
  "/",
  createStudentValidation,
  validate,
  create
);

module.exports = router;