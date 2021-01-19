import express from 'express';
import {
  registerUser,
  authenticateUser,
  getUsers
} from '../controller/user.js';

const router = express.Router();

router
  .route('/')
  .post(registerUser)
  .get(getUsers);

router.route('/login').post(authenticateUser);

export default router;
