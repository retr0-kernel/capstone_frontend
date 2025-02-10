import { ProjectType } from "./project"

// Faculty Type (matching Prisma schema)
export interface Faculty {
    id: string;
    userId: string;
    department: string;
    designation: string | null;
    projects?: ProjectType[];
}