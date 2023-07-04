import React, {useContext, useEffect, useState} from 'react';
import Modal from 'react-modal';
import { BsFillPlayCircleFill, BsX } from "react-icons/bs";
import ReactPlayer from 'react-player';
import axios from "axios";
import './resume_page.css';
import { Container, Row, Col, Button, Accordion, Form } from 'react-bootstrap';
import AccordionItem from "react-bootstrap/AccordionItem";

export default function ResumePageVideo({isOpen, closeModal, video}) {
    const [avis, setAvis] = useState([]);
    const [url, setUrl] = useState(null);
    const [videoModalIsOpen, setVideoModalIsOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [note, setNote] = useState('');
    const [saison, setSaison] = useState([]);
    const [episode, setEpisode] = useState([]);
    const seriefilmId = video.id;
    //const id_film = video.id_film;
    //const videoId = video.id_video;

    const getAvis = async () => {
        await axios.get(`https://mark-api.vercel.app/seriefilm/avis/${seriefilmId}` )
        //await axios.get(`http://localhost:5000/seriefilm/avis/${seriefilmId}`)
            .then(function (response) {
                setAvis(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const getSaison = async () => {
        await axios.get(`https://mark-api.vercel.app/seriefilm/serie/saison/${seriefilmId}` )
        //await axios.get(`http://localhost:5000/seriefilm/serie/saison/${seriefilmId}`)
            .then(function (response) {
                setSaison(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {

        getAvis();
        getSaison();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const date = new Date().toLocaleString();
        try {
            await axios.post('https://mark-api.vercel.app/seriefilm/avis/insert', {
            //await axios.post('http://localhost:5000/seriefilm/avis/insert', {
                seriefilmId,
                comment,
                note,
                date
            })
            alert("Votre avis a bien été publié");
        } catch (err) {
            console.log(err);
            alert("Un problème est survenu. Veuillez réessayer ultérieurement.");
        }
        getAvis();
    };

    const showVideo = async (event, url, id_episode) => {
        event.preventDefault();
        try {
            setVideoModalIsOpen(true);
            setUrl(url);
            const id_film = null;
            //await axios.post('http://localhost:5000/seriefilm/saw', {
            await axios.post('https://mark-api.vercel.app/seriefilm/saw', {
                id_film,
                id_episode
            })
        } catch (err) {
            console.log(err);
        }
    };

    const getEpisode = async (event, id_saison) => {
        event.preventDefault();
        try {
            //await axios.get(`http://localhost:5000/seriefilm/serie/saison/episode/${id_saison}`)
            await axios.get(`https://mark-api.vercel.app/seriefilm/serie/saison/episode/${id_saison}`)
                .then(function (response) {
                    setEpisode(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (err) {
            console.log(err);
        }
    };

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
                    maxHeight: '100%',
                },
            }}
        >
            <Container>
                <Row>
                    <Col xs={12} sm={8} md={8} lg={11} xl={11}></Col>
                    <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                        <span onClick={closeModal}><BsX size={32}/></span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={8} sm={6} md={7} lg={6} xl={4}>
                        <img className="affiche" src={video.url_affiche}/>
                    </Col>
                    <Col xs={8} sm={8} md={5} lg={4} xl={4}>
                        <h2>{video.nom}</h2>
                        <p>Synopsis : <br/>{video.resume}</p>
                        <Accordion>
                            {saison.map(saison => (
                                <AccordionItem eventKey={saison.id} onClick={(event) => getEpisode(event, saison.id)}>
                                    <Accordion.Header>{saison.nom} - {new Date(saison.date_sortie).toLocaleDateString('fr-FR')}</Accordion.Header>
                                    {episode.map(ep => (
                                        <Accordion.Body>
                                            <h5>{ep.nom}</h5>
                                            <p>{ep.resume}</p>
                                            <p>Voir l'épisode <span onClick={(event) =>
                                                showVideo(event, ep.url, ep.id)}><BsFillPlayCircleFill size={32}/></span></p>
                                            <p>---------------------</p>
                                        </Accordion.Body>
                                    ))}
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Col>
                    <Col xs={8} sm={8} md={4} lg={4} xl={4}>
                        <div>
                            {avis.length > 0 ? (
                                avis.map(avis => (
                                    <div key={avis.id}>
                                        <h3>{avis.prenom} {avis.nom}</h3>
                                        <p>{avis.note}/20 - {new Date(avis.jour).toLocaleDateString('fr-FR')}</p>
                                        <p>{avis.commentaire}</p>
                                        <br/>
                                    </div>
                                ))
                            ) : (
                                <p>Aucun avis</p>
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
                    </Col>
                </Row>
            </Container>
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
                {url && <ReactPlayer url={url} playing={videoModalIsOpen}/> }
            </Modal>
        </Modal>
    );
}
