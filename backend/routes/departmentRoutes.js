const express = require('express');
const router = express.Router();
const { getDepartments, createDepartment, updateDepartment, deleteDepartment } = require('../controllers/departmentController');
const authMiddleware = require('../middleware/auth');

// Routes
router.route('/')
  .get(authMiddleware, getDepartments)       // Get all departments
  .post(authMiddleware, createDepartment);   // Create a department

router.route('/:id')
  .put(authMiddleware, updateDepartment)     // Update a department
  .delete(authMiddleware, deleteDepartment); // Delete a department

module.exports = router;
