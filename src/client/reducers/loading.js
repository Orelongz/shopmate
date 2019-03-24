import { IS_REQUEST_LOADING } from '../constants';

const initialState = {
  requestLoading: false
};

function loading(state = initialState, action = {}) {
  switch (action.type) {
    case IS_REQUEST_LOADING:
      return { ...state, requestLoading: action.status };
    default:
      return state;
  }
}

export default loading;
