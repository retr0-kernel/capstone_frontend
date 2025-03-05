// src/types/project-types.ts
export enum ProjectDomain {
    AIML = 'AIML',
    Cloud = 'Cloud',
    Cyber = 'Cyber',
    IOT = 'IOT'
  }
  
  export enum ProjectStatus {
    draft = 'draft',
    active = 'active',
    completed = 'completed',
    archived = 'archived'
  }
  
  export enum CourseType {
    IDP = 'IDP',
    UROP = 'UROP',
    Capstone = 'Capstone'
  }
  
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