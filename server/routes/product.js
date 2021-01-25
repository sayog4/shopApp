import express from 'express';
import { userLoggedIn, admin } from '../middlewares/authentication.js';
import {
  createProduct,
  listProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  getTopProducts,
  createReview,
  listRelated,
  getProductsByCategory
} from '../controller/product.js';

const router = express.Router();

router
  .route('/')
  .post(userLoggedIn, admin, createProduct)
  .get(listProducts);

router.route('/top').get(getTopProducts);
router.route('/:id/reviews').post(userLoggedIn, createReview);
router
  .route('/:id')
  .get(getProductById)
  .delete(userLoggedIn, admin, deleteProduct)
  .put(userLoggedIn, admin, updateProduct);

router.route('/related/:id').get(listRelated);

router.route('/category/:id').get(getProductsByCategory);

export default router;
