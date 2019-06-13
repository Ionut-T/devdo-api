require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware for checking authentication status
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Authentication failed'
    });
  }
};
