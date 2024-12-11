const express = require('express');
const router = express.Router();
const {
  getRules,
  createRule,
  updateRule,
  deleteRule,
} = require('../controllers/ruleController'); // Ensure the correct import

// Get all rules
router.get('/', getRules);

// Create a new rule
router.post('/', createRule);

// Update a rule
router.put('/:id', updateRule);

// Delete a rule
router.delete('/:id', deleteRule);

module.exports = router;
