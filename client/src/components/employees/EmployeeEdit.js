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
    DateOfBirth: '',
    email: '',
    davis_email: '',
    gender: '',
    contact_number: '',
    employment_status: '',
    nationality: '',
    driver_app: '',
    dbs_certificate: '',
    drivingLicenceNo: '',
    dl_status: '',
    address_1: '',
    town: '',
    postcode: '',
    application_status: '',
    niNo: '',
    reg_number: '',
    fd_number: '',
    utr:'',
    utr_id:'',
    utr_code:""
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
      props.history.push('/dashboard');
    }
   
  };
  if(authContext.loading || loading){
    return <Loader/>
  }else{
    if (current) {
     return (
      <form onSubmit={onSubmit}>
      <h2 className="text-primary">Edit Employee</h2>
      <input
        type="text"
        pattern="[A-Za-z ]{1,32}"
        placeholder="Enter name"
        value={edited.name}
        name="name"
        title="Employee name must contain only letters"
        onChange={onChange}
        required
      />
      <input
        type="email"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}"
        placeholder="Enter email"
        value={edited.email}
        name="email"
        onChange={onChange}
        title="Enter valid email address"
      />
      <input
        type="email"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}"
        placeholder="Enter DAVIS"
        value={edited.davis_email}
        name="davis_email"
        onChange={onChange}
        title="Enter valid email address"
      />

      <div className="form-row">
        <div className="col-sm-4">
          <h5>Date of Birth</h5>
          <input
            className="form-control"
            type="date"
            value={edited.DateOfBirth}
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
            checked={edited.employment_status === 'Active'}
            onChange={onChange}
          />
          Active{' '}
          <input
            type="radio"
            name="employment_status"
            value="Inactive"
            onChange={onChange}
            checked={edited.employment_status === 'Inactive'}
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
            checked={edited.gender === 'Male'}
          />
          Male{' '}
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={onChange}
            checked={edited.gender === 'Female'}
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
            value={edited.contact_number}
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
            value={edited.drivingLicenceNo}
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
            checked={edited.dl_status === 'UK'}
            onChange={onChange}
          />
          UK{' '}
          <input
            type="radio"
            name="dl_status"
            value="EU"
            checked={edited.dl_status === 'EU'}
            onChange={onChange}
          />
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
            value={edited.niNo}
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
            value={edited.fd_number}
            name="fd_number"
            onChange={onChange}
          />
        </div>
        <div className="col-sm-4">
          <h5>Van registration</h5>
          <input
            type="text"
            placeholder="Enter valid registration number"
            pattern="(^[A-Z]{2}[0-9]{2}\s?[A-Z]{3}$)|(^[A-Z][0-9]{1,3}[A-Z]{3}$)|(^[A-Z]{3}[0-9]{1,3}[A-Z]$)|(^[0-9]{1,4}[A-Z]{1,2}$)|(^[0-9]{1,3}[A-Z]{1,3}$)|(^[A-Z]{1,2}[0-9]{1,4}$)|(^[A-Z]{1,3}[0-9]{1,3}$)|(^[A-Z]{1,3}[0-9]{1,4}$)|(^[0-9]{3}[DX]{1}[0-9]{3}$)"
            title="Enter valid vehicle registration"
            value={edited.reg_number}
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
            value={edited.address_1}
            name="address_1"
            onChange={onChange}
          />
        </div>

        <div className="col-sm-4">
          <input
            type="text"
            placeholder="Town"
            value={edited.town}
            name="town"
            onChange={onChange}
          />
        </div>

        <div className="col-sm-4">
          <input
            type="text"
            value={edited.postcode}
            name="postcode"
            onChange={onChange}
            placeholder="Enter UK Postcode"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="col-sm-4">
          <input
            type="text"
            placeholder="Unique Taxpayer Reference"
            value={edited.utr}
            name="utr"
            onChange={onChange}
          />
        </div>

        <div className="col-sm-4">
          <input
            type="text"
            placeholder="UTR Id"
            value={edited.utr_id}
            name="utr_id"
            onChange={onChange}
          />
        </div>

        <div className="col-sm-4">
          <input
            type="text"
            value={edited.utr_code}
            name="utr_code"
            onChange={onChange}
            placeholder="UTR Code"
          />
        </div>
      </div>

      <input
        type="text"
        placeholder="Nationality"
        value={edited.nationality}
        name="nationality"
        onChange={onChange}
      />

      <div className="col-sm-12 text-center ">
        <h5>Application Status</h5>
        <input
          type="radio"
          name="application_status"
          value="Incomplete"
          checked={edited.application_status === 'Incomplete'}
          onChange={onChange}
        />
        Incomplete{' '}
        <input
          type="radio"
          name="application_status"
          value="Complete"
          onChange={onChange}
          checked={edited.application_status === 'Complete'}
        />
        Complete{' '}
      </div>
      <input
        type="submit"
        value="Save changes"
        className="btn btn-primary btn-block"
      />
    </form>
     )
    }
    return <Loader/>
  }
};

export default EmployeeEdit;
