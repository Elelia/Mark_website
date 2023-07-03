import React, { Component, useState, useEffect } from 'react';
import './streaming_home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoSlider from "../VideoSlider/video_slider.jsx";
import axios from "axios";
import Modal from 'react-modal';
import VideoSliderPref from "../VideoSlider/video_slider_pref";

Modal.setAppElement('#root');

export default function FilmHome() {
    const [categoriesFilm, setCategoriesFilm] = useState([]);
    const [videosFilm, setVideosFilm] = useState([]);
    const [preferenceFilms, setPreferenceFilms] = useState([]);
    const [filmsVus, setFilmsVus] = useState([]);
    const [filmsLast, setFilmsLast] = useState([]);

    useEffect(() => {
        const fetchDataFilm = async () => {
            try {
                const categoriesResponse = await axios.get('https://mark-api.vercel.app/seriefilm/film/categories');
                //const categoriesResponse = await axios.get('http://localhost:5000/seriefilm/film/categories');
                setCategoriesFilm(categoriesResponse.data);

                const videosResponse = await axios.get('https://mark-api.vercel.app/seriefilm/film');
                //const videosResponse = await axios.get('http://localhost:5000/seriefilm/film');
                setVideosFilm(videosResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchPreference = async () => {
            try {
                const preferenceResponse = await axios.get('https://mark-api.vercel.app/seriefilm/film/bypref');
                //const preferenceResponse = await axios.get('http://localhost:5000/seriefilm/film/bypref');
                setPreferenceFilms(preferenceResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchMostSeen = async () => {
            try {
                const mostSeenResponse = await axios.get('https://mark-api.vercel.app/seriefilm/film/most_seen');
                //const mostSeenResponse = await axios.get('http://localhost:5000/seriefilm/film/most_seen');
                setFilmsVus(mostSeenResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchLastMovie = async () => {
            try {
                const lastMovieResponse = await axios.get('https://mark-api.vercel.app/seriefilm/film/last');
                //const lastMovieResponse = await axios.get('http://localhost:5000/seriefilm/film/last');
                setFilmsLast(lastMovieResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchDataFilm();
        fetchPreference();
        fetchMostSeen();
        fetchLastMovie();
    }, []);

    return(
        <div className="container">
            {preferenceFilms &&
                <div>
                    <h1>Notre sélection pour vous</h1>
                    <br/>
                    <VideoSliderPref data={preferenceFilms}/>
                </div>
            }
            <h1>Les plus populaires</h1>
            <br/>
            <VideoSliderPref data={filmsVus}/>
            <h1>Les nouveautés</h1>
            <br/>
            <VideoSliderPref data={filmsLast}/>
            <h1>Les films</h1>
            <br/>
            <VideoSlider videos={videosFilm} categories={categoriesFilm}/>
        </div>
    );
}
