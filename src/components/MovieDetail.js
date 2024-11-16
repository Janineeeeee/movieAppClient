import React, { useEffect } from 'react';
import styles from './MovieDetail.module.css';

const MovieDetail = ({ isOpen, onClose, movie }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; 
        } else {
            document.body.style.overflow = ''; 
        }
        return () => {
            document.body.style.overflow = ''; 
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div 
            className={`${styles['modal-overlay']} ${isOpen ? styles.open : ''}`} 
            onClick={onClose} 
        >
            <div 
                className={`${styles['modal-content']} ${isOpen ? styles.open : ''}`} 
                onClick={e => e.stopPropagation()}
            >
                <button 
                    className={styles['close-button']} 
                    onClick={onClose} 
                    aria-label="Close"
                >
                    &times;
                </button>
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