import  { useState } from 'react';
import { Search } from 'lucide-react';

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

const Project = () => {
  const [searchId, setSearchId] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<ProjectDomain | ''>('');
  const [selectedCourse, setSelectedCourse] = useState<CourseType | ''>('');

  const sampleProjects: ProjectType[] = [
    {
      id: '1',
      facultyId: 'faculty1',
      title: 'AI-Based Health Monitoring',
      description: 'A health monitoring system using artificial intelligence to predict patient conditions.',
      domain: ProjectDomain.AIML,
      status: ProjectStatus.active,
      course: CourseType.IDP,
      tags: ['AI', 'Healthcare', 'ML'],
      deadline: new Date('2025-03-01'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    // Add more samples...
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Filter Sidebar */}
      <div className="w-72 bg-white shadow-lg p-6 space-y-8">
        <div className="pb-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Filters</h2>
          {/* Search Bar with Button */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
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
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Available Projects</h1>
          <p className="text-gray-600">Discover and apply for projects that match your interests</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
                    {project.title}
                  </h2>
                  <span className="ml-2 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 whitespace-nowrap">
                    {project.course}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    {project.domain}
                  </span>
                  <span>
                    Due {project.deadline?.toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t">
                <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;