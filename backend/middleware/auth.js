const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId; // Attach user ID to the request object
    req.userType = decoded.userType; // Attach user role to the request object

    // If the user is admin, allow access to all tickets
    if (req.userType !== 'admin' && req.userType !== 'user') {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions' });
    }

    next(); // Proceed to the next route handler
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please log in again' });
    }
    return res.status(401).json({ message: 'Token is invalid' });
  }
};

module.exports = authMiddleware;
