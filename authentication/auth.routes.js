// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const SECRET = process.env.JWT_SECRET || "secret123";

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });

  if (userExists) return res.status(400).json({ message: "User exists" });

  const user = await User.create({ username, password });
  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });

  res.status(201).json({ token });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
