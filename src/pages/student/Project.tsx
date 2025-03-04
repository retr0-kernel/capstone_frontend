import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, Users, Clock } from 'lucide-react';
import ProjectDetail from '../../components/ProjectDetail';
import { useNavigate } from 'react-router-dom';

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

const Project: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<ProjectDomain | ''>('');
  const [selectedCourse, setSelectedCourse] = useState<CourseType | ''>('');
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | ''>('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Sample projects data - would be replaced with API call
  const sampleProjects: ProjectType[] = [
    {
      id: '1',
      facultyId: 'faculty1',
      title: 'AI-Based Health Monitoring',
      description: 'A health monitoring system using artificial intelligence to predict patient conditions.',
      domain: ProjectDomain.AIML,
      status: ProjectStatus.active,
      course: CourseType.IDP,
      tags: ['AI', 'Healthcare', 'ML', 'Python', 'TensorFlow'],
      deadline: new Date('2025-04-15'),
      createdAt: new Date('2025-01-10'),
      updatedAt: new Date('2025-01-15')
    },
    {
      id: '2',
      facultyId: 'faculty2',
      title: 'Cloud-Based Education Platform',
      description: 'Developing a scalable education platform using cloud computing technologies.',
      domain: ProjectDomain.Cloud,
      status: ProjectStatus.active,
      course: CourseType.Capstone,
      tags: ['AWS', 'Education', 'Microservices', 'React', 'Node.js'],
      deadline: new Date('2025-04-20'),
      createdAt: new Date('2025-01-05'),
      updatedAt: new Date('2025-01-08')
    },
    {
      id: '3',
      facultyId: 'faculty3',
      title: 'Cybersecurity Risk Assessment Tool',
      description: 'A tool for evaluating and mitigating cybersecurity risks in enterprise environments.',
      domain: ProjectDomain.Cyber,
      status: ProjectStatus.active,
      course: CourseType.UROP,
      tags: ['Security', 'Risk Analysis', 'Python', 'Penetration Testing'],
      deadline: new Date('2025-05-01'),
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-01-20')
    },
    {
      id: '4',
      facultyId: 'faculty4',
      title: 'IoT-Based Smart Agriculture',
      description: 'Using IoT sensors and data analytics to optimize agricultural processes and improve yield.',
      domain: ProjectDomain.IOT,
      status: ProjectStatus.active,
      course: CourseType.Capstone,
      tags: ['IoT', 'Agriculture', 'Sensors', 'Data Analytics', 'Raspberry Pi'],
      deadline: new Date('2025-04-30'),
      createdAt: new Date('2025-01-12'),
      updatedAt: new Date('2025-01-18')
    },
    {
      id: '5',
      facultyId: 'faculty5',
      title: 'Natural Language Processing for Legal Documents',
      description: 'Applying NLP techniques to analyze and extract information from legal documents.',
      domain: ProjectDomain.AIML,
      status: ProjectStatus.active,
      course: CourseType.IDP,
      tags: ['NLP', 'Legal', 'Machine Learning', 'BERT', 'Python'],
      deadline: new Date('2025-05-15'),
      createdAt: new Date('2025-01-20'),
      updatedAt: new Date('2025-01-25')
    },
    {
      id: '6',
      facultyId: 'faculty6',
      title: 'Multi-Cloud Management Dashboard',
      description: 'A unified dashboard for managing resources across multiple cloud platforms.',
      domain: ProjectDomain.Cloud,
      status: ProjectStatus.completed,
      course: CourseType.Capstone,
      tags: ['AWS', 'Azure', 'GCP', 'Cloud Management', 'DevOps'],
      deadline: null,
      createdAt: new Date('2024-09-10'),
      updatedAt: new Date('2024-12-15')
    }
  ];

  // Filter projects based on search and filter selections
  const filteredProjects = sampleProjects.filter(project => {
    const matchesSearch = 
      searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesDomain = selectedDomain === '' || project.domain === selectedDomain;
    const matchesCourse = selectedCourse === '' || project.course === selectedCourse;
    const matchesStatus = selectedStatus === '' || project.status === selectedStatus;
    
    return matchesSearch && matchesDomain && matchesCourse && matchesStatus;
  });

  // Handle opening project details
  const handleViewProject = (project: ProjectType) => {
    setSelectedProject(project);
    setIsDetailModalOpen(true);
  };

  // Handle applying to a project
  const handleApplyToProject = (projectId: string) => {
    // Close the modal
    setIsDetailModalOpen(false);
    
    // Navigate to the application page with the project ID
    navigate(`/student/application?projectId=${projectId}`);
  };

  // Reset all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDomain('');
    setSelectedCourse('');
    setSelectedStatus('');
  };

  // Get status badge color
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.active:
        return 'bg-green-100 text-green-800';
      case ProjectStatus.completed:
        return 'bg-blue-100 text-blue-800';
      case ProjectStatus.archived:
        return 'bg-gray-100 text-gray-600';
      case ProjectStatus.draft:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Filter Sidebar */}
      <div className={`${showFilters ? 'block' : 'hidden'} md:block w-72 bg-white shadow-lg p-6 space-y-8 fixed md:relative z-10 h-full overflow-y-auto`}>
        <div className="pb-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
            <button 
              className="md:hidden text-gray-500 hover:text-gray-800"
              onClick={() => setShowFilters(false)}
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pr-12 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Domain</h3>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value as ProjectDomain | '')}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="">All Domains</option>
              {Object.values(ProjectDomain).map((domain) => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Course Type</h3>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value as CourseType | '')}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="">All Courses</option>
              {Object.values(CourseType).map((course) => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Status</h3>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as ProjectStatus | '')}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="">All Statuses</option>
              {Object.values(ProjectStatus).map((status) => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
          </div>
          
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 mt-4 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="flex-1 p-8 md:ml-0">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Available Projects</h1>
            <p className="text-gray-600">Discover and apply for projects that match your interests</p>
          </div>
          
          <button 
            className="md:hidden bg-white p-2 rounded-lg shadow-sm border border-gray-200"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <Search className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters to find more projects.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                <div className="p-6 flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-col">
                      <h2 className="text-xl font-bold text-gray-900 line-clamp-2 mb-1">
                        {project.title}
                      </h2>
                      <div className="flex space-x-2">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {project.course}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${
                        project.domain === ProjectDomain.AIML ? 'bg-purple-500' :
                        project.domain === ProjectDomain.Cloud ? 'bg-blue-500' :
                        project.domain === ProjectDomain.Cyber ? 'bg-red-500' :
                        'bg-green-500'
                      } mr-2`}></div>
                      {project.domain}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {project.deadline 
                        ? `Due ${project.deadline.toLocaleDateString()}`
                        : 'No deadline'}
                    </span>
                  </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t">
                  <button 
                    onClick={() => handleViewProject(project)}
                    className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {isDetailModalOpen && selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setIsDetailModalOpen(false)}
          onApply={handleApplyToProject}
        />
      )}
    </div>
  );
};

export default Project;