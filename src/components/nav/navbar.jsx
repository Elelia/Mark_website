import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { BsFillEnvelopeFill, BsYoutube, BsCameraReelsFill, BsSearch } from "react-icons/bs";
import './navbar.css';

function NavigationBar() {
    const location = useLocation();
    return (
        <>
            <Navbar id="navbar" sticky="top" bg="dark" variant="dark">
                <Container>
                    {/*<Navbar.Brand href="#home">Navbar</Navbar.Brand>*/}
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {/*<Nav.Link as={Link} to="/choice">Page de choix</Nav.Link>*/}
                        <Nav.Link as={Link} to="/streaming"><BsYoutube/> Streaming</Nav.Link>
                        <Nav.Link as={Link} to="/ticket"><BsCameraReelsFill/> Billetterie</Nav.Link>
                        <Nav.Link as={Link} to="/contact"><BsFillEnvelopeFill/> Contact</Nav.Link>
                        <Nav.Link as={Link} to="">Déconnexion</Nav.Link>
                        <Nav.Link as={Link} to="">Profil</Nav.Link>
                        <Nav.Link as={Link} to="">Administration</Nav.Link>
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





