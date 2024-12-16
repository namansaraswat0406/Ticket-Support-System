import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Login from './components/Auth/Login';
import NotFound from './pages/NotFound';
import SignUp from './components/Auth/SignUp';


const App = () => {
  const [userRole, setUserRole] = useState(null);  // To store user role from localStorage

  useEffect(() => {
    // Get the user type (role) from localStorage
    const role = localStorage.getItem('userType');
    setUserRole(role);  // Set user role (user or admin)
  }, []);

  // Redirect user based on their role
  const ProtectedRoute = ({ element, roleRequired }) => {
    if (!localStorage.getItem('authToken')) {
      return <Navigate to="/login" />;  // Redirect to login if no token
    }

    if (roleRequired && userRole !== roleRequired) {
      return <Navigate to="/" />;  // Redirect to Dashboard or Home if roles don't match
    }

    return element;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      

        {/* Protected Routes - User */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} roleRequired="user" />} />

        {/* Protected Routes - Admin */}
        <Route path="/admin/*" element={<ProtectedRoute element={<AdminPanel />} roleRequired="admin" />} />

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
