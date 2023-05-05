import React, { useState, useEffect, useContext  } from 'react';
import {UserContext} from "../utils/userContext";
import axios from "axios";
import './administration_page.css';
import { Button, Form } from "react-bootstrap";
import TableSerieFilm from "./table_seriefilm.jsx";
import {useNavigate} from "react-router-dom";

export default function Administration() {
    const user = useContext(UserContext);
    const [titleFilm, setTitleFilm] = useState("");
    const [titleSerie, setTitleSerie] = useState("");
    const [categFilm, setCategFilm] = useState([]);
    const [categSerie, setCategSerie] = useState([]);
    const [selectedCategFilm, setSelectedCategFilm] = useState("");
    const [searchFilms, setSearchFilms] = useState(null);
    const [inputFilm, setInputFilm] = useState("");
    const [selectedCategSerie, setSelectedCategSerie] = useState("");

    const columns = React.useMemo(
        () => [
            {
                Header: 'Nom',
                accessor: 'title',
            },
            {
                Header: 'Genre',
                accessor: 'categorie',
            },
            {
                Header: 'Résumé',
                accessor: 'overview',
            },
            {
                Header: 'Date de sortie',
                accessor: 'release_date',
            }
        ],
        []
    );

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

    const searchFilm = async (event) => {
        event.preventDefault();
        console.log(selectedCategFilm);
        try {
            //changer la requête pour qu'elle utilise le fichier json de tmdb
            //si j'ai la catégorie filter sur la catégorie
            //sinon filtrer avec le nom
            const filmsCategories = await axios.get(`http://192.168.1.73:5000/seriefilm/film/get_tmdb/${selectedCategFilm}`);
            console.log(filmsCategories.data);
            setSearchFilms(filmsCategories.data);
        } catch (err) {
            console.log(err);
            alert("La recherche a échoué. Merci de réessayer ultèrieurement.");
        }
    };

    const validateMovie = async (rows) => {
        console.log(rows);
        try {
            for(let i=0; rows.length > i; i++) {
                //insérer les valeurs en base
                console.log(rows[i].original.id);
                let id_movie = rows[i].original.id;
                await axios.post(`http://192.168.1.73:5000/seriefilm/film/insertMovie`, {
                    id_movie
                });
            }
            alert("Enregistrement en base réussi.");
        } catch(err) {
            console.log(err);
            alert("L'enregistrement n'a pas pu être effectué.");
        }
    };

    return(
        <div className="container">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title">Cherchez des films pour les ajouter</h2>
                            <Form onSubmit={searchFilm}>
                                <Form.Group className="mb-3" controlId="formMovieTitle">
                                    <Form.Control placeholder="titre du film" onChange={(event) => setInputFilm(event.target.value)} value={inputFilm} />
                                </Form.Group>
                                <h3>ou</h3>
                                <Form.Select onChange={(event) => setSelectedCategFilm(event.target.value)}>
                                    <option>Catégories</option>
                                    {categFilm.map(categ => (
                                        <option value={categ.id}>{categ.nom}</option>
                                    ))}
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
                                    <Form.Control placeholder="titre de la série" value="" />
                                </Form.Group>
                                <h3>ou</h3>
                                <Form.Select>
                                    <option>Catégories</option>
                                    {categSerie.map(categ => (
                                        <option value={categ.id}>{categ.nom}</option>
                                    ))}
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
            {searchFilms && <TableSerieFilm films={searchFilms} columns={columns} onSelectedRows={validateMovie} /> }
        </div>
    )
}
