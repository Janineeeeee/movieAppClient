import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';

export default function AddMovie() {
  const navigate = useNavigate();
  const notyf = new Notyf();

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");

  function createMovie(e) {
    e.preventDefault();

    let token = localStorage.getItem('token');

    fetch('https://movieapp-api-lms1.onrender.com/movies/addMovie', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        director,
        year,
        description,
        genre
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        notyf.error(`Unsuccessful Movie Creation: ${data.message}`);
      } else {
        notyf.success("Movie Added Successfully");
        // Reset form fields
        setTitle("");
        setDirector("");
        setYear("");
        setDescription("");
        setGenre("");

        navigate("/getMovies");
      }
    })
    .catch(error => {
      console.error("Error adding movie:", error);
      notyf.error("An error occurred while adding the movie.");
    });
  }

  return (
    <>
      <h1 className="my-5 text-center">Add Movie</h1>
      <Form onSubmit={createMovie}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Movie Title" 
            required 
            value={title} 
            onChange={e => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Director:</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Director's Name" 
            required 
            value={director} 
            onChange={e => setDirector(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Year:</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Enter Release Year" 
            required 
            value={year} 
            onChange={e => setYear(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description:</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="Enter Description" 
            required 
            value={description} 
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Genre:</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Genre" 
            required 
            value={genre} 
            onChange={e => setGenre(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-5">Add Movie</Button>
      </Form>
    </>
  );
}
