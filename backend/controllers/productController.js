import path from "path";
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

import * as fs from "fs";
import User from "../models/userModel.js";


// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize)  });
});

// @desc Fetch product
// @route GET /api/product/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
})

// @desc Create new product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.png',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description'
  })

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Update a Product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Resource not found')
  }
});

// @desc Delete a Product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const imageFileName = product.image.replace('/uploads\\', '');

  if (product) {
    await Product.deleteOne({ _id: product._id });

    const __dirname = path.resolve();
    const imagePath = path.join(__dirname, 'uploads', imageFileName);

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting image:', err);
      } else {
        console.log('Image deleted successfully.');
      }
    });

    res.status(200).json({ message: 'Product deleted' })
  } else {
    res.status(404);
    throw new Error('Resource not found')
  }
});

// @desc Create a new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Resource not found')
  }
});

// @desc Delete review
// @route DELETE /api/products/:id/reviews/:reviewId
// @access Private
const deleteProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const review = product.reviews.find(x => (x._id).toString() === req.params.reviewId);
  const user = await User.findById(req.user._id);
  if (user.isAdmin || ((review.user).toString() === (req.user._id).toString())) {
    const editedReviews = product.reviews.filter(x => x._id !== review._id);
    product.reviews = editedReviews;
    product.numReviews = editedReviews.length;
    product.rating = editedReviews.length ? editedReviews.reduce((acc, review) => acc + review.rating, 0) / editedReviews.length : 0;

    await product.save();
    res.status(201).json({ message: 'Review deleted' });
  } else {
    res.status(404);
    throw new Error('Resource not found')
  }
});

// @desc Get top rated products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
})


export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  deleteProductReview,
  getTopProducts
};