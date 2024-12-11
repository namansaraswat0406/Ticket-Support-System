const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authMiddleware = require('./middleware/auth');
const errorMiddleware = require('./middleware/error');
const corsMiddleware = require('./middleware/cors');
const { loginRateLimiter } = require('./middleware/rateLimit');
const { validateSignUp } = require('./middleware/validate'); // Validation middleware

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(corsMiddleware); // Apply CORS settings globally
app.use(express.json());  // Built-in middleware to parse JSON requests

// Routes
app.use('/api/auth', require('./routes/authRoutes'));  // Authentication routes (login, signup)
app.use('/api/tickets', authMiddleware, require('./routes/ticketRoutes'));  // Ticket routes (protected)
app.use('/api/rules', authMiddleware, require('./routes/ruleRoutes'));  // Rule routes (protected)
app.use('/api/departments', authMiddleware, require('./routes/departmentRoutes'));  // Department routes (protected)
app.use('/api/statuses', authMiddleware, require('./routes/statusRoutes'));  // Status routes (protected)

// Error handling middleware (should be placed last)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
