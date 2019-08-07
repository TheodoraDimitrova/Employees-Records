import React, { useEffect, useContext, useState } from 'react';
import EmployeeContext from '../../context/employee/EmployeeContext';
import AuthContext from '../../context/auth/AuthContext'
import AlertContext from '../../context/alert/AlertContext'
import Loader from '../layout/Loader'

const EmployeeEdit = (props, { match }) => {
  const employeeContext = useContext(EmployeeContext);
  const authContext = useContext(AuthContext)
  const alertContext=useContext(AlertContext)
  const { current, clearCurrent, updateEmployee, loading } = employeeContext;
  const {setAlert}=alertContext
  useEffect(() => {
    authContext.loadUser()
    if (current !== null) {
      setEdited(current);
    }
     //eslint-disable-next-line
  }, [employeeContext, current]);

  const [edited, setEdited] = useState({
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

  const onChange = e => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
   
    e.preventDefault();
    let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!regName.test(edited.name)) {
      setAlert('Please enter full name of employee (first & last name).', 'danger');
    }else{
      updateEmployee(edited);
      clearCurrent();
      props.history.push('/');
    }
   
  };
  if(authContext.loading || loading){
    return <Loader/>
  }else{
    if (current) {
      return (
        <form onSubmit={onSubmit}>
          <h2 className="text-primary">Edit Applicant</h2>
          <input
            type="text"
            pattern="[A-Za-z ]{1,32}"
            title="Employee name must contain only letters"
            placeholder="Enter name"
            value={edited.name}
            name="name"
            onChange={onChange}
            required
          />
          <input
            type="email"
            placeholder="Enter email"
            value={edited.email}
            name="email"
            onChange={onChange}
            required
          />
          <div className="form-row">
            <div className="col-3">
              <h5>Enter age</h5>
              <input
                type="number"
                value={edited.age}
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
                checked={edited.employment_status === 'Active'}
                onChange={onChange}
              />
              Active{' '}
              <input
                type="radio"
                name="employment_status"
                value="Inactive"
                checked={edited.employment_status === 'Inactive'}
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
                checked={edited.gender === 'Male'}
              />
              Male{' '}
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={edited.gender === 'Female'}
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
                value={edited.contact_number}
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
            value={edited.githubusername}
            name="githubusername"
            onChange={onChange}
            required
          />
          <input
            type="text"
            placeholder="Education Qualification"
            value={edited.education_qualification}
            name="education_qualification"
            onChange={onChange}
            required
          />
          <input
            type="text"
            placeholder="Nationality"
            value={edited.nationality}
            name="nationality"
            onChange={onChange}
            required
          />
          <input
            type="submit"
            value="Save changes"
            className="btn btn-primary btn-block"
          />
        </form>
      );
    }
    return <Loader/>
  }
};

export default EmployeeEdit;
