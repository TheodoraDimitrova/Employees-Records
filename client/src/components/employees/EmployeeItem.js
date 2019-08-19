import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EmployeeItem = ({ employee }) => {
  return (
    <div className="col-md-4 col-sm-6 col-xs-12 d-flex pb-3">
      <div
        className={
          'card card-block text-center border ' +
          (employee.application_status === 'Complete'
            ? 'border-success'
            : 'border-danger')
        }
      >
        <h3>
          {employee.name}
          <span
            className={
              'badge ' +
              (employee.employment_status === 'Active'
                ? 'badge-success'
                : 'badge-danger')
            }
          >
            {employee.employment_status}
          </span>
        </h3>
        <div>
          <Link
            to={`/employee/details/${employee._id}`}
            className="btn btn-dark btn-sm my-1"
          >
            More
          </Link>
        </div>
      </div>
    </div>
  );
};
EmployeeItem.propTypes = {
  employee: PropTypes.object.isRequired
};

export default EmployeeItem;
