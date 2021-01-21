import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../redux/action/userActions';

const LoginPage = ({ location, history }) => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const { email, password } = values;
  const dispatch = useDispatch();

  const { userInfo, loading, error } = useSelector(state => state.userLogin);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  const changeHandler = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };
  return (
    <FormContainer>
      <h1>Log In</h1>

      {error && <Message>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" onSubmit={submitHandler}>
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

        <Button
          className="btn-block"
          type="submit"
          variant="primary"
          disabled={loading}
        >
          Log In
        </Button>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;
