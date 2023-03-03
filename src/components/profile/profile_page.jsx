import React, { useState, useEffect, useContext  } from 'react';
import {UserContext} from "../userContext";
import axios from "axios";
import './profile_page.css';
import Button from "react-bootstrap/Button";

export default function Profile() {
    const user = useContext(UserContext);
    const [thisUser, setThisUser] = useState('');
    console.log(user);

    useEffect(()  => {
        try {
            const res = axios.get('http://192.168.1.73:5000/users/', {
                //const res = await axios.post('https://mark-api.vercel.app/users/auth/login', {
            });
        } catch (err) {
            console.log(err);
            alert("Votre mot de passe et/ou votre adresse mail ne correspond pas. Veuillez réessayer.");
        }
    }, [thisUser]);

    return(
        <div className="container">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title">Votre profil</h2>
                            <form>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="votre@mail.com" aria-label="Email" value="" onChange=""/>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" placeholder="Mot de passe" aria-label="Mot de passe" value="" onChange=""/>
                                </div>
                                <Button type="submit" className="">Valider les changements</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
