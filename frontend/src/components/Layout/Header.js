import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import logo from '../../assets/logo.png'; 
import './Header.css';

const Header = () => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src={logo}
            className="d-inline-block align-middle"
            alt="Logo"
          />
          <span className="navbar-title ms-2">Todo App</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;