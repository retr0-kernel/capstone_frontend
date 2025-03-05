// src/libs/api.ts
import apiClient from './axios';

// STUDENT API ENDPOINTS
export const studentAPI = {
  // Application endpoints
  getMyApplications: () => apiClient.get('/student/applications'),
  getApplicationById: (id: string) => apiClient.get(`/student/applications/${id}`),
  submitApplication: (data: { projectId: string, groupId: string }) => 
    apiClient.post('/student/applications', data),
  withdrawApplication: (id: string) => apiClient.delete(`/student/applications/${id}`),
  
  // Group endpoints
  getMyGroups: () => apiClient.get('/student/groups'),
  getGroupById: (id: string) => apiClient.get(`/student/groups/${id}`),
  createGroup: (data: { projectId: string, name: string, maxMember?: number }) => 
    apiClient.post('/student/groups', data),
  joinGroup: (data: { inviteCode: string }) => apiClient.post('/student/groups/join', data),
  leaveGroup: (id: string) => apiClient.delete(`/student/groups/${id}/leave`),
  promoteToLeader: (groupId: string, memberId: string) => 
    apiClient.put(`/student/groups/${groupId}/members/${memberId}/promote`),
  removeMember: (groupId: string, memberId: string) => 
    apiClient.delete(`/student/groups/${groupId}/members/${memberId}`),
  updateGroup: (id: string, data: { name?: string, maxMember?: number, isOpen?: boolean }) => 
    apiClient.put(`/student/groups/${id}`, data),
  getAvailableProjects: () => apiClient.get('/student/available-projects'),
  regenerateInviteCode: (id: string) => apiClient.post(`/student/groups/${id}/regenerate-invite`)
};

// FACULTY API ENDPOINTS
export const facultyAPI = {
  // Project endpoints
  createProject: (data: any) => apiClient.post('/faculty/project', data),
  updateProject: (id: string, data: any) => apiClient.put(`/faculty/project/${id}`, data),
  deleteProject: (id: string) => apiClient.delete(`/faculty/project/${id}`),
  
  // Application review endpoints
  getApplications: () => apiClient.get('/faculty/applications'),
  getApplicationById: (id: string) => apiClient.get(`/faculty/applications/${id}`),
  reviewApplication: (id: string, data: { status: string, feedback?: string }) => 
    apiClient.put(`/faculty/applications/${id}/review`, data),
  
  // Group review endpoints
  getGroups: () => apiClient.get('/faculty/groups'),
  getGroupById: (id: string) => apiClient.get(`/faculty/groups/${id}`),
  getGroupApplications: (id: string) => apiClient.get(`/faculty/groups/${id}/applications`),
  getGroupsByProject: (projectId: string) => apiClient.get(`/faculty/projects/${projectId}/groups`)
};

// GENERAL PROJECT API
export const projectAPI = {
  getAllProjects: () => apiClient.get('/projects'),
  getProjectById: (id: string) => apiClient.get(`/project/${id}`)
};