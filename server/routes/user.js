import express from 'express';
import {
  registerUser,
  deleteUser,
  authenticateUser,
  getUserById,
  getUsers,
  updateUser,
  getUserProfile,
  updateUserProfile
} from '../controller/user.js';
import { userLoggedIn, admin } from '../middlewares/authentication.js';

const router = express.Router();

router
  .route('/')
  .post(registerUser)
  .get(userLoggedIn, admin, getUsers);

router.route('/login').post(authenticateUser);

router
  .route('/profile')
  .get(userLoggedIn, getUserProfile)
  .put(userLoggedIn, updateUserProfile);

router
  .route('/:id')
  .delete(userLoggedIn, admin, deleteUser)
  .get(userLoggedIn, admin, getUserById)
  .put(userLoggedIn, admin, updateUser);

export default router;
