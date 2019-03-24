import { GET_DEPARTMENTS } from '../constants';
import api from '../api';
import {
  successfulRequest,
} from './helper';

const getDepartments = () => dispatch => (
  api.department
    .fetchDepartments()
    .then((result) => {
      dispatch(successfulRequest(GET_DEPARTMENTS, result));
    })
);


export {
  getDepartments,
};
