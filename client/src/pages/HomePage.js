import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import TopRated from '../components/TopRated';
import Meta from '../components/Meta';
import Message from '../components/Message';

import { listCategory } from '../redux/action/categoryActions';
import { Figure, Row, Col } from 'react-bootstrap';

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  const { error, loading, category } = useSelector(state => state.categoryList);
  return (
    <React.Fragment>
      <Meta />
      <TopRated />
      {loading ? null : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <h1 className="my-5 text-center">View Differnt categories</h1>
          <Row>
            {category.map(c => (
              <Col md={6} key={c._id}>
                <Figure>
                  <Link to={`/shop/category/${c._id}`}>
                    <Figure.Image src={c.image} alt={c.name} />
                    <Figure.Caption as="h2">{c.name}</Figure.Caption>
                  </Link>
                </Figure>
              </Col>
            ))}
          </Row>
        </>
      )}
    </React.Fragment>
  );
};

export default HomePage;
