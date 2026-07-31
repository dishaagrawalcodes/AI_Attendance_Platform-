require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const studentRoutes = require("./routes/student.routes");

const errorHandler = require("./middleware/error.middleware");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use("/api/students", studentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Student Service running on ${PORT}`);
});