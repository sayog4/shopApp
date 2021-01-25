import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className="my-3 rounded">
      <Row>
        <Col md={5}>
          <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant="top" />
          </Link>
        </Col>
        <Col md={7}>
          <Card.Body className="align-items-center">
            <Link to={`/product/${product._id}`}>
              <Card.Title>
                <strong>{product.name}</strong>
              </Card.Title>
            </Link>
            <Card.Text as="div">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </Card.Text>
            <Card.Text as="h4">${product.price}</Card.Text>
            <p className="lead mt-3">
              {product.description.substring(0, 200)}. . .
            </p>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default Product;
