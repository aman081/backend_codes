const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());               // Enable Cross-Origin Resource Sharing
app.use(express.json());       // Parse incoming JSON requests

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Error handler middleware (catch-all)
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

module.exports = app;
