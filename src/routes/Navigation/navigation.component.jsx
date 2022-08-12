import React from "react";
import './navigation.styles.css'
import { Container, Navbar, Nav } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <>
      <Navbar bg="light" expand="lg" className="navigation-container">
        <Container>
          <Navbar.Brand ><Link to=""> React-Bootstrap</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link><Link to="weekly-budget"> Weekly Budget</Link></Nav.Link>
              <Nav.Link><Link to="overall-expenses">Expenses</Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
