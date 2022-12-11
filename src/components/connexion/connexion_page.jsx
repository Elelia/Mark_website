import React, { Component } from 'react';
import './connexion_page.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Connexion extends Component {
    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <h1 className="maintitle">Mark</h1>
                        <div className="card">
                            <div className="card-body">
                                <h2>Connectez-vous !</h2>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Mail" aria-label="Mail"/>
                                    <span className="input-group-text">@</span>
                                    <input type="text" className="form-control" placeholder="exemple.com" aria-label="Exemple.com"/>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Mot de passe" aria-label="Mot de passe"/>
                                </div>
                                <button type="button" className="">Connexion</button>
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
        );
    }
}

export default Connexion;
