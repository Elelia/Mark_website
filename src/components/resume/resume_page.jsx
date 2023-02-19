import React, { useState } from 'react';
import Modal from 'react-modal';

export default function ResumePage({isOpen, closeModal, video}) {

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Video Modal"
        >
            <h2>{video.nom}</h2>
            <p>{video.resume}</p>
            <p>{video.annee}</p>
            <button onClick={closeModal}>Close</button>
        </Modal>
    );
}
