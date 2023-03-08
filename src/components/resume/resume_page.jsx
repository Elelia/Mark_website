import React, {useContext, useEffect, useState} from 'react';
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {UserContext} from "../userContext";
import { BsFillPlayCircleFill, BsX } from "react-icons/bs";
import ReactPlayer from 'react-player';
import axios from "axios";

export default function ResumePage({isOpen, closeModal, video}) {
    const user = useContext(UserContext);
    const [avis, setAvis] = useState([]);
    const [videoModalIsOpen, setVideoModalIsOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [note, setNote] = useState('');
    const seriefilmId = video.id;

    useEffect(() => {
        console.log('hook');
        axios.get(`http://192.168.1.73:5000/seriefilm/avis/${seriefilmId}` )
            .then(function (response) {
                setAvis(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [avis]);

    console.log(avis);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = user.user;
        const date = new Date().toLocaleString();
        try {
            await axios.put('http://192.168.1.73:5000/seriefilm/avis/insert', {
                userId,
                seriefilmId,
                comment,
                note,
                date
            });
            alert("Votre avis a bien été publié");
        } catch (err) {
            console.log(err);
            alert("Un problème est survenu. Veuillez réessayer ultérieurement.");
        }
    }

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
                    <div className="col-11"></div>
                    <div className="col-1">
                        <span onClick={closeModal}><BsX size={32}/></span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <h2>{video.nom}</h2>
                        <p>{video.resume}</p>
                        <p>{video.date_sortie}</p>
                        <span onClick={() => setVideoModalIsOpen(true)}><BsFillPlayCircleFill size={32}/></span>
                    </div>
                    <div className="col-4">
                        <div>
                            {avis.length > 0 ? (
                                avis.map(avis => (
                                    <div key={avis.id}>
                                        <h2>{avis.note} - {avis.date}</h2>
                                        <p>{avis.commentaire}</p>
                                        <br/>
                                    </div>
                                ))
                            ) : (
                                <p>Liste des avis</p>
                            )}
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Saisissez votre avis</Form.Label>
                                <Form.Control as="textarea" rows={3} value={comment} onChange={(e) => setComment(e.target.value)}/>
                            </Form.Group>
                            <Form.Select aria-label="Default select example" value={note} onChange={(e) => setNote(e.target.value)}>
                                <option>Votre note</option>
                                <option value="1">1/20</option>
                                <option value="2">2/20</option>
                                <option value="3">3/20</option>
                                <option value="4">4/20</option>
                                <option value="5">5/20</option>
                                <option value="6">6/20</option>
                                <option value="7">7/20</option>
                                <option value="8">8/20</option>
                                <option value="9">9/20</option>
                                <option value="10">10/20</option>
                                <option value="11">11/20</option>
                                <option value="12">12/20</option>
                                <option value="13">13/20</option>
                                <option value="14">14/20</option>
                                <option value="15">15/20</option>
                                <option value="16">16/20</option>
                                <option value="17">17/20</option>
                                <option value="18">18/20</option>
                                <option value="19">19/20</option>
                                <option value="20">20/20</option>
                            </Form.Select><br/>
                            <Button variant="primary" type="submit">
                                Valider votre avis
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
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
                {/*changer la requête pour récupérer l'url de video*/}
                <ReactPlayer url="https://www.youtube.com/watch?v=mqqft2x_Aa4" playing={videoModalIsOpen} />
            </Modal>
        </Modal>
    );
}
