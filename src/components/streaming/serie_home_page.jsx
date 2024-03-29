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
    const [preferenceSeries, setPreferenceSeries] = useState([]);
    const [seriesVus, setSeriesVus] = useState([]);

    useEffect(() => {

        //récupère les catégories des séries ainsi que les séries de la base de données
        const fetchDataSerie = async () => {
            try {
                const categoriesResponse = await axios.get('https://mark-api.vercel.app/seriefilm/serie/categories');
                //const categoriesResponse = await axios.get('http://localhost:5000/seriefilm/serie/categories');
                setCategoriesSerie(categoriesResponse.data);

                const videosResponse = await axios.get('https://mark-api.vercel.app/seriefilm/serie');
                //const videosResponse = await axios.get('http://localhost:5000/seriefilm/serie');
                setVideosSerie(videosResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        //récupère une sélection de 20 séries selon les préférences de l'utilisateur
        const fetchPreference = async () => {
            try {
                const preferenceResponse = await axios.get('https://mark-api.vercel.app/seriefilm/serie/bypref');
                //const preferenceResponse = await axios.get('http://localhost:5000/seriefilm/serie/bypref');
                setPreferenceSeries(preferenceResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchMostSeen = async () => {
            try {
                const mostSeenResponse = await axios.get('https://mark-api.vercel.app/seriefilm/serie/most_seen');
                //const mostSeenResponse = await axios.get('http://localhost:5000/seriefilm/serie/most_seen');
                setSeriesVus(mostSeenResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchDataSerie();
        fetchPreference();
        fetchMostSeen();
    }, []);

    return(
        <div className="container">
            {preferenceSeries &&
                <div>
                    <h1>Notre sélection pour vous</h1>
                    <br/>
                    <VideoSliderPref data={preferenceSeries}/>
                </div>
            }
            <h1>Les plus populaires</h1>
            <br/>
            <VideoSliderPref data={seriesVus}/>
            <h1>Les séries</h1>
            <br/>
            <VideoSlider videos={videosSerie} categories={categoriesSerie} serie={true}/>
        </div>
    )
}
