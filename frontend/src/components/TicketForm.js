import React, { useState } from 'react';
import axios from '../services/api';

function TicketForm() {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    priority: 'Low',
    department: '',
    tags: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/tickets', ticket);
      alert('Ticket created successfully!');
    } catch (error) {
      alert('Error creating ticket!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Ticket</h2>
      <input
        type="text"
        placeholder="Title"
        value={ticket.title}
        onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={ticket.description}
        onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
        required
      ></textarea>
      <select
        value={ticket.priority}
        onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Critical</option>
      </select>
      <input
        type="text"
        placeholder="Department"
        value={ticket.department}
        onChange={(e) => setTicket({ ...ticket, department: e.target.value })}
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={ticket.tags}
        onChange={(e) => setTicket({ ...ticket, tags: e.target.value.split(',') })}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TicketForm;
