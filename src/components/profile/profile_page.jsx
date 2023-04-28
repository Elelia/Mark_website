import React, { useState, useEffect, useContext  } from 'react';
import {UserContext} from "../userContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './profile_page.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


export default function Profile() {
    const navigate = useNavigate();
    //const user = useContext(UserContext);
    const [thisUser, setThisUser] = useState({
        mail: null,
        nom: null,
        prenom: null
    });
    const [hide, setHide] = useState(false);
    const [show, setShow] = useState(false);

    const toggleHide = () => {
        setHide(!hide);
    };

    const handleModal = () => {
        setShow(true);
    };

    const handleCloseModal = () => {
        setShow(false);
    };

    const goToPreference = () => {
        navigate('/preference');
    };

    useEffect(()  => {
        const getInfoUser = async () => {
            try {
                const res = await axios.get(`http://192.168.1.73:5000/users/user/`);
                setThisUser(res.data);
            } catch (err) {
                console.log(err);
                alert("Erreur au chargement de vos données");
            }
        }

        getInfoUser();
    }, []);

    return(
        <Container>
            <Row>
                <Col className="4"></Col>
                <Col className="4">
                    <Card>
                        <Card.Body>
                            <h2 className="title">Votre profil</h2>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Votre adresse mail</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={thisUser.mail}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Votre nom</Form.Label>
                                    <Form.Control placeholder="Enter email" value={thisUser.nom} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Votre prénom</Form.Label>
                                    <Form.Control placeholder="Enter email" value={thisUser.prenom}/>
                                </Form.Group>
                                <Button onClick={toggleHide}>Changer votre mot de passe</Button>
                                <div className="divPassword" style={{ display: hide ? "block" : "none" }}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Votre ancien mot de passe</Form.Label>
                                        <Form.Control type="password" placeholder="Ancien mot de passe" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Votre nouveau mot de passe</Form.Label>
                                        <Form.Control type="password" placeholder="Nouveau mot de passe" />
                                    </Form.Group>
                                </div>
                                <Button type="submit" onClick={handleModal}>Valider les changements</Button>
                            </Form>
                            <Button onClick={goToPreference}>Accéder à vos préférences</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
