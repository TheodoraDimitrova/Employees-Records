import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EmployeeItem = ({ employee }) => {
  return (
    <div className="col-sm-6 col-md-4">
      <div
        className={
          'card card-block text-center border ' +
          (employee.application_status === 'Complete'
            ? 'border-success'
            : 'border-danger')
        }
      >
        <h3 style={style_1} className={"d-inline " +
          (employee.application_status === 'Complete'
            ? 'bg-success'
            : 'bg-danger')}>{employee.name}</h3>
        <h4>
          {' '}
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
        </h4>
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
let style_1 = { 
  display: 'inline'
};
EmployeeItem.propTypes = {
  employee: PropTypes.object.isRequired
};

export default EmployeeItem;
