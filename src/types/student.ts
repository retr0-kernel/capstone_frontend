
// Student Type (matching Prisma schema)
export interface Student {
    id: string;
    userId: string;
    studentId: string;
    batch: string | null;
}