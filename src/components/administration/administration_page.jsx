import React, { useState, useEffect, useContext  } from 'react';
import {UserContext} from "../utils/userContext";
import './administration_page.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Graph from "./graph";

export default function Administration() {
    //const user = useContext(UserContext);
    const navigate = useNavigate();
    const [movieCat, setMovieCat] = useState({
        categorie: null,
        nombre: null
    });
    const [serieCat, setSerieCat] = useState({
        categorie: null,
        nombre: null
    });
    const [seriefilmMonth, setSeriefilmMonth] = useState({
        mois: null,
        nombre: null
    });
    const [filmMonth, setFilmMonth] = useState({
        mois: null,
        nombre: null
    });
    const [serieMonth, setSerieMonth] = useState({
        mois: null,
        nombre: null
    });

    const modify = () => {
        navigate('/modification');
    };

    const add = () => {
        navigate('/add');
    };

    useEffect(() => {
        const getMovieCategorieMostSeen = async () => {
            try {
                const res = await axios.get(`https://mark-api.vercel.app/seriefilm/film/mostSeenCat`);
                //const res = await axios.get(`http://localhost:5000/seriefilm/film/mostSeenCat`);
                const categories = res.data.map(item => item.cat_nom);
                const counts = res.data.map(item => parseInt(item.count, 10));
                setMovieCat({
                    categorie: categories,
                    nombre: counts
                });
            } catch (err) {
                console.log(err);
                alert("Erreur");
            }
        };

        const getSerieCategorieMostSeen = async () => {
            try {
                const res = await axios.get(`https://mark-api.vercel.app/seriefilm/serie/mostSeenCat`);
                //const res = await axios.get(`http://localhost:5000/seriefilm/serie/mostSeenCat`);
                const categories = res.data.map(item => item.cat_nom);
                const counts = res.data.map(item => parseInt(item.count, 10));
                setSerieCat({
                    categorie: categories,
                    nombre: counts
                });
            } catch (err) {
                console.log(err);
                alert("Erreur");
            }
        };

        const getSeriefilmSeenMonth = async () => {
            try {
                const res = await axios.get(`https://mark-api.vercel.app/seriefilm/countbymonth`);
                //const res = await axios.get(`http://localhost:5000/seriefilm/countbymonth`);
                const month = res.data.map(item => item.mois);
                const counts = res.data.map(item => parseInt(item.count, 10));
                setSeriefilmMonth({
                    mois: month,
                    nombre: counts
                });
            } catch (err) {
                console.log(err);
                alert("Erreur");
            }
        };

        const getfilmSeenMonth = async () => {
            try {
                const res = await axios.get(`https://mark-api.vercel.app/seriefilm/film/countbymonth`);
                //const res = await axios.get(`http://localhost:5000/seriefilm/film/countbymonth`);
                const month = res.data.map(item => item.mois);
                const counts = res.data.map(item => parseInt(item.count, 10));
                setFilmMonth({
                    mois: month,
                    nombre: counts
                });
            } catch (err) {
                console.log(err);
                alert("Erreur");
            }
        };

        const getserieSeenMonth = async () => {
            try {
                const res = await axios.get(`https://mark-api.vercel.app/seriefilm/serie/countbymonth`);
                //const res = await axios.get(`http://localhost:5000/seriefilm/serie/countbymonth`);
                const month = res.data.map(item => item.mois);
                const counts = res.data.map(item => parseInt(item.count, 10));
                setSerieMonth({
                    mois: month,
                    nombre: counts
                });
            } catch (err) {
                console.log(err);
                alert("Erreur");
            }
        };

        getMovieCategorieMostSeen();
        getSerieCategorieMostSeen();
        getSeriefilmSeenMonth();
        getfilmSeenMonth();
        getserieSeenMonth();
    }, []);

    return(
        <Container>
            <Row>
                <Col sm={2} md={2} lg={3}></Col>
                <Col sm={2} md={4} lg={3}>
                    <Card>
                        <Card.Body>
                            <Button onClick={() => modify()}>Modifier un film ou une série</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={2} md={4} lg={3}>
                    <Card>
                        <Card.Body>
                            <Button onClick={() => add()}>Ajouter un film ou une série</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col sm={2} md={2} lg={2}></Col>
                <Col sm={2} md={8} lg={8}>
                    <Card>
                        <Card.Body>
                            <h2 className="title">Statistiques du site</h2>
                            <h3>Graphique des catégories des films</h3>
                            <Graph thelabel={movieCat.categorie} data={movieCat.nombre}/>
                            <h3>Graphique des catégories des séries</h3>
                            <Graph thelabel={serieCat.categorie} data={serieCat.nombre}/>
                            <h3>Graphique du nombre de vues des films par mois</h3>
                            <Graph thelabel={filmMonth.mois} data={filmMonth.nombre}/>
                            <h3>Graphique du nombre de vues des séries par mois</h3>
                            <Graph thelabel={serieMonth.mois} data={serieMonth.nombre}/>
                            <h3>Graphique du nombre de vues des films et séries par mois</h3>
                            <Graph thelabel={seriefilmMonth.mois} data={seriefilmMonth.nombre}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
