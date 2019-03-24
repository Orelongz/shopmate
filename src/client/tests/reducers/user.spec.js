import reducer from '../../reducers/user';
import * as types from '../../constants';

const user = {
  name: 'Drew Leeds',
  email: 'drew@mail.com',
  token: 'avalidtoken'
};
const error = {
  error: 'Some error occured'
};

let initialState = {
  name: '',
  email: ''
};
let state;

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, undefined)).to.deep.equal(initialState);
  });

  it('should handle USER_SIGNED_IN', () => {
    state = { ...user };

    expect(reducer(initialState, {
      type: types.USER_SIGNED_IN,
      credentials: user
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle SIGN_IN_FAILED', () => {
    state = { error };

    expect(reducer(initialState, {
      type: types.SIGN_IN_FAILED,
      error
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle USER_LOGGED_OUT', () => {
    state = {};

    expect(reducer(initialState, {
      type: types.USER_LOGGED_OUT,
      credentials: {}
    })).to.deep.equal(state);

    initialState = state;
  });

  it('should handle FETCH_USER_DETAILS', () => {
    state = { ...state, ...user };

    expect(reducer(initialState, {
      type: types.FETCH_USER_DETAILS,
      credentials: user
    })).to.deep.equal(state);

    initialState = state;
  });
});
