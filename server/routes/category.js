import express from 'express';

import { userLoggedIn, admin } from '../middlewares/authentication.js';
import {
  createCategory,
  list,
  deleteCategory,
  updateCategory
} from '../controller/category.js';

const router = express.Router();

router.route('/create').post(userLoggedIn, admin, createCategory);

router.route('/').get(list);
router
  .route('/:id')
  .delete(userLoggedIn, admin, deleteCategory)
  .put(userLoggedIn, admin, updateCategory);

export default router;
