import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Use this to navigate programmatically
import api from '../../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate between routes

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, userType } = response.data;

      // Store token and userType (role) in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userType', userType);

      // Redirect based on userType (role)
      if (userType === 'admin') {
        navigate('/admin');  // Redirect to Admin Dashboard
      } else {
        navigate('/dashboard');  // Redirect to User Dashboard
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');  // Redirect to the Sign Up page
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h3 className="text-center">Login</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
          
          {/* Sign Up Button */}
          <Button 
            variant="link" 
            className="w-100 mt-3" 
            onClick={handleSignUpRedirect}
          >
            Don't have an account? Sign Up
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
