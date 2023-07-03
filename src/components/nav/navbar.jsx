import React, {useContext, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import {UserContext} from "../utils/userContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { BsFillEnvelopeFill, BsFillPlayBtnFill, BsSearch, BsFillPersonFill, BsFillCameraReelsFill, BsBoxArrowInRight } from "react-icons/bs";
import './navbar.css';

function NavigationBar() {
    const user = useContext(UserContext);
    const location = useLocation();
    const admin = user.user.isAdmin;

    return (
        <>
            <Navbar id="navbar" sticky="top" bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/film"><BsFillCameraReelsFill/> Film</Nav.Link>
                            <Nav.Link as={Link} to="/serie"><BsFillPlayBtnFill/> Serie</Nav.Link>
                            <Nav.Link as={Link} to="/contact"><BsFillEnvelopeFill/> Contact</Nav.Link>
                            <Nav.Link as={Link} to="/profile"><BsFillPersonFill/> Profil</Nav.Link>
                            {admin === true && (
                                <Nav.Link as={Link} to="/administration">Administration</Nav.Link>
                            )}
                            <Nav.Link as={Link} to="/deconnexion"><BsBoxArrowInRight/> Déconnexion</Nav.Link>
                        </Nav>
                        {location.pathname === '/film' && (
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <span onClick=""><BsSearch/></span>
                            </Form>
                        )}
                        {location.pathname === '/serie' && (
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <span onClick=""><BsSearch/></span>
                            </Form>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavigationBar;





