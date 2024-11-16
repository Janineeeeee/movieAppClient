import React, { useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import "../App.css";

function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className="homepage py-5">
      <Container className="mt-5 text-center">
        <h1 className="display-4 fw-bold">Find Your Next Favorite Movie</h1>
        <p className="lead">Discover new releases, browse popular movies, and find the perfect film to watch tonight.</p>
        
        {user && user.id !== null ? (
          <>
            <p className="mt-4">You are logged in. Click on Movies to start exploring.</p>
            {user.isAdmin ? (
              <p>As an admin, you can manage the platform </p>
            ) : (
              <Link to="/getMovies">
                <Button variant="warning" className="mt-2">
                  Start Exploring Movies
                </Button>
              </Link>
            )}
            {user.isAdmin && (
              <Link to="/getMovies">
                <Button variant="warning" className="mt-2 ms-2">
                  Go to Admin Dashboard
                </Button>
              </Link>
            )}
          </>
        ) : (
          <p className="mt-4">
            Not a member yet? <Link to="/register" className="text-warning fw-bold">Register Now</Link> and start discovering new movies!
          </p>
        )}
      </Container>
    </div>
  );
}

export default Home;
