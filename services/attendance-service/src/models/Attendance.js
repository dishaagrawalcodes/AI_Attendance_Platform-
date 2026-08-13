const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["present", "absent", "late"],
      required: true,
    },

    method: {
      type: String,
      enum: ["manual", "face_recognition", "qr", "rfid"],
      default: "manual",
    },

    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

attendanceSchema.index(
  { studentId: 1, date: 1 },
  { unique: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);