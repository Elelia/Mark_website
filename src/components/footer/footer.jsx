import React from "react";
import {
    Box,
    Container,
    Row,
    Column,
    FooterLink,
    FooterText,
    Heading,
} from "./footer_style";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";

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
                        <FooterText>projetmarkensitech@gmail.com</FooterText>
                    </Column>
                    <Column>
                        <Heading>Réseaux sociaux</Heading>
                        <FooterLink href="#">
                            <span style={{ marginLeft: "10px" }}>
                              <BsFacebook/>
                            </span>
                        </FooterLink>
                        <FooterLink href="#">
                            <span style={{ marginLeft: "10px" }}>
                              <BsTwitter/>
                            </span>
                        </FooterLink>
                        <FooterLink href="#">
                            <span style={{ marginLeft: "10px" }}>
                              <BsInstagram/>
                            </span>
                        </FooterLink>
                    </Column>
                </Row>
            </Container>
        </Box>
    );
}
