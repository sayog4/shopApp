import React, { useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { listCategory, deleteCategory } from '../redux/action/categoryActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const CategoryListPage = () => {
  const dispatch = useDispatch();

  const { error, loading, category } = useSelector(state => state.categoryList);

  const { error: deleteError, success } = useSelector(
    state => state.categoryDelete
  );

  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch, success]);

  const deleteHandler = id => {
    dispatch(deleteCategory(id));
  };
  return (
    <React.Fragment>
      <Row className="align-items-center">
        <Col>
          <h1>Categories</h1>
        </Col>
        <Col className="text-right">
          <LinkContainer to="/admin/category/create" className="my-2">
            <Button className="btn-primary">
              Create Category <i className="fas fa-plus"></i>
            </Button>
          </LinkContainer>
        </Col>
      </Row>

      {deleteError && <Message>{deleteError}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Table stripped="true" bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {category.map(c => (
              <tr key={c._id}>
                <td>{c._id}</td>
                <td>{c.name}</td>
                <td>
                  <LinkContainer to={`/admin/category/${c._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(c._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default CategoryListPage;
