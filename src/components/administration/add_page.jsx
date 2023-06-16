import React, { useState, useEffect, useContext  } from 'react';
import {UserContext} from "../utils/userContext";
import axios from "axios";
import './administration_page.css';
import { Button, Form } from "react-bootstrap";
import Table from "./table_add_seriefilm.jsx";
import {useNavigate} from "react-router-dom";
import {BsArrowLeftCircleFill} from "react-icons/bs";

export default function AddPage() {
    const navigate = useNavigate();
    const [categFilm, setCategFilm] = useState([]);
    const [categSerie, setCategSerie] = useState([]);
    const [selectedCategFilm, setSelectedCategFilm] = useState("");
    const [searchFilms, setSearchFilms] = useState(null);
    const [selectedCategSerie, setSelectedCategSerie] = useState("");
    const [searchSeries, setSearchSeries] = useState(null);

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
                const categoriesFResponse = await axios.get('https://mark-api.vercel.app/seriefilm/film/categories');
                setCategFilm(categoriesFResponse.data);

                const categoriesSResponse = await axios.get('https://mark-api.vercel.app/seriefilm/serie/categories');
                setCategSerie(categoriesSResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCategories();
    }, []);

    const searchFilm = async (event) => {
        event.preventDefault();
        try {
            const filmsCategories = await axios.get(`https://mark-api.vercel.app/seriefilm/film/get_tmdb/${selectedCategFilm}`);
            setSearchFilms(filmsCategories.data);
        } catch (err) {
            console.log(err);
            alert("La recherche a échoué. Merci de réessayer ultèrieurement.");
        }
    };

    const searchSerie = async (event) => {
        event.preventDefault();
        try {
            const seriesCategories = await axios.get(`https://mark-api.vercel.app/seriefilm/serie/get_tmdb/${selectedCategSerie}`);
            setSearchSeries(seriesCategories.data);
        } catch (err) {
            console.log(err);
            alert("La recherche a échoué. Merci de réessayer ultèrieurement.");
        }
    };

    const validateMovie = async (rows) => {
        try {
            for(let i=0; rows.length > i; i++) {
                //insérer les valeurs en base
                let id_movie = rows[i].original.id;
                await axios.post(`https://mark-api.vercel.app/seriefilm/film/insertMovie`, {
                    id_movie
                });
            }
            alert("Enregistrement en base réussi.");
        } catch(err) {
            console.log(err);
            alert("L'enregistrement n'a pas pu être effectué.");
        }
    };

    const validateSerie = async (rows) => {
        try {
            for(let i=0; rows.length > i; i++) {
                //insérer les valeurs en base
                let id_serie = rows[i].original.id;
                await axios.post(`https://mark-api.vercel.app/seriefilm/serie/insertSerie`, {
                    id_serie
                });
            }
            alert("Enregistrement en base réussi.");
        } catch(err) {
            console.log(err);
            alert("L'enregistrement n'a pas pu être effectué.");
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    return(
        <div className="container">
            <div className="row">
                <div className="col-2"><span onClick={goBack}><BsArrowLeftCircleFill size={32}/></span></div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title">Cherchez des films pour les ajouter</h2>
                            <Form onSubmit={searchFilm}>
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
                            <Form onSubmit={searchSerie}>
                                <Form.Select onChange={(event) => setSelectedCategSerie(event.target.value)}>
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
            {searchFilms && <Table films={searchFilms} columns={columns} onSelectedRows={validateMovie} /> }
            {searchSeries && <Table films={searchSeries} columns={columns} onSelectedRows={validateSerie} /> }
        </div>
    )
}
