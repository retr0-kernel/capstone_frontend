// src/router/roleRoutes.tsx
import { RoleBasedRoute } from "../providers/RoleBasedProvider";
import ManageStudent from "../pages/admin/ManageStudent";
import ManageFaculty from "../pages/admin/ManageFaculty";
import ManageAdmin from "../pages/admin/ManageAdmin";
import ManageUser from "../pages/admin/ManageUser";
import Analytic from "../pages/admin/Analytic";
import Project from "../pages/student/Project";
import Application from "../pages/student/Application";
import GroupManagement from "../pages/student/GroupManagement";
import ProjectManagement from "../pages/faculty/ProjectManagement";
import ApplicationReview from "../pages/faculty/ApplicationReview";
import GroupReview from "../pages/faculty/GroupReview";
import { UserRole } from "../types/enum";

const adminRoutes = [
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
    },
] as const;

const facultyRoutes = [
    {
        path: "projects/manage",
        element: (
            <RoleBasedRoute allowedRoles={[UserRole.faculty]}>
                <ProjectManagement />
            </RoleBasedRoute>
        )
    },
    {
        path: "applications/review",
        element: (
            <RoleBasedRoute allowedRoles={[UserRole.faculty]}>
                <ApplicationReview />
            </RoleBasedRoute>
        )
    },
    {
        path: "groups/review",
        element: (
            <RoleBasedRoute allowedRoles={[UserRole.faculty]}>
                <GroupReview />
            </RoleBasedRoute>
        )
    }
] as const;

const studentRoutes = [
    {
        path: "projects",
        element: (
            <RoleBasedRoute allowedRoles={[UserRole.student]}>
                <Project />
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
    },
    {
        path: "groups",
        element: (
            <RoleBasedRoute allowedRoles={[UserRole.student]}>
                <GroupManagement />
            </RoleBasedRoute>
        )
    }
] as const;

const routes = {
    adminRoutes,
    facultyRoutes,
    studentRoutes
};

export default routes;