import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ManageRules = () => {
  const [rules, setRules] = useState([]); // To store fetched rules
  const [showModal, setShowModal] = useState(false); // To toggle the modal
  const [ruleName, setRuleName] = useState(''); // To store rule name
  const [ruleDescription, setRuleDescription] = useState(''); // To store rule description
  const [editRuleId, setEditRuleId] = useState(null); // To store ID of the rule being edited

  // Fetch all rules from the backend
  const fetchRules = async () => {
    try {
      const response = await axios.get('/api/rules', {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      setRules(response.data);
    } catch (error) {
      console.error('Failed to fetch rules:', error);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  // Handle Save/Update Rule
  const handleSave = async () => {
    try {
      if (editRuleId) {
        // Update existing rule
        await axios.put(
          `/api/rules/${editRuleId}`,
          { name: ruleName, description: ruleDescription },
          { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
        );
      } else {
        // Create new rule
        await axios.post(
          '/api/rules',
          { name: ruleName, description: ruleDescription },
          { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
        );
      }
      fetchRules(); // Refresh rules after save
      handleCloseModal(); // Close the modal
    } catch (error) {
      console.error('Failed to save rule:', error);
    }
  };

  // Handle Delete Rule
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/rules/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      fetchRules(); // Refresh rules after delete
    } catch (error) {
      console.error('Failed to delete rule:', error);
    }
  };

  // Open the modal (for adding or editing)
  const handleOpenModal = (rule = null) => {
    if (rule) {
      setEditRuleId(rule._id);
      setRuleName(rule.name);
      setRuleDescription(rule.description);
    } else {
      setEditRuleId(null);
      setRuleName('');
      setRuleDescription('');
    }
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h3>Manage Rules</h3>
      <Button onClick={() => handleOpenModal()}>Add Rule</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule, index) => (
            <tr key={rule._id}>
              <td>{index + 1}</td>
              <td>{rule.name}</td>
              <td>{rule.description}</td>
              <td>
                <Button variant="warning" onClick={() => handleOpenModal(rule)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(rule._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Adding/Editing Rules */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editRuleId ? 'Edit Rule' : 'Add Rule'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Rule Name</Form.Label>
              <Form.Control
                type="text"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                placeholder="Enter rule name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rule Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={ruleDescription}
                onChange={(e) => setRuleDescription(e.target.value)}
                placeholder="Enter rule description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageRules;
