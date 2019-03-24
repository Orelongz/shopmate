import {
  GET_PRODUCTS,
  GET_PRODUCT,
  SET_SEARCH,
} from '../constants';

const initialState = {
  products: [],
  paginate: {},
  product: {},
  search: ''
};

function productReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_PRODUCTS:
    case GET_PRODUCT:
    case SET_SEARCH:
      return { ...state, ...action.credentials };
    default:
      return state;
  }
}

export default productReducer;
