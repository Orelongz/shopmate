import {
  USER_SIGNED_IN,
  SIGN_IN_FAILED,
  USER_LOGGED_OUT,
  FETCH_USER_DETAILS,
} from '../constants';

const initialState = {
  name: '',
  email: '',
  error: ''
};

function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_SIGNED_IN:
    case USER_LOGGED_OUT:
    case FETCH_USER_DETAILS:
      return action.credentials;
    case SIGN_IN_FAILED:
      return { ...state, error: action.error };
    default:
      return state;
  }
}

export default userReducer;
