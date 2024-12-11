const Rule = require('../models/Rule');

// Get all rules
exports.getRules = async (req, res) => {
  try {
    const rules = await Rule.find();
    res.json(rules);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new rule
exports.createRule = async (req, res) => {
  try {
    const { name, description } = req.body;
    const rule = new Rule({ name, description });
    const savedRule = await rule.save();
    res.status(201).json(savedRule);
  } catch (error) {
    res.status(400).json({ message: 'Error creating rule', error: error.message });
  }
};

// Update a rule
exports.updateRule = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedRule = await Rule.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    res.json(updatedRule);
  } catch (error) {
    res.status(400).json({ message: 'Error updating rule', error: error.message });
  }
};

// Delete a rule
exports.deleteRule = async (req, res) => {
  try {
    const deletedRule = await Rule.findByIdAndDelete(req.params.id);
    res.json(deletedRule);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
