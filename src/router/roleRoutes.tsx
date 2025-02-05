import { Navigate, useNavigate } from "react-router-dom";
import { UserRole } from "../types/auth";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

import ManageStudent from "../pages/admin/ManageStudent";
import ManageFaculty from "../pages/admin/ManageFaculty";
import ManageAdmin from "../pages/admin/ManageAdmin";
import Loading from "../components/Loading";
import ManageUser from "../pages/admin/ManageUser";
import Analytic from "../pages/admin/Analytic";
import Project from "../pages/student/Project";
import Application from "../pages/student/Application";

// Role-based Route component
function RoleBasedRoute({
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

        // Check if user has required role
        if (!isLoading && user && !allowedRoles.includes(user.role)) {
            navigate('/', { replace: true });
        }

    }, [isLoading, isAuthenticated, user, navigate, allowedRoles]);

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

    if (user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export const adminRoutes = [
    {
        path: "manage/students",
        element: (
            <RoleBasedRoute allowedRoles={[UserRole.admin]}>
                <ManageStudent />
            </RoleBasedRoute>
        )
    },
    {
        path: "manage/faculty",
        element: (
            <RoleBasedRoute allowedRoles={[UserRole.admin]}>
                <ManageFaculty />
            </RoleBasedRoute>
        )
    },
    {
        path: "manage/admin",
        element: (
            <RoleBasedRoute allowedRoles={[UserRole.admin]}>
                <ManageAdmin />
            </RoleBasedRoute>
        )
    },
    {
        path: "manage/user",
        element: (
            <RoleBasedRoute allowedRoles={[UserRole.admin]}>
                <ManageUser />
            </RoleBasedRoute>
        )
    },
    {
        path: "analytics",
        element: (
            <RoleBasedRoute allowedRoles={[UserRole.admin]}>
                <Analytic />
            </RoleBasedRoute>
        )
    }
];

export const facultyRoutes = [
    {
        path: "projects/manage",
        element: (
            <RoleBasedRoute allowedRoles={[UserRole.faculty]}>
                <div>Manage Projects</div>
            </RoleBasedRoute>
        )
    }
];

export const studentRoutes = [
    {
        path: "projects",
        element: (
            <RoleBasedRoute allowedRoles={[UserRole.student]}>
                <Project/>
            </RoleBasedRoute>
        )
    },
    {
        path: "applications",
        element: (
            <RoleBasedRoute allowedRoles={[UserRole.student]}>
                <Application />
            </RoleBasedRoute>
        )
    }
];

