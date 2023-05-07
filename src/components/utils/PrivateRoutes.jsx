import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes() {
    //je dois récupérer le token ici
    let auth = localStorage.getItem('token');

    return (
        auth ? <Outlet/> : <Navigate to='/'/>
    )
}
