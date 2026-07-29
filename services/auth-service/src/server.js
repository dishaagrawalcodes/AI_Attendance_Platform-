const express = require("express");

const authRoutes = require("./routes/auth.routes");

const app = express();

const PORT = 5000;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});