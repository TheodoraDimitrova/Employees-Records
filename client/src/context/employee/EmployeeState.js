import React, { useReducer } from 'react';
import axios from 'axios';
import EmployeeContext from './EmployeeContext';
import EmployeeReducer from './EmployeeReducer';
import {
  ADD_EMPLOYEE,
  GET_EMPLOYEES,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_EMPLOYEES,
  CLEAR_FILTER,
  ADD_ERROR,
  CLEAR_EMPERRORS
} from '../types';

const EmployeeState = props => {
  const initialState = {
    employees: [],
    current: null,
    filtered: null,
    error: null,
    loading: true
  };
  const [state, dispatch] = useReducer(EmployeeReducer, initialState);

  //add employee
  const addEmployee = async employee => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      
      const res = await axios.post('api/employees', employee, config);
      dispatch({
        type: ADD_EMPLOYEE,
        payload: res.data
      });
    } catch (error) {
      if (error.response.data.errors) {
        dispatch({
          type: ADD_ERROR,
          payload: error.response.data.errors
        });
      } else {
        dispatch({
          type: ADD_ERROR,
          payload: error.response.data.msg
        });
      }
    }
  };
  //get all employees GET_EMPLOYEES
  const getEmployees = async () => {
    try {
      const res = await axios.get('api/employees');

      dispatch({
        type: GET_EMPLOYEES,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: ADD_ERROR,
        payload: error.response.data.msg
      });
    }
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
  const updateEmployee = async employee => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.put(
        `/api/employees/${employee._id}`,
        employee,
        config
      );
      dispatch({
        type: UPDATE_EMPLOYEE,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: ADD_ERROR,
        payload: error.response.data.msg
      });
    }
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
  const deleteEmployee = async id => {
    try {
      await axios.delete(`/api/employees/${id}`);

      dispatch({
        type: DELETE_EMPLOYEE,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: ADD_ERROR,
        payload: error.response.data.msg
      });
    }
  };
  //clear errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_EMPERRORS
    });
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees: state.employees,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addEmployee,
        getEmployees,
        deleteEmployee,
        setEmployee,
        clearCurrent,
        updateEmployee,
        clearFilter,
        filterEmployees,
        clearErrors
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeState;
