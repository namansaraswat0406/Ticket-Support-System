const rateLimit = require('express-rate-limit');

// Apply rate limiting to the login route
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many login attempts from this IP, please try again after 15 minutes.',
});

module.exports = {
  loginRateLimiter
};
