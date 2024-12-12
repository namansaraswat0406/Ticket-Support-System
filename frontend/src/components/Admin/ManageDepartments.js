import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState({ name: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('/api/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await axios.put(`/api/departments/${currentDepartment._id}`, currentDepartment);
      } else {
        await axios.post('/api/departments', currentDepartment);
      }
      fetchDepartments();
      setShowModal(false);
    } catch (error) {
      console.error('Failed to save department:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/departments/${id}`);
      fetchDepartments();
    } catch (error) {
      console.error('Failed to delete department:', error);
    }
  };

  return (
    <div>
      <h3>Manage Departments</h3>
      <Button onClick={() => { setShowModal(true); setIsEditing(false); }}>Add Department</Button>
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
                <Button variant="warning" onClick={() => { setCurrentDepartment(department); setShowModal(true); setIsEditing(true); }}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(department._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Department' : 'Add Department'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentDepartment.name}
                onChange={(e) => setCurrentDepartment({ ...currentDepartment, name: e.target.value })}
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

export default ManageDepartments;
