const cors = require('cors');

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
