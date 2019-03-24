import {
  GET_CART,
} from '../constants';

const initialState = {
  cart: [],
  totalPrice: '',
};

function cart(state = initialState, action = {}) {
  switch (action.type) {
    case GET_CART:
      return action.credentials;
    default:
      return state;
  }
}

export default cart;
