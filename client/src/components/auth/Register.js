import React, { useState, useContext,useEffect} from 'react';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { register,error ,clearErrors,isAuthenticated} = authContext;
  useEffect(() => {
    
    if (isAuthenticated){
       props.history.push('/')
    }
   if (error === 'E-mail already in use') {
     setAlert(error,'danger')
     clearErrors()
   }

   //eslint-disable-next-line
  }, [error,isAuthenticated,props.history])

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { name, email, password } = user;
  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!regName.test(name)) {
      setAlert('Please enter your full name (first & last name).', 'danger');
    }else{
       register({ name,email,password});
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

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            title="Enter valid email"
          />
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
            required
          />
          <input type="checkbox" onClick={showPassword} /> Show Password
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-block btn-primary"
        />
      </form>
    </div>
  );
};

export default Register;
