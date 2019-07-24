import React, { useState } from 'react';

export default function Register() {
  const [user, setUser] = useState({
    name: '',
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
  const { name, email, password } = user;
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
          />
        </div>
        <input type="submit" value='Register' className="btn btn-block btn-primary"/>
      </form>
    </div>
  );
}
