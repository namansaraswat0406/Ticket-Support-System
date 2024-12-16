const Department = require('../models/Department');

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Department name is required' });
    }

    const department = new Department({ name });
    const savedDepartment = await department.save();

    res.status(201).json(savedDepartment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating department', error });
  }
};

// Update an existing department
exports.updateDepartment = async (req, res) => {
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json(updatedDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
