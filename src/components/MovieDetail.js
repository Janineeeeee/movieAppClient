import React from 'react';
import './MovieDetail.css'; 

const MovieDetail = ({ isOpen, onClose, movie }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content bg-white">
                <h2>{movie.title}</h2>
                <p><strong>Director:</strong> {movie.director}</p>
                <p><strong>Year:</strong> {movie.year}</p>
                <p><strong>Description:</strong> {movie.description}</p>
                <p><strong>Genre:</strong> {movie.genre}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default MovieDetail;
