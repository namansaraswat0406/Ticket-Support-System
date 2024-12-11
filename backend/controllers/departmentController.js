const Department = require('../models/Department');

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const department = new Department({ name });
    const savedDepartment = await department.save();
    res.status(201).json(savedDepartment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating department', error: error.message });
  }
};

// Update a department
exports.updateDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.json(updatedDepartment);
  } catch (error) {
    res.status(400).json({ message: 'Error updating department', error: error.message });
  }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
  try {
    const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
    res.json(deletedDepartment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
