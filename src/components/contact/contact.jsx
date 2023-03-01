import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './contact.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export default function Contact() {

    return(
        <Container>
            <Row>
                <Col md={4}></Col>
                <Col md={4}>
                    <Card className="card">
                        <Card.Body>
                            <Card.Title>Une question ? Contactez-nous !</Card.Title>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
