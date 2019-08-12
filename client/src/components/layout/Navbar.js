import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logout } = authContext;

  const onLogout = () => {
    logout();
  };

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link text-warning" to="/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-warning" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );
  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <div className="navbar-text text-white">
      Hello ,{user && user.name}!
     </div>
      <li className="navbar-nav ml-auto">
        <Link className="nav-link text-warning" to="/add">Add Employee</Link>
      </li>
      <li className="navbar-nav ml-auto">
        <Link className="nav-link text-warning" to="/about">About</Link>
      </li>
      <li className="navbar-nav ml-auto">
        <a className="nav-link text-warning" onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        {isAuthenticated?(<Link className="navbar-brand" to="/dashboard">
          <i className={icon} /> {title}
        </Link>):(<Link className="navbar-brand" to="/">
          <i className={icon} /> {title}
        </Link>)}   
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mobile-nav">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};
Navbar.defaultProps = {
  title: 'Employees Records',
  icon: 'fas fa-id-card-alt'
};

export default Navbar;
