import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes() {
    let auth = localStorage.getItem('token');

    return (
        auth ? <Outlet/> : <Navigate to='/'/>
    )
}
