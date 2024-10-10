import { useEffect, useState, useContext } from 'react';
import MovieCard from '../components/MovieCard';
import UserContext from '../context/UserContext';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Movies() {
  const { user } = useContext(UserContext); 
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('https://movieapp-api-lms1.onrender.com/movies/getMovies');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch movies');
      }

      setMovies(data.movies || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  if (loading) {
    return <Spinner animation="border" className="mt-5" />;
  }

  return (
    <>
      {user ? (
        <>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {movies.length > 0 ? (
            <>
              <h1 className='text-center mt-5'>Movies</h1>
              <Row> 
                {movies.map(movie => (
                  <Col md={3} key={movie._id}>
                    <MovieCard movie={movie} />
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <h1>No Movies Available</h1>
          )}
        </>
      ) : (
        <>
          <h1>You are not logged in</h1>
          <Link className="btn btn-primary" to={"/login"}>Login to View</Link>
        </>
      )}
    </>
  );
}
