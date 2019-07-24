import React, { useReducer } from 'react';

import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import {
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_FAIL,
} from '../types';

const AuthState = props => {
  const initialState = {
      token:localStorage.getItem('token'),
      isAuthenticated:null,
      loading:true,
      error:null,
      user:null
    
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Load user
  const addEmployee = employee => {
    dispatch({
      type: ADD_EMPLOYEE,
      payload: employee
    });
  };
  //Register User
  const setEmployee = id => {
    dispatch({
      type: SET_CURRENT,
      payload: id
    });
  };
  //Login user
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  //Logout
  const updateEmployee = employee => {
    dispatch({
      type: UPDATE_EMPLOYEE,
      payload: employee
    });
  };

  //clear errors
  const filterEmployees = text => {
    dispatch({
      type: FILTER_EMPLOYEES,
      payload: text
    });
  };

  //clear_filtered
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  //delete_employee
  const deleteEmployee = id => {
    dispatch({
      type: DELETE_EMPLOYEE,
      payload: id
    });
  };

  return (
    <EmployeeContext.Provider
      value={{
       token:state.token,
       loading:state.loading,
       error:state.error,
       isAuthenticated:state.isAuthenticated,
       user:state.user

      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export default AuthState;
