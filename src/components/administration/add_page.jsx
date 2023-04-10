import React, { useState, useEffect, useContext  } from 'react';
import {UserContext} from "../userContext";
import axios from "axios";
import './administration_page.css';
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom";

export default function Administration() {
    const user = useContext(UserContext);
    const [categFilm, setCategFilm] = useState([]);
    const [categSerie, setCategSerie] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesFResponse = await axios.get('http://192.168.1.73:5000/seriefilm/film/categories');
                setCategFilm(categoriesFResponse.data);

                const categoriesSResponse = await axios.get('http://192.168.1.73:5000/seriefilm/serie/categories');
                setCategSerie(categoriesSResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCategories();
    }, []);

    return(
        <div className="container">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title">Cherchez des films pour les ajouter</h2>
                            <Form>
                                <Form.Group className="mb-3" controlId="formMovieTitle">
                                    <Form.Control type="" placeholder="titre du film" value="" />
                                </Form.Group>
                                <h3>ou</h3>
                                <Form.Select>
                                    <option>Catégories</option>
                                </Form.Select>
                                <br/>
                                <Button variant="primary" type="submit">
                                    Recherche
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title">Cherchez des séries pour les ajouter</h2>
                            <Form>
                                <Form.Group className="mb-3" controlId="formMovieTitle">
                                    <Form.Control type="" placeholder="titre de la série" value="" />
                                </Form.Group>
                                <h3>ou</h3>
                                <Form.Select>
                                    <option>Catégories</option>
                                </Form.Select>
                                <br/>
                                <Button variant="primary" type="submit">
                                    Recherche
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
