import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import UpdateMovie from '../components/UpdateMovie'; 
import DeleteMovie from '../components/DeleteMovie';

export default function AdminView({ movie, fetchData }) {
  const [movies, setMovies] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    setMovies(movie);
  }, [movie]);

  const handleUpdateClick = (movie) => {
    setSelectedMovie(movie);
    setShowUpdateModal(true);
  };

  return (
    <>
      <h1 className="text-center my-4">Admin Dashboard</h1>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Description</th>
            <th>Genre</th>
            <th>Comments</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.length > 0 ? movies.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>{movie.year}</td>
              <td>{movie.description}</td>
              <td>{movie.genre}</td>
              <td>{movie.comment}</td>
              <td>
                <Button variant="success" size="sm" onClick={() => handleUpdateClick(movie)}>Update</Button>
              </td>
              <td>
                <DeleteMovie movieId={movie._id} fetchData={fetchData} />
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="8" className="text-center">No Movies Available</td>
            </tr>
          )}
        </tbody>
      </Table>

      {selectedMovie && (
        <UpdateMovie 
          show={showUpdateModal} 
          handleClose={() => setShowUpdateModal(false)} 
          movie={selectedMovie} 
          fetchData={fetchData} 
        />
      )}
    </>
  );
}
