import React, { useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { Notyf } from 'notyf';
import { jwtDecode } from 'jwt-decode';

function Register() {
  const notyf = new Notyf();
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  // Check if the form is complete and if passwords match
  useEffect(() => {
    if ((email !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password, confirmPassword]);

  // Handle user registration
  function registerUser(e) {
    e.preventDefault();

    fetch('https://movieapp-api-lms1.onrender.com/users/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data.message === "Registered Successfully") {
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          notyf.success("Registration successful");

          const decodedToken = jwtDecode(data.access);
          localStorage.setItem('token', data.access);
          setUser({
            id: decodedToken._id,
            isAdmin: decodedToken.isAdmin
          });
        } else {
          notyf.error("Registration failed");
        }
      })
      .catch(error => {
        console.error(error);
        notyf.error("Registration failed");
      });
  }

  return (
    <Container className="mt-5 text-center">
      {user.id !== null ? (
        <Navigate to="/getMovies" />
      ) : (
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow-lg rounded">
              <Card.Body>
                <Card.Title className="text-center mb-4 fw-bold">Register</Card.Title>
                <Form onSubmit={registerUser}>
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-pill"
                    />
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-pill"
                    />
                  </Form.Group>

                  <Form.Group controlId="confirmPassword" className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="rounded-pill"
                    />
                  </Form.Group>

                  <Button
                    variant={isActive ? "dark" : "secondary"}
                    type="submit"
                    className="w-50 rounded-pill"
                    disabled={!isActive}
                  >
                    Submit
                  </Button>

                  <p className="mt-3">
                    Already have an account? <Link to="/login" className="text-dark fw-bold">Login Now</Link>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Register;
