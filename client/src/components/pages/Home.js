import React from 'react';
import Employees from '../employees/Employees'
import EmployeesFilter from '../employees/EmployeesFilter'

const Home = () => {
  return (
    <div>
      <EmployeesFilter/>
      <Employees/>
    </div>
  );
};
export default Home;
