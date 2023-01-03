import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './connexion_page.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Connexion() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        axios.get('http://192.168.1.73:5000/users/login/', {
            params: {
                mail: email,
                mdp: password,
            },
        })
        .then(function (response) {
            // handle success
            console.log(response);
            navigate('/profile');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
        })
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <h1 className="maintitle">Mark</h1>
                    <div className="card">
                        <div className="card-body">
                            <h2>Connectez-vous !</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Email" aria-label="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" placeholder="Mot de passe" aria-label="Mot de passe" value={password} onChange={(event) => setPassword(event.target.value)}/>
                                </div>
                                <button type="submit" className="">Connexion</button>
                            </form>
                        </div>
                    </div><br/>
                    <div className="card">
                        <div className="card-body">
                            <h2>Pas encore inscrit ?</h2>
                            <button type="button" className="">Inscription</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
