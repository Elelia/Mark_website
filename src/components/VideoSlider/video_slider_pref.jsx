import Slider from 'react-slick';
import React, { Component, useState } from "react";
import './video_slider.css';
import ResumePage from '../resume/resume_page';

export default function VideoSliderPref(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const openModal = (video) => {
        setSelectedVideo(video);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedVideo(null);
        setModalIsOpen(false);
    };

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: 0,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div>
            <h1>Notre sélection pour vous</h1>
            <Slider {...settings}>
                {props.films.map(film => (
                    <div key={film.id} onClick={() => openModal(film)}>
                        <h3 class="movieTitle">{film.nom}</h3>
                        <img src={film.url_vignette}/>
                    </div>
                ))}
            </Slider>
            {/*ouvre le modal seulement si on a cliqué sur une image*/}
            <br/>
            {selectedVideo && (
                <ResumePage
                        isOpen={modalIsOpen}
                        closeModal={closeModal}
                        video={selectedVideo}
                />
            )}
        </div>
    );
}
