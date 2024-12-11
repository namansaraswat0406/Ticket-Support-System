import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');  // Remove the token from localStorage
    localStorage.removeItem('userType');   // Optionally remove user type from localStorage
    navigate('/');  // Redirect to login page
  };

  const isLoggedIn = localStorage.getItem('authToken');  // Check if the user is logged in

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Ticket System</Navbar.Brand>
      <Nav className="ml-auto">
        {isLoggedIn && (
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
