import React, { Fragment, useContext } from 'react';
import EmployeeContext from '../../context/employee/EmployeeContext';
import EmployeeItem from './EmployeeItem';

const Employees = () => {
  const employeeContext = useContext(EmployeeContext);
  const { employees, filtered } = employeeContext;

  if (filtered) {
    return (
      <div style={userStyle}>
        {filtered.map(employee => (
          <EmployeeItem key={employee.id} employee={employee} />
        ))}
      </div>
    );
  }
  return (
    <div style={userStyle}>
      {employees.map(employee => (
        <EmployeeItem key={employee.id} employee={employee} />
      ))}
    </div>
  );
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export default Employees;
