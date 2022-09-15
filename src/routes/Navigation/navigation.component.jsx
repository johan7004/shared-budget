import { React, useContext } from "react";
import "./navigation.styles.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../components/context/user.context.jsx";
import { signOutUser } from "../../utils/firebase.config";

export default function NavigationBar() {
  const { currentUser } = useContext(UserContext);

  const signOutHandle = async () => {
    await signOutUser();
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="navigation-container">
        <Container>
          <Navbar.Brand>
            <Link to="">Shared-Budget</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="weekly-budget">
                Weekly Budget
              </Nav.Link>
              <Nav.Link as={Link} to="sign-in">
                {currentUser ? (
                  <button onClick={signOutHandle}> SIGN OUT</button>
                ) : (
                  "SIGN UP"
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
