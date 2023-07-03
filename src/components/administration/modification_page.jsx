import React, { useState, useEffect  } from 'react';
import axios from "axios";
import './administration_page.css';
import {useNavigate} from "react-router-dom";
import Table from "./table_modif_seriefilm.jsx";
import {Form, Button} from "react-bootstrap";
import {BsArrowLeftCircleFill} from "react-icons/bs";

export default function ModificationPage() {
    const navigate = useNavigate();
    const [categFilm, setCategFilm] = useState([]);
    const [categSerie, setCategSerie] = useState([]);
    const [selectedCategFilm, setSelectedCategFilm] = useState("");
    const [searchFilms, setSearchFilms] = useState(null);
    const [inputFilm, setInputFilm] = useState("");
    const [selectedCategSerie, setSelectedCategSerie] = useState("");
    const [searchSeries, setSearchSeries] = useState(null);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Nom',
                accessor: 'nom',
            },
            {
                Header: 'Âge minimum',
                accessor: 'age_min',
            },
            {
                Header: 'Date de sortie',
                accessor: 'date_sortie',
            },
            {
                Header: 'Vignette',
                accessor: 'url_vignette',
            },
            {
                Header: 'Affiche',
                accessor: 'url_affiche',
            },
            {
                Header: 'Trailer',
                accessor: 'trailer',
            }
        ],
        []
    );

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                //const categoriesFResponse = await axios.get('http://localhost:5000/seriefilm/film/categories');
                const categoriesFResponse = await axios.get('https://mark-api.vercel.app/seriefilm/film/categories');
                setCategFilm(categoriesFResponse.data);

                //const categoriesSResponse = await axios.get('http://localhost:5000/seriefilm/serie/categories');
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
            //filter avec le nom aussi
            //const filmsCategories = await axios.get(`http://localhost:5000/seriefilm/film/id_categorie/${selectedCategFilm}`);
            const filmsCategories = await axios.get(`https://mark-api.vercel.app/seriefilm/film/id_categorie/${selectedCategFilm}`);
            setSearchFilms(filmsCategories.data);
        } catch (err) {
            console.log(err);
            alert("La recherche a échoué. Merci de réessayer ultèrieurement.");
        }
    };

    const searchSerie = async (event) => {
        event.preventDefault();
        try {
            //const seriesCategories = await axios.get(`http://localhost:5000/seriefilm/serie/get_tmdb/${selectedCategSerie}`);
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
                const getdate = new Date(rows[i].date_sortie);
                const date = getdate.toISOString().slice(0,10);
                let id_movie = rows[i].id;
                let nom = rows[i].nom;
                let age_min = rows[i].age_min;
                let vignette = rows[i].url_vignette;
                let affiche = rows[i].url_affiche;
                let trailer = rows[i].trailer;
                //await axios.put(`http://localhost:5000/seriefilm/film/update`, {
                await axios.put(`https://mark-api.vercel.app/seriefilm/film/update`, {
                    id_movie,
                    nom,
                    age_min,
                    date,
                    vignette,
                    affiche,
                    trailer
                });
            }
            alert("Modifications réussies.");
        } catch(err) {
            console.log(err);
            alert("Les modifications n'ont pas pu être enregistrées.");
        }
    };

    const validateSerie = async (rows) => {
        console.log(rows);
        try {
            for(let i=0; rows.length > i; i++) {
                //insérer les valeurs en base
                console.log(rows[i].original.id);
                let id_serie = rows[i].original.id;
                //await axios.post(`http://localhost:5000/seriefilm/serie/insertSerie`, {
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

    const deleteMovie = async (rows) => {
        console.log(rows);
        try {
            for(let i=0; rows.length > i; i++) {
                //insérer les valeurs en base
                console.log(rows[i].original.id);
                let id_movie = rows[i].original.id;
                //await axios.post(`http://localhost:5000/seriefilm/film/insertMovie`, {
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

    const deleteSerie = async (rows) => {
        console.log(rows);
        try {
            for(let i=0; rows.length > i; i++) {
                //insérer les valeurs en base
                console.log(rows[i].original.id);
                let id_movie = rows[i].original.id;
                //await axios.post(`http://localhost:5000/seriefilm/film/insertMovie`, {
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
                            <h2 className="title">Cherchez des films pour les modifier</h2>
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
                            <br/>
                            <Button>Cherchez tous les films</Button>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title">Cherchez des séries pour les modifier</h2>
                            <Form onSubmit={searchSerie}>
                                <Form.Group className="mb-3" controlId="formMovieTitle">
                                    <Form.Control placeholder="titre de la série" value="" />
                                </Form.Group>
                                <h3>ou</h3>
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
                            <br/>
                            <Button>Cherchez toutes les séries</Button>
                        </div>
                    </div>
                </div>
            </div>
            {searchFilms && <Table films={searchFilms} columns={columns} onSaveChanges={validateMovie} onSelectedRows={deleteMovie} /> }
            {searchSeries && <Table films={searchSeries} columns={columns} onSaveChanges={validateSerie} onSelectedRows={deleteSerie} /> }
        </div>
    )
}
