import React, { useEffect } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listProducts, deleteProduct } from '../redux/action/productAction';

const ProductListPage = ({ match }) => {
  const dispatch = useDispatch();

  const pageNumber = match.params.pageNumber || 1;

  const { loading, error, products, pages, page } = useSelector(
    state => state.productList
  );

  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete
  } = useSelector(state => state.productDelete);

  useEffect(() => {
    dispatch(listProducts('', pageNumber));
  }, [dispatch, successDelete, pageNumber]);

  const deleteHandler = id => {
    if (window.confirm('You wanna delete?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <React.Fragment>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <LinkContainer to="/admin/product/create" className="my-2">
            <Button className="btn-primary">
              Create Product <i className="fas fa-plus"></i>
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {errorDelete && <Message>{errorDelete}</Message>}
      {loadingDelete && <Loader />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <React.Fragment>
          <Table striped="true" bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>AVAILABILITY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td>{p._id}</td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.category.name}</td>
                  <td>{p.brand}</td>
                  <td>{p.countInStock}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${p._id}/edit`}>
                      <Button className="btn-sm" variant="light">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      className="btn-sm"
                      variant="danger"
                      onClick={() => deleteHandler(p._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProductListPage;
