import React, { useEffect, Fragment, useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
//import Loader from '../layout/Loader';
import EmployeeContext from '../../context/employee/EmployeeContext';
import AuthContext from '../../context/auth/AuthContext';

const EmployeeDetails = props => {
  const employeeContext = useContext(EmployeeContext);
  const authContext = useContext(AuthContext);
  const {
    setEmployee,
    current,
    clearCurrent,
    deleteEmployee
  } = employeeContext;
  const id = props.match.params.id;

  useEffect(() => {
    authContext.loadUser();
    setEmployee(id);
    

    //eslint-disable-next-line
  }, [current]);
  const onDelete = () => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteEmployee(current._id);
            props.history.push('/dashboard');
            clearCurrent();
          }
        },
        {
          label: 'No',
          onClick: () => props.history.push(`/employee/details/${current._id}`)
        }
      ]
    });
  };

  if (current) {
    return (
      <Fragment>
        <Link to="/dashboard" className="btn btn-light">
          Back to search
        </Link>
        <i
          className="fas fa-print fa-2x"
          style={{ cursor: 'pointer', color: 'black', float: 'right' }}
          onClick={() => window.print()}
        />{' '}
        <i
          className="fas fa-user-times fa-2x"
          style={{
            cursor: 'pointer',
            color: 'red',
            float: 'right',
            marginRight: '1rem'
          }}
          onClick={onDelete}
        />
        <Link to={`/employee/edit/${current._id}`}>
          <i
            className="fas fa-pencil-alt fa-2x"
            style={{
              cursor: 'pointer',
              color: 'green',
              float: 'right',
              marginRight: '1rem'
            }}
          />
        </Link>
        <div className="card grid-2">
          <div>
            <img
              src="data:image/png;base64,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"
              className="center-block"
              alt=""
              style={{ width: '150px' }}
            />
            <h1>{current.name}</h1>
            <h5><span className="font-weight-bold">Phone number : </span> {current.contact_number}</h5>
           
            <h5><span className="font-weight-bold">Email : </span> {current.email}</h5>
            
            <h5><span className="font-weight-bold">Davis : </span> {current.davis_email}</h5>
       
            <h5><span className="font-weight-bold">Address : </span> {current.address_1}</h5>
         
            <h5><span className="font-weight-bold">Town : </span> {current.town}</h5>
       
            <h5><span className="font-weight-bold">Postcode : </span> {current.postcode}</h5>
    
            <h5><span className="font-weight-bold">Gender : </span> {current.gender}</h5>
          
            <h5><span className="font-weight-bold">Date Of Birth : </span> {current.DateOfBirth}</h5>
         
            <h5><span className="font-weight-bold">Nationality : </span> {current.nationality}</h5>
        
          </div>
        
          
          <div>
            <ul>
              <li><h5><span className="font-weight-bold">Employee Status : </span> {current.employment_status}</h5></li>
              <li><h5><span className="font-weight-bold">Application Status : </span> {current.application_status}</h5></li>
              <li><h5><span className="font-weight-bold">Van registration : </span> {current.reg_number}</h5></li>
              <li><h5><span className="font-weight-bold">NINo: </span> {current.niNo}</h5></li>
              <li><h5><span className="font-weight-bold">FD : </span> {current.fd_number}</h5></li>
              <li><h5><span className="font-weight-bold">DrivingLicenceNo : </span> {current.drivingLicenceNo}</h5></li>
              <li><h5><span className="font-weight-bold">DL issued in : </span> {current.dl_status}</h5></li>
              <li><h5><span className="font-weight-bold">Additional driver application : </span> {current.driver_app}</h5></li>
              <li><h5><span className="font-weight-bold">DBS certificate : </span>{current.dbs_certificate}</h5></li>
              <li><h5><span className="font-weight-bold">UTR : </span>{current.utr}</h5></li>
              <li><h5><span className="font-weight-bold">UTR ID : </span>{current.utr_id}</h5></li>
              <li><h5><span className="font-weight-bold">UTR Code : </span>{current.utr_code}</h5></li>
            </ul>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <h1>Back to dashboard</h1>;
  }
};

export default EmployeeDetails;
