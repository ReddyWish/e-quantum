import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  getTopProducts,
  createProductReview
} from '../controllers/productController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;


// .post(protect, admin, createProduct);
// router.get('/top', getTopProducts);
// router.route('/:id/reviews').post(protect, createProductReview);
// router
//   .route('/:id')
//   .get(getProductById)
//   .put(protect, admin, updateProduct)
//   .delete(protect, admin, deleteProduct)
