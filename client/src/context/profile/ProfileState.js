import React, { useReducer } from 'react';

import ProfileContext from './ProfileContext';
import ProfileReducer from './ProfileReducer';
import { ADD_PROFILE, UPDATE_PROFILE } from '../types';

const ProfileState = props => {
  const initialState = {
       profile:null
  };
  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  //add employee
  const setProfile = profile => {
    dispatch({
      type: ADD_PROFILE,
      payload: profile
    });
  };


  //update_employee
  const updateProfile = profile => {
    dispatch({
      type: UPDATE_PROFILE,
      payload: profile
    });
  };



 


  return (
    <ProfileContext.Provider
      value={{
        profile: state,
        setProfile,
        updateProfile
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
