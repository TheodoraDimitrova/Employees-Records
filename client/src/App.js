import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import EmployeeDetails from './components/employees/EmployeeDetails';
import EmployeeEdit from './components/employees/EmployeeEdit';
import EmployeeForm from './components/employees/EmployeeForm';
import Profile from './components/profile/Profile';

import EmployeeState from './context/employee/EmployeeState';
import AuthState from './context/auth/AuthState';

import './App.css';

const App = () => {
  return (
    <AuthState>
      <EmployeeState>
        <Fragment>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/details/:id" component={EmployeeDetails} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/add" component={EmployeeForm} />
                <Route
                  exact
                  path="/employee/edit/:id"
                  component={EmployeeEdit}
                />
              </Switch>
            </div>
          </Router>
        </Fragment>
      </EmployeeState>
    </AuthState>
  );
};

export default App;
