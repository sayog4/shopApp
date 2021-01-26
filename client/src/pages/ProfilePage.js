import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../redux/action/userActions';
import { listMyOrders } from '../redux/action/orderAction';

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { loading, user, error } = useSelector(state => state.userDetails);

  const {
    loading: UpdateProfileLoading,
    success: updateProfileSuccess
  } = useSelector(state => state.userUpdateProfile);

  const { loading: loadingOrders, error: errorOrders, orders } = useSelector(
    state => state.orderListMy
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!user.name) {
      dispatch(getUserDetails('profile'));
      dispatch(listMyOrders());
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password
        })
      );
    }
  };

  return (
    <Row>
      <Col md={3} lg={4}>
        <h2>My Profile</h2>
        {message && <Message>{message}</Message>}
        {updateProfileSuccess && (
          <Message variant="success">Your profile is updated</Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Your Email Address</Form.Label>
              <Form.Control
                type="email"
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter Email"
                value={email}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Your Password</Form.Label>
              <Form.Control
                type="password"
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Password"
                value={password}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Your Password</Form.Label>
              <Form.Control
                type="password"
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                value={confirmPassword}
              />
            </Form.Group>
            <Button
              className="btn-block"
              type="submit"
              variant="primary"
              disabled={UpdateProfileLoading}
            >
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9} lg={8} className="text-center">
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message>{errorOrders}</Message>
        ) : (
          <Table stripped="true" bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{moment(order.createdAt).fromNow()}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      moment(order.paidAt).fromNow()
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      moment(order.deliveredAt).fromNow()
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
