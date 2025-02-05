// src/types/auth.ts

export interface AuthResponse {
    user: User;
    accessToken?: string;
}
export enum UserRole {
    admin = 'admin',
    faculty = 'faculty',
    student = 'student',
    user = 'user'
}

export interface User {
    id: string;
    googleId: string;
    email: string;
    name: string;
    role: UserRole;
    profilePicture: string | null;
    createdAt: Date;
    updatedAt: Date;
}




