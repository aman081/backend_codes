const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

// middleware/authorize.js
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
}
module.exports = authorize;


const express = require('express');
const router = express.Router();
const { protect } = require('./middleware/auth');
const authorize = require('./middleware/authorize');

router.get('/admin/dashboard', protect, authorize('admin'), (req, res) => {
  res.send('Welcome Admin!');
});
