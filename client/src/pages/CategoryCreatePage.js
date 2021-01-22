import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { createCategory } from '../redux/action/categoryActions';

const CategoryCreatePage = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const { error, success, loading } = useSelector(
    state => state.categoryCreate
  );

  useEffect(() => {
    if (success) {
      history.push('/admin/categorylist');
    }
  }, [success]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(createCategory(name));
  };

  return (
    <React.Fragment>
      <Link className="btn btn-outline-dark my-3" to="/admin/categorylist">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Category</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="categoryName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category Name"
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="btn-block">
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </React.Fragment>
  );
};

export default CategoryCreatePage;
