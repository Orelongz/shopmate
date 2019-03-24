import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string.isRequired
};

function InlineError({ text }) {
  return (<p className="">{text}</p>);
}

InlineError.propTypes = propTypes;

export default InlineError;
