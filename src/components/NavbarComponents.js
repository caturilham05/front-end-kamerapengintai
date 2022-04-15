import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BiLogIn } from "react-icons/bi";
import { Link } from "react-router-dom";
function NavbarComponents() {

    return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Kamera Pengintai
            </Link>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                <BiLogIn />
                &nbsp; Login
              </Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponents;
