import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Loader from './Loader';
import Message from './Message';

import { listTopProducts } from '../redux/action/productAction';

const TopRated = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    state => state.productTopRated
  );

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map(p => (
        <Carousel.Item key={p._id}>
          <Link to={`/product/${p._id}`}>
            <Image src={p.image} alt={p.name} fluid="true" />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {p.name} $ {p.price}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TopRated;
