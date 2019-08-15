import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} Employees records
    </footer>
  );
};
export default Footer;
