import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import LoaderSmall from '../components/LoaderSmall';
import Message from '../components/Message';
import { createProduct } from '../redux/action/productAction';
import { listCategory } from '../redux/action/categoryActions';
import axios from 'axios';
import PRODUCT_CONSTANT from '../redux/constant/productConstants';

const ProductCreatePage = ({ history }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    countInStock: 0,
    category: '',
    description: '',
    imgError: '',
    uploading: false
  });

  const {
    name,
    price,
    image,
    brand,
    countInStock,
    category,
    description,
    uploading,
    imgError
  } = values;

  const { success, error, loading } = useSelector(state => state.productCreate);

  const {
    category: categoriesList,
    loading: categoryLoading,
    error: categoryError
  } = useSelector(state => state.categoryList);

  useEffect(() => {
    if (success) {
      history.push('/admin/productlist');
      dispatch({ type: PRODUCT_CONSTANT.PRODUCT_CREATE_RESET });
    } else {
      dispatch(listCategory());
    }
  }, [dispatch, history, success]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        brand,
        category,
        description,
        countInStock,
        image
      })
    );
  };

  const changeHandler = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setValues({ ...values, uploading: true, imgError: '' });
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setValues({ ...values, image: data, uploading: false, imgError: '' });
    } catch (error) {
      setValues({
        ...values,
        uploading: false,
        imgError:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response
      });
    }
  };

  return (
    <React.Fragment>
      <Link className="btn btn-outline-dark" to="/admin/productlist">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Product</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                name="name"
                placeholder="Enter Name"
                value={name}
                onChange={changeHandler}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter Price"
                value={price}
                onChange={changeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                name="image"
                placeholder="Enter Image URL"
                value={image}
                onChange={changeHandler}
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
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                placeholder="Enter BrandL"
                value={brand}
                onChange={changeHandler}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                name="countInStock"
                placeholder="Enter Count in stock"
                value={countInStock}
                onChange={changeHandler}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              {categoryLoading ? (
                <LoaderSmall />
              ) : categoryError ? (
                <Message>{categoryError}</Message>
              ) : (
                <Form.Control
                  as="select"
                  value={category}
                  name="category"
                  onChange={changeHandler}
                >
                  <option value="">Select Category</option>
                  {categoriesList.map(c => (
                    <option value={c._id} key={c._id}>
                      {c.name}
                    </option>
                  ))}
                </Form.Control>
              )}
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter Description"
                value={description}
                onChange={changeHandler}
              ></Form.Control>
            </Form.Group>
            <Button className="btn-block" variant="primary" type="submit">
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </React.Fragment>
  );
};

export default ProductCreatePage;
