import express from 'express';
import {
  fetchAllProducts,
  getProduct
} from '../controllers/products';
import {
  fetchDepartments,
  fetchDepartmentProducts
} from '../controllers/departments';
import {
  fetchCategories,
  fetchCategoryProducts
} from '../controllers/categories';
import {
  login,
  signup,
  getUserDetails,
} from '../controllers/users';
import allShippingType from '../controllers/shipping';
import createOrder from '../controllers/order';
import { validateToken } from '../services/authToken';
import {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
  clearProductsFromCart,
} from '../controllers/cart';

const router = express.Router();

router.get(
  '/products',
  fetchCategoryProducts,
  fetchDepartmentProducts,
  fetchAllProducts
);

router.get('/products/:id', getProduct);

router.get('/departments', fetchDepartments);

router.get('/departments/:id/categories', fetchCategories);

router.post('/carts', addToCart);

router.get('/carts/:cartId', getCart);

router.put('/carts/:cartId', updateCart);

router.delete('/carts/:cartId', clearProductsFromCart);

router.delete('/carts/:cartId/items/:itemId', removeFromCart);

router.get('/shipping', allShippingType);

router.post(
  '/checkout',
  validateToken,
  createOrder
);

// auth routes
router.post(
  '/auth/signup',
  signup
);

router.post(
  '/auth/login',
  login
);

router.get(
  '/auth/user',
  validateToken,
  getUserDetails
);

export default router;
