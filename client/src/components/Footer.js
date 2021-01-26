import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container fluid className="bg-dark text-light">
        <Row>
          <Col className="text-center py-4">Copyright &copy; ShopApp</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
