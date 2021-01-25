import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Product from '../components/Product';
import Loader from '../components/Loader';

import Message from '../components/Message';
import CategorySideBar from '../components/CategorySideBar';
import Search from '../components/Search';
import Paginate from '../components/Paginate';

import { listProducts } from '../redux/action/productAction';

const ShopPage = ({ match }) => {
  const dispatch = useDispatch();

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const { error, loading, products, pages, page } = useSelector(
    state => state.productList
  );

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <React.Fragment>
      <Row>
        <Col md={3}>
          <Route render={({ history }) => <Search history={history} />} />
          <CategorySideBar />
        </Col>
        <Col md={9}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error}</Message>
          ) : (
            <React.Fragment>
              <Row>
                {products.map(product => (
                  <Product key={product._id} product={product} />
                ))}
              </Row>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              />
            </React.Fragment>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ShopPage;
