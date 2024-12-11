const Status = require('../models/Status');

// Get all statuses
exports.getStatuses = async (req, res) => {
  try {
    const statuses = await Status.find();
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
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
    res.status(400).json({ message: 'Error creating status', error: error.message });
  }
};

// Update a status
exports.updateStatus = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedStatus = await Status.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.json(updatedStatus);
  } catch (error) {
    res.status(400).json({ message: 'Error updating status', error: error.message });
  }
};

// Delete a status
exports.deleteStatus = async (req, res) => {
  try {
    const deletedStatus = await Status.findByIdAndDelete(req.params.id);
    res.json(deletedStatus);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
