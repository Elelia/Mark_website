import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import './connexion_page.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseURL = "http://localhost:5000/users";

export default function LoginTest() {
    const [users, setUser] = useState([]);

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setUser(response.data);
            console.log(response);
        });
    }, []);

    return(
        <div className="container">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <h1 className="maintitle">Mark</h1>
                    <div className="card">
                        <div className="card-body">
                            <h2>Connectez-vous !</h2>
                            <form method="post">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Email" aria-label="Email"/>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" placeholder="Mot de passe" aria-label="Mot de passe"/>
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

// class Connexion extends Component {
//
//     render () {
//         return (
//             <div className="container">
//                 <div className="row">
//                     <div className="col-4"></div>
//                     <div className="col-4">
//                         <h1 className="maintitle">Mark</h1>
//                         <div className="card">
//                             <div className="card-body">
//                                 <h2>Connectez-vous !</h2>
//                                 <form method="post">
//                                     <div className="input-group mb-3">
//                                         <input type="text" className="form-control" placeholder="Email" aria-label="Email"/>
//                                     </div>
//                                     <div className="input-group mb-3">
//                                         <input type="password" className="form-control" placeholder="Mot de passe" aria-label="Mot de passe"/>
//                                     </div>
//                                     <button type="submit" className="">Connexion</button>
//                                 </form>
//                             </div>
//                         </div><br/>
//                         <div className="card">
//                             <div className="card-body">
//                                 <h2>Pas encore inscrit ?</h2>
//                                 <button type="button" className="">Inscription</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default Connexion;
//export default LoginTest();
