import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ManageStatuses = () => {
  const [statuses, setStatuses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState({ name: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    try {
      const response = await axios.get('/api/statuses');
      setStatuses(response.data);
    } catch (error) {
      console.error('Failed to fetch statuses:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await axios.put(`/api/statuses/${currentStatus._id}`, currentStatus);
      } else {
        await axios.post('/api/statuses', currentStatus);
      }
      fetchStatuses();
      setShowModal(false);
    } catch (error) {
      console.error('Failed to save status:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/statuses/${id}`);
      fetchStatuses();
    } catch (error) {
      console.error('Failed to delete status:', error);
    }
  };

  return (
    <div>
      <h3>Manage Statuses</h3>
      <Button onClick={() => { setShowModal(true); setIsEditing(false); }}>Add Status</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((status) => (
            <tr key={status._id}>
              <td>{status.name}</td>
              <td>
                <Button variant="warning" onClick={() => { setCurrentStatus(status); setShowModal(true); setIsEditing(true); }}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(status._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Status' : 'Add Status'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentStatus.name}
                onChange={(e) => setCurrentStatus({ ...currentStatus, name: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageStatuses;
