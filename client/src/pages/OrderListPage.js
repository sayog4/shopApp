import React, { useEffect } from 'react';
import moment from 'moment';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { listOrders } from '../redux/action/orderAction';

const OrderListPage = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector(state => state.orderList);

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  return (
    <React.Fragment>
      <h2>Orders</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Table stripped="true" bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL PRICE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{moment(order.createdAt).fromNow()}</td>
                <td>$ {order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    moment(order.paidAt).fromNow()
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    moment(order.deliveredAt).fromNow()
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default OrderListPage;
