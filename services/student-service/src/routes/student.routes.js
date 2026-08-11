const express = require("express");

const router = express.Router();

const {
  create,
  getAll,
  getById,
  update,
  remove,
  getMe,
} = require("../controllers/student.controller");

const validate = require("../middleware/validation.middleware");

const {
  createStudentValidation,
} = require("../validations/student.validation");

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create Student
 *     tags:
 *       - Students
 *     responses:
 *       201:
 *         description: Student created successfully
 */
router.post("/", createStudentValidation, validate, create);

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get All Students
 *     tags:
 *       - Students
 *     responses:
 *       200:
 *         description: Students fetched successfully
 */
router.get("/", getAll);
router.get("/me", getMe);
/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get Student By ID
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student fetched successfully
 */
router.get("/:id", getById);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update Student
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student updated successfully
 */
router.put("/:id", update);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete Student
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 */
router.delete("/:id", remove);

module.exports = router;