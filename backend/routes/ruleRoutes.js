const express = require('express');
const router = express.Router();
const { getRules, createRule, updateRule, deleteRule } = require('../controllers/ruleController');
const authMiddleware = require('../middleware/auth');

// Routes
router.route('/')
  .get(authMiddleware, getRules)       // Get all rules
  .post(authMiddleware, createRule);   // Create a rule

router.route('/:id')
  .put(authMiddleware, updateRule)     // Update a rule
  .delete(authMiddleware, deleteRule); // Delete a rule

module.exports = router;
