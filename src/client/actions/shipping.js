import { GET_SHIPPING_TYPES } from '../constants';
import api from '../api';
import { successfulRequest } from './helper';

const getShippingTypes = () => dispatch => (
  api.shipping
    .getShippingTypes()
    .then((result) => {
      dispatch(successfulRequest(GET_SHIPPING_TYPES, result));
    })
);


export {
  getShippingTypes,
};
