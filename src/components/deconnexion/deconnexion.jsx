import React, { useState, useEffect, useContext   } from 'react';
import {UserContext} from "../utils/userContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Deconnexion() {
    const { logout } = useContext(UserContext);
    const user = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const userLogout = async() => {
            try {
                await axios.post('https://mark-api.vercel.app/users/auth/logout');
                //await axios.post('http://localhost:5000/users/auth/logout');
                // Remove the JWT cookie from the client-side
                document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                localStorage.clear();
                logout();
            } catch (err) {
                console.log(err);
                alert("Déconnexion impossible. Veuillez réessayer ultérieurement.");
            }
        }
        userLogout();
    }, []);

    useEffect(() => {
        console.log(user);
        if (user.user.userId === '' && user.user.isAdmin === '') {
            navigate('/');
        }
    }, [user]);

    return(null)
}
