import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from '../../utils/api';

const TicketForm = ({ onTicketAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [department, setDepartment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTicket = { title, description, priority, department };
      const response = await api.post('/tickets', newTicket); // POST /tickets
      onTicketAdded(response.data);
    } catch (err) {
      console.error('Failed to add ticket:', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPriority">
        <Form.Label>Priority</Form.Label>
        <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDepartment">
        <Form.Label>Department</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Ticket
      </Button>
    </Form>
  );
};

export default TicketForm;
