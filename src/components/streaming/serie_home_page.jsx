import React, { Component, useState, useEffect } from 'react';
import './streaming_home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoSlider from "../VideoSlider/video_slider.jsx";
import axios from "axios";
import Modal from 'react-modal';
import VideoSliderPref from "../VideoSlider/video_slider_pref";

//à revoir à quoi ça sert
Modal.setAppElement('#root');

export default function SerieHome() {
    //on initialise toutes les constantes et useState dont on va avoir besoin sur cette page
    const [categoriesSerie, setCategoriesSerie] = useState([]);
    const [videosSerie, setVideosSerie] = useState([]);
    const [preferenceFilms, setPreferenceFilms] = useState([]);

    useEffect(() => {

        //récupère les catégories des séries ainsi que les séries de la base de données
        const fetchDataSerie = async () => {
            try {
                const categoriesResponse = await axios.get('https://mark-api.vercel.app/seriefilm/serie/categories');
                //const categoriesResponse = await axios.get('http://192.168.1.72:5000/seriefilm/serie/categories');
                setCategoriesSerie(categoriesResponse.data);

                const videosResponse = await axios.get('https://mark-api.vercel.app/seriefilm/serie');
                //const videosResponse = await axios.get('http://192.168.1.72:5000/seriefilm/serie');
                setVideosSerie(videosResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        //récupère une sélection de 20 séries selon les préférences de l'utilisateur
        const fetchPreference = async () => {
            try {
                const preferenceResponse = await axios.get('https://mark-api.vercel.app/seriefilm/film/bypref');
                //const preferenceResponse = await axios.get('http://192.168.1.72:5000/seriefilm/film/bypref');
                setPreferenceFilms(preferenceResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchDataSerie();
        fetchPreference();
    }, []);

    return(
        <div className="container">
            {preferenceFilms && <VideoSliderPref data={preferenceFilms}/> }
            <h1>Les séries</h1>
            <br/>
            <VideoSlider videos={videosSerie} categories={categoriesSerie} serie={true}/>
        </div>
    )
}
