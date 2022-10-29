import React, { useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "../style/Login.css";

const apiPost = process.env.REACT_APP_API;

function RegisterComponents() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(apiPost + "api/register", {
        group_ids: ",10,",
        name: name,
        email: email,
        password: password,
      })
      .then((json) => {
        window.location.href = "/login";
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
        }
      });
  };
  return (
    <div className="background">
      <Container className="p-5 d-flex justify-content-center">
        <Card style={{ width: "25rem", height: "35rem", textAlign: "center" }}>
          <Card.Body style={{ marginTop: "2rem", marginBottom: "4rem" }}>
            <Card.Title className="mb-4">
              <h1>Sign Up</h1>
            </Card.Title>
            <Form className="w-100" onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  onChange={(e) => setName(e.target.value)}
                  required="required"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  required="required"
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
                <small>Have Account?</small>&nbsp;
                <Link to="/login">Login</Link>
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

export default RegisterComponents;
