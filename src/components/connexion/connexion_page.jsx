import React, { useState, useEffect, useContext   } from 'react';
import {UserContext} from "../userContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './connexion_page.css';
import Button from 'react-bootstrap/Button';
import { GoogleLogin } from '@react-oauth/google';

export default function Connexion() {
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const [userGoogle, setUserGoogle] = useState(null);
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
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://192.168.1.73:5000/users/auth/login', {
            //const res = await axios.post('https://mark-api.vercel.app/users/auth/login', {
                email,
                password
            });
            setUser(res.data.user[0]);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            login(res.data.user[0].id, res.data.user[0].admin);
        } catch (err) {
            console.log(err);
            alert("Votre mot de passe et/ou votre adresse mail ne correspond pas. Veuillez réessayer.");
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <h1 className="maintitle">Mark</h1>
                    <div className="card">
                        <div className="card-body">
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
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </div>
                    </div><br/>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title">Pas encore inscrit ?</h2>
                            <Button type="button" className="">Inscription</Button><br/>
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
