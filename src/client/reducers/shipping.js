import {
  GET_SHIPPING_TYPES,
} from '../constants';

const initialState = {
  shipping: [],
};

function shipping(state = initialState, action = {}) {
  switch (action.type) {
    case GET_SHIPPING_TYPES:
      return action.credentials;
    default:
      return state;
  }
}

export default shipping;
