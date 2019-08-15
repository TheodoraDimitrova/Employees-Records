import React, { useState, useContext, useEffect } from 'react';
import EmployeeContext from '../../context/employee/EmployeeContext';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

//import Loader from '../layout/Loader';

const EmployeeForm = props => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const employeeContext = useContext(EmployeeContext);

  const { setAlert } = alertContext;
  const { addEmployee, error, clearErrors, current } = employeeContext;

  const [employee, setEmployee] = useState({
    name: '',
    DateOfBirth: '',
    email: '',
    davis_email: '',
    gender: 'Male',
    contact_number: '',
    employment_status: 'Active',
    nationality: '',
    driver_app: 'No',
    dbs_certificate: 'No',
    drivingLicenceNo: '',
    dl_status: 'UK',
    address_1: '',
    town: '',
    postcode: '',
    application_status: 'Incomplete',
    niNo: '',
    reg_number: '',
    fd_number: ''
  });

  useEffect(() => {
    authContext.loadUser();
    if (current) {
      props.history.push('/dashboard');
    }

    if (error === 'You already record employee with such a email') {
      setAlert(error, 'danger');
      clearErrors();
    }
    if (Array.isArray(error)) {
      error.forEach(el => {
        setAlert(el.msg, 'danger');
      });
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, props.history, current]);

  const {
    name,
    DateOfBirth,
    email,
    davis_email,
    gender,
    drivingLicenceNo,
    contact_number,
    reg_number,
    employment_status,
    dl_status,
    town,
    address_1,
    nationality,
    fd_number,
    postcode,
    niNo,
    application_status
  } = employee;
  const onChange = e => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    //let postReg = /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/;
    let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!regName.test(employee.name)) {
      setAlert(
        'Please enter full name of employee (first & last name).',
        'danger'
      );
      clearErrors();
    }  else {
      addEmployee(employee);
    }
  };
  // else if (!postReg.test(employee.postcode)) {
  //   setAlert('Please enter valid UK postcode.', 'danger');
  //   clearErrors();
  // }

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
        
      />
      <input
        type="email"
        placeholder="Enter DAVIS"
        value={davis_email}
        name="davis_email"
        onChange={onChange}
      />

      <div className="form-row">
        <div className="col-sm-4">
          <h5>Date of Birth</h5>
          <input
            className="form-control"
            type="date"
            value={DateOfBirth}
            name="DateOfBirth"
            onChange={onChange}
           
          />
        </div>
        <div className="col-sm-2 text-center">
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
        <div className="col-sm-2 text-center">
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
        <div className="col-sm-4">
          <h5>Phone number</h5>

          <input
            type="tel"
            className="form-control"
            pattern="((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}"
            placeholder="Enter valid phone"
            title="Format 07513438167,07513 438167 or +44 (0) 7513 438167"
            value={contact_number}
            name="contact_number"
            onChange={onChange}
          />
        </div>
      </div>
      <hr />
      <div className="form-row">
        <div className="col-sm-3">
          <h5>Driver's license</h5>
          <input
            type="text"
            value={drivingLicenceNo}
            name="drivingLicenceNo"
            onChange={onChange}
            placeholder="Enter number"
          />
        </div>
        <div className="col-sm-3 text-center">
          <h5>DL issued in:</h5>
          <input
            type="radio"
            name="dl_status"
            value="UK"
            checked={dl_status === 'UK'}
            onChange={onChange}
          />
          UK{' '}
          <input type="radio" name="dl_status" value="EU" onChange={onChange} />
          EU{' '}
        </div>
        <div className="col-sm-3 text-center">
          <h5>Additional driver application</h5>
          <input
            type="checkbox"
            name="driver_app"
            value="Yes"
            onChange={onChange}
          />
          Yes{' '}
        </div>
        <div className="col-sm-3 text-center">
          <h5>DBS certificate</h5>
          <input
            type="checkbox"
            name="dbs_certificate"
            value="Yes"
            onChange={onChange}
          />
          Yes{' '}
        </div>
      </div>
      <hr />
      <div className="form-row">
        <div className="col-sm-4">
          <h5>NINo</h5>
          <input
            type="text"
            value={niNo}
            pattern="[a-zA-Z]{2}[0-9]{6}[a-zA-Z]{1}$"
            title="Enter valid uk NINo"
            name="niNo"
            onChange={onChange}
            placeholder="Enter NINo"
           
          />
        </div>

        <div className="col-sm-4">
          <h5>FD</h5>
          <input
            type="text"
            placeholder="Enter FD"
            value={fd_number}
            name="fd_number"
            onChange={onChange}
          />
        </div>
        <div className="col-sm-4">
          <h5>Van registration</h5>
          <input
            type="text"
            placeholder="Enter valid registration number"
            value={reg_number}
            name="reg_number"
            onChange={onChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="col-sm-4">
          <input
            type="text"
            placeholder="Address 1"
            value={address_1}
            name="address_1"
            onChange={onChange}
            
          />
        </div>
        
        <div className="col-sm-4">
       <input
        type="text"
        placeholder="Town"
        value={town}
        name="town"
        onChange={onChange}
      />
       </div>
      
       <div className="col-sm-4">
          <input
            type="text"
            pattern="^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$"
            value={postcode}
            name="postcode"
            onChange={onChange}
            placeholder="Enter Postcode"
            title="Please enter valid UK postcode."
            
          />
        </div>
      </div>

      <input
        type="text"
        placeholder="Nationality"
        value={nationality}
        name="nationality"
        onChange={onChange}
        
      />

      <div className="col-sm-12 text-center ">
        <h5>Application Status</h5>
        <input
          type="radio"
          name="application_status"
          value="Incomplete"
          checked={application_status === 'Incomplete'}
          onChange={onChange}
        />
        Incomplete{' '}
        <input
          type="radio"
          name="application_status"
          value="Complete"
          onChange={onChange}
        />
        Complete{' '}
      </div>
      <input
        type="submit"
        value="Add employee"
        className="btn btn-primary btn-block"
      />
    </form>
  );
};

export default EmployeeForm;
