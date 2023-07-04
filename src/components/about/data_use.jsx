import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function DataUse() {

    return(
        <Container>
            <Row>
                <Col sm={2} md={2} lg={2}></Col>
                <Col xs={12} sm={8} md={8} lg={8}>
                    <Card>
                        <Card.Body>
                            <p>Les données collectées dans notre base de données sont uniquement constituées de vos noms, prénoms et adresse mail.
                            A tout moment, vous pouvez nous contacter si vous souhaitez supprimer vos données, conformément à la réglementation générale sur la protection des données.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
