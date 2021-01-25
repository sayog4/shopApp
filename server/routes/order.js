import express from 'express';
import { userLoggedIn, admin } from '../middlewares/authentication.js';

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered
} from '../controller/order.js';

const router = express.Router();

router
  .route('/')
  .post(userLoggedIn, addOrderItems)
  .get(userLoggedIn, admin, getOrders);
router.route('/myorders').get(userLoggedIn, getMyOrders);
router.route('/:id').get(userLoggedIn, getOrderById);
router.route('/:id/pay').put(userLoggedIn, updateOrderToPaid);
router.route('/:id/deliver').put(userLoggedIn, admin, updateOrderToDelivered);

export default router;
