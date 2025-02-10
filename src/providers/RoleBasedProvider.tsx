// src/providers/RoleBasedProvider.tsx
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";
import { UserRole } from "../types/enum";

export function RoleBasedRoute({
    children,
    allowedRoles
}: {
    children: React.ReactNode;
    allowedRoles: UserRole[];
}) {
    const { isAuthenticated, isLoading, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (!isLoading && !isAuthenticated && !token) {
            navigate('/login', { replace: true });
        }

        if (!isLoading && user && !allowedRoles.includes(user.role)) {
            navigate('/', { replace: true });
        }
    }, [isLoading, isAuthenticated, user, navigate, allowedRoles]);

    if (isLoading || (localStorage.getItem('accessToken') && !isAuthenticated)) {
        return (
            <main className="flex h-screen items-center justify-center">
                <Loading />
            </main>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}