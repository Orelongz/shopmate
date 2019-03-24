import axios from 'axios';
import jwt from 'jsonwebtoken';
import generator from 'generate-password';
import validator from 'validator';
import humanizeString from 'humanize-string';
import { userDetails, logout } from '../actions/auth';
import { getCart } from '../actions/cart';

export const handleErrorCatch = (error) => {
  // object
  if (typeof error.error === 'string') {
    return error.error;
  }
  // array
  return error.error[0];
};

export const validate = (inputObject) => {
  const errors = {};
  Object.entries(inputObject).forEach(([key, value]) => {
    if (!value || value.trim() === '') {
      errors[key] = (`${humanizeString(key)} must not be empty`);
    }
    if (key === 'email' && !validator.isEmail(value)) {
      errors[key] = 'Email is not valid';
    }
    if (key === 'confirmPassword' && inputObject.password !== value) {
      errors[key] = 'Passwords do not match';
    }
  });
  return errors;
};

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

function validateToken(store) {
  if (localStorage.shopmateToken) {
    const token = localStorage.shopmateToken;
    const decodedToken = jwt.decode(token, { complete: true });
    const dateNow = new Date();

    if (decodedToken.exp < dateNow.getTime()) {
      store.dispatch(logout());
    } else {
      setAuthToken(token);
      store.dispatch(userDetails());
    }
  }
}

function initializeCart() {
  if (!localStorage.cartId) {
    localStorage.setItem('cartId', generator.generate({ length: 32 }));
  }
}

function initializeGetCart(store) {
  store.dispatch(getCart());
}

export const onPageLoad = (store) => {
  initializeCart();
  initializeGetCart(store);
  validateToken(store);
};
