import {
  GET_DEPARTMENTS,
} from '../constants';

const initialState = {
  departments: [],
};

function department(state = initialState, action = {}) {
  switch (action.type) {
    case GET_DEPARTMENTS:
      return action.credentials;
    default:
      return state;
  }
}

export default department;
