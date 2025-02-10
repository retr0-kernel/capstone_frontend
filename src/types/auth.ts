// src/types/auth.ts

import {Faculty} from './faculty';
import {Admin} from './admin'
import {Student} from './student'
import { UserRole } from './enum';


export interface AuthResponse {
    user: UserType;
    accessToken?: string;
}

export interface UserType {
    id: string;
    googleId: string;
    email: string;
    name: string;
    role: UserRole;
    profilePicture: string | null;
    createdAt: Date;
    updatedAt: Date;

    admin: Admin | null;
    faculty: Faculty | null;
    student: Student | null;
}



