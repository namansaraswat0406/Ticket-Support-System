# Ticket Management System

This is a full-stack web application for managing tickets with user and admin roles. Users can create and view their tickets, while admins can manage all tickets, departments, statuses, and rules.

---

## Features

### User Functionality:
- Create tickets with title, description, status, priority, and department.
- View and manage tickets created by the user.

### Admin Functionality:
- View all tickets from all users.
- Update ticket details such as status, department, or priority.
- Delete tickets.
- Manage departments, statuses, and rules.

---

## Tech Stack

- **Frontend**: React, React Router, Axios, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Token (JWT)

---

## Prerequisites

Ensure you have the following installed on your system:

1. Node.js (v14 or above)
2. MongoDB (running locally or accessible remotely)

---

## Getting Started

### 1. Clone the Repository
```bash
$ git clone https://github.com/<your-username>/ticket-management-system.git
$ cd ticket-management-system
```

### 2. Install Dependencies
#### Backend:
```bash
$ cd backend
$ npm install
```
#### Frontend:
```bash
$ cd frontend
$ npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `backend` folder and add the following:
```env
PORT=5000
MONGO_URI=mongodb+srv://namansaraswat0406:namanisapalindrome@support-ticket.6nkyl.mongodb.net/?retryWrites=true&w=majority&appName=support-ticket
JWT_SECRET=your_secret_key

```

### 4. Run the Application
#### Backend:
```bash
$ cd backend
$ npm run dev
```
#### Frontend:
```bash
$ cd frontend
$ npm start
```
#### User Credentials:
```
Email: user@user
Password: user@user
```
#### Admin Credentials:
```
Email: user@admin
Password: user@admin
```

The backend will run on `http://localhost:5000` and the frontend on `http://localhost:3000`.

---

## API Endpoints

### Authentication
- `POST /api/auth/signup`: User registration
- `POST /api/auth/login`: User login

### Tickets
- `GET /api/tickets`: Fetch tickets (admin or user-specific)
- `POST /api/tickets`: Create a ticket (user only)
- `PUT /api/tickets/:id`: Update a ticket (admin only)
- `DELETE /api/tickets/:id`: Delete a ticket (admin only)

### Departments
- `GET /api/departments`: Fetch all departments
- `POST /api/departments`: Create a department (admin only)
- `PUT /api/departments/:id`: Update a department (admin only)
- `DELETE /api/departments/:id`: Delete a department (admin only)

### Statuses
- `GET /api/statuses`: Fetch all statuses
- `POST /api/statuses`: Create a status (admin only)
- `PUT /api/statuses/:id`: Update a status (admin only)
- `DELETE /api/statuses/:id`: Delete a status (admin only)

### Rules
- `GET /api/rules`: Fetch all rules
- `POST /api/rules`: Create a rule (admin only)
- `PUT /api/rules/:id`: Update a rule (admin only)
- `DELETE /api/rules/:id`: Delete a rule (admin only)

---

## Folder Structure
```
project-root
├── backend
│   ├── config
│   │   └── db.js              # MongoDB connection
│   ├── controllers
│   │   ├── authController.js  # Authentication logic
│   │   ├── ticketController.js # Ticket CRUD logic
│   │   ├── departmentController.js
│   │   ├── statusController.js
│   │   └── ruleController.js
│   ├── middleware
│   │   ├── auth.js            # JWT verification
│   │   └── error.js           # Error handling
│   ├── models
│   │   ├── Ticket.js          # Ticket schema
│   │   ├── User.js            # User schema
│   │   ├── Department.js      # Department schema
│   │   ├── Status.js          # Status schema
│   │   └── Rule.js            # Rule schema
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── ticketRoutes.js
│   │   ├── departmentRoutes.js
│   │   ├── statusRoutes.js
│   │   └── ruleRoutes.js
│   ├── server.js              # Main entry point for the backend
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   │   ├── Auth
│   │   │   │   ├── Login.js
│   │   │   │   └── SignUp.js
│   │   │   ├── Layout
│   │   │   │   ├── Navbar.js
│   │   │   │   └── Footer.js
│   │   │   └── Tickets
│   │   │       ├── TicketList.js
│   │   │       └── TicketForm.js
│   │   ├── pages
│   │   │   ├── Dashboard.js
│   │   │   ├── AdminPanel.js
│   │   │   └── NotFound.js
│   │   └── App.js             # Main React entry point
```

---

## Troubleshooting

1. **Error: MongoDB not connecting**
   - Ensure MongoDB is running locally or the `MONGO_URI` in `.env` is correct.

2. **Frontend not loading properly**
   - Ensure the backend is running and accessible at `http://localhost:5000`.

3. **403 Forbidden Errors**
   - Ensure JWT tokens are being passed in the `Authorization` header for protected routes.

---
## Issue I am Facing in login
** its when i login i have to refresh the page and then put the credentials again then signin app got sign in
---
