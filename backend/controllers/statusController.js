const Status = require('../models/Status');

// Get all statuses
exports.getStatuses = async (req, res) => {
  try {
    const statuses = await Status.find();
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch statuses', error });
  }
};

// Create a new status
exports.createStatus = async (req, res) => {
  try {
    const { name } = req.body;
    const status = new Status({ name });
    const savedStatus = await status.save();
    res.status(201).json(savedStatus);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create status', error });
  }
};

// Update a status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedStatus = await Status.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedStatus) return res.status(404).json({ message: 'Status not found' });
    res.json(updatedStatus);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update status', error });
  }
};

// Delete a status
exports.deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStatus = await Status.findByIdAndDelete(id);
    if (!deletedStatus) return res.status(404).json({ message: 'Status not found' });
    res.json({ message: 'Status deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete status', error });
  }
};
