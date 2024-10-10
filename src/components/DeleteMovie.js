import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Notyf } from 'notyf';

export default function DeleteMovie({ movieId, fetchData, hasPermission }) {
    const notyf = new Notyf();
    const [showDelete, setShowDelete] = useState(false);

    const openDelete = () => {
        setShowDelete(true);
    };

    const closeDelete = () => {
        setShowDelete(false);
    };

    const confirmDelete = () => {
        // Check if the user has permission to delete
        if (!hasPermission) {
            notyf.error("You do not have permission to delete this movie.");
            closeDelete();
            return;
        }

        fetch(`https://movieapp-api-lms1.onrender.com/movies/deleteMovie/${movieId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                notyf.success("Movie deleted successfully");
                fetchData(); 
            } else {
                notyf.error("Error deleting movie");
            }
            closeDelete();
        });
    };

    return (
        <>
            <Button variant="danger" size="sm" onClick={openDelete}>Delete</Button>

            <Modal show={showDelete} onHide={closeDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this movie?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDelete}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
