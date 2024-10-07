import { Navigate, Outlet } from "react-router-dom";

function LoginRoutes() {
    const token = localStorage.getItem('accessToken') || false
    return (
        !token ? <Outlet /> : <Navigate to='/'/>
    );
}

export default LoginRoutes;