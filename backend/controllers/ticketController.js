const Ticket = require('../models/Ticket');

// Get all tickets (Admin only)
exports.getTickets = async (req, res) => {
  try {
    let tickets;
    if (req.userType === 'admin') {
      // Admin can view all tickets
      tickets = await Ticket.find();
    } else {
      // Users can only view their own tickets
      tickets = await Ticket.find({ user: req.user });
    }

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Create a new ticket (Users only)
exports.createTicket = async (req, res) => {
  try {
    if (req.user.userType !== 'user') {
      return res.status(403).json({ message: 'Only users can create tickets' });
    }

    const { title, description, status, priority, department } = req.body;

    const newTicket = new Ticket({
      title,
      description,
      status,
      priority,
      department,
      user: req.user._id, // Associate ticket with the logged-in user
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create ticket', error: error.message });
  }
};

// Update a ticket (Admin or ticket owner)
exports.updateTicket = async (req, res) => {
  try {
    const { status, department, priority } = req.body; // Destructure the body

    // Validate the data
    if (!status || !department || !priority) {
      return res.status(400).json({ message: 'Status, department, and priority are required' });
    }

    // Update the ticket
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id, 
      { status, department, priority }, 
      { new: true } // Return the updated ticket
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json(updatedTicket); // Respond with the updated ticket
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a ticket (Admin only)
exports.deleteTicket = async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete tickets' });
    }

    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Create a new ticket (Users only)
exports.createTicket = async (req, res) => {
  try {
    if (req.userType !== 'user') {
      return res.status(403).json({ message: 'Only users can create tickets' });
    }

    const { title, description, priority, department } = req.body;

    const newTicket = new Ticket({
      title,
      description,
      priority,
      department,
      user: req.user, // Attach the logged-in user
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket); // Return the created ticket
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error });
  }
};
// Update a ticket (Admin only can update status or department)
exports.updateTicket = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.userType !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update tickets' });
    }

    const { status, department } = req.body;

    // Find and update the ticket based on ticket ID
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id, // Ticket ID from URL parameter
      { status, department }, // Update status and department
      { new: true } // Return the updated ticket
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json(updatedTicket); // Return the updated ticket details
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update ticket' });
  }
};
// Delete a ticket (Admin only)
exports.deleteTicket = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.userType !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete tickets' });
    }

    // Find and delete the ticket by ID
    const ticket = await Ticket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete ticket' });
  }
};
