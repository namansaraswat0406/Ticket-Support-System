import React from 'react';
import { Card } from 'react-bootstrap';

const TicketDetails = ({ ticket }) => {
  if (!ticket) {
    return <p>Select a ticket to view details.</p>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{ticket.title}</Card.Title>
        <Card.Text>Status: {ticket.status}</Card.Text>
        <Card.Text>Priority: {ticket.priority}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TicketDetails;
