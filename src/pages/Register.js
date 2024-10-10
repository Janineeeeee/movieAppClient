import React, { useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Container, Form, Button, Card, CardBody, CardTitle } from 'react-bootstrap';
import { Notyf } from 'notyf';
import { jwtDecode } from 'jwt-decode';

function Register() {
  const notyf = new Notyf();
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if ((email !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword)) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }, [email, password, confirmPassword])

  function registerUser  (e) {
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
      {(user.id !== null)
        ?
        <Navigate to="/getMovies" />
        :
        <Card className="w-75 mx-auto">
          <CardBody>
            <CardTitle>Register</CardTitle>
            <Form onSubmit={registerUser  }>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                />
              </Form.Group>

              {isActive ?
                <Button variant="primary" type="submit" id="submitBtn">Submit</Button>
                :
                <Button variant="danger" type="submit" id="submitBtn" disabled>Submit</Button>
              }
              <p>
                Already have an account? <Link to="/login">Login Now</Link>
              </p>
            </Form>
          </CardBody>
        </Card>
      }
    </Container>
  );
}

export default Register;