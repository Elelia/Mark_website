import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/choice">Page de choix</Link>
                </li>
                <li>
                    <Link to="/streaming">Streaming</Link>
                </li>
                <li>
                    <Link to="/ticket">Billetterie</Link>
                </li>
                <li>
                    <Link to="">Contact</Link>
                </li>
                <li>
                    <Link to="">Déconnexion</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavigationBar;





