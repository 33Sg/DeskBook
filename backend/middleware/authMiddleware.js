const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
}

function authorizeAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  next();
}

module.exports = { authenticate, authorizeAdmin };
