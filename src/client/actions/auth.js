import {
  USER_SIGNED_IN,
  SIGN_IN_FAILED,
  USER_LOGGED_OUT,
  IS_REQUEST_LOADING,
  FETCH_USER_DETAILS,
} from '../constants';
import api from '../api';
import {
  setAuthToken,
  handleErrorCatch
} from '../services';
import {
  isLoading,
  successfulRequest,
  failedRequest
} from './helper';

export const signup = (credentials, props) => (dispatch) => {
  dispatch(isLoading(IS_REQUEST_LOADING, true));

  return api.user
    .signup(credentials)
    .then((customer) => {
      const { token } = customer;
      localStorage.setItem('shopmateToken', token);
      setAuthToken(token);
      dispatch(successfulRequest(USER_SIGNED_IN, customer));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
      props.history.push('/');
    })
    .catch((error) => {
      dispatch(failedRequest(SIGN_IN_FAILED, handleErrorCatch(error.response.data)));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
      // clear error in 2 secs
      setTimeout(() => {
        dispatch(failedRequest(SIGN_IN_FAILED, handleErrorCatch({ error: '' })));
      }, 3000);
    });
};

export const login = (credentials, props) => (dispatch) => {
  dispatch(isLoading(IS_REQUEST_LOADING, true));

  return api.user
    .login(credentials)
    .then((customer) => {
      const { token } = customer;
      localStorage.setItem('shopmateToken', token);
      setAuthToken(token);
      dispatch(successfulRequest(USER_SIGNED_IN, customer));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
      props.history.push('/');
    })
    .catch((error) => {
      dispatch(failedRequest(SIGN_IN_FAILED, handleErrorCatch(error.response.data)));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
      // clear error in 2 secs
      setTimeout(() => {
        dispatch(failedRequest(SIGN_IN_FAILED, handleErrorCatch({ error: '' })));
      }, 3000);
    });
};

export const userDetails = () => dispatch => (
  api.user
    .userDetails()
    .then((customer) => {
      dispatch(successfulRequest(FETCH_USER_DETAILS, customer));
    })
    .catch(() => {
      localStorage.removeItem('shopmateToken');
      setAuthToken();
    })
);

export const logout = () => (dispatch) => {
  localStorage.removeItem('shopmateToken');
  setAuthToken();
  return dispatch(successfulRequest(
    USER_LOGGED_OUT,
    { name: '', email: '' }
  ));
};
