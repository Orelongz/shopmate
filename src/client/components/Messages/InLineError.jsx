import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string.isRequired
};

function InlineError({ text }) {
  return (<small style={{ lineHeight: '16px', color: 'rgb(224, 48, 77)' }}>{text}</small>);
}

InlineError.propTypes = propTypes;

export default InlineError;
