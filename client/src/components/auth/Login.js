import React, { useState } from 'react';

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
      });
    
      const onChange = (e) => {
          setUser({...user,[e.target.name]:[e.target.value]})
      };
      const onSubmit = (e) => {
          e.preventDefault()
          console.log(user)
      };
      const showPassword =()=> {
        let x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }
      const { email, password } = user;
      return (
        <div className="form-container">
          <h1>
            Account <span className="text-primary">Login</span>
          </h1>
          <form onSubmit={onSubmit}>
         
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
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
                required
                pattern="(?=.*\d)(?=.*[a-z]).{6,10}"
                title="Must contain at least one number and lowercase letters, and at least 6 to 10 characters"
                id='password'
              />
               <input type="checkbox" onClick={showPassword} />{" "}Show Password
            </div>
            <input type="submit" value='Login' className="btn btn-block btn-primary"/>
          </form>
        </div>
      );
};
export default Login;
