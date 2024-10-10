import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Notyf } from 'notyf';
import UpdateMovie from '../components/UpdateMovie';
import MovieDetail from '../components/MovieDetail'; 

export default function MovieCard({ movie, fetchData }) {
  const { _id, title, description, genre, director, year, comment } = movie;
  const notyf = new Notyf();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  async function deleteMovie(id) {
    try {
      const response = await fetch(`https://movieapp-api-lms1.onrender.com/movies/deleteMovie/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await response.json();
      console.log("Response status:", response.status);

      if (!response.ok) {
        notyf.error("Unsuccessful Movie Deletion: " + (data.error || "Unknown error occurred"));
        return;
      }

      notyf.success("Movie Deleted Successfully!");
      fetchData(); 
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  }

  return (
    <>
      <Card className="mt-3">
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
        <Card.Footer className="d-flex justify-content-around">
          <button className="btn btn-success btn-sm" onClick={() => setShowUpdateModal(true)}>Update</button>
          <button className="btn btn-dark btn-sm" onClick={() => deleteMovie(_id)}>Delete</button>
          <button className="btn btn-info btn-sm" onClick={() => setShowDetailsModal(true)}>View Details</button>
        </Card.Footer>
      </Card>

      <UpdateMovie 
        show={showUpdateModal} 
        handleClose={() => setShowUpdateModal(false)} 
        movie={movie} 
        fetchData={fetchData} 
      />

      <MovieDetail 
        isOpen={showDetailsModal} 
        onClose={() => setShowDetailsModal(false)} 
        movie={movie} 
      />
    </>
  );
}
