import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert } from 'react-bootstrap';
import api from '../../utils/api'; // Axios instance
import { useNavigate } from 'react-router-dom'; // For navigating between pages

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]); // State for tickets
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [status, setStatus] = useState('');
  const [department, setDepartment] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all tickets for admin
  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('You are not logged in. Please log in to access the tickets.');
        return;
      }

      const response = await api.get('/tickets', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTickets(response.data);
    } catch (err) {
      setError('Failed to load tickets');
      console.error('Error Response:', err.response?.data);
    }
  };

  // Handle ticket status update
  const handleUpdateTicket = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('You are not logged in. Please log in to update the ticket.');
        return;
      }

      await api.put(
        `/tickets/${ticketId}`,
        { status, department },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess('Ticket updated successfully!');
      setStatus('');
      setDepartment('');
      setTicketId('');
      setShowModal(false);
      fetchTickets(); // Refresh ticket list
    } catch (err) {
      setError('Failed to update ticket');
    }
  };

  // Open the modal and set the current ticket values
  const handleOpenModal = (ticket) => {
    setTicketId(ticket._id); // Set ticket ID for update
    setStatus(ticket.status); // Set current status
    setDepartment(ticket.department); // Set current department
    setShowModal(true); // Show the modal
  };

  // Navigate to the rules management page
  const handleManageRules = () => {
    navigate('/admin/manage-rules'); // Navigate to the manage rules page
  };

  useEffect(() => {
    fetchTickets(); // Fetch all tickets when component loads
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h3>Admin Dashboard</h3>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Card className="mt-3">
            <Card.Body>
              <h5>Manage Tickets</h5>
              {/* <Button variant="info" onClick={handleManageRules} className="mb-3">
                Manage Rules
              </Button> */}
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Actions</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.length === 0 ? (
                    <tr><td colSpan="8">No tickets available</td></tr>
                  ) : (
                    tickets.map((ticket, index) => (
                      <tr key={ticket._id}>
                        <td>{index + 1}</td>
                        <td>{ticket.title}</td>
                        <td>{ticket.description}</td>
                        <td>{ticket.priority}</td>
                        <td>{ticket.department}</td>
                        <td>{ticket.status}</td>
                        <td>
                          <Button variant="warning" onClick={() => handleOpenModal(ticket)}>Update</Button>
                        </td>
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

      {/* Modal for Updating Ticket */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleUpdateTicket}>
            <Form.Group className="mb-3" controlId="formBasicStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Update Ticket
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
