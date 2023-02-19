import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsFillEnvelopeFill, BsYoutube, BsCameraReelsFill } from "react-icons/bs";

function NavigationBar() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    {/*<Navbar.Brand href="#home">Navbar</Navbar.Brand>*/}
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Connexion</Nav.Link>
                        {/*<Nav.Link as={Link} to="/choice">Page de choix</Nav.Link>*/}
                        <Nav.Link as={Link} to="/streaming"><BsYoutube/> Streaming</Nav.Link>
                        <Nav.Link as={Link} to="/ticket"><BsCameraReelsFill/> Billetterie</Nav.Link>
                        <Nav.Link as={Link} to=""><BsFillEnvelopeFill/> Contact</Nav.Link>
                        <Nav.Link as={Link} to="">Déconnexion</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default NavigationBar;





