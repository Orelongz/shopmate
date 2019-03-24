import {
  GET_PRODUCT,
  GET_PRODUCT_FAILED,
  GET_PRODUCTS,
  SET_SEARCH,
} from '../constants';
import api from '../api';
import {
  successfulRequest,
  failedRequest
} from './helper';
import { handleErrorCatch } from '../services';

const getProduct = (id, props) => dispatch => (
  api.product
    .getProduct(id)
    .then((result) => {
      // set documet title
      document.title = `${result.product.name} | Shopmate`;
      dispatch(successfulRequest(GET_PRODUCT, result));
    })
    .catch((error) => {
      dispatch(failedRequest(
        GET_PRODUCT_FAILED,
        handleErrorCatch(error.response.data)
      ));
      props.history.push('/');
    })
);

const getAllProducts = query => dispatch => (
  api.product
    .fetchProducts(query)
    .then((result) => {
      // set documet title
      document.title = 'Homepage | Shopmate';
      dispatch(successfulRequest(GET_PRODUCTS, result));
    })
);

const setSearch = search => (dispatch) => {
  dispatch(successfulRequest(SET_SEARCH, { search }));
};


export {
  getProduct,
  getAllProducts,
  setSearch,
};
