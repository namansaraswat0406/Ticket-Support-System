const { body, validationResult } = require('express-validator');

// Middleware to validate user input
const validateSignUp = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Continue if no validation errors
  }
];

module.exports = {
  validateSignUp
};
