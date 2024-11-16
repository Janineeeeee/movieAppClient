import { useState, useContext, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';

export default function UpdateMovie({ show, handleClose, movie, fetchData }) {
  const { user } = useContext(UserContext);
  const notyf = new Notyf();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    genre: '',
    director: '',
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        description: movie.description,
        year: movie.year,
        genre: movie.genre,
        director: movie.director,
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateMovie = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://movieapp-api-lms1.onrender.com/movies/updateMovie/${movie._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update movie');
      }

      notyf.success('Movie Updated Successfully!');
      fetchData(); 
      handleClose();
    } catch (error) {
      notyf.error(`Unsuccessful Movie Update: ${error.message}`);
      console.error('Update movie error:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={updateMovie}>
        <Modal.Header closeButton style={{ backgroundColor: 'black', color: 'white' }}>
          <Modal.Title>Update Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {['title', 'description', 'year', 'genre', 'director'].map((field, idx) => (
            <Form.Group controlId={`movie${field.charAt(0).toUpperCase() + field.slice(1)}`} key={idx}>
              <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
              <Form.Control
                type={field === 'year' ? 'number' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </Form.Group>
          ))}
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
  );
}
