import { GET_CATEGORIES } from '../constants';
import api from '../api';
import {
  successfulRequest,
} from './helper';

const getCategories = id => dispatch => (
  api.category
    .fetchCategories(id)
    .then((result) => {
      dispatch(successfulRequest(GET_CATEGORIES, result));
    })
);


export {
  getCategories,
};
