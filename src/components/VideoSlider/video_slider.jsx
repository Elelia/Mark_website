import Slider from 'react-slick';
import React, { Component } from "react";
import axios from "axios";
import 'slick-carousel/slick/slick-theme.css';
import './video_slider.css';


export default function VideoSlider(props) {
    //faire aussi une boucle pour les catégories ?
    //on a une catégorie lié à un id serie_film
    console.log(props.videos);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };

    return (
        <div>
            <Slider {...settings}>
                {props.videos.map(video => (
                    <div key={video.id}>
                        <h3>{video.nom}</h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
