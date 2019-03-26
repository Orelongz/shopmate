import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InLineError from '../Messages/InLineError';
import Alert from '../Messages/Alert';

const propTypes = {
  handleLogin: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  newRoute: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  serverError: PropTypes.string.isRequired,
};


function Login({
  isLoading, errors, handleLogin, onChange, email,
  password, url, newRoute, serverError
}) {
  return (
    <div className="auth-container">
      { serverError && <Alert text={serverError} />}
      <h3 className="text-center">LOGIN</h3>
      <form onSubmit={handleLogin} className="login-form">
        <div className="">
          <label htmlFor="email">
            Email
            <input
              type="text"
              className=""
              id="email"
              name="email"
              placeholder="mail@domain.com"
              value={email}
              onChange={onChange}
            />
          </label>
          {errors.email && <InLineError text={errors.email} />}
        </div>
        <div className="">
          <label htmlFor="password">
            Password
            <input
              type="password"
              className=""
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </label>
          {errors.password && <InLineError text={errors.password} />}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="login-button"
        >
          Sign In
        </button>
        <div>
          Don't have an account? <Link to={url} className="link">{newRoute}</Link>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = propTypes;

export default Login;
