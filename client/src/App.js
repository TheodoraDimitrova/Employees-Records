import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/pages/Landing';
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
                <Route exact path="/" component={Landing} />
                <PrivateRoute Route exact path="/dashboard" component={Home} />
                <PrivateRoute Route exact path="/about" component={About} />
                <PrivateRoute Route exact path="/employee/details/:id" component={EmployeeDetails} />
                <PrivateRoute Route exact path="/add" component={EmployeeForm} />
                <PrivateRoute exact path="/employee/edit/:id" component={EmployeeEdit}/>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </Router>
        </Fragment>
        </AlertState>
      </EmployeeState>   
    </AuthState>
  );
};

export default App;
