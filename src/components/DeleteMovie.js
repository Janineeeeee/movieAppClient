import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function DeleteMovie({ movieId, fetchData }) {
  const notyf = new Notyf();
  const [show, setShow] = React.useState(false);

  const handleDelete = () => {
    fetch(`https://movieapp-api-lms1.onrender.com/movies/deleteMovie/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || 'Unknown error occurred');
          });
        }
        return res.json();
      })
      .then(() => {
        notyf.success('Movie Deleted Successfully');
        fetchData();
      })
      .catch((error) => {
        notyf.error(`Error: ${error.message}`);
      })
      .finally(() => {
        setShow(false);
      });
  };

  return (
    <>
      <Button variant="dark" size="sm" onClick={() => setShow(true)}>Delete</Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this movie?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
