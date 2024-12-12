import React, { useEffect, useState } from 'react';
import axios from '../services/api';

function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await axios.get('/tickets');
      setTickets(response.data);
    };
    fetchTickets();
  }, []);

  return (
    <div>
      <h1>All Tickets</h1>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>
            <p>Priority: {ticket.priority}</p>
            <p>Status: {ticket.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
