import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';  // Assuming you have set up Axios instance

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // To handle loading state
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);  // Show loading state

    try {
      // Make POST request to sign up the user
      const response = await api.post('/auth/signup', { email, password });
      const { token, userType } = response.data;

      // Store token and userType (role)
      localStorage.setItem('authToken', token);
      localStorage.setItem('userType', userType);

      // Redirect to the appropriate dashboard based on userType (role)
      if (userType === 'admin') {
        navigate('/admin');  // Redirect to Admin Dashboard
      } else {
        navigate('/dashboard');  // Redirect to User Dashboard
      }
    } catch (err) {
      setLoading(false);  // Stop loading state
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);  // Display error message from server
      } else {
        setError('An error occurred. Please try again.');  // Generic error message
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h3 className="text-center">Sign Up</h3>
          {error && <Alert variant="danger">{error}</Alert>}  {/* Show error message if any */}
          <Form onSubmit={handleSignUp}>
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
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
