import { useState, useContext } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';

export default function UpdateMovie({ show, handleClose, movie, fetchData }) {
  const { user } = useContext(UserContext);
  const notyf = new Notyf();

  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [year, setYear] = useState(movie.year);
  const [genre, setGenre] = useState(movie.genre);
  const [director, setDirector] = useState(movie.director);

  const updateMovie = (e) => {
    e.preventDefault();

    const updatedMovie = {
      title,
      description,
      year,
      genre,
      director,
    };

    fetch(`https://movieapp-api-lms1.onrender.com/movies/updateMovie/${movie._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notyf.error(`Unsuccessful Movie Update: ${data.message}`);
        } else {
          notyf.success('Movie Updated Successfully!');
          fetchData();
          handleClose();
        }
      })
      .catch((error) => {
        console.error('Update movie error:', error);
      });
  };

  return (
    <>
      {user.isAdmin ? (
        <Modal show={show} onHide={handleClose}>
          <Form onSubmit={updateMovie}>
            <Modal.Header closeButton style={{ backgroundColor: 'black', color: 'white' }}>
              <Modal.Title>Update Movie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="movieTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="movieDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="movieYear">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="movieGenre">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  type="text"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="movieDirector">
                <Form.Label>Director</Form.Label>
                <Form.Control
                  type="text"
                  value={director}
                  onChange={(e) => setDirector(e.target.value)}
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="dark" type="submit">
                Update
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      ) : (
        <div>You do not have permission to update movies.</div>
      )}
    </>
  );
}