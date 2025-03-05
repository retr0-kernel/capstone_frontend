import React from 'react';
import { ArrowLeft, Clock, User, Users, Bookmark, BookOpen, Calendar, MessageSquare } from 'lucide-react';
import { ProjectType, ProjectDomain, ProjectStatus, CourseType } from '../types/project-types';
interface ProjectDetailProps {
  project: ProjectType;
  onClose: () => void;
  onApply: (projectId: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose, onApply }) => {
  const isActiveProject = project.status === ProjectStatus.active;
  
  // Format date to display properly
  const formatDate = (date: Date | null) => {
    if (!date) return 'No deadline set';
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Generate domain-specific background color
  const getDomainColor = (domain: ProjectDomain) => {
    switch (domain) {
      case ProjectDomain.AIML:
        return 'bg-purple-100 text-purple-800';
      case ProjectDomain.Cloud:
        return 'bg-blue-100 text-blue-800';
      case ProjectDomain.Cyber:
        return 'bg-red-100 text-red-800';
      case ProjectDomain.IOT:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header with back button */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center">
            <button 
              onClick={onClose}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-gray-900">{project.title}</h2>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDomainColor(project.domain)}`}>
                  {project.domain}
                </span>
              </div>
              <p className="text-sm text-gray-500">Project ID: {project.id}</p>
            </div>
          </div>
        </div>
        
        {/* Project Content */}
        <div className="p-6">
          {/* Project metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-lg p-3 mr-4">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Deadline</p>
                <p className="font-medium text-gray-900">{formatDate(project.deadline)}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-green-100 rounded-lg p-3 mr-4">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Course</p>
                <p className="font-medium text-gray-900">{project.course}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-lg p-3 mr-4">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium text-gray-900 capitalize">{project.status}</p>
              </div>
            </div>
          </div>
          
          {/* Faculty Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <div className="bg-amber-100 rounded-full p-2 mr-4">
                <User className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Faculty</h3>
                <p className="text-gray-600 mt-1">Dr. Jane Smith</p>
                <p className="text-sm text-gray-500 mt-1">Department of Computer Science</p>
              </div>
            </div>
          </div>
          
          {/* Project Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Description</h3>
            <div className="prose max-w-none text-gray-700">
              <p>{project.description}</p>
              
              {/* Additional details - would come from API in real implementation */}
              <p className="mt-4">
                This project aims to develop innovative solutions in the field of {project.domain}. 
                Students will work closely with faculty mentors and industry partners to design, 
                implement, and evaluate cutting-edge technologies.
              </p>
              
              <h4 className="font-medium text-gray-900 mt-6 mb-2">Requirements:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Strong background in programming and software development</li>
                <li>Experience with data structures and algorithms</li>
                <li>Familiarity with {project.domain} concepts and technologies</li>
                <li>Ability to work in a team environment</li>
              </ul>
              
              <h4 className="font-medium text-gray-900 mt-6 mb-2">Learning Outcomes:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Develop advanced technical skills in {project.domain}</li>
                <li>Gain experience in collaborative research and development</li>
                <li>Learn to apply theoretical knowledge to practical problems</li>
                <li>Build a portfolio-worthy project demonstrating real-world skills</li>
              </ul>
            </div>
          </div>
          
          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="border-t border-gray-200 pt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors mr-3"
            >
              Back to Projects
            </button>
            
            <button
              onClick={() => onApply(project.id)}
              disabled={!isActiveProject}
              className={`px-6 py-2 rounded-lg font-medium flex items-center ${
                isActiveProject 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Bookmark className="h-4 w-4 mr-2" />
              {isActiveProject ? 'Apply Now' : 'Applications Closed'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;