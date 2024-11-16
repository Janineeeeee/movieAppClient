import { useState } from 'react';
import { Form, Button, Card, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import '../App.css'

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
    <Container className="mt-5 text-center">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow-lg rounded">
            <Card.Body>
              <Card.Title className="text-center mb-4 fw-bold">Add Movie</Card.Title>
              <Form onSubmit={createMovie}>
                <Form.Group className="mb-3">
                  <Form.Label>Title:</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter Movie Title" 
                    required 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                    className="rounded-pill"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Director:</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter Director's Name" 
                    required 
                    value={director} 
                    onChange={e => setDirector(e.target.value)}
                    className="rounded-pill"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Year:</Form.Label>
                  <Form.Control 
                    type="number" 
                    placeholder="Enter Release Year" 
                    required 
                    value={year} 
                    onChange={e => setYear(e.target.value)}
                    className="rounded-pill"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
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
                <Form.Group className="mb-3">
                  <Form.Label>Genre:</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter Genre" 
                    required 
                    value={genre} 
                    onChange={e => setGenre(e.target.value)}
                    className="rounded-pill"
                  />
                </Form.Group>
                <Button 
                  variant="dark" 
                  type="submit" 
                  className="w-50 mx-auto d-block rounded-pill my-4 custom-dark-btn" 
                >
                  Add Movie
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
