import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description
  } = req.body;
  const product = new Product({
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
    user: req.user._id
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const listProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product Not found');
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    (product.name = name),
      (product.price = price),
      (product.image = image),
      (product.brand = brand),
      (product.category = category),
      (product.countInStock = countInStock),
      (product.description = description);

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();

    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .sort({ rating: -1 })
    .limit(3);
  res.json(products);
});

const createReview = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const isAlreadyReviewed = product.reviews.find(
      review => review.user.toString() === req.user._id.toString()
    );

    if (isAlreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      user: req.user._id,
      rating: Number(rating),
      comment
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Product review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const listRelated = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const relatedProducts = await Product.find({ category: product.category })
      .limit(3)
      .populate('category', '_id name');

    res.json(relatedProducts);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getTopProducts,
  createReview,
  listRelated
};
