import React from 'react';
import PropTypes from 'prop-types';
import FlashMessage from 'react-flash-message';

const propTypes = {
  text: PropTypes.string.isRequired,
};

function Alert({ text }) {
  return (
    <FlashMessage>
      <div className="text-center" role="alert" style={{ color: 'white', backgroundColor: 'rgb(224, 48, 77)' }}>
        {text}
      </div>
    </FlashMessage>
  );
}

Alert.propTypes = propTypes;

export default Alert;
