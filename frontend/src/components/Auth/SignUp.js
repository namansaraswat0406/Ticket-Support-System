import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const SignUp = () => {
  const [formData, setFormData] = useState({ email: '', password: '', userType: 'user' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => navigate('/'), 2000); // Redirect to login page after success
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Sign Up</h2>
      {success && <Alert variant="success">Sign Up Successful! Redirecting to login...</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* <Form.Group controlId="userType" className="mt-3">
          <Form.Label>User Type</Form.Label>
          <Form.Select name="userType" value={formData.userType} onChange={handleChange} required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group> */}

        <Button variant="primary" type="submit" className="mt-4">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
