import React, { useState, useContext, useEffect } from 'react';
import EmployeeContext from '../../context/employee/EmployeeContext';
import uuid from 'uuid';
import AuthContext from '../../context/auth/AuthContext';

import Loader from '../layout/Loader';

const EmployeeAdd = props => {
  const authContext = useContext(AuthContext);

  const employeeContext = useContext(EmployeeContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const [employee, setEmployee] = useState({
    _id: uuid(),
    name: '',
    age: 18,
    email: '',
    gender: 'Male',
    contact_number: '',
    githubusername: '',
    employment_status: 'Active',
    education_qualification: '',
    nationality: ''
  });
  const {
    name,
    age,
    email,
    gender,
    contact_number,
    githubusername,
    employment_status,
    education_qualification,
    nationality
  } = employee;
  const onChange = e => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();

    employeeContext.addEmployee(employee);
    setEmployee({
      id: uuid(),
      name: '',
      age: 18,
      email: '',
      gender: 'Male',
      contact_number: '',
      githubusername: '',
      employment_status: 'Active',
      education_qualification: '',
      nationality: ''
    });
    props.history.push('/');
  };
  if (authContext.loading) {
    return <Loader />;
  } else {
    return (
      <form onSubmit={onSubmit}>
        <h2 className="text-primary">Add Employee</h2>
        <input
          type="text"
          pattern="[A-Za-z ]{1,32}"
          placeholder="Enter name"
          value={name}
          name="name"
          title="Employee name must contain only letters"
          onChange={onChange}
          required
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          name="email"
          onChange={onChange}
          required
        />
        <div className="form-row">
          <div className="col-3">
            <h5>Enter age</h5>
            <input
              type="number"
              value={age}
              name="age"
              min="18"
              max="65"
              onChange={onChange}
              required
            />
          </div>
          <div className="col-3">
            <h5>Employee Status</h5>
            <input
              type="radio"
              name="employment_status"
              value="Active"
              checked={employment_status === 'Active'}
              onChange={onChange}
            />
            Active{' '}
            <input
              type="radio"
              name="employment_status"
              value="Inactive"
              onChange={onChange}
            />
            Inactive
          </div>
          <div className="col-3">
            <h5>Select gender</h5>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={onChange}
              checked={gender === 'Male'}
            />
            Male{' '}
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={onChange}
            />
            Female{' '}
          </div>
          <div className="col-3">
            <h5>Enter Phone number</h5>
            <input
              type="tel"
              pattern="[\+359]\d{12}"
              required
              placeholder="contact_number"
              value={contact_number}
              name="contact_number"
              onChange={onChange}
            />
            <br />
            <small> Format: +359XXXXXXXXX</small>
          </div>
        </div>

        <input
          type="text"
          placeholder="GitHub username"
          value={githubusername}
          name="githubusername"
          onChange={onChange}
          required
        />
        <input
          type="text"
          placeholder="Education Qualification"
          value={education_qualification}
          name="education_qualification"
          onChange={onChange}
          required
        />
        <input
          type="text"
          placeholder="Nationality"
          value={nationality}
          name="nationality"
          onChange={onChange}
          required
        />
        <input
          type="submit"
          value="Add employee"
          className="btn btn-primary btn-block"
        />
      </form>
    );
  }
};

export default EmployeeAdd;
