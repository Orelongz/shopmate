import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const propTypes = {
  component: PropTypes.func.isRequired
};

const GuestRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('shopmateToken');
  return (
    <Route
      {...rest}
      render={props => (token ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      ))
      }
    />
  );
};

GuestRoute.propTypes = propTypes;

export default (GuestRoute);
