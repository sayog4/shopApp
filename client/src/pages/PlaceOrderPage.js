import React, { useEffect } from 'react';
import { Row, Col, Button, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import LoaderSmall from '../components/LoaderSmall';

import { createOrder } from '../redux/action/orderAction';

const PlaceOrderPage = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { shippingAddress, cartItems } = cart;

  const { success, error, loading, order } = useSelector(
    state => state.orderCreate
  );

  if (!shippingAddress) {
    history.pushState('/shipping');
  }

  const addDecimal = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimal(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimal(cart.itemsPrice > 1000 ? 10 : 20);

  cart.taxPrice = addDecimal(Number((0.15 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = addDecimal(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  );

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [dispatch, history, success]); // eslint-disable-line

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      })
    );
  };
  return (
    <React.Fragment>
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong>Address: </strong>
              <p className="lead">
                {shippingAddress.address}, {shippingAddress.city}{' '}
                {shippingAddress.postalCode} {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Paymet Method</h2>
              <strong>Method: </strong>
              <p className="lead">PayPal / Credit Card</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, i) => (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items Price</Col>
                  <Col>$ {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                {loading ? (
                  <LoaderSmall />
                ) : (
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PlaceOrderPage;
