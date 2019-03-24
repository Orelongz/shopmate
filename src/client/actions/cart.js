import generator from 'generate-password';
import { GET_CART } from '../constants';
import api from '../api';
import { successfulRequest } from './helper';

const addProductToCart = credentials => dispatch => (
  api.cart
    .cartAddProduct(credentials)
    .then((result) => {
      dispatch(successfulRequest(GET_CART, result));
    })
);

const updateProductInCart = credentials => (dispatch) => {
  const { cartId } = localStorage;

  return api.cart
    .updateProductInCart(credentials, cartId)
    .then((result) => {
      dispatch(successfulRequest(GET_CART, result));
    });
};

const getCart = () => (dispatch) => {
  const { cartId } = localStorage;

  return api.cart
    .getCart(cartId)
    .then((result) => {
      dispatch(successfulRequest(GET_CART, result));
    });
};

const removeProductFromCart = itemId => (dispatch) => {
  const { cartId } = localStorage;

  return api.cart
    .removeProduct(cartId, itemId)
    .then((result) => {
      dispatch(successfulRequest(GET_CART, result));
    });
};

const clearProductsFromCart = () => (dispatch) => {
  const { cartId } = localStorage;

  return api.cart
    .clearProductsFromCart(cartId)
    .then((result) => {
      localStorage.setItem('cartId', generator.generate({ length: 32 }));
      dispatch(successfulRequest(GET_CART, result));
    });
};

export {
  getCart,
  addProductToCart,
  updateProductInCart,
  removeProductFromCart,
  clearProductsFromCart,
};
