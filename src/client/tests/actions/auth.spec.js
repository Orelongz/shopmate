/* eslint no-undef: "off" */
import * as actions from '../../actions/auth';
import * as types from '../../constants';

const customer = {
  name: 'Drew Leeds',
  email: 'drew@mail.com',
  token: 'avalidtoken'
};
const error = {
  error: 'Some error occured'
};

describe('Auth actions tests', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('signup action', () => {
    it('should register a new user', (done) => {
      moxios.stubRequest('/api/auth/signup', {
        status: 201,
        response: { customer }
      });

      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.USER_SIGNED_IN,
          credentials: customer
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.signup(customer, props))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });

    it('should not register a new user', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 400,
          response: error
        });
      });

      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.SIGN_IN_FAILED,
          error: error.error
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.signup(customer, props))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('signin action', () => {
    it('should sigin an existing user', (done) => {
      moxios.stubRequest('/api/auth/login', {
        status: 200,
        response: { customer }
      });

      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.USER_SIGNED_IN,
          credentials: customer
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.login(customer, props))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });

    it('should not sign user', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 400,
          response: error
        });
      });

      const expectedActions = [
        {
          type: types.IS_REQUEST_LOADING,
          status: true
        },
        {
          type: types.SIGN_IN_FAILED,
          error: error.error
        },
        {
          type: types.IS_REQUEST_LOADING,
          status: false
        },
      ];
      const store = mockStore({});

      return store.dispatch(actions.login(customer, props))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('fetch user details action', () => {
    it('should retrieve the details of a user', (done) => {
      moxios.stubRequest('/api/auth/user', {
        status: 200,
        response: { customer }
      });

      const expectedActions = [{
        type: types.FETCH_USER_DETAILS,
        credentials: customer
      }];
      const store = mockStore({});

      return store.dispatch(actions.userDetails())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });

  describe('logout action', () => {
    it('should logout a signed in user', () => {
      const expectedActions = [{
        type: types.USER_LOGGED_OUT,
        credentials: { name: '', email: '' }
      }];
      const store = mockStore({});

      store.dispatch(actions.logout());
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});
