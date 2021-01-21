import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { register } from '../redux/action/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const RegisterPage = ({ history, location }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    message: ''
  });
  const { name, email, password, confirmPassword, message } = values;
  const dispatch = useDispatch();

  const { userInfo, error, loading } = useSelector(state => state.userRegister);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setValues({
        ...values,
        message: 'Password do not match'
      });
    } else {
      dispatch(register(name, email, password));
    }
  };
  const changeHandler = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };
  return (
    <FormContainer>
      <h1>Register here for new user</h1>
      {error && <Message>{error}</Message>}
      {message && <Message>{message}</Message>}
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
          disabled={loading}
        >
          Register
        </Button>
      </Form>
    </FormContainer>
  );
};

export default RegisterPage;
