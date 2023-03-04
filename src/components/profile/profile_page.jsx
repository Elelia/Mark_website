import React, { useState, useEffect, useContext  } from 'react';
import {UserContext} from "../userContext";
import axios from "axios";
import './profile_page.css';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

export default function Profile() {
    const user = useContext(UserContext);
    const [thisUser, setThisUser] = useState('');
    const [hide, setHide] = useState(false);
    console.log(user);

    const toggleHide = () => {
        setHide(!hide);
    };

    useEffect(()  => {
        try {
            const res = axios.get('http://192.168.1.73:5000/users/', {
                //const res = await axios.post('https://mark-api.vercel.app/users/auth/login', {

            });
        } catch (err) {
            console.log(err);
            alert("Non.");
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
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Votre adresse mail</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Votre nom</Form.Label>
                                    <Form.Control type="" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="" aria-label="email" value="" onChange=""/>
                                </div>
                                <Button onClick={toggleHide}>Changer votre mot de passe</Button>
                                <br/>
                                <div className="divPassword" style={{ display: hide ? "block" : "none" }}>
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" placeholder="" aria-label="oldpassword" value="" onChange=""/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" placeholder="" aria-label="newpassword" value="" onChange=""/>
                                    </div>
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
