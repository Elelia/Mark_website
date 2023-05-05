import React, { Component, useState, useEffect } from 'react';
import './streaming_home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoSlider from "../VideoSlider/video_slider.jsx";
import axios from "axios";
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function StreamingHome() {
    const [categoriesFilm, setCategoriesFilm] = useState([]);
    const [videosFilm, setVideosFilm] = useState([]);
    const [categoriesSerie, setCategoriesSerie] = useState([]);
    const [videosSerie, setVideosSerie] = useState([]);

    useEffect(() => {
        const fetchDataFilm = async () => {
            try {
                const categoriesResponse = await axios.get('https://mark-api.vercel.app/seriefilm/film/categories');
                //const categoriesResponse = await axios.get('http://192.168.1.73:5000/seriefilm/film/categories');
                setCategoriesFilm(categoriesResponse.data);

                const videosResponse = await axios.get('https://mark-api.vercel.app/seriefilm/film');
                //const videosResponse = await axios.get('http://192.168.1.73:5000/seriefilm/film');
                setVideosFilm(videosResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchDataSerie = async () => {
            try {
                const categoriesResponse = await axios.get('https://mark-api.vercel.app/seriefilm/serie/categories');
                //const categoriesResponse = await axios.get('http://192.168.1.73:5000/seriefilm/serie/categories');
                setCategoriesSerie(categoriesResponse.data);

                const videosResponse = await axios.get('https://mark-api.vercel.app/seriefilm/serie');
                //const videosResponse = await axios.get('http://192.168.1.73:5000/seriefilm/serie');
                setVideosSerie(videosResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchDataFilm();
        fetchDataSerie();
    }, []);

    return(
        <div className="container">
            <h1>Les films</h1>
            <VideoSlider videos={videosFilm} categories={categoriesFilm}/>
            <h1>Les séries</h1>
            <VideoSlider videos={videosSerie} categories={categoriesSerie}/>
        </div>
    )
}
