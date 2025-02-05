import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import Loading from "../components/Loading";

// Protected Route (for any authenticated user)
export function ProtectedRoute({ children }: { children: React.ReactNode }) {

    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!isLoading && !isAuthenticated && !token) {
            navigate('/login', { replace: true });
        }
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading || (localStorage.getItem('accessToken') && !isAuthenticated)) {
        return (
            <main className="flex h-screen items-center justify-center">
                <Loading/>
            </main>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}