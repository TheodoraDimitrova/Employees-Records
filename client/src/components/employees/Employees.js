import React, {  useContext,useEffect } from 'react';
import EmployeeContext from '../../context/employee/EmployeeContext';
import EmployeeItem from './EmployeeItem';
import Loader from '../layout/Loader';

const Employees = () => {
  const employeeContext = useContext(EmployeeContext);
  const { employees, filtered,getEmployees,loading } = employeeContext;
  useEffect(() => {
   getEmployees()
   //eslint-disable-next-line
  }, [])

  if(loading){
    return <Loader/>
  }
  
  if(employees.length===0){
    return <h1>You don't have any records!</h1>
  }

  if (filtered) {
    return (
      <div style={userStyle}>
        {filtered.map(employee => (
          <EmployeeItem key={employee._id} employee={employee} />
        ))}
      </div>
    );
  }
  return (
    <div style={userStyle}>
      {employees.map(employee => (
        <EmployeeItem key={employee._id} employee={employee} />
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