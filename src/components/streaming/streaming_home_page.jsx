import React, { Component, useState, useEffect } from 'react';
import './streaming_home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoSlider from "../VideoSlider/video_slider.jsx";
import axios from "axios";
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function StreamingHome() {
    const [categories, setCategories] = useState([]);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await axios.get('http://192.168.1.73:5000/seriefilm/categories');
                setCategories(categoriesResponse.data);

                const videosResponse = await axios.get('http://192.168.1.73:5000/seriefilm/');
                setVideos(videosResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    /*const getCateg = async () => {
        //await axios.get('https://mark-api.vercel.app/seriefilm/categories', )
        await axios.get('http://192.168.1.73:5000/seriefilm/categories', )
            .then(function (response) {
                setCategories(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getFilm = async () => {
        //await axios.get('https://mark-api.vercel.app/seriefilm/', )
        await axios.get('http://192.168.1.73:5000/seriefilm/', )
            .then(function (response) {
                setVideos(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getCateg();
    getFilm();*/

    return(
        <div className="container">
            <VideoSlider videos={videos} categories={categories}/>
        </div>
    )
}
