import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CategorySideBar from '../components/CategorySideBar';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';

import { productsByCategory } from '../redux/action/categoryActions';
import { Col, Row } from 'react-bootstrap';

const CategoryPage = ({ match }) => {
  const dispatch = useDispatch();
  const categoryId = match.params.id;
  const { error, loading, products } = useSelector(
    state => state.categoryFetchProducts
  );

  useEffect(() => {
    dispatch(productsByCategory(categoryId));
  }, [categoryId, dispatch]);
  return (
    <Row>
      <Col md={3}>
        <CategorySideBar />
      </Col>
      <Col md={9}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Row>
            {products.map(product => (
              <Product key={product._id} product={product} />
            ))}
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default CategoryPage;
