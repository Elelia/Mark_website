import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes() {
    //je dois récupérer le token ici
    let auth = {'token':true};

    return (
        auth.token ? <Outlet/> : <Navigate to='/'/>
    )
}
