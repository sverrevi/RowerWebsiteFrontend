import { Outlet, Navigate } from "react-router-dom";
import { getAuthenticatedUserOrNull } from "../lib/auth";

const ProtectedRoute = () => {
    const token = sessionStorage.getItem("token");
    return (token? <Outlet/> : <Navigate to="/"/>
    )
}

export default ProtectedRoute;