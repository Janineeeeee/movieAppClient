import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

function Home() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Container className="mt-5 text-center">
        <h1>Find Your Next Favorite Movie</h1>
        <p>Discover new releases, browse popular movies, and find the perfect film to watch tonight.</p>
        
        {user.id !== null ? (
          <>
            <p>You are logged in. Click on Movies to start exploring.</p>
            {user.isAdmin ? (
              <p>
                As an admin, you can manage the platform. 
                <Link to="/getMovies" className="btn btn-secondary ms-2">Go to Admin Dashboard</Link>
              </p>
            ) : (
              <button className="btn btn-primary">
                <Link to="/getMovies" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Start Exploring Movies
                </Link>
              </button>
            )}
          </>
        ) : (
          <p>
            Not a member yet? <Link to="/register">Register Now</Link> and start discovering new movies!
          </p>
        )}
      </Container>
    </div>
  );
}

export default Home;
