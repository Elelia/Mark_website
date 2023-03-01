import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './connexion_page.css';
import Button from 'react-bootstrap/Button';

export default function Connexion() {
    const navigate=useNavigate();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // pour cacher la navbar
    useEffect(() => {
        document.querySelector('.navbar').style.display = 'none';
        return () => {
            document.querySelector('.navbar').style.display = 'block';
        }
    }, []);

    useEffect(() => {
        if (user !== null) {
            navigate('/streaming');
            console.log(user);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://mark-api.vercel.app/users/auth/login', {
                email,
                password
            }, {
                withCredentials: true
            });
            setUser(res.data.user[0]);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        } catch (err) {
            console.log(err);
            alert("Votre mot de passe et/ou votre adresse mail ne correspond pas. Veuillez réessayer.");
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-xs-4"></div>
                <div className="col-xs-4">
                    <h1 className="maintitle">Mark</h1>
                    <div className="card">
                        <div className="card-body">
                            {/*<img src="..." className="card-img-top" alt="..."/>*/}
                            <h2 className="title">Connectez-vous !</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="votre@mail.com" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" placeholder="Mot de passe" aria-label="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <Button type="submit" className="">Connexion</Button>
                            </form>
                        </div>
                    </div><br/>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title">Pas encore inscrit ?</h2>
                            <Button type="button" className="">Inscription</Button><br/>
                            <Button type="button" className="button">Google soon</Button>
                        </div>
                    </div>
                </div>
            </div>
            {/*{user != null ?*/}
            {/*    <div className="row">*/}
            {/*        <span>Vie nulle <b>{user.admin ? "admin" : "user"}</b> Bip</span>*/}
            {/*    </div>*/}
            {/*    :*/}
            {/*    <div className="row">*/}
            {/*        <span>Loupé</span>*/}
            {/*    </div>*/}
            {/*}*/}
        </div>
    )
}
