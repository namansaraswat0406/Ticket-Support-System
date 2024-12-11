const express = require('express');
const router = express.Router();
const {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require('../controllers/departmentController'); // Make sure this is correct

// Get all departments
router.get('/', getDepartments);

// Create a new department
router.post('/', createDepartment);

// Update a department
router.put('/:id', updateDepartment);

// Delete a department
router.delete('/:id', deleteDepartment);

module.exports = router;
