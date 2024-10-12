import React, { useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-light py-5">
      <Container className="mt-5 text-center">
        <h1 className="display-4 fw-bold">Find Your Next Favorite Movie</h1>
        <p className="lead">Discover new releases, browse popular movies, and find the perfect film to watch tonight.</p>
        
        {user && user.id !== null ? (
          <>
            <p className="mt-4">You are logged in. Click on Movies to start exploring.</p>
            {user.isAdmin ? (
              <p>
                As an admin, you can manage the platform. 
                <Link to="/getMovies" className="btn btn-secondary ms-2">Go to Admin Dashboard</Link>
              </p>
            ) : (
              <Button variant="primary" className="mt-2">
                <Link to="/getMovies" style={{ color: 'white', textDecoration: 'none' }}>
                  Start Exploring Movies
                </Link>
              </Button>
            )}
          </>
        ) : (
          <p className="mt-4">
            Not a member yet? <Link to="/register" className="text-primary fw-bold">Register Now</Link> and start discovering new movies!
          </p>
        )}
      </Container>
    </div>
  );
}

export default Home;
