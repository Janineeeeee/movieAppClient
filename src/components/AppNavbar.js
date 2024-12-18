import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import "../App.css"

export default function AppNavbar() {
    const { user } = useContext(UserContext);

    return (
        <Navbar expand="lg" className="bg-dark text-white">
                <Navbar.Brand as={NavLink} to="/" className="fw-bold text-white ms-5">Movie App</Navbar.Brand>
                <Navbar.Toggle 
                    aria-controls="basic-navbar-nav" 
                    className="border-0 bg-white"
                >
                    <span className="navbar-toggler-icon bg-white"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" className="nav-link-custom mx-2 text-white">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/getMovies" className="nav-link-custom mx-2 text-white">Movies</Nav.Link> 

                        {user && user.id !== null ? (
                            <>
                                {user.isAdmin && (
                                    <Nav.Link as={NavLink} to="/addMovie" className="nav-link-custom mx-2 text-white">Add Movie</Nav.Link>
                                )}
                                <Nav.Link as={NavLink} to="/logout" className="nav-link-custom mx-2 text-white">Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login" className="nav-link-custom mx-2 text-white">Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register" className="nav-link-custom mx-2 text-white">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}
