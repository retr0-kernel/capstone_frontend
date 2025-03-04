import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Plus, Edit, Trash, Eye, Filter, Check, X, ArrowRight, PlusCircle, Calendar, File, Tag } from 'lucide-react';
import { ProjectDomain, ProjectStatus, CourseType } from '../student/Project';

// Interface for project data
interface ProjectType {
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
  applicationCount?: number;
  groupCount?: number;
}

const ProjectManagement: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | 'all'>('all');
  const [filterCourse, setFilterCourse] = useState<CourseType | 'all'>('all');

  // Form state for create/edit
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domain: ProjectDomain.AIML,
    course: CourseType.IDP,
    tags: '',
    deadline: ''
  });

  // Fetch projects - in a real app this would be an API call
  useEffect(() => {
    // Sample data
    const sampleProjects: ProjectType[] = [
      {
        id: '1',
        facultyId: user?.faculty?.id || 'faculty1',
        title: 'AI-Based Health Monitoring',
        description: 'A health monitoring system using artificial intelligence to predict patient conditions.',
        domain: ProjectDomain.AIML,
        status: ProjectStatus.active,
        course: CourseType.IDP,
        tags: ['AI', 'Healthcare', 'ML'],
        deadline: new Date('2025-04-15'),
        createdAt: new Date('2025-01-10'),
        updatedAt: new Date('2025-01-15'),
        applicationCount: 5,
        groupCount: 1
      },
      {
        id: '2',
        facultyId: user?.faculty?.id || 'faculty1',
        title: 'Cloud-Based Education Platform',
        description: 'Developing a scalable education platform using cloud computing technologies.',
        domain: ProjectDomain.Cloud,
        status: ProjectStatus.active,
        course: CourseType.Capstone,
        tags: ['AWS', 'Education', 'Microservices'],
        deadline: new Date('2025-04-20'),
        createdAt: new Date('2025-01-05'),
        updatedAt: new Date('2025-01-08'),
        applicationCount: 8,
        groupCount: 2
      },
      {
        id: '3',
        facultyId: user?.faculty?.id || 'faculty1',
        title: 'Cybersecurity Risk Assessment Tool',
        description: 'A tool for evaluating and mitigating cybersecurity risks in enterprise environments.',
        domain: ProjectDomain.Cyber,
        status: ProjectStatus.draft,
        course: CourseType.UROP,
        tags: ['Security', 'Risk Analysis', 'Python'],
        deadline: new Date('2025-05-01'),
        createdAt: new Date('2025-01-15'),
        updatedAt: new Date('2025-01-20'),
        applicationCount: 0,
        groupCount: 0
      }
    ];
    
    setProjects(sampleProjects);
  }, [user]);

  // Handle create project form submission
  const handleCreateProject = () => {
    const newProject: ProjectType = {
      id: `proj-${Date.now()}`,
      facultyId: user?.faculty?.id || 'faculty1',
      title: formData.title,
      description: formData.description,
      domain: formData.domain,
      status: ProjectStatus.draft,
      course: formData.course,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      deadline: formData.deadline ? new Date(formData.deadline) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
      applicationCount: 0,
      groupCount: 0
    };
    
    setProjects([...projects, newProject]);
    setIsCreateModalOpen(false);
    resetFormData();
  };

  // Handle update project form submission
  const handleUpdateProject = () => {
    if (!selectedProject) return;
    
    const updatedProject: ProjectType = {
      ...selectedProject,
      title: formData.title,
      description: formData.description,
      domain: formData.domain,
      course: formData.course,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      deadline: formData.deadline ? new Date(formData.deadline) : null,
      updatedAt: new Date()
    };
    
    setProjects(projects.map(p => p.id === selectedProject.id ? updatedProject : p));
    setIsEditModalOpen(false);
    setSelectedProject(null);
    resetFormData();
  };

  // Handle delete project
  const handleDeleteProject = () => {
    if (!selectedProject) return;
    
    setProjects(projects.filter(p => p.id !== selectedProject.id));
    setIsDeleteModalOpen(false);
    setSelectedProject(null);
  };

  // Publish or unpublish a project
  const toggleProjectStatus = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    const newStatus = project.status === ProjectStatus.draft ? ProjectStatus.active : ProjectStatus.draft;
    
    const updatedProject = {
      ...project,
      status: newStatus,
      updatedAt: new Date()
    };
    
    setProjects(projects.map(p => p.id === projectId ? updatedProject : p));
  };

  // Reset form data for create/edit
  const resetFormData = () => {
    setFormData({
      title: '',
      description: '',
      domain: ProjectDomain.AIML,
      course: CourseType.IDP,
      tags: '',
      deadline: ''
    });
  };

  // Set form data for editing a project
  const initializeEditForm = (project: ProjectType) => {
    setFormData({
      title: project.title,
      description: project.description,
      domain: project.domain,
      course: project.course,
      tags: project.tags.join(', '),
      deadline: project.deadline ? project.deadline.toISOString().split('T')[0] : ''
    });
  };

  // Handle form field changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Filter projects based on filters
  const filteredProjects = projects.filter(project => 
    (filterStatus === 'all' || project.status === filterStatus) &&
    (filterCourse === 'all' || project.course === filterCourse)
  );

  // Status badge generator
  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.active:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>;
      case ProjectStatus.draft:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Draft</span>;
      case ProjectStatus.completed:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Completed</span>;
      case ProjectStatus.archived:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Archived</span>;
      default:
        return null;
    }
  };

  // Domain badge generator
  const getDomainBadge = (domain: ProjectDomain) => {
    switch (domain) {
      case ProjectDomain.AIML:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">{domain}</span>;
      case ProjectDomain.Cloud:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{domain}</span>;
      case ProjectDomain.Cyber:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">{domain}</span>;
      case ProjectDomain.IOT:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">{domain}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
            <p className="text-gray-600">Create and manage your course projects</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as ProjectStatus | 'all')}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="all">All Statuses</option>
                {Object.values(ProjectStatus).map((status) => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value as CourseType | 'all')}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="all">All Courses</option>
                {Object.values(CourseType).map((course) => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
            
            <button
              onClick={() => {
                setFilterStatus('all');
                setFilterCourse('all');
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Projects Table */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <File className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Found</h3>
            <p className="text-gray-600 mb-6">
              {projects.length === 0 
                ? "You haven't created any projects yet." 
                : "No projects match your selected filters."}
            </p>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Project
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course & Domain
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applications
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <div>
                          <div className="text-sm font-medium text-gray-900 line-clamp-1">{project.title}</div>
                          <div className="text-xs text-gray-500">ID: {project.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 inline-block w-max">
                          {project.course}
                        </span>
                        {getDomainBadge(project.domain)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(project.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {project.deadline 
                          ? project.deadline.toLocaleDateString() 
                          : 'No deadline'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex flex-col space-y-1">
                          <span>{project.applicationCount} Applications</span>
                          <span>{project.groupCount} Groups</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            setIsViewModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            initializeEditForm(project);
                            setIsEditModalOpen(true);
                          }}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => toggleProjectStatus(project.id)}
                          className={project.status === ProjectStatus.draft 
                            ? "text-green-600 hover:text-green-900"
                            : "text-gray-600 hover:text-gray-900"
                          }
                          title={project.status === ProjectStatus.draft ? "Publish" : "Unpublish"}
                        >
                          {project.status === ProjectStatus.draft 
                            ? <ArrowRight className="h-5 w-5" />
                            : <X className="h-5 w-5" />
                          }
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Create Project Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Create New Project</h2>
                  <button 
                    onClick={() => setIsCreateModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Type
                      </label>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      >
                        {Object.values(CourseType).map((course) => (
                          <option key={course} value={course}>{course}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Domain
                      </label>
                      <select
                        name="domain"
                        value={formData.domain}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      >
                        {Object.values(ProjectDomain).map((domain) => (
                          <option key={domain} value={domain}>{domain}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      rows={6}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleFormChange}
                      placeholder="e.g. AI, Machine Learning, Healthcare"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deadline (optional)
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateProject}
                    disabled={!formData.title || !formData.description}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      formData.title && formData.description
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Create Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Project Modal */}
        {isEditModalOpen && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Edit Project</h2>
                  <button 
                    onClick={() => setIsEditModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Type
                      </label>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      >
                        {Object.values(CourseType).map((course) => (
                          <option key={course} value={course}>{course}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Domain
                      </label>
                      <select
                        name="domain"
                        value={formData.domain}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      >
                        {Object.values(ProjectDomain).map((domain) => (
                          <option key={domain} value={domain}>{domain}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      rows={6}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleFormChange}
                      placeholder="e.g. AI, Machine Learning, Healthcare"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deadline (optional)
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateProject}
                    disabled={!formData.title || !formData.description}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      formData.title && formData.description
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Update Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Confirm Delete</h2>
                  <button 
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-gray-700">
                    Are you sure you want to delete the project "<span className="font-semibold">{selectedProject.title}</span>"? This action cannot be undone.
                  </p>
                  
                  {(selectedProject.applicationCount > 0 || selectedProject.groupCount > 0) && (
                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex">
                        <svg className="h-5 w-5 text-yellow-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <h4 className="text-sm font-medium text-yellow-800">Warning</h4>
                          <p className="mt-1 text-sm text-yellow-700">
                            This project has {selectedProject.applicationCount} active applications and {selectedProject.groupCount} groups. Deleting it will affect all students connected to it.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteProject}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Project Modal */}
        {isViewModalOpen && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Project Details</h2>
                  <button 
                    onClick={() => setIsViewModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{selectedProject.title}</h3>
                    {getStatusBadge(selectedProject.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Course</p>
                      <p className="font-medium">{selectedProject.course}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Domain</p>
                      <p className="font-medium">{selectedProject.domain}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created</p>
                      <p className="font-medium">{selectedProject.createdAt.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium">{selectedProject.updatedAt.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Deadline</p>
                      <p className="font-medium">
                        {selectedProject.deadline ? selectedProject.deadline.toLocaleDateString() : 'No deadline set'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Project ID</p>
                      <p className="font-medium">{selectedProject.id}</p>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Description</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 whitespace-pre-line">{selectedProject.description}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Statistics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                        <div className="bg-blue-100 rounded-full p-2 mr-4">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Student Applications</div>
                          <div className="text-xl font-semibold text-blue-900">{selectedProject.applicationCount}</div>
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg flex items-center">
                        <div className="bg-green-100 rounded-full p-2 mr-4">
                          <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Formed Groups</div>
                          <div className="text-xl font-semibold text-green-900">{selectedProject.groupCount}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t border-gray-200 pt-6 flex justify-end">
                    <button
                      onClick={() => setIsViewModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManagement;