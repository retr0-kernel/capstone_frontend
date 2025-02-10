// src/router/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../components/Layout'
import ErrorBoundary from '../components/ErrorBoundary'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import { AuthCallback } from '../pages/AuthCallback'
import routes from './roleRoutes'
import { ProtectedRoute } from './ProtectedRoutes'

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
                path: 'login',
                element: <Login />
            },
            {
                path: 'auth/callback',
                element: <AuthCallback />
            },
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                )
            },
            // Role-specific routes
            ...routes.adminRoutes,
            ...routes.facultyRoutes,
            ...routes.studentRoutes
        ]
    }
]);

export function Router() {
    return <RouterProvider router={router} />;
}