import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';

import {
  singleCategory,
  updateCategory
} from '../redux/action/categoryActions';
import CATEGORY_CONSTANT from '../redux/constant/categoryConstants';

const CategoryEditPage = ({ match, history }) => {
  const categoryId = match.params.id;
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const { error, loading, category } = useSelector(
    state => state.categorySingle
  );

  const { error: errorUpdate, loading: loadingUpdate, success } = useSelector(
    state => state.categoryUpdate
  );

  useEffect(() => {
    if (success) {
      dispatch({ type: CATEGORY_CONSTANT.CATEGORY_UPDATE_RESET });
      history.push('/admin/categorylist');
    } else {
      if (!category.name || category._id !== categoryId) {
        dispatch(singleCategory(categoryId));
      } else {
        setName(category.name);
      }
    }
  }, [categoryId, dispatch, category, success]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateCategory(categoryId, name));
  };

  return (
    <React.Fragment>
      <Link className="btn btn-outline-dark my-3" to="/admin/categorylist">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Category</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message>{errorUpdate}</Message>}
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
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </React.Fragment>
  );
};

export default CategoryEditPage;
