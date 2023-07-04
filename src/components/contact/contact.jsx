import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './contact.css';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

export default function Contact() {
    const [mail, setMail] = useState("");
    const [message, setMessage] = useState("");
    const sendForm = async (e) => {
        e.preventDefault();
        try {
            console.log(mail);
            console.log(message);
            //await axios.post(`http://localhost:5000/users/contact`, {
            await axios.post(`https://mark-api.vercel.app/users/contact`, {
                mail,
                message
            });
            console.log("Votre message a bien été envoyé, nous vous répondre dans les meilleurs délais.");
        } catch (err) {
            console.log(err);
            alert("Le formulaire n'as pas pu être envoyé, veuillez recommencer.");
        }
    };

    return(
        <Container>
            <Row>
                <Col md={3}></Col>
                <Col md={6}>
                    <Card className="card">
                        <Card.Body>
                            <Card.Title>Une question ? Contactez-nous !</Card.Title>
                                <Form onSubmit={sendForm}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Votre adresse mail</Form.Label>
                                        <Form.Control type="email" placeholder="adresse@mail.com" value={mail} onChange={(e) => setMail(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Votre message</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Envoyer
                                    </Button>
                                </Form>
                            </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
