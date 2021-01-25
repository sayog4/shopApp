import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import LoaderSmall from '../components/LoaderSmall';

import { createCategory } from '../redux/action/categoryActions';
import CATEGORY_CONSTANT from '../redux/constant/categoryConstants';

const CategoryCreatePage = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [imgError, setImgError] = useState('');
  const [uploading, setUploading] = useState(false);

  const { error, success, loading } = useSelector(
    state => state.categoryCreate
  );

  useEffect(() => {
    if (success) {
      history.push('/admin/categorylist');
      dispatch({ type: CATEGORY_CONSTANT.CATEGORY_CREATE_RESET });
    }
  }, [success, history, dispatch]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(createCategory(name, image));
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
            <Form.Group controlId="image">
              <p className="lead">This image will be shown in home page.</p>
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
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </React.Fragment>
  );
};

export default CategoryCreatePage;
