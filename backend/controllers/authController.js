const User = require('../models/User');  // User model
const jwt = require('jsonwebtoken');  // For generating JSON Web Tokens
const bcrypt = require('bcryptjs');  // For hashing passwords

// Sign Up method
exports.signUp = async (req, res) => {
  const { email, password } = req.body;  // Destructure email and password from request body

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ email, password });

    // Save the user to the database
    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ userId: newUser._id, userType: newUser.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token and user type in the response
    res.status(201).json({ token, userType: newUser.userType });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login method
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token and user type in the response
    res.json({ token, userType: user.userType });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
