import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import EmployeeDetails from './components/employees/EmployeeDetails';
import EmployeeEdit from './components/employees/EmployeeEdit';
import EmployeeForm from './components/employees/EmployeeForm';
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alerts from './components/layout/Alerts'
import PrivateRoute from './components/routing/PrivateRoutes'
import NotFound from './components/layout/NotFound'

import EmployeeState from './context/employee/EmployeeState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState'




import setAuthToken from './utils/setAuthToken'
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  return (
    <AuthState>
     
     <EmployeeState>
        <AlertState>
        <Fragment>
          <Router>
            <Navbar />
            <div className="container">
              <Alerts />
              <Switch>
                <PrivateRoute Route exact path="/" component={Home} />
                <PrivateRoute Route exact path="/about" component={About} />
                <PrivateRoute Route exact path="/details/:id" component={EmployeeDetails} />
                <PrivateRoute Route exact path="/add" component={EmployeeForm} />
                <PrivateRoute exact path="/employee/edit/:id" component={EmployeeEdit}/>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Router>
        </Fragment>
        </AlertState>
      </EmployeeState>   
    </AuthState>
  );
};

export default App;
