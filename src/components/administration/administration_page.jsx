import React, { useState, useEffect, useContext  } from 'react';
import {UserContext} from "../userContext";
import './administration_page.css';
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

export default function Administration() {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    const modify = () => {
        navigate('/modification');
    };

    const add = () => {
        navigate('/add');
    };

    return(
        <div className="container">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <Button onClick={() => modify()}>Modifier un film ou une série</Button>
                            <br/>
                            <Button onClick={() => add()}>Ajouter un film ou une série</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
