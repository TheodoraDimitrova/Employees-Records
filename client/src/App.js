import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import EmployeeDetails from './components/employees/EmployeeDetails';
import EmployeeEdit from './components/employees/EmployeeEdit';
import EmployeeForm from './components/employees/EmployeeForm';
import Profile from './components/profile/Profile';
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alerts from './components/layout/Alerts'

import EmployeeState from './context/employee/EmployeeState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState'
import ProfileState from './context/profile/ProfileState'
import './App.css';

const App = () => {
  return (
    <AuthState>
     <ProfileState>
     <EmployeeState>
        <AlertState>
        <Fragment>
          <Router>
            <Navbar />
            <div className="container">
              <Alerts />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/details/:id" component={EmployeeDetails} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/add" component={EmployeeForm} />
                <Route exact path="/employee/edit/:id" component={EmployeeEdit}/>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Router>
        </Fragment>
        </AlertState>
     
      </EmployeeState>
     </ProfileState>
    </AuthState>
  );
};

export default App;
