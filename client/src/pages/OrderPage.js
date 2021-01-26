import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import moment from 'moment';

import Loader from '../components/Loader';
import Message from '../components/Message';
import LoaderSmall from '../components/LoaderSmall';

import {
  getOrderDetails,
  payOrder,
  deliverOrder
} from '../redux/action/orderAction';

import ORDER_CONSTANT from '../redux/constant/orderConstant';

const OrderPage = ({ match }) => {
  const [sdkReady, setSdkReady] = useState(false);

  const orderId = match.params.id;
  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.userLogin);

  const { error, loading, order } = useSelector(state => state.orderDetails);

  const { loading: loadingPay, success: successPay } = useSelector(
    state => state.orderPay
  );

  const { loading: loadingDeliver, success: successDeliver } = useSelector(
    state => state.orderDeliver
  );

  if (!loading) {
    const addDecimals = num => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(`/api/config/paypal`);
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_CONSTANT.ORDER_PAY_RESET });
      dispatch({ type: ORDER_CONSTANT.ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver]);

  const successPaymentHandler = paymentResult => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(orderId));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <React.Fragment>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <strong>Address: </strong>
              <p className="lead">
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode}{' '}
                {order.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {moment(order.deliveredAt).fromNow()}
                </Message>
              ) : (
                <Message>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {moment(order.paidAt).fromNow()}
                </Message>
              ) : (
                <Message>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, i) => (
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
                  <Col>$ {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <LoaderSmall />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="btn"
                      className="btn-block"
                      onClick={deliverHandler}
                      disabled={loadingDeliver}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default OrderPage;
