import React from "react";
import {
    Box,
    Container,
    Row,
    Column,
    FooterLink,
    Heading,
} from "./footer_style";

export default function Footer(){
    return (
        <Box>
            <Container>
                <Row>
                    <Column>
                        <Heading>A propos</Heading>
                        <FooterLink href="#">Qu'est-ce que Mark ?</FooterLink>
                        <FooterLink href="#">Les créateurs</FooterLink>
                    </Column>
                    <Column>
                        <Heading>Sécurité</Heading>
                        <FooterLink href="#">Writing</FooterLink>
                    </Column>
                    <Column>
                        <Heading>Nos coordonnées</Heading>
                        <FooterLink>projetmarkensitech@gmail.com</FooterLink>
                    </Column>
                    <Column>
                        <Heading>Réseaux sociaux</Heading>
                        <FooterLink href="#">
                            <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
                            </i>
                        </FooterLink>
                        <FooterLink href="#">
                            <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
                            </i>
                        </FooterLink>
                        <FooterLink href="#">
                            <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
                            </i>
                        </FooterLink>
                    </Column>
                </Row>
            </Container>
        </Box>
    );
}
