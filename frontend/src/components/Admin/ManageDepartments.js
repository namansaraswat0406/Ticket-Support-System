import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../../utils/api';

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState({ name: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await api.get('/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Failed to fetch departments:', error);
      setError('Failed to fetch departments. Please try again.');
    }
  };

  const handleSave = async () => {
    try {
      if (!currentDepartment.name.trim()) {
        setError('Department name is required.');
        return;
      }

      if (isEditing) {
        await api.put(`/departments/${currentDepartment._id}`, currentDepartment);
        setSuccessMessage('Department updated successfully!');
      } else {
        await api.post('/departments', currentDepartment);
        setSuccessMessage('Department created successfully!');
      }

      fetchDepartments();
      setShowModal(false);
      setCurrentDepartment({ name: '' });
    } catch (error) {
      console.error('Failed to save department:', error);
      setError('Failed to save department. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/departments/${id}`);
      fetchDepartments();
      setSuccessMessage('Department deleted successfully!');
    } catch (error) {
      console.error('Failed to delete department:', error);
      setError('Failed to delete department. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentDepartment({ name: '' });
    setError('');
    setSuccessMessage('');
  };

  return (
    <div>
      <h3>Manage Departments</h3>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {successMessage && <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>{successMessage}</Alert>}

      <Button
        onClick={() => {
          setShowModal(true);
          setIsEditing(false);
        }}
        className="mb-3"
      >
        Add Department
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department._id}>
              <td>{department.name}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => {
                    setCurrentDepartment(department);
                    setShowModal(true);
                    setIsEditing(true);
                  }}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(department._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Department' : 'Add Department'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                value={currentDepartment.name}
                onChange={(e) =>
                  setCurrentDepartment({ ...currentDepartment, name: e.target.value })
                }
                placeholder="Enter department name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageDepartments;
