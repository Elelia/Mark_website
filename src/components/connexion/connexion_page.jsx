import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './connexion_page.css';

export default function Connexion() {
    const navigate= useNavigate();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://192.168.1.73:5000/users/auth/login', {
                email,
                password
            });
            console.log(res.data.user[0]);
            setUser(res.data.user[0]);
            console.log(user);
            if(user != null) {
                navigate('/choice');
            } else {
                alert("Votre mot de passe et/ou votre adresse mail ne correspond pas. Veuillez réessayer.");
            }
        } catch (err) {
            console.log(err);
        }

        //axios.post('https://mark-api.vercel.app/users/auth/login/', {
        // axios.post('http://192.168.1.73:5000/users/auth/login', {
        //     email,
        //     password
        // })
        // .then(function (response) {
        //     console.log(response);
        //     navigate('/choice');
        // })
        // .catch(function (error) {
        //     console.log(error);
        //     alert("Votre mot de passe et/ou votre adresse mail ne correspond pas. Veuillez réessayer.");
        // });
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <h1 className="maintitle">Mark</h1>
                    <div className="card">
                        <div className="card-body">
                            <img src="..." className="card-img-top" alt="..."/>
                            <h2>Connectez-vous !</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" placeholder="Mot de passe" aria-label="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
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
    // return (
    //     <Container>
    //         <Row>
    //             {/*<Col xs={4}></Col>*/}
    //             <Col xs={4}>
    //                 <h1 className="maintitle">Mark</h1>
    //                 <Card>
    //                     <Card.Img variant="top" src="holder.js/100px180" />
    //                     <Card.Body>
    //                         <Card.Title>Connectez-vous !</Card.Title>
    //                         <form onSubmit={handleSubmit}>
    //                             <Card.Text>
    //                                 <div className="input-group mb-3">
    //                                     <input type="text" className="form-control" placeholder="Email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    //                                 </div>
    //                                 <div className="input-group mb-3">
    //                                     <input type="password" className="form-control" placeholder="Mot de passe" aria-label="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
    //                                 </div>
    //                             </Card.Text>
    //                             <Button type="submit" variant="primary">Connexion</Button>
    //                         </form>
    //                     </Card.Body>
    //                 </Card>
    //                 <Card>
    //                     <Card.Body>
    //                         <Card.Title>Pas encore inscrit ?</Card.Title>
    //                         <Button variant="primary">Inscrivez-vous</Button>
    //                     </Card.Body>
    //                 </Card>
    //             </Col>
    //         </Row>
    //     </Container>
    // );
}
