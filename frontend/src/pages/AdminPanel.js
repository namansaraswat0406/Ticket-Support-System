import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import AdminDashboard from '../components/Admin/AdminDashboard';
import ManageTickets from '../components/Admin/ManageTickets';
import ManageDepartments from '../components/Admin/ManageDepartments';
import ManageStatuses from '../components/Admin/ManageStatuses';
import ManageRules from '../components/Admin/ManageRules';

const AdminPanel = () => {
  return (
    <Container fluid className="mt-4">
      <Row>
        {/* Sidebar Navigation */}
        <Col md={3} lg={2} className="bg-light p-4" >
          <h4>Admin Panel</h4>
          <Nav defaultActiveKey="/admin" className="flex-column">
            <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/admin/tickets">Manage Tickets</Nav.Link>
            <Nav.Link as={Link} to="/admin/departments">Manage Departments</Nav.Link>
            <Nav.Link as={Link} to="/admin/statuses">Manage Statuses</Nav.Link>
            <Nav.Link as={Link} to="/admin/rules">Manage Rules</Nav.Link>
          </Nav>
        </Col>

        {/* Content Area */}
        <Col md={9} lg={10}>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="tickets" element={<ManageTickets />} />
            <Route path="departments" element={<ManageDepartments />} />
            <Route path="statuses" element={<ManageStatuses />} />
            <Route path="rules" element={<ManageRules />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;
