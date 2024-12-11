const express = require('express');
const router = express.Router();
const {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');
const authMiddleware = require('../middleware/auth');

// Routes for tickets
router.route('/')
  .get(authMiddleware, getTickets)   // Admin or user view their tickets
  .post(authMiddleware, createTicket); // User create ticket

router.route('/:id')
  .put(authMiddleware, updateTicket)  // Admin or user update ticket
  .delete(authMiddleware, deleteTicket); // Admin delete ticket

module.exports = router;
