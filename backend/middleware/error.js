const errorMiddleware = (err, req, res, next) => {
    console.error(err.message); // Log the error
  
    // Send a generic error response
    res.status(err.status || 500).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : {},  // Only show stack in development mode
    });
  };
  
  module.exports = errorMiddleware;
  