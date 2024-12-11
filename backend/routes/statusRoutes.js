const express = require('express');
const router = express.Router();
const {
  getStatuses,  // Ensure this function is correctly imported from the controller
  createStatus,
  updateStatus,
  deleteStatus,
} = require('../controllers/statusController'); // Make sure the path is correct

// Get all statuses
router.get('/', getStatuses);

// Create a new status
router.post('/', createStatus);

// Update a status
router.put('/:id', updateStatus);

// Delete a status
router.delete('/:id', deleteStatus);

module.exports = router;
