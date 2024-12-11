import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import api from '../../utils/api';  // Assuming axios instance is set up
import { useNavigate } from 'react-router-dom';  // To navigate if unauthenticated

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // To redirect to login page if unauthorized

  const fetchTickets = async () => {
    try {
      // Get the JWT token from localStorage
      const token = localStorage.getItem('authToken');

      if (!token) {
        // If there's no token, redirect to login page
        navigate('/login');
        return;
      }

      // Send the GET request with the token in the Authorization header
      const response = await api.get('/api/tickets', {
        headers: {
          Authorization: `Bearer ${token}`,  // Include the token in the header
        },
      });

      setTickets(response.data);
    } catch (err) {
      setError('Failed to load tickets');
      if (err.response && err.response.status === 401) {
        // Redirect to login if unauthorized
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div>
      <h3>Tickets</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={ticket._id}>
              <td>{index + 1}</td>
              <td>{ticket.title}</td>
              <td>{ticket.status}</td>
              <td>{ticket.priority}</td>
              <td>
                <Button variant="info" size="sm">View</Button>{' '}
                <Button variant="danger" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TicketList;
