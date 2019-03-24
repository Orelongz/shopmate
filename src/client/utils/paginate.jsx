import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';

const propTypes = {
  count: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  current: PropTypes.number.isRequired,
};

/**
 * Paginate
 * @param {Object} param
 * @return {Object} pagination component
 */
function Paginate({
  count, pageSize, onChange, current
}) {
  return (
    <Pagination
      showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} items`}
      locale={{ items_per_page: 'Items' }}
      total={count}
      pageSize={pageSize}
      current={current}
      onChange={onChange}
    />
  );
}
Paginate.propTypes = propTypes;

export default Paginate;
