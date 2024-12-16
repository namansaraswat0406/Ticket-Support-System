import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../../utils/api';

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const fetchDepartments = async () => {
    try {
      const response = await api.get('/departments'); // GET /departments
      setDepartments(response.data);
    } catch (err) {
      setError('Failed to load departments');
    }
  };

  const handleSaveDepartment = async () => {
    try {
      if (currentDepartment._id) {
        await api.put(`/departments/${currentDepartment._id}`, currentDepartment); // PUT /departments/:id
      } else {
        const response = await api.post('/departments', currentDepartment); // POST /departments
        setDepartments([...departments, response.data]);
      }
      setShowModal(false);
      setCurrentDepartment(null);
    } catch (err) {
      setError('Failed to save department');
    }
  };

  const handleDeleteDepartment = async (id) => {
    try {
      await api.delete(`/departments/${id}`); // DELETE /departments/:id
      setDepartments(departments.filter((dept) => dept._id !== id));
    } catch (err) {
      setError('Failed to delete department');
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div>
      <h3>Manage Departments</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button className="mb-3" onClick={() => setShowModal(true)}>Add Department</Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept, index) => (
            <tr key={dept._id}>
              <td>{index + 1}</td>
              <td>{dept.name}</td>
              <td>{dept.description}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => {
                    setCurrentDepartment(dept);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDeleteDepartment(dept._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Adding/Editing Departments */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentDepartment?._id ? 'Edit Department' : 'Add Department'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDepartmentName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentDepartment?.name || ''}
                onChange={(e) => setCurrentDepartment({ ...currentDepartment, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDepartmentDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentDepartment?.description || ''}
                onChange={(e) =>
                  setCurrentDepartment({ ...currentDepartment, description: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveDepartment}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageDepartments;
