import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function AboutMark() {

    return(
        <Container>
            <Row>
                <Col sm={2} md={2} lg={2}></Col>
                <Col xs={12} sm={8} md={8} lg={8}>
                    <Card>
                        <Card.Body>
                            <p>Mark est un projet réalisé dans le cadre de notre formation en Bachelor Développement et Innovation.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
