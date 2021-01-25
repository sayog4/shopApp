import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import LoaderSmall from '../components/LoaderSmall';

import {
  singleCategory,
  updateCategory
} from '../redux/action/categoryActions';
import CATEGORY_CONSTANT from '../redux/constant/categoryConstants';

const CategoryEditPage = ({ match, history }) => {
  const categoryId = match.params.id;
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [imgError, setImgError] = useState('');
  const [uploading, setUploading] = useState(false);

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
        setImage(category.image);
      }
    }
  }, [categoryId, dispatch, category, success, history]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateCategory(categoryId, name, image));
  };

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setUploading(false);
      setImage(data);
    } catch (error) {
      setImgError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response
      );
      setUploading(false);
    }
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
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                name="image"
                placeholder="Enter Image URL"
                value={image}
                onChange={e => setImage(e.target.value)}
              ></Form.Control>
              {uploading ? (
                <LoaderSmall />
              ) : (
                <Form.File
                  id="image-file"
                  label="Choose File"
                  onChange={uploadFileHandler}
                ></Form.File>
              )}
              {imgError && <Message>{imgError}</Message>}
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
