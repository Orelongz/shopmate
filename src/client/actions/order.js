import generator from 'generate-password';
import { CHECKOUT, GET_CART } from '../constants';
import api from '../api';
import { successfulRequest } from './helper';
import { handleErrorCatch } from '../services';

const checkout = credentials => dispatch => (
  api.order
    .checkout(credentials)
    .then((result) => {
      localStorage.setItem('cartId', generator.generate({ length: 32 }));
      dispatch(successfulRequest(GET_CART, { cart: [], totalPrice: '' }));
      dispatch(successfulRequest(CHECKOUT, result));
    })
    .catch(error => handleErrorCatch(error))
);


export { checkout };
