import React, { Component, useState, useEffect } from 'react';
import './streaming_home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoSlider from "../VideoSlider/video_slider.jsx";
import axios from "axios";

export default function StreamingHome() {
    const [categories, setCategories] = useState([]);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.1.73:5000/seriefilm/categories', )
            .then(function (response) {
                setCategories(response.data);
                //console.log(categories);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://192.168.1.73:5000/seriefilm/', )
            .then(function (response) {
                setVideos(response.data);
                //console.log(videos);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    return(
        <div className="container">
            <VideoSlider videos={videos} categories={categories}/>
        </div>
    )
}
