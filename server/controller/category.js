import asyncHandler from 'express-async-handler';

import Category from '../models/category.js';

const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create({
    name: req.body.name,
    image: req.body.image
  });
  if (category) {
    res.status(201).json({
      id: category._id,
      name: category.name,
      image: category.image
    });
  } else {
    res.status(400);
    throw new Error('Data given is invalid');
  }
});

const list = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    await category.remove();
    res.json({ message: 'Category is removed' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = req.body.name;
    category.image = req.body.image;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  }
});

const singleCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

export { createCategory, list, deleteCategory, updateCategory, singleCategory };
