import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../redux/action/userActions';

const ProfilePage = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    message: ''
  });
  const { name, email, password, confirmPassword, message } = values;
  const dispatch = useDispatch();

  const { loading, user, error } = useSelector(state => state.userDetails);

  const {
    loading: UpdateProfileLoading,
    success: updateProfileSuccess
  } = useSelector(state => state.userUpdateProfile);

  useEffect(() => {
    if (!user.name) {
      dispatch(getUserDetails('profile'));
    } else {
      setValues({
        ...values,
        name: user.name,
        email: user.email
      });
    }
  }, [dispatch, user]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setValues({
        ...values,
        message: 'Password do not match'
      });
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      setValues({
        password: '',
        confirmPassword: ''
      });
    }
  };
  const changeHandler = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };
  return (
    <Row>
      <Col md={3} lg={4}>
        <h2>My Profile</h2>
        {error && <Message>{error}</Message>}
        {message && <Message>{message}</Message>}
        {updateProfileSuccess && (
          <Message variant="success">Your profile is updated</Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              name="name"
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Your Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Your Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Your Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={changeHandler}
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
      </Col>
      <Col md={9} lg={8}>
        <h2>My Orders</h2>
        <p className="lead">Order history will be listed</p>
      </Col>
    </Row>
  );
};

export default ProfilePage;
