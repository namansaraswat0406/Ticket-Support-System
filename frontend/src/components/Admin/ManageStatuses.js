import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../../utils/api';

const ManageStatuses = () => {
  const [statuses, setStatuses] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const fetchStatuses = async () => {
    try {
      const response = await api.get('/statuses'); // GET /statuses
      setStatuses(response.data);
    } catch (err) {
      setError('Failed to load statuses');
    }
  };

  const handleSaveStatus = async () => {
    try {
      if (currentStatus._id) {
        await api.put(`/statuses/${currentStatus._id}`, currentStatus); // PUT /statuses/:id
      } else {
        const response = await api.post('/statuses', currentStatus); // POST /statuses
        setStatuses([...statuses, response.data]);
      }
      setShowModal(false);
      setCurrentStatus(null);
    } catch (err) {
      setError('Failed to save status');
    }
  };

  const handleDeleteStatus = async (id) => {
    try {
      await api.delete(`/statuses/${id}`); // DELETE /statuses/:id
      setStatuses(statuses.filter((status) => status._id !== id));
    } catch (err) {
      setError('Failed to delete status');
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  return (
    <div>
      <h3>Manage Statuses</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button className="mb-3" onClick={() => setShowModal(true)}>Add Status</Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((status, index) => (
            <tr key={status._id}>
              <td>{index + 1}</td>
              <td>{status.name}</td>
              <td style={{ color: status.color }}>{status.color}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => {
                    setCurrentStatus(status);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDeleteStatus(status._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Adding/Editing Statuses */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentStatus?._id ? 'Edit Status' : 'Add Status'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formStatusName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentStatus?.name || ''}
                onChange={(e) => setCurrentStatus({ ...currentStatus, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formStatusColor">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                value={currentStatus?.color || ''}
                onChange={(e) => setCurrentStatus({ ...currentStatus, color: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveStatus}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageStatuses;
