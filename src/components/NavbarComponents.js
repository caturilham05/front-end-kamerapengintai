import React from "react";
import axios from "axios";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineEmail, MdNotificationsNone } from "react-icons/md";

const apiPost = "http://127.0.0.1:8000/";
const getToken = localStorage.getItem("token");
const getName = localStorage.getItem("name");
const getId = localStorage.getItem("id");

const authAxios = axios.create({
  baseURL: apiPost,
  headers: {
    Authorization: `Bearer ${getToken}`,
  },
  id: getId,
});

function NavbarComponents() {
  const logout = () => {
    authAxios.post("api/logout");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.href = "/";
    alert("Logout Success");
  };
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Kamera Pengintai
            </Link>
          </Navbar.Brand>
          <Nav className="ms-auto">
            {!getName ? (
              <Nav.Link>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <BiLogIn />
                  &nbsp; Login
                </Link>
              </Nav.Link>
            ) : (
              <>
                {!getName ? (
                  <>
                    <Nav.Link href="/login">
                      <MdNotificationsNone />
                    </Nav.Link>
                    <Nav.Link href="/login">
                      <MdOutlineEmail />
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link href="/">
                      <MdNotificationsNone />
                    </Nav.Link>
                    <Nav.Link href="/">
                      <MdOutlineEmail />
                    </Nav.Link>
                  </>
                )}
                <NavDropdown title={getName} id="collasible-nav-dropdown">
                  <NavDropdown.Item>
                    <Link
                      to={`/user`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <CgProfile />
                      &nbsp;Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      to={`/cart/${getId}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <BsCart3 />
                      &nbsp;Cart
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "black" }}
                      onClick={logout}
                    >
                      <BiLogOut />
                      &nbsp;Logout
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponents;
