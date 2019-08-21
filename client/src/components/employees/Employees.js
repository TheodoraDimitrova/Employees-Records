import React, { useContext, useEffect } from 'react';
import EmployeeContext from '../../context/employee/EmployeeContext';

import EmployeeItem from './EmployeeItem';
import Loader from '../layout/Loader';

const Employees = () => {
  const employeeContext = useContext(EmployeeContext);

  const { employees, filtered, getEmployees, loading } = employeeContext;
  useEffect(() => {
    getEmployees();
    
    //eslint-disable-next-line
  }, []);

  if(employees===null || loading){
    return <Loader/>
  }else{
    if(employees.length>0){
      if (filtered) {
        return (
          <div className="container">
          <div className="row">
         
            {filtered.map(employee => (
              <EmployeeItem key={employee._id} employee={employee} />
            ))}
          </div>
          </div>
          
        );
      }
      return (
        <div className="container">
        <div className="row row-eq-height">
          {employees.map(employee => (
            <EmployeeItem key={employee._id} employee={employee} />
          ))}
        </div>
        </div>
      );
    }else{
      return <h1>Don't exist any records</h1>
    }
  }


  
  
 
};



export default Employees;
