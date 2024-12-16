import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../../utils/api';

const ManageRules = () => {
  const [rules, setRules] = useState([]);
  const [currentRule, setCurrentRule] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const fetchRules = async () => {
    try {
      const response = await api.get('/rules'); // GET /rules
      setRules(response.data);
    } catch (err) {
      setError('Failed to load rules');
    }
  };

  const handleSaveRule = async () => {
    try {
      if (currentRule._id) {
        await api.put(`/rules/${currentRule._id}`, currentRule); // PUT /rules/:id
      } else {
        const response = await api.post('/rules', currentRule); // POST /rules
        setRules([...rules, response.data]);
      }
      setShowModal(false);
      setCurrentRule(null);
    } catch (err) {
      setError('Failed to save rule');
    }
  };

  const handleDeleteRule = async (id) => {
    try {
      await api.delete(`/rules/${id}`); // DELETE /rules/:id
      setRules(rules.filter((rule) => rule._id !== id));
    } catch (err) {
      setError('Failed to delete rule');
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <div>
      <h3>Manage Rules</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button className="mb-3" onClick={() => setShowModal(true)}>Add Rule</Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Conditions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule, index) => (
            <tr key={rule._id}>
              <td>{index + 1}</td>
              <td>{rule.name}</td>
              <td>{rule.conditions}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => {
                  setCurrentRule(rule);
                  setShowModal(true);
                }}>
                  Edit
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDeleteRule(rule._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Adding/Editing Rules */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentRule?._id ? 'Edit Rule' : 'Add Rule'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRuleName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentRule?.name || ''}
                onChange={(e) => setCurrentRule({ ...currentRule, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formRuleConditions">
              <Form.Label>Conditions</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentRule?.conditions || ''}
                onChange={(e) => setCurrentRule({ ...currentRule, conditions: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveRule}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageRules;
