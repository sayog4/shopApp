import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

import Message from './Message';
import LoaderSmall from './LoaderSmall';

import { listCategory } from '../redux/action/categoryActions';

const CategorySideBar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  const { error, loading, category } = useSelector(state => state.categoryList);
  return (
    <React.Fragment>
      <h3 className="p-3">Categories</h3>
      {loading ? (
        <LoaderSmall />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <ListGroup variant="flush">
          {category.map(c => (
            <ListGroup.Item key={c._id}>
              <Link to={`/shop/category/${c._id}`}>
                <strong>{c.name}</strong>
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </React.Fragment>
  );
};

export default CategorySideBar;
