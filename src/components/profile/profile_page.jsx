import React, { useState, useEffect, useContext  } from 'react';
import {UserContext} from "../userContext";
import axios from "axios";
import './profile_page.css';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function Profile() {
    const user = useContext(UserContext);
    const [thisUser, setThisUser] = useState('');
    const [hide, setHide] = useState(false);
    const [show, setShow] = useState(false);
    const id = user.user.userId;

    const toggleHide = () => {
        setHide(!hide);
    };

    const handleModal = () => {
        setShow(true);
    };

    const handleCloseModal = () => {
        setShow(false);
    };

    useEffect(()  => {
        const getInfoUser = async () => {
            try {
                const res = await axios.get(`http://192.168.1.73:5000/users/user/${id}`);
                setThisUser(res.data);
            } catch (err) {
                console.log(err);
                alert("Non.");
            }
        }
        getInfoUser();
    }, []);

    console.log(thisUser);

    return(
        <div className="container">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title">Votre profil</h2>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Votre adresse mail</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value="" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Votre nom</Form.Label>
                                    <Form.Control type="" placeholder="Enter email" value="" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Votre prénom</Form.Label>
                                    <Form.Control type="" placeholder="Enter email" value="" />
                                </Form.Group>
                                <Button onClick={toggleHide}>Changer votre mot de passe</Button>
                                <br/>
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
                        </div>
                    </div>
                </div>
            </div>
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
        </div>
    )
}
