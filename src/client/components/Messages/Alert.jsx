import React from 'react';
import PropTypes from 'prop-types';
import FlashMessage from 'react-flash-message';

const propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

function Alert({ text, type }) {
  const className = `alert alert-${type} text-center`;
  return (
    <FlashMessage>
      <div className={className} role="alert">
        {text}
      </div>
    </FlashMessage>
  );
}

Alert.propTypes = propTypes;

export default Alert;
