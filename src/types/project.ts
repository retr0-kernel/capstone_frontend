import { ProjectDomain, ProjectStatus, CourseType } from "./enum";


// Project Type (matching Prisma schema)
export interface ProjectType {
    id: string;
    facultyId: string;
    title: string;
    description: string;

    domain: ProjectDomain;
    status: ProjectStatus;
    course: CourseType;
    
    tags: string[];
    deadline: Date | null;
    createdAt: Date;
    updatedAt: Date;
}