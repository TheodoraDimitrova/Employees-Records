import React, { useReducer } from 'react';

import EmployeeContext from './EmployeeContext';
import EmployeeReducer from './EmployeeReducer';
import {
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_EMPLOYEES,
  CLEAR_FILTER
} from '../types';

const EmployeeState = props => {
  const initialState = {
    employees: [
      {
        id: '1',
        user: '5d2e4172e2de9321ec43a9cf',
        name: 'first employee',
        age: 22,
        email: 'first@abv.bg',
        gender: 'Female',
        contact_number: '+359897452212',
        githubusername: 'First Proto',
        employment_status: 'Active',
        education_qualification: 'JS developer',
        nationality: 'Bulgarian',
        date: '2019-07-19T19:35:32.776Z'
      },
      {
        id: '2',
        user: '5d2e4172e2de9321ec43a9cf',
        name: 'second employee',
        age: 22,
        email: 'second@abv.bg',
        gender: 'Female',
        contact_number: '+359897452212',
        githubusername: 'SECond',
        employment_status: 'Inactive',
        education_qualification: 'JS developer',
        nationality: 'Bulgarian',
        date: '2019-07-19T19:35:32.776Z'
      },
      {
        id: '3',
        user: '5d2e4172e2de9321ec43a9cf',
        name: 'PavPetiael Petrov',
        age: 42,
        email: 'third@abv.bg',
        gender: 'Male',
        contact_number: '+359897452292',
        githubusername: 'Pafeto',
        employment_status: 'Active',
        education_qualification: 'JS developer',
        nationality: 'Bulgarian',
        date: '2019-07-19T19:35:32.776Z'
      }
    ],
    current: null,
    filtered: null
  };
  const [state, dispatch] = useReducer(EmployeeReducer, initialState);

  //add employee
  const addEmployee = employee => {
    dispatch({
      type: ADD_EMPLOYEE,
      payload: employee
    });
  };
  //set current employee
  const setEmployee = id => {
    dispatch({
      type: SET_CURRENT,
      payload: id
    });
  };
  //clear_current employee
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  //update_employee
  const updateEmployee = employee => {
    dispatch({
      type: UPDATE_EMPLOYEE,
      payload: employee
    });
  };

  //filter_employees
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
        employees: state.employees,
        current: state.current,
        filtered:state.filtered,
        addEmployee,
        deleteEmployee,
        setEmployee,
        clearCurrent,
        updateEmployee,
        clearFilter,
        filterEmployees
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeState;
