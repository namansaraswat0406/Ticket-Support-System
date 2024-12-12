const express = require('express');
const router = express.Router();
const { getStatuses, createStatus, updateStatus, deleteStatus } = require('../controllers/statusController');
const authMiddleware = require('../middleware/auth');

// Routes
router.route('/')
  .get(authMiddleware, getStatuses)       // Get all statuses
  .post(authMiddleware, createStatus);    // Create a status

router.route('/:id')
  .put(authMiddleware, updateStatus)      // Update a status
  .delete(authMiddleware, deleteStatus);  // Delete a status

module.exports = router;
