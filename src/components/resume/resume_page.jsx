import React, { useState } from 'react';
import Modal from 'react-modal';
import { BsFillPlayCircleFill } from "react-icons/bs";
import ReactPlayer from 'react-player';

export default function ResumePage({isOpen, closeModal, video}) {
    const [videoModalIsOpen, setVideoModalIsOpen] = useState(false);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Video Modal"
        >
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <h2>{video.nom}</h2>
                        <p>{video.resume}</p>
                        <p>{video.annee}</p>
                        <span onClick={() => setVideoModalIsOpen(true)}><BsFillPlayCircleFill size={32}/></span>
                    </div>
                    <div className="col-4">
                        <p>Là ce serait les avis</p>
                    </div>
                </div>
            </div>
            <button onClick={closeModal}>Close</button>
            <Modal
                isOpen={videoModalIsOpen}
                onRequestClose={() => setVideoModalIsOpen(false)}
                contentLabel="Video Player Modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth: '1100px',
                        maxHeight: '900px',
                    },
                }}
            >
                <ReactPlayer url="https://www.youtube.com/watch?v=mqqft2x_Aa4" playing={videoModalIsOpen} />
            </Modal>
        </Modal>
    );
}
