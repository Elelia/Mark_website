import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './profile_page.css';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';


export default function Profile() {
    const navigate = useNavigate();
    const [thisUser, setThisUser] = useState({
        mail: null,
        nom: null,
        prenom: null
    });
    const [newPassword, setNewPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [hide, setHide] = useState(false);
    const [hideValidate, setHideValidate] = useState(false);

    const toggleHide = () => {
        setHide(!hide);
    };

    const toggleHidePassword = () => {
        setHideValidate(!hideValidate);
    };

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
                //await axios.put('http://localhost:5000/users/updateUser', {
                await axios.put('https://mark-api.vercel.app/users/updateUser', {
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
                const res = await axios.get(`https://mark-api.vercel.app/users/user/`);
                //const res = await axios.get(`http://localhost:5000/users/user/`);
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
        </Container>
    )
}
