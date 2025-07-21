// // backend/routes/auth.js
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const router = express.Router();

// const JWT_SECRET = 'your_jwt_secret'; // Replace with env var

// // Signup
// router.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: 'User already exists' });

//     const newUser = new User({ name, email, password, role: role || 'user' });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign(
//       { userId: user._id, role: user.role, name: user.name },
//       JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     res.json({
//       token,
//       name: user.name,
//       role: user.role,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


// backend/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const newUser = await User.create({ name, email, password, role: role || 'user' });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Signup error', error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({
      message: 'Login successful',
      token,
      role: user.role,
      name: user.name
    });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
});

module.exports = router;
