import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InLineError from '../Messages/InLineError';

const propTypes = {
  handleSignup: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  newRoute: PropTypes.string.isRequired,
  errors: PropTypes.shape({}).isRequired,
};

function SignUp({
  isLoading, errors, handleSignup, onChange,
  email, password, name, confirmPassword,
  url, newRoute,
}) {
  return (
    <div className="auth-container">
      <h3 className="text-center">SIGNUP</h3>

      <form onSubmit={handleSignup} className="signup-form">
        <div className="">
          <label htmlFor="email">
            Name
            <input
              type="text"
              className=""
              id="name"
              name="name"
              placeholder="Fullname *"
              value={name}
              onChange={onChange}
            />
          </label>
          {errors.name && <InLineError text={errors.name} />}
        </div>

        <div className="">
          <label htmlFor="email">
            Email
            <input
              type="text"
              className=""
              id="email"
              name="email"
              placeholder="mail@domain.com *"
              value={email}
              onChange={onChange}
            />
          </label>
        </div>

        <div className="">
          <label htmlFor="password">
            Password
            <input
              type="password"
              className=""
              id="password"
              name="password"
              placeholder="Password *"
              value={password}
              onChange={onChange}
            />
          </label>
          {errors.password && <InLineError text={errors.password} />}
        </div>

        <div className="">
          <label htmlFor="confirmPassword">
            Confirm Password
            <input
              type="password"
              className=""
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password *"
              value={confirmPassword}
              onChange={onChange}
            />
          </label>
          {errors.confirmPassword && <InLineError text={errors.confirmPassword} />}
        </div>

        <button type="submit" disabled={isLoading} className="">
          Signup
        </button>
        <div>
          Already have an account? <Link to={url} className="link">{newRoute}</Link>
        </div>
      </form>
    </div>
  );
}

SignUp.propTypes = propTypes;

export default SignUp;
