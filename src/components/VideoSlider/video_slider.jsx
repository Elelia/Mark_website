import Slider from 'react-slick';
import React, { Component, useState } from "react";
import axios from "axios";
import 'slick-carousel/slick/slick-theme.css';
import './video_slider.css';
import ResumePage from '../resume/resume_page';


export default function VideoSlider(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const openModal = (video) => {
        console.log(video);
        setSelectedVideo(video);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedVideo(null);
        setModalIsOpen(false);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        //slidesToShow: 4,
        //slidesToScroll: 3
    };

    return (
        <div>
            {props.categories.map(categorie => {
                const categorieSerieFilm = props.videos.filter(video => video.cat_id === categorie.id);
                return(
                    <div key={categorie.id}>
                        <h2>{categorie.nom}</h2>
                        <Slider {...settings}>
                            {categorieSerieFilm.map(video => (
                                <div key={video.id} onClick={() => openModal(video)}>
                                    <h3>{video.nom}</h3>
                                    <img src={video.url}/>
                                </div>
                            ))}
                        </Slider>
                        {/*ouvre le modal seulement si on a cliqué sur une vidéo*/}
                        {selectedVideo && (
                            <ResumePage
                                isOpen={modalIsOpen}
                                closeModal={closeModal}
                                video={selectedVideo}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
