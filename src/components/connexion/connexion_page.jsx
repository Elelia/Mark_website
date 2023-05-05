import React, { useState, useEffect, useContext   } from 'react';
import {UserContext} from "../utils/userContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './connexion_page.css';
import { Container, Row, Col, Card, Button, Modal, Form, ProgressBar } from 'react-bootstrap';
import { useGoogleLogin } from '@react-oauth/google';

export default function Connexion() {
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const [userGoogle, setUserGoogle] = useState(null);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [emailSign, setEmailSign] = useState('');
    const [passwordSign, setPasswordSign] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');

    const signInClose = () => setShow(false);
    const signInShow = () => setShow(true);

    // pour cacher la navbar
    useEffect(() => {
        document.querySelector('.navbar').style.display = 'none';
        return () => {
            document.querySelector('.navbar').style.display = 'block';
        }
    }, []);

    //si user est définit, donc si la connexion s'est bien passée
    //on redirige vers la page de streaming
    useEffect(() => {
        if (user !== null) {
            navigate('/streaming');
        }
    }, [user]);

    useEffect(() => {
        const fetchGoogleUser = async () => {
            if (userGoogle) {
                let mail = "";
                let nom = "";
                let prenom = "";
                let admin = false;
                let mdp = "";

                try {
                    await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userGoogle.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${userGoogle.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                        .then((res) => {
                            mail = res.data.email;
                            nom = res.data.family_name;
                            prenom = res.data.given_name;
                        })
                        .catch((err) => console.log(err));

                    const userByMail = await axios.get(`https://mark-api.vercel.app/users/user/mail/${mail}`);
                    //const userByMail = await axios.get(`http://192.168.1.73:5000/users/user/mail/${mail}`);
                    console.log(userByMail.data.message);
                    if (userByMail.data.message === "no user with this mail") {
                        //là on insert le user dans la base de données
                        await axios.post(`https://mark-api.vercel.app/users/create`, {
                        //await axios.post(`http://192.168.1.73:5000/users/create`, {
                            nom,
                            prenom,
                            mail,
                            admin,
                            mdp
                        });
                    } else {
                        setUser(userByMail.data.user[0]);
                        login(userByMail.data.user[0].id, userByMail.data.user[0].admin);
                    }

                    navigate('/streaming');
                } catch(err) {
                    console.log(err);
                    alert("Une erreur est survenue, veuillez recommencer.");
                }
            }
        }

        fetchGoogleUser();
    }, [userGoogle]);

    //connexion
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //const res = await axios.post('http://192.168.1.73:5000/users/auth/login', {
            const res = await axios.post('https://mark-api.vercel.app/users/auth/login', {
                email,
                password
            }, {
                withCredentials: true,
                credentials: 'include'
            });
            setUser(res.data.user[0]);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            login(res.data.user.id, res.data.user.admin);
        } catch (err) {
            console.log(err);
            alert("Votre mot de passe et/ou votre adresse mail ne correspond pas. Veuillez réessayer.");
        }
    }

    //inscription
    const signIn = async () => {
        if(emailSign === '' || lastName === '' || firstName === '' || passwordSign === '') {
            alert("Vous n'avez pas rempli tout le formulaire. Merci de recommencer.");
        } else {
            let mail = emailSign;
            let nom = lastName;
            let prenom = firstName;
            let mdp = passwordSign;
            let admin = false;
            try {
                const userByMail = await axios.get(`https://mark-api.vercel.app/users/user/mail/${emailSign}`);
                //const userByMail = await axios.get(`http://192.168.1.73:5000/users/user/mail/${emailSign}`);
                if (userByMail.data.message === "no user with this mail") {
                    await axios.post(`https://mark-api.vercel.app/users/create`, {
                    //await axios.put(`http://192.168.1.73:5000/users/create`, {
                        nom,
                        prenom,
                        mail,
                        admin,
                        mdp
                    });
                    signInClose();
                    alert("Votre inscription est réussie, vous pouvez à présent vous connecter.");
                } else {
                    alert("L'adresse mail que vous avez saisi est déjà utilisée. Merci d'en choisir une autre.");
                }
            } catch (err) {
                console.log(err);
                alert("Votre inscription a échoué. Veuillez réessayer.");
            }
        }
    };

    const loginGoogle = useGoogleLogin({
        onSuccess: tokenResponse => setUserGoogle(tokenResponse),
        onError: errorResponse => console.log(errorResponse),
    });

    return(
        <Container>
            <Row>
                <Col sm={2} md={2} lg={4}></Col>
                <Col xs={12} sm={8} md={8} lg={4}>
                    <h1 className="maintitle">Mark</h1>
                    <Card>
                        <Card.Body>
                            <h2 className="title">Connectez-vous !</h2>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" className="form-control" placeholder="votre@mail.com" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="password" className="form-control" placeholder="Mot de passe" aria-label="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </Form.Group>
                                <Button type="submit" onClick={handleSubmit}>Connexion</Button>
                            </Form>
                            <br/>
                            <Button onClick={() => loginGoogle()}>Connectez-vous avec Google </Button>
                        </Card.Body>
                    </Card><br/>
                    <Card>
                        <Card.Body>
                            <h2 className="title">Pas encore inscrit ?</h2>
                            <Button type="button" onClick={signInShow}>Inscription</Button><br/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={show} onHide={signInClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Formulaire d'inscription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formEmailSign">
                            <Form.Label>Votre adresse mail</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" autoFocus value={emailSign} onChange={(e) => setEmailSign(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLastNameSign">
                            <Form.Label>Votre nom</Form.Label>
                            <Form.Control type="text" placeholder="Nom" value={lastName} onChange={(e) => setlastName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formfirstNameSign">
                            <Form.Label>Votre prénom</Form.Label>
                            <Form.Control type="text" placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPasswordSign">
                            <Form.Label>Votre mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="Mot de passe" value={passwordSign} onChange={(e) => setPasswordSign(e.target.value)} />
                        </Form.Group>
                        <ProgressBar animated now={45} />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={signInClose}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={() => signIn()}>
                        Valider votre inscription
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
