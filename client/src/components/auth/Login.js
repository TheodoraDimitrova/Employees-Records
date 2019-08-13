import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';
//import Loader from '../layout/Loader';

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }

    if (error === 'Invalid email') {
      setAlert(error, 'danger');
      clearErrors();
    }
    if (error === 'Invalid password') {
      setAlert(error, 'danger');
      clearErrors();
    }

    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    
    if (email === '' || password === '') {
      setAlert('Email and password are required!', 'danger');
    } else {
      login({ email, password });

    }
  };

  const showPassword = () => {
    let x = document.getElementById('password');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  };
  const { email, password } = user;

 return (
  <div className="form-container">
    <h1>
      Account <span className="text-primary">Login</span>
    </h1>
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={email} onChange={onChange} />
      </div>
      <div className="form-group">
        {' '}
        <label htmlFor="name">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          pattern="(?=.*\d)(?=.*[a-z]).{6,10}"
          title="Must contain at least one number and lowercase letters, and at least 6 to 10 characters"
          id="password"
        />
        <input type="checkbox" onClick={showPassword} /> Show Password
      </div>
      <input
        type="submit"
        value="Login"
        className="btn btn-block btn-primary"
      />
    </form>
  </div>
);
};
export default Login;
