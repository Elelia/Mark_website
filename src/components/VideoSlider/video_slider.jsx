import Slider from 'react-slick';
import React, { Component, useState } from "react";
//import '../../../node_modules/slick-carousel/slick/slick.css';
//import '../../../node_modules/slick-carousel/slick//slick-theme.css';
import './video_slider.css';
import ResumePageFilm from '../resume/resume_page';
import ResumePageSerie from '../resume/resume_page_serie';


export default function VideoSlider(props) {
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

    console.log('les props :' + props);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: 0,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
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
            {props.categories.map(categorie => {
                const categorieSerieFilm = props.videos.filter(video => video.cat_id === categorie.id);
                return(
                    <div key={categorie.id}>
                        <h2>{categorie.nom}</h2>
                        <Slider {...settings}>
                            {categorieSerieFilm.map(video => (
                                <div key={video.id} onClick={() => openModal(video)}>
                                    <h3 class="movieTitle">{video.nom}</h3>
                                    <img src={video.url_vignette}/>
                                </div>
                            ))}
                        </Slider>
                        <br/>
                    </div>
                );
            })}
            {selectedVideo && props.serie ? (
                <ResumePageSerie
                    isOpen={modalIsOpen}
                    closeModal={closeModal}
                    video={selectedVideo}
                />

            ) :
            selectedVideo ? (
                <ResumePageFilm
                    isOpen={modalIsOpen}
                    closeModal={closeModal}
                    video={selectedVideo}
                />
            ) : null}
        </div>
    );
}
