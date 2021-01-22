import express from 'express';

import { userLoggedIn, admin } from '../middlewares/authentication.js';
import {
  createCategory,
  list,
  deleteCategory,
  updateCategory,
  singleCategory
} from '../controller/category.js';

const router = express.Router();

router
  .route('/')
  .post(userLoggedIn, admin, createCategory)
  .get(list);

router
  .route('/:id')
  .get(singleCategory)
  .delete(userLoggedIn, admin, deleteCategory)
  .put(userLoggedIn, admin, updateCategory);

export default router;
