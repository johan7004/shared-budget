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
      <Navbar  expand="lg" className="navigation-container">
        <Container>
          <Navbar.Brand>
            {!currentUser ? (
              <Link to="">Shared-Budget</Link>
            ) : (
              <Link to="dashboard">Shared-Budget</Link>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {currentUser ? (
                <Nav.Link as={Link} to="weekly-budget">
                  Set Goals
                </Nav.Link>
              ) : (
                ""
              )}

              {currentUser ? (
                <>
                  <Nav.Link as={Link} to="/">
                    <button onClick={signOutHandle}> SIGN OUT</button>
                  </Nav.Link>
                  <span className="user-name">
                    {currentUser.displayName
                      ? `Hey!! ${currentUser.displayName}`
                      : ""}
                  </span>
                </>
              ) : (
                <Nav.Link as={Link} to="sign-in">
                  SIGN IN
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
