const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authMiddleware = require('./middleware/auth');
const errorMiddleware = require('./middleware/error');
const { loginRateLimiter } = require('./middleware/rateLimit');
const { validateSignUp } = require('./middleware/validate'); // Validation middleware

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  credentials: true, // Allow cookies and credentials
}));
app.use(express.json()); // Middleware to parse JSON requests

// Routes
app.use('/api/auth', require('./routes/authRoutes')); // Authentication routes
app.use('/api/tickets', authMiddleware, require('./routes/ticketRoutes')); // Ticket routes
app.use('/api/rules', authMiddleware, require('./routes/ruleRoutes')); // Rule routes
app.use('/api/departments', authMiddleware, require('./routes/departmentRoutes')); // Department routes
app.use('/api/statuses', authMiddleware, require('./routes/statusRoutes')); // Status routes

// Error handling middleware (must be last)
app.use(errorMiddleware);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
