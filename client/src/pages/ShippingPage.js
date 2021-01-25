import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

import { saveShippingAddress } from '../redux/action/cartAction';

const ShippingPage = ({ history }) => {
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector(state => state.cart);

  const [values, setValues] = useState({
    address: shippingAddress.address || '',
    city: shippingAddress.city || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || ''
  });
  const { address, city, postalCode, country } = values;

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/placeorder');
  };
  const changeHandler = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={changeHandler}
            required
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={changeHandler}
            required
          />
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="postalCode"
            type="number"
            placeholder="Enter PostalCode"
            value={postalCode}
            onChange={changeHandler}
            required
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            name="country"
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={changeHandler}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="btn-block">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
