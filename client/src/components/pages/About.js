import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import Loader from '../layout/Loader';

const About = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();

    //eslint-disable-next-line
  }, []); //run once
  if (authContext.loading) {
    return <Loader />;
  } else {
    return (
      <div className="container">
        <h1>About this app</h1>
        <p className="my-1">
          This is a full stack React App (functional components and hooks) for
          recording employees info
        </p>
        <p className="bg-dark p">
          <strong>Version: 1.0.0</strong>
        </p>
      </div>
    );
  }
};
export default About;
