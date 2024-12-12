const Rule = require('../models/Rule');

// Get all rules
exports.getRules = async (req, res) => {
  try {
    const rules = await Rule.find();
    res.json(rules);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rules', error });
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
    res.status(400).json({ message: 'Failed to create rule', error });
  }
};

// Update a rule
exports.updateRule = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedRule = await Rule.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!updatedRule) return res.status(404).json({ message: 'Rule not found' });
    res.json(updatedRule);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update rule', error });
  }
};

// Delete a rule
exports.deleteRule = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRule = await Rule.findByIdAndDelete(id);
    if (!deletedRule) return res.status(404).json({ message: 'Rule not found' });
    res.json({ message: 'Rule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete rule', error });
  }
};
