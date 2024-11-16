import { useState, useEffect, useContext } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
    const notyf = new Notyf();
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    const authenticate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://movieapp-api-lms1.onrender.com/users/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log(data);

            if (data.access) {
                const decodedToken = jwtDecode(data.access);
                localStorage.setItem('token', data.access);
                setUser({
                    id: decodedToken.id,
                    isAdmin: decodedToken.isAdmin
                });
                setEmail('');
                setPassword('');
                notyf.success("You are now logged in");
            } else if (data.message === "Email and password do not match") {
                notyf.error("Incorrect email or password");
            } else {
                notyf.error(`${email} does not exist`);
            }
        } catch (error) {
            notyf.error("An error occurred. Please try again.");
            console.error("Login error:", error);
        }
    };

    useEffect(() => {
        setIsActive(email !== '' && password !== '');
    }, [email, password]);

    return (
        <Container className="mt-5 text-center">
            {user.id !== null ? (
                <Navigate to="/getMovies" />
            ) : (
                <Row className="justify-content-center">
                    <Col md={6} lg={4}>
                        <Card className="shadow-lg rounded">
                            <Card.Body>
                                <Card.Title className="text-center mb-4 fw-bold">Login</Card.Title>
                                <Form onSubmit={authenticate}>
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

                                    <Button 
                                        variant={isActive ? "dark" : "secondary"}
                                        type="submit" 
                                        className="w-50 rounded-pill"
                                        disabled={!isActive}
                                    >
                                        Login
                                    </Button>

                                    <p className="mt-3">
                                        Don't have an account? 
                                        <Link to="/register" className="text-dark fw-bold"> Register Now</Link>
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
