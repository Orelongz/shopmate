import {
  GET_CATEGORIES,
} from '../constants';

const initialState = {
  categories: [],
};

function category(state = initialState, action = {}) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.credentials;
    default:
      return state;
  }
}

export default category;
