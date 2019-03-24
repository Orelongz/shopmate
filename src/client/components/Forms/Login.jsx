import React from 'react';
import PropTypes from 'prop-types';
import InLineError from '../Messages/InLineError';

const propTypes = {
  handleLogin: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};


function Login({
  isLoading, errors, handleLogin, onChange, email, password
}) {
  return (
    <div className="auth-container">
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
      </form>
    </div>
  );
}

Login.propTypes = propTypes;

export default Login;
