import React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../../assets/logo.png'; 
import './Header.css'; // Thêm file CSS

const Header = () => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Navbar.Brand href="/">
        <img
          src={logo}
          width="60"
          height="60"
          className="d-inline-block align-top"
          alt="Logo"
        />{' '}
        <span className="navbar-title">Todo App</span>
      </Navbar.Brand>
    </Navbar>
  );
};

export default Header;
