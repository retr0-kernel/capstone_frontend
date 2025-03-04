import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Search, Filter, Check, X, Eye, MessageSquare, Clock, User, BookOpen, FileText } from 'lucide-react';

// Enum for application status
enum ApplicationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected'
}

// Enum for course types
enum CourseType {
  IDP = 'IDP',
  UROP = 'UROP',
  Capstone = 'Capstone'
}

// Interface for application data
interface ApplicationData {
  id: string;
  projectId: string;
  projectTitle: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseType: CourseType;
  status: ApplicationStatus;
  motivationStatement: string;
  submittedAt: Date;
  updatedAt: Date;
  feedback?: string;
}

const ApplicationReview: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'all'>('all');
  const [filterProject, setFilterProject] = useState<string>('all');
  const [filterCourse, setFilterCourse] = useState<CourseType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<ApplicationData | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [uniqueProjects, setUniqueProjects] = useState<{id: string, title: string}[]>([]);

  // Mock data for applications - would be replaced with API call
  useEffect(() => {
    // Sample data
    const mockApplications: ApplicationData[] = [
      {
        id: 'app-1',
        projectId: 'proj-123',
        projectTitle: 'AI-Based Health Monitoring',
        studentId: 'student1',
        studentName: 'John Doe',
        studentEmail: 'john@example.com',
        courseType: CourseType.IDP,
        status: ApplicationStatus.PENDING,
        motivationStatement: 'I am interested in applying machine learning to healthcare and have experience with health data analysis from my previous coursework.',
        submittedAt: new Date('2025-02-10'),
        updatedAt: new Date('2025-02-10')
      },
      {
        id: 'app-2',
        projectId: 'proj-456',
        projectTitle: 'Cloud-Based Education Platform',
        studentId: 'student2',
        studentName: 'Jane Smith',
        studentEmail: 'jane@example.com',
        courseType: CourseType.Capstone,
        status: ApplicationStatus.ACCEPTED,
        motivationStatement: 'My previous work in cloud systems and my interest in educational technology make me a strong candidate for this project.',
        submittedAt: new Date('2025-01-15'),
        updatedAt: new Date('2025-01-22'),
        feedback: 'Your experience with cloud technologies is perfect for this project. Looking forward to working with you!'
      },
      {
        id: 'app-3',
        projectId: 'proj-123',
        projectTitle: 'AI-Based Health Monitoring',
        studentId: 'student3',
        studentName: 'Alex Johnson',
        studentEmail: 'alex@example.com',
        courseType: CourseType.IDP,
        status: ApplicationStatus.REJECTED,
        motivationStatement: 'I have a strong interest in healthcare applications and want to apply my programming skills to this field.',
        submittedAt: new Date('2025-02-01'),
        updatedAt: new Date('2025-02-05'),
        feedback: 'We need someone with more experience in machine learning for this specific project.'
      }
    ];
    
    setApplications(mockApplications);
    
    // Extract unique projects
    const projects = Array.from(new Set(mockApplications.map(app => app.projectId)))
      .map(id => {
        const app = mockApplications.find(a => a.projectId === id);
        return {
          id,
          title: app?.projectTitle || 'Unknown Project'
        };
      });
    
    setUniqueProjects(projects);
  }, [user]);

  // Filter applications based on selected filters
  const filteredApplications = applications.filter(app => 
    (filterStatus === 'all' || app.status === filterStatus) &&
    (filterProject === 'all' || app.projectId === filterProject) &&
    (filterCourse === 'all' || app.courseType === filterCourse) &&
    (
      searchTerm === '' || 
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Handle application approval
  const handleApproveApplication = () => {
    if (!selectedApplication) return;
    
    const updatedApplication = {
      ...selectedApplication,
      status: ApplicationStatus.ACCEPTED,
      feedback: feedbackText,
      updatedAt: new Date()
    };
    
    setApplications(applications.map(app => 
      app.id === selectedApplication.id ? updatedApplication : app
    ));
    
    setIsReviewModalOpen(false);
    setSelectedApplication(null);
    setFeedbackText('');
  };

  // Handle application rejection
  const handleRejectApplication = () => {
    if (!selectedApplication) return;
    
    const updatedApplication = {
      ...selectedApplication,
      status: ApplicationStatus.REJECTED,
      feedback: feedbackText,
      updatedAt: new Date()
    };
    
    setApplications(applications.map(app => 
      app.id === selectedApplication.id ? updatedApplication : app
    ));
    
    setIsReviewModalOpen(false);
    setSelectedApplication(null);
    setFeedbackText('');
  };

  // Get status badge
  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.PENDING:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      case ApplicationStatus.ACCEPTED:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Accepted</span>;
      case ApplicationStatus.REJECTED:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Application Review</h1>
          <p className="text-gray-600">Review and manage student applications for your projects</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as ApplicationStatus | 'all')}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="all">All Statuses</option>
                {Object.values(ApplicationStatus).map((status) => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="all">All Projects</option>
                {uniqueProjects.map((project) => (
                  <option key={project.id} value={project.id}>{project.title}</option>
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
            
            <div className="relative flex-grow md:max-w-xs">
              <input
                type="text"
                placeholder="Search student or project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <button
              onClick={() => {
                setFilterStatus('all');
                setFilterProject('all');
                setFilterCourse('all');
                setSearchTerm('');
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Applications Table */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <FileText className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Found</h3>
            <p className="text-gray-600 mb-6">
              {applications.length === 0 
                ? "You haven't received any applications yet." 
                : "No applications match your selected filters."}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Submitted
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{application.studentName}</div>
                          <div className="text-sm text-gray-500">{application.studentEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.projectTitle}</div>
                      <div className="text-xs text-gray-500">ID: {application.projectId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {application.courseType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(application.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        {application.submittedAt.toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setSelectedApplication(application);
                            setIsViewModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        
                        {application.status === ApplicationStatus.PENDING && (
                          <button
                            onClick={() => {
                              setSelectedApplication(application);
                              setFeedbackText('');
                              setIsReviewModalOpen(true);
                            }}
                            className="text-yellow-600 hover:text-yellow-900"
                            title="Review"
                          >
                            <MessageSquare className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* View Application Modal */}
        {isViewModalOpen && selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
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
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedApplication.projectTitle}</h3>
                      <p className="text-sm text-gray-600">
                        <span className="inline-block mr-2">{selectedApplication.courseType}</span>
                        <span>ID: {selectedApplication.projectId}</span>
                      </p>
                    </div>
                    {getStatusBadge(selectedApplication.status)}
                  </div>
                  
                  {/* Student Info */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-md font-medium text-gray-900">{selectedApplication.studentName}</h4>
                        <p className="text-sm text-gray-500">{selectedApplication.studentEmail}</p>
                        <p className="text-xs text-gray-400 mt-1">Student ID: {selectedApplication.studentId}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Submitted On</p>
                      <p className="font-medium">{selectedApplication.submittedAt.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium">{selectedApplication.updatedAt.toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Motivation Statement */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Motivation Statement</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 whitespace-pre-line">{selectedApplication.motivationStatement}</p>
                    </div>
                  </div>

                  {/* Feedback */}
                  {selectedApplication.feedback && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Your Feedback</h4>
                      <div className={`p-4 rounded-lg ${
                        selectedApplication.status === ApplicationStatus.ACCEPTED ? 'bg-green-50 border border-green-200' :
                        selectedApplication.status === ApplicationStatus.REJECTED ? 'bg-red-50 border border-red-200' :
                        'bg-gray-50 border border-gray-200'
                      }`}>
                        <p className="text-gray-700 whitespace-pre-line">{selectedApplication.feedback}</p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="border-t border-gray-200 pt-6 flex justify-end">
                    <button
                      onClick={() => setIsViewModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                    
                    {selectedApplication.status === ApplicationStatus.PENDING && (
                      <button
                        onClick={() => {
                          setIsViewModalOpen(false);
                          setFeedbackText('');
                          setIsReviewModalOpen(true);
                        }}
                        className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Review Application
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Review Application Modal */}
        {isReviewModalOpen && selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Review Application</h2>
                  <button 
                    onClick={() => setIsReviewModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedApplication.projectTitle}</h3>
                      <p className="text-sm text-gray-600 mb-2 sm:mb-0">
                        Applicant: <span className="font-medium">{selectedApplication.studentName}</span>
                      </p>
                    </div>
                    {getStatusBadge(selectedApplication.status)}
                  </div>
                  
                  {/* Motivation Statement */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Motivation Statement</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 whitespace-pre-line">{selectedApplication.motivationStatement}</p>
                    </div>
                  </div>

                  {/* Feedback Form */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provide Feedback
                    </label>
                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Enter your feedback to the student about their application..."
                    ></textarea>
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-end">
                    <button
                      onClick={() => setIsReviewModalOpen(false)}
                      className="w-full sm:w-auto mb-3 sm:mb-0 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    
                    <button
                      onClick={handleRejectApplication}
                      className="w-full sm:w-auto mb-3 sm:mb-0 sm:ml-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject Application
                    </button>
                    
                    <button
                      onClick={handleApproveApplication}
                      className="w-full sm:w-auto sm:ml-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Accept Application
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

export default ApplicationReview;