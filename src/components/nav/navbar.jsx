import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavigationBar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/">Connexion</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/choice">Page de choix</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/streaming">Streaming</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/ticket">Billetterie</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="">Déconnexion</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;





