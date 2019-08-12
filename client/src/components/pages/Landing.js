import React ,{useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import Loader from '../layout/Loader';

const Landing=(props)=> {
    const authContext = useContext(AuthContext);
    const { isAuthenticated ,loading} = authContext;
    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/dashboard');
          }
        
    }, [])

    return (
       
            <div className="landing">
              <div className="dark-overlay landing-inner text-light">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <h1 className="display-3 mb-4 text-dark">Employees records</h1>
                      <p className="lead text-dark">
                        {' '}
                        Create a profile, for every employee in your company
                      </p>
                      <hr />
                      <Link to="/register" className="btn btn-lg btn-warning mr-2">
                        Sign Up
                      </Link>
                      <Link to="/login" className="btn btn-lg btn-warning mr-2">
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
    
}

export default  Landing