import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

interface PrivateRouteProps {
    children: React.ReactNode;
    requiredRole?: "admin" | "user";
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole}) => {
    const { user, token } = useAuth();

    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }
    if (requiredRole && user.rol !== requiredRole) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;

