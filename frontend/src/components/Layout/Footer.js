import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8f9fa', position:'absolute', bottom:'0', width:'100%' }}>
      <Container>
        <Row>
          <Col className="text-center">
            <p>© 2024 Ticket System. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
