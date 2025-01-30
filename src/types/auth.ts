// src/types/auth.ts
export enum UserRole {
    admin = 'admin',
    faculty = 'faculty',
    student = 'student'
}

export interface User {
    id: string;
    googleId: string;
    email: string;
    name: string;
    role: UserRole;
    department: string | null;
    createdAt: Date;
}

export interface AuthResponse {
    user: User;
    accessToken?: string;
}



