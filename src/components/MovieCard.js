import { useState } from 'react';
import { Card } from 'react-bootstrap';
import MovieDetail from '../components/MovieDetail'; 
import "../App.css"

export default function MovieCard({ movie }) {
  const { title, description, genre, director, year, comment } = movie;
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  return (
    <>
      <Card className="movie-card mt-3">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>Director:</Card.Subtitle>
          <Card.Text>{director}</Card.Text>
          <Card.Subtitle>Year:</Card.Subtitle>
          <Card.Text>{year}</Card.Text>
          <Card.Subtitle>Description:</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Card.Subtitle>Genre:</Card.Subtitle>
          <Card.Text>{genre}</Card.Text>
          <Card.Subtitle>Comments:</Card.Subtitle>
          <Card.Text>{comment}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center">
          <button className="btn btn-secondary btn-sm" onClick={() => setShowDetailsModal(true)}>View Details</button>
        </Card.Footer>
      </Card>

      <MovieDetail 
        isOpen={showDetailsModal} 
        onClose={() => setShowDetailsModal(false)} 
        movie={movie} 
      />
    </>
  );
}
