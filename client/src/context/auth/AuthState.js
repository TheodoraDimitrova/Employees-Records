import React, { useReducer } from 'react';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import {
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REMOVE_ALERT,
  CLEAR_ERRORS,
  AUTH_ERROR,
  REGISTER_FAIL,
  USER_LOADED
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
  //load user
  const loadUser = async () => {
    //load token into global header
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

  //Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data //token
      });
      loadUser();
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg
      });
    }
  };
  //Login user
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data //token
      });
      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg
      });
    }
  };

  //Logout
  const logout = () => {
    dispatch({
      type: LOGOUT
    });
  };

  //clear errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        register,
        clearErrors,
        loadUser,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
