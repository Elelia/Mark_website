import React, { useState, useEffect, useContext  } from 'react';
import {UserContext} from "../userContext";
import axios from "axios";
import './administration_page.css';
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import {useNavigate} from "react-router-dom";

export default function Administration() {
    const user = useContext(UserContext);
    const [films, setFilms] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.1.73:5000/seriefilm/')
            .then(response => {
                setFilms(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return(
        <div className="container">
            <div className="row">
                <div>
                    <h1>Liste des films</h1>
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Titre</th>
                            <th>Genre</th>
                            <th>Date de sortie</th>
                            <th>Bande annonce</th>
                            <th>Affiche</th>
                            <th>Vignette</th>
                        </tr>
                        </thead>
                        <tbody>
                        {films.map(film => (
                            <tr key={film.id}>
                                <td>{film.id}</td>
                                <td>{film.nom}</td>
                                <td>{film.cat_nom}</td>
                                <td>{film.date_sortie}</td>
                                <td>{film.id_bande_annonce}</td>
                                <td>{film.url_affiche}</td>
                                <td>{film.url_vignette}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
