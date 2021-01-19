import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('Email aldready exist.Try to login');
  }
  const user = await User.create({
    name,
    email,
    password
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(400);
    throw new Error('User data is invalid');
  }
});

const authenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password)))
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });

  res.status(401);
  throw new Error('Invalid Email or Password');
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');

  res.json(users);
});

export { registerUser, authenticateUser, getUsers };
