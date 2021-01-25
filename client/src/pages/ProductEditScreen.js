import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

import {
  listProductDetails,
  updateProduct
} from '../redux/action/productAction';
import { listCategory } from '../redux/action/categoryActions';
import LoaderSmall from '../components/LoaderSmall';
import PRODUCT_CONSTANT from '../redux/constant/productConstants';

const ProductEditScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;

  const { product, error, loading } = useSelector(
    state => state.productDetails
  );

  const {
    category: categoryList,
    loading: categoryLoading,
    error: categoryError
  } = useSelector(state => state.categoryList);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = useSelector(state => state.productUpdate);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [imgError, setImgError] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_CONSTANT.PRODUCT_DETAILS_RESET });
      dispatch({ type: PRODUCT_CONSTANT.PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!categoryList || !product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
        dispatch(listCategory());
      } else {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCountInStock(product.countInStock);
        setCategory(product.category);
        setImage(product.image);
        setBrand(product.brand);
        setCategories(categoryList);
      }
    }
  }, [dispatch, product, productId, categoryList, history, successUpdate]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
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
      <Link className="btn btn-outline-dark" to="/admin/productlist">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <LoaderSmall />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter Price"
                value={price}
                onChange={e => setPrice(e.target.value)}
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
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                placeholder="Enter BrandL"
                value={brand}
                onChange={e => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                name="countInStock"
                placeholder="Enter Count in stock"
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
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
                  onChange={e => setCategory(e.target.value)}
                >
                  {categories &&
                    categories.map(c => (
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
                onChange={e => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button className="btn-block" variant="primary" type="submit">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </React.Fragment>
  );
};

export default ProductEditScreen;
