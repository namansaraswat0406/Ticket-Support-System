import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className="mt-5 text-center">
      <Row>
        <Col>
          <h1>404</h1>
          <p>Page Not Found</p>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
