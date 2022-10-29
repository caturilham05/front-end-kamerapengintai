import React, { useState } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style/Login.css";

const apiPost = process.env.REACT_APP_API;

function LoginComponents() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(apiPost + "api/login", {
      email: email,
      password: password
    })
    .then(json => {
      if (json.data.status === "success") {
        localStorage.setItem("id", json.data.data.id);
        localStorage.setItem("token", json.data.access_token);
        localStorage.setItem("name", json.data.data.name);
        window.location.href = "/";
      } else {
        alert("Login Failed");
      }
    })
  };

  return (
    <div className="background">
      <Container className="p-5 d-flex justify-content-center">
        <Card style={{ width: "25rem", height: "35rem", textAlign: "center" }}>
          <Card.Body style={{ marginTop: "4rem", marginBottom: "4rem" }}>
            <Card.Title className="mb-4">
              <h1>Sign In</h1>
            </Card.Title>
            <Form className="w-100" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Text className="text-muted">
                <small>Forgot Your Password?</small>
                <br />
                <small>Or</small>
                <br />
                <small>Don't Have Account?</small>&nbsp;
                <Link to="/register">Register</Link>
              </Form.Text>
              <br />
              <Button
                variant="primary"
                type="submit"
                style={{ width: "10rem", marginTop: "1rem" }}
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>{" "}
      </Container>
    </div>
  );
}

export default LoginComponents;
