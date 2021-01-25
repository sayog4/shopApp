import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import Product from '../components/Product';
import Loader from '../components/Loader';

import Message from '../components/Message';
import CategorySideBar from '../components/CategorySideBar';

import { listProducts } from '../redux/action/productAction';

const ShopPage = () => {
  const dispatch = useDispatch();

  const { error, loading, products } = useSelector(state => state.productList);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default ShopPage;
