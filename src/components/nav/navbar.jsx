import React, {useContext, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import {UserContext} from "../userContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { BsFillEnvelopeFill, BsYoutube, BsSearch } from "react-icons/bs";
import './navbar.css';

function NavigationBar() {
    const user = useContext(UserContext);
    const location = useLocation();
    const admin = user.user.isAdmin;
    //console.log(admin);

    return (
        <>
            <Navbar id="navbar" sticky="top" bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/streaming"><BsYoutube/> Streaming</Nav.Link>
                        <Nav.Link as={Link} to="/contact"><BsFillEnvelopeFill/> Contact</Nav.Link>
                        <Nav.Link as={Link} to="/profile">Profil</Nav.Link>
                        {admin === true && (
                            <Nav.Link as={Link} to="/administration">Administration</Nav.Link>
                        )}
                        <Nav.Link as={Link} to="/deconnexion">Déconnexion</Nav.Link>
                    </Nav>
                    {location.pathname === '/streaming' && (
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
                </Container>
            </Navbar>
        </>
    );
}

export default NavigationBar;





