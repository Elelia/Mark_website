import React, { useState, useEffect, useContext  } from 'react';
import {UserContext} from "../utils/userContext";
import axios from "axios";
import { Button, Accordion } from "react-bootstrap";
import TableSerieFilm from "../administration/table_seriefilm";

export default function Preference() {
    const [categoriesFilm, setCategoriesFilm] = useState([]);
    const [categoriesSerie, setCategoriesSerie] = useState([]);
    const [thisUser, setThisUser] = useState({
        id: null,
        mail: null
    });

    const columns = React.useMemo(
        () => [
            {
                Header: '',
                accessor: 'id',
            },
            {
                Header: 'Catégorie',
                accessor: 'nom',
            }
        ],
        []
    );


    useEffect(()  => {

        const getCategories = async () => {
            try {
                //const categoriesFilms = await axios.get('https:///mark-api.vercel.app/seriefilm/film/categories');
                const categoriesFilms = await axios.get('http://192.168.1.73:5000/seriefilm/film/categories');
                setCategoriesFilm(categoriesFilms.data);

                //const categoriesSeries = await axios.get('https:///mark-api.vercel.app/seriefilm/serie/categories');
                const categoriesSeries = await axios.get('http://192.168.1.73:5000/seriefilm/serie/categories');
                setCategoriesSerie(categoriesSeries.data);
            } catch (error) {
                console.log(error);
            }
        };

        const getInfoUser = async () => {
            try {
                //const res = await axios.get(`https:///mark-api.vercel.app/users/user/`);
                const res = await axios.get(`http://192.168.1.73:5000/users/user/`);
                setThisUser(res.data);
            } catch (err) {
                console.log(err);
                alert("Erreur au chargement de vos données");
            }
        };

        getCategories();
        getInfoUser();
    }, []);

    const validateCategorie = async (rows) => {
        console.log(rows);
        try {
            let id_compte = thisUser.id;
            for(let i=0; rows.length > i; i++) {
                //insérer les valeurs en base
                console.log(rows[i].original.id);
                let id_categorie = rows[i].original.id;
                await axios.post(`https:///mark-api.vercel.app/users/prefcat`, {
                //await axios.post(`http://192.168.1.73:5000/users/prefcat`, {
                    id_compte,
                    id_categorie
                });
            }
            alert("Vos préférences ont été sauvegardées.");
        } catch(err) {
            console.log(err);
            alert("Vos préférences n'ont pas été validées.");
        }
    };

    return(
        <div className="container">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title">Vos préférences</h2>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Catégories des films</Accordion.Header>
                                    <Accordion.Body>
                                        {categoriesFilm && <TableSerieFilm films={categoriesFilm} columns={columns} onSelectedRows={validateCategorie} /> }
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Catégories des séries</Accordion.Header>
                                    <Accordion.Body>
                                        {categoriesSerie && <TableSerieFilm films={categoriesSerie} columns={columns} onSelectedRows={validateCategorie} /> }
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Acteurs</Accordion.Header>
                                    <Accordion.Body>

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>Réalisateurs</Accordion.Header>
                                    <Accordion.Body>

                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
