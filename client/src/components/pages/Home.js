import React, { useContext, useEffect } from 'react';
import Employees from '../employees/Employees';
import EmployeesFilter from '../employees/EmployeesFilter';
import AuthContext from '../../context/auth/AuthContext';
import Loader from '../layout/Loader';

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
 
if(authContext.loading){
  return <Loader/>
}
    return (
      <div>
        <EmployeesFilter />
        <Employees />
      </div>
    );
  
};
export default Home;
