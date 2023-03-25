import React, { useState, useEffect, useContext   } from 'react';
import {UserContext} from "../userContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Deconnexion() {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const userLogout = async (e) => {
            e.preventDefault();
            try {
                await axios.post('http:///mark-api.vercel.app/users/auth/logout', {

                });
                logout();
            } catch (err) {
                console.log(err);
                alert("Déconnexion impossible. Veuillez réessayer ultérieurement.");
            }
        }
        userLogout();
    }, []);

    return(null)
}
