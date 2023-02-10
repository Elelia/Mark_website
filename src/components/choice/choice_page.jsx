import React, { Component, useState, useEffect } from 'react';
import './choice_page.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";

export default function ChoicePage() {
    const navigate = useNavigate();

    const handleClick = (event) => {
        if(event.currentTarget.id == 'streaming') {
            navigate('/streaming');
        } else if(event.currentTarget.id == 'ticket') {
            navigate('/ticket');
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <button className="card" id="streaming" onClick={handleClick}>
                        <h2>Partie streaming</h2>
                    </button>
                </div>
                <div className="col-6">
                    <div className="card" id="ticket" onClick={handleClick}>
                        <div className="card-body">
                            <h2>Partie billetterie</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
