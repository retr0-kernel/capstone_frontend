// src/router/index.tsx
import { createBrowserRouter, RouterProvider, Navigate, useNavigate } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../components/Layout'
import ErrorBoundary from '../components/ErrorBoundary'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import { useAuth } from '../hooks/useAuth'
import { AuthCallback } from '../pages/AuthCallback'
import { useEffect } from 'react'

// Protected Route wrapper component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!isLoading && !isAuthenticated && !token) {
            navigate('/login', { replace: true });
        }
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading) {
        return (
            <main className="flex h-screen items-center justify-center">
                <div>Loading...</div>
            </main>
        );
    }

    // If we have token but still loading user data, show loading
    if (localStorage.getItem('accessToken') && !isAuthenticated) {
        return (
            <main className="flex h-screen items-center justify-center">
                <div>Loading...</div>
            </main>
        );
    }

    // If no token or not authenticated after loading, redirect
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                )
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'auth/callback',
                element: <AuthCallback />
            }
        ]
    }
])

export function Router() {
    return (
        <RouterProvider router={router} />
    )
}