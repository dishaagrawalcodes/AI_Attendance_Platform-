const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },

    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },

    enrollmentNumber: {
      type: String,
      required: true,
      unique: true,
    },

    department: {
      type: String,
      required: true,
    },

    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },

    section: {
      type: String,
      required: true,
    },

    batch: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    address: {
      type: String,
    },

    guardianName: {
      type: String,
    },

    guardianPhone: {
      type: String,
    },

    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);