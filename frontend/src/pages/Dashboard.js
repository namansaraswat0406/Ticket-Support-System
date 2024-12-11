import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert } from 'react-bootstrap';
import api from '../utils/api'; // Axios instance

const Dashboard = () => {
  const [tickets, setTickets] = useState([]); // State for tickets
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to fetch tickets for the logged-in user
  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('authToken');
      console.log('Token:', token); // Debugging the token to ensure it exists

      if (!token) {
        setError('You are not logged in. Please log in to access the tickets.');
        return;
      }

      const response = await api.get('/tickets', {
        headers: { Authorization: `Bearer ${token}` }, // Ensure the token is sent in the header
      });

      setTickets(response.data); // Successfully fetched tickets
    } catch (err) {
      setError('Failed to load tickets');
      console.error('Error Response:', err.response?.data); // Log backend error response
    }
  };

  // Handle ticket creation
  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('You are not logged in. Please log in to create a ticket.');
        return;
      }

      await api.post(
        '/tickets',
        { title, description, priority, department },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess('Ticket created successfully!');
      setTitle('');
      setDescription('');
      setPriority('Low');
      setDepartment('');
      setShowModal(false);
      fetchTickets(); // Refresh ticket list
    } catch (err) {
      setError('Failed to create ticket');
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h3>Welcome to the Dashboard</h3>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Card className="mt-3">
            <Card.Body>
              <Button variant="success" onClick={() => setShowModal(true)}>
                Create New Ticket
              </Button>
            </Card.Body>
          </Card>

          {/* Tickets Table */}
          <Card className="mt-3">
            <Card.Body>
              <h5>Your Tickets</h5>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.length === 0 ? (
                    <tr><td colSpan="7">No tickets available</td></tr>
                  ) : (
                    tickets.map((ticket, index) => (
                      <tr key={ticket._id}>
                        <td>{index + 1}</td>
                        <td>{ticket.title}</td>
                        <td>{ticket.description}</td>
                        <td>{ticket.priority}</td>
                        <td>{ticket.department}</td>
                        <td>{ticket.status}</td>
                        <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Creating Ticket */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleCreateTicket}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Ticket Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ticket title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter ticket description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPriority">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Create Ticket
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Dashboard;
