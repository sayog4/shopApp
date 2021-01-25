import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CategorySideBar from '../components/CategorySideBar';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import Paginate from '../components/Paginate';

import { productsByCategory } from '../redux/action/categoryActions';
import { Col, Row } from 'react-bootstrap';

const CategoryPage = ({ match }) => {
  const dispatch = useDispatch();
  const categoryId = match.params.id;
  const pageNumber = match.params.pageNumber || 1;
  const { error, loading, products, pages, page } = useSelector(
    state => state.categoryFetchProducts
  );

  useEffect(() => {
    dispatch(productsByCategory(categoryId, pageNumber));
  }, [categoryId, dispatch, pageNumber]);
  console.log(page, pages);
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
          <React.Fragment>
            <Row>
              {products.map(product => (
                <Product key={product._id} product={product} />
              ))}
            </Row>
            <Paginate
              page={page}
              pages={pages}
              category={true}
              id={categoryId}
            />
          </React.Fragment>
        )}
      </Col>
    </Row>
  );
};

export default CategoryPage;
