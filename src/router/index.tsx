import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../components/Layout'
import ErrorBoundary from '../components/ErrorBoundary'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import { AuthCallback } from '../pages/AuthCallback'
import { adminRoutes, facultyRoutes, studentRoutes } from './roleRoutes'
import { ProtectedRoute } from './ProtectedRoutes'



const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: 'auth/callback',
                element: <AuthCallback />
            },
            {
                index: true,
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                )
            },
            // Add role-specific routes
            ...adminRoutes,
            ...facultyRoutes,
            ...studentRoutes
        ]
    }
]);

export function Router() {
    return <RouterProvider router={router} />;
}