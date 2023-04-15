import Slider from 'react-slick';
import React, { Component, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

export default function TableSerieFilm(props) {

    return (
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
            {props.films.map(film => (
                <tr key={film.id}>
                    <td>{film.id}</td>
                    <td>{film.nom}</td>
                    <td>{film.cat_nom}</td>
                    <td>{film.date_sortie}</td>
                    <td>{film.bande_annonce}</td>
                    <td>{film.url_affiche}</td>
                    <td>{film.url_vignette}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}
