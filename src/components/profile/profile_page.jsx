import React, { useState, useEffect, useContext  } from 'react';
import {UserContext} from "../utils/userContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './profile_page.css';
import { Container, Row, Col, Card, Button, Form, Modal, InputGroup } from 'react-bootstrap';


export default function Profile() {
    const navigate = useNavigate();
    //const user = useContext(UserContext);
    const [thisUser, setThisUser] = useState({
        mail: null,
        nom: null,
        prenom: null
    });
    //const [oldMdp, setOldMdp] = useState('');
    const [newPassword, setNewPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [hide, setHide] = useState(false);
    const [hideValidate, setHideValidate] = useState(false);
    //const [show, setShow] = useState(false);

    const toggleHide = () => {
        setHide(!hide);
    };

    const toggleHidePassword = () => {
        setHideValidate(!hideValidate);
    };

    // const handleModal = () => {
    //     setShow(true);
    // };
    //
    // const handleCloseModal = () => {
    //     setShow(false);
    // };

    const goToPreference = () => {
        navigate('/preference');
    };

    const validateModification = async (e) => {
        e.preventDefault();
        try{
            console.log(thisUser);
            if(verifyPassword === '') {
                alert("Vous n'avez pas saisi votre mot de passe.");
            } else {
                const nom = thisUser.nom;
                const prenom = thisUser.prenom;
                const mail = thisUser.mail;
                await axios.put('http://192.168.1.73:5000/users/updateUser', {
                    nom,
                    prenom,
                    mail,
                    newPassword,
                    verifyPassword
                })
                alert("Vos changements ont bien été enregistrés.")
            }
        } catch(err){
            console.log(err);
            alert("Vos changements n'ont pas été enregistrés, veuillez réessayer.");
        }
    };

    useEffect(()  => {
        const getInfoUser = async () => {
            try {
                //const res = await axios.get(`https://mark-api.vercel.app/users/user/`);
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
                <Col sm={2} md={2} lg={4}></Col>
                <Col xs={12} sm={8} md={8} lg={4}>
                    <Card>
                        <Card.Body>
                            <h2 className="title">Votre profil</h2>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Votre adresse mail</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={thisUser.mail} onChange={(e) => setThisUser(prevState => ({
                                        ...prevState,
                                        mail: e.target.value
                                    }))}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Votre nom</Form.Label>
                                    <Form.Control placeholder="Enter email" value={thisUser.nom} onChange={(e) => setThisUser(prevState => ({
                                        ...prevState,
                                        nom: e.target.value
                                    }))}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Votre prénom</Form.Label>
                                    <Form.Control placeholder="Enter email" value={thisUser.prenom} onChange={(e) => setThisUser(prevState => ({
                                        ...prevState,
                                        prenom: e.target.value
                                    }))}/>
                                </Form.Group>
                                <Button onClick={toggleHide}>Changer votre mot de passe</Button>
                                <div className="divPassword" style={{ display: hide ? "block" : "none" }}>
                                    {/*<Form.Group className="mb-3" controlId="formBasicEmail">*/}
                                    {/*    <Form.Label>Votre ancien mot de passe</Form.Label>*/}
                                    {/*    <Form.Control type="password" placeholder="Ancien mot de passe" onChange={(e) => setOldMdp(e.target.value)}/>*/}
                                    {/*</Form.Group>*/}
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Votre nouveau mot de passe</Form.Label>
                                        <Form.Control type="password" placeholder="Nouveau mot de passe" onChange={(e) => setNewPassword(e.target.value)} />
                                    </Form.Group>
                                </div>
                                <Button onClick={toggleHidePassword}>Valider les changements</Button>
                                <div className="divPassword" style={{ display: hideValidate ? "block" : "none" }}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Saisissez votre mot de passe actuel pour valider vos changements</Form.Label>
                                        <Form.Control type="password" placeholder="Mot de passe actuel" onChange={(e) => setVerifyPassword(e.target.value)} />
                                    </Form.Group>
                                    <Button type="submit" onClick={validateModification}>Valider</Button>
                                </div>
                            </Form>
                            <Button onClick={goToPreference}>Accéder à vos préférences</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/*<Modal show={show} onHide={handleCloseModal}>*/}
            {/*    <Modal.Body>*/}
            {/*        <h2>Saisissez votre mot de passe actuel pour valider vos changements</h2>*/}
            {/*        <InputGroup className="mb-3">*/}
            {/*            <Form.Control*/}
            {/*                placeholder="mot de passe actuel"*/}
            {/*                aria-label="verifyPassword"*/}
            {/*                aria-describedby="basic-addon1"*/}
            {/*                type="password"*/}
            {/*                onChange={(e) => setVerifyPassword(e.target.value)}*/}
            {/*            />*/}
            {/*        </InputGroup>*/}
            {/*    </Modal.Body>*/}
            {/*    <Modal.Footer>*/}
            {/*        <Button variant="secondary" onClick={handleCloseModal}>*/}
            {/*            Fermer*/}
            {/*        </Button>*/}
            {/*        <Button variant="primary" onClick={validateModification}>*/}
            {/*            Valider*/}
            {/*        </Button>*/}
            {/*    </Modal.Footer>*/}
            {/*</Modal>*/}
        </Container>
    )
}
