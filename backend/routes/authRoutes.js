const express = require('express');
const router = express.Router();
const { signUp, login } = require('../controllers/authController'); // Import controller methods

// POST /api/auth/signup
// Route for user sign-up
router.post('/signup', signUp);

// POST /api/auth/login
// Route for user login
router.post('/login', login);

module.exports = router;
