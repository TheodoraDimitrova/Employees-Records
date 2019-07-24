import React, { useReducer } from 'react';

import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import {
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REMOVE_ALERT,
  AUTH_ERROR,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Register User

  //Login user

  //Logout

  //clear errors

  //clear_filtered

  //delete_employee

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        user: state.user
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
