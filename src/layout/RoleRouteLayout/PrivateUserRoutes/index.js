import { Navigate, Outlet } from "react-router-dom";

function PrivateUserRoutes() {
    const token = localStorage.getItem('accessToken') || false
    return (
        token? <Outlet /> : <Navigate to='/login'/>
    );
}

export default PrivateUserRoutes;