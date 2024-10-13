import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import logo from '../../assets/logo.png'; 
import './Header.css';

const Header = () => {
  return (
    <Navbar className="custom-navbar">
      <Container>
        <Navbar.Brand href="/">   {/* click vào logo/ tên ứng dụng, dẫn về href="/" */}
          <img src={logo} alt="Logo"/>
          <span className="navbar-title ms-2">Todo App</span> {/* margin-start 2 thêm khoảng cách giữa logo và tên app */}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;