import React, { useState } from 'react';
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BsFillPlayCircleFill } from "react-icons/bs";
import ReactPlayer from 'react-player';

export default function ResumePage({isOpen, closeModal, video}) {
    const [videoModalIsOpen, setVideoModalIsOpen] = useState(false);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Video Modal"
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
                    maxWidth: '80%',
                    maxHeight: '90%',
                },
            }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <h2>{video.nom}</h2>
                        <p>{video.resume}</p>
                        <p>{video.date_sortie}</p>
                        <span onClick={() => setVideoModalIsOpen(true)}><BsFillPlayCircleFill size={32}/></span>
                    </div>
                    <div className="col-4">
                        <p>Liste des avis</p>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Example textarea</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Valider votre avis
                            </Button>
                        </Form>
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
