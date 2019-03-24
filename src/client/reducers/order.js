import {
  CHECKOUT,
} from '../constants';

const initialState = {
  checkedOut: false,
};

function order(state = initialState, action = {}) {
  switch (action.type) {
    case CHECKOUT:
      return action.credentials;
    default:
      return state;
  }
}

export default order;
