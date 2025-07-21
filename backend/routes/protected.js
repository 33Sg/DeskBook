// backend/routes/protected.js
const express = require('express');
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/book', authenticate, (req, res) => {
  res.send(`Welcome ${req.user.name}, you can book a seat.`);
});

router.get('/admin', authenticate, authorizeAdmin, (req, res) => {
  res.send('Welcome Admin, this is the admin panel.');
});

module.exports = router;
