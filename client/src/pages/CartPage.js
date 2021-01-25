import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap';

import Message from '../components/Message';

import { addToCart, removeFromCart } from '../redux/action/cartAction';

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const { cartItems } = useSelector(state => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    history.push(`/login?redirect=shipping`);
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Cart Items</h1>
        {cartItems.length === 0 ? (
          <Message varaint="warning">Your cart is empty</Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} fluid alt={item.name} rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/item.product`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={e =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1}>{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>
              Sub total: ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              items
            </h2>
            <strong>
              ${' '}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </strong>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={checkOutHandler}
            >
              CheckOut
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default CartPage;
