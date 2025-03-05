// import React, { useState, useEffect } from 'react';
// import { Check, FileText, XCircle, Clock, Info, Send, Filter, Tag, Calendar } from 'lucide-react';
// import { useAuth } from '../../hooks/useAuth';

// // Enum for application status
// export enum ApplicationStatus {
//   PENDING = 'pending',
//   ACCEPTED = 'accepted',
//   REJECTED = 'rejected',
//   DRAFT = 'draft'
// }

// // Enum for course types (imported from your project types)
// export enum CourseType {
//   IDP = 'IDP',
//   UROP = 'UROP',
//   Capstone = 'Capstone'
// }

// // Interface for application data
// interface ApplicationData {
//   id: string;
//   projectId: string;
//   projectTitle: string;
//   studentId: string;
//   courseType: CourseType;
//   facultyName: string;
//   status: ApplicationStatus;
//   motivationStatement: string;
//   submittedAt: Date;
//   updatedAt: Date;
//   feedback?: string;
// }

// const Application = () => {
//   const { user } = useAuth();
//   const [applications, setApplications] = useState<ApplicationData[]>([]);
//   const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'all'>('all');
//   const [filterCourse, setFilterCourse] = useState<CourseType | 'all'>('all');
//   const [selectedApplication, setSelectedApplication] = useState<ApplicationData | null>(null);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isNewApplicationModalOpen, setIsNewApplicationModalOpen] = useState(false);
//   const [newMotivationStatement, setNewMotivationStatement] = useState('');
//   const [selectedProjectId, setSelectedProjectId] = useState('');

//   // Sample data - would be replaced with API calls
//   useEffect(() => {
//     // Mocked data - in production this would come from your API
//     const mockApplications: ApplicationData[] = [
//       {
//         id: '1',
//         projectId: 'proj-123',
//         projectTitle: 'AI-Based Health Monitoring',
//         studentId: user?.student?.id || '',
//         courseType: CourseType.IDP,
//         facultyName: 'Dr. Smith',
//         status: ApplicationStatus.PENDING,
//         motivationStatement: 'I am interested in applying machine learning to healthcare and have experience with health data analysis.',
//         submittedAt: new Date('2025-02-10'),
//         updatedAt: new Date('2025-02-10')
//       },
//       {
//         id: '2',
//         projectId: 'proj-456',
//         projectTitle: 'Smart City Traffic Control',
//         studentId: user?.student?.id || '',
//         courseType: CourseType.Capstone,
//         facultyName: 'Dr. Johnson',
//         status: ApplicationStatus.ACCEPTED,
//         motivationStatement: 'My previous work in IoT systems and my interest in urban planning make me a strong candidate.',
//         submittedAt: new Date('2025-01-15'),
//         updatedAt: new Date('2025-01-22'),
//         feedback: 'Your experience with IoT systems is exactly what we need for this project.'
//       },
//       {
//         id: '3',
//         projectId: 'proj-789',
//         projectTitle: 'Renewable Energy Forecasting',
//         studentId: user?.student?.id || '',
//         courseType: CourseType.UROP,
//         facultyName: 'Dr. Chen',
//         status: ApplicationStatus.REJECTED,
//         motivationStatement: 'I have a strong interest in renewable energy and statistical modeling.',
//         submittedAt: new Date('2025-02-01'),
//         updatedAt: new Date('2025-02-05'),
//         feedback: 'We need someone with more experience in time series forecasting.'
//       },
//       {
//         id: '4',
//         projectId: 'proj-101',
//         projectTitle: 'Blockchain Supply Chain',
//         studentId: user?.student?.id || '',
//         courseType: CourseType.Capstone,
//         facultyName: 'Dr. Williams',
//         status: ApplicationStatus.DRAFT,
//         motivationStatement: 'Draft statement about blockchain experience...',
//         submittedAt: new Date(),
//         updatedAt: new Date()
//       }
//     ];

//     setApplications(mockApplications);
//   }, [user]);

//   // Filter applications based on selected filters
//   const filteredApplications = applications.filter(app => 
//     (filterStatus === 'all' || app.status === filterStatus) &&
//     (filterCourse === 'all' || app.courseType === filterCourse)
//   );

//   // Handle open application detail view
//   const handleViewApplication = (application: ApplicationData) => {
//     setSelectedApplication(application);
//     setIsViewModalOpen(true);
//   };

//   // Handle submit new application
//   const handleSubmitApplication = () => {
//     // In production this would be an API call
//     const newApplication: ApplicationData = {
//       id: `new-${Date.now()}`,
//       projectId: selectedProjectId,
//       projectTitle: 'New Project Application', // This would come from the project selection
//       studentId: user?.student?.id || '',
//       courseType: CourseType.Capstone, // This would be determined by the project
//       facultyName: 'Selected Faculty', // This would come from the project
//       status: ApplicationStatus.PENDING,
//       motivationStatement: newMotivationStatement,
//       submittedAt: new Date(),
//       updatedAt: new Date()
//     };

//     setApplications(prev => [...prev, newApplication]);
//     setIsNewApplicationModalOpen(false);
//     setNewMotivationStatement('');
//     setSelectedProjectId('');
//   };

//   // Save application as draft
//   const handleSaveDraft = () => {
//     // Similar to submit but with DRAFT status
//     const draftApplication: ApplicationData = {
//       id: `draft-${Date.now()}`,
//       projectId: selectedProjectId,
//       projectTitle: 'Draft Project Application',
//       studentId: user?.student?.id || '',
//       courseType: CourseType.Capstone,
//       facultyName: 'Selected Faculty',
//       status: ApplicationStatus.DRAFT,
//       motivationStatement: newMotivationStatement,
//       submittedAt: new Date(),
//       updatedAt: new Date()
//     };

//     setApplications(prev => [...prev, draftApplication]);
//     setIsNewApplicationModalOpen(false);
//     setNewMotivationStatement('');
//     setSelectedProjectId('');
//   };

//   // Get status badge based on application status
//   const getStatusBadge = (status: ApplicationStatus) => {
//     switch (status) {
//       case ApplicationStatus.PENDING:
//         return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
//       case ApplicationStatus.ACCEPTED:
//         return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Accepted</span>;
//       case ApplicationStatus.REJECTED:
//         return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Rejected</span>;
//       case ApplicationStatus.DRAFT:
//         return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Draft</span>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar Filters */}
//       <div className="w-72 bg-white shadow-lg p-6 space-y-8">
//         <div className="pb-6 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-gray-800 mb-6">Applications</h2>
//           <button 
//             onClick={() => setIsNewApplicationModalOpen(true)}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
//           >
//             <FileText className="w-4 h-4 mr-2" />
//             New Application
//           </button>
//         </div>

//         <div className="space-y-6">
//           <div>
//             <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3 flex items-center">
//               <Filter className="h-4 w-4 mr-2" />
//               Status
//             </h3>
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value as ApplicationStatus | 'all')}
//               className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
//             >
//               <option value="all">All Statuses</option>
//               {Object.values(ApplicationStatus).map((status) => (
//                 <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3 flex items-center">
//               <Tag className="h-4 w-4 mr-2" />
//               Course Type
//             </h3>
//             <select
//               value={filterCourse}
//               onChange={(e) => setFilterCourse(e.target.value as CourseType | 'all')}
//               className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
//             >
//               <option value="all">All Courses</option>
//               {Object.values(CourseType).map((course) => (
//                 <option key={course} value={course}>{course}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
//           <p className="text-gray-600">Manage and track your project applications</p>
//         </div>

//         {filteredApplications.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-md p-8 text-center">
//             <div className="flex justify-center mb-4">
//               <FileText className="h-16 w-16 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Found</h3>
//             <p className="text-gray-600 mb-6">
//               {filterStatus !== 'all' || filterCourse !== 'all' 
//                 ? 'Try changing your filters to see more applications.' 
//                 : 'Start by creating a new application for a project.'}
//             </p>
//             <button 
//               onClick={() => setIsNewApplicationModalOpen(true)}
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               <FileText className="w-4 h-4 mr-2" />
//               Create Application
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-6">
//             {/* Application Cards */}
//             {filteredApplications.map((application) => (
//               <div 
//                 key={application.id} 
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
//               >
//                 <div className="p-6">
//                   <div className="flex items-start justify-between">
//                     <div>
//                       <div className="flex items-center mb-2">
//                         {getStatusBadge(application.status)}
//                         <span className="ml-3 text-sm text-gray-500">
//                           <Clock className="h-4 w-4 inline mr-1" />
//                           {application.status === ApplicationStatus.DRAFT 
//                             ? 'Not submitted' 
//                             : `Submitted on ${application.submittedAt.toLocaleDateString()}`}
//                         </span>
//                       </div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-1">{application.projectTitle}</h3>
//                       <p className="text-sm text-gray-600 mb-4">
//                         <span className="font-medium">{application.courseType}</span> • Faculty: {application.facultyName}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="mb-4">
//                     <p className="text-gray-600 line-clamp-2">{application.motivationStatement}</p>
//                   </div>

//                   {application.status === ApplicationStatus.ACCEPTED && (
//                     <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-start">
//                       <Check className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" />
//                       <div>
//                         <h4 className="text-sm font-medium text-green-800">Application Accepted</h4>
//                         {application.feedback && (
//                           <p className="mt-1 text-sm text-green-700">{application.feedback}</p>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {application.status === ApplicationStatus.REJECTED && (
//                     <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-start">
//                       <XCircle className="flex-shrink-0 h-5 w-5 text-red-500 mt-0.5 mr-3" />
//                       <div>
//                         <h4 className="text-sm font-medium text-red-800">Application Rejected</h4>
//                         {application.feedback && (
//                           <p className="mt-1 text-sm text-red-700">{application.feedback}</p>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex justify-end">
//                     <button
//                       onClick={() => handleViewApplication(application)}
//                       className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* View Application Modal */}
//       {isViewModalOpen && selectedApplication && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
//                 <button 
//                   onClick={() => setIsViewModalOpen(false)}
//                   className="text-gray-400 hover:text-gray-500"
//                 >
//                   <XCircle className="h-6 w-6" />
//                 </button>
//               </div>
//             </div>
            
//             <div className="p-6">
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedApplication.projectTitle}</h3>
//                 <div className="flex items-center mb-4">
//                   {getStatusBadge(selectedApplication.status)}
//                   <span className="ml-3 text-sm text-gray-500">
//                     <Calendar className="h-4 w-4 inline mr-1" />
//                     Last updated: {selectedApplication.updatedAt.toLocaleDateString()}
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   <div>
//                     <p className="text-sm text-gray-500">Course Type</p>
//                     <p className="font-medium">{selectedApplication.courseType}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Faculty</p>
//                     <p className="font-medium">{selectedApplication.facultyName}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Submitted On</p>
//                     <p className="font-medium">
//                       {selectedApplication.status === ApplicationStatus.DRAFT 
//                         ? 'Not submitted yet' 
//                         : selectedApplication.submittedAt.toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Application ID</p>
//                     <p className="font-medium">{selectedApplication.id}</p>
//                   </div>
//                 </div>

//                 <div className="mb-6">
//                   <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Motivation Statement</h4>
//                   <div className="p-4 bg-gray-50 rounded-lg">
//                     <p className="text-gray-700 whitespace-pre-line">{selectedApplication.motivationStatement}</p>
//                   </div>
//                 </div>

//                 {selectedApplication.feedback && (
//                   <div className="mb-6">
//                     <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Faculty Feedback</h4>
//                     <div className={`p-4 rounded-lg ${
//                       selectedApplication.status === ApplicationStatus.ACCEPTED ? 'bg-green-50 border border-green-200' :
//                       selectedApplication.status === ApplicationStatus.REJECTED ? 'bg-red-50 border border-red-200' :
//                       'bg-gray-50 border border-gray-200'
//                     }`}>
//                       <p className="text-gray-700 whitespace-pre-line">{selectedApplication.feedback}</p>
//                     </div>
//                   </div>
//                 )}

//                 {selectedApplication.status === ApplicationStatus.DRAFT && (
//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//                     <div className="flex">
//                       <Info className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <h4 className="text-sm font-medium text-blue-800">Draft Application</h4>
//                         <p className="mt-1 text-sm text-blue-700">
//                           This application has not been submitted yet. You can edit it and submit when ready.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => setIsViewModalOpen(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   Close
//                 </button>
                
//                 {selectedApplication.status === ApplicationStatus.DRAFT && (
//                   <>
//                     <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
//                       Edit Draft
//                     </button>
//                     <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                       Submit Application
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* New Application Modal */}
//       {isNewApplicationModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-bold text-gray-900">New Application</h2>
//                 <button 
//                   onClick={() => setIsNewApplicationModalOpen(false)}
//                   className="text-gray-400 hover:text-gray-500"
//                 >
//                   <XCircle className="h-6 w-6" />
//                 </button>
//               </div>
//             </div>
            
//             <div className="p-6">
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Project
//                 </label>
//                 <select
//                   value={selectedProjectId}
//                   onChange={(e) => setSelectedProjectId(e.target.value)}
//                   className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
//                   required
//                 >
//                   <option value="">Select Project</option>
//                   <option value="proj-123">AI-Based Health Monitoring (IDP)</option>
//                   <option value="proj-456">Smart City Traffic Control (Capstone)</option>
//                   <option value="proj-789">Renewable Energy Forecasting (UROP)</option>
//                   <option value="proj-101">Blockchain Supply Chain (Capstone)</option>
//                 </select>
//                 <p className="mt-1 text-sm text-gray-500">
//                   Select the project you want to apply for
//                 </p>
//               </div>

//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Motivation Statement
//                 </label>
//                 <textarea
//                   value={newMotivationStatement}
//                   onChange={(e) => setNewMotivationStatement(e.target.value)}
//                   rows={6}
//                   className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
//                   placeholder="Describe why you're interested in this project and what qualifications or experiences make you a good fit..."
//                   required
//                 ></textarea>
//                 <p className="mt-1 text-sm text-gray-500">
//                   Your motivation statement should highlight your relevant skills and experiences
//                 </p>
//               </div>

//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//                 <div className="flex">
//                   <Info className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <h4 className="text-sm font-medium text-blue-800">Application Tips</h4>
//                     <p className="mt-1 text-sm text-blue-700">
//                       Be specific about your skills and experiences relevant to the project. 
//                       Mention any coursework, previous projects, or technical skills that make you a good fit.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => setIsNewApplicationModalOpen(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSaveDraft}
//                   disabled={!selectedProjectId}
//                   className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
//                 >
//                   Save as Draft
//                 </button>
//                 <button
//                   onClick={handleSubmitApplication}
//                   disabled={!selectedProjectId || !newMotivationStatement.trim()}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:bg-blue-300 disabled:cursor-not-allowed"
//                 >
//                   <Send className="h-4 w-4 mr-2" />
//                   Submit Application
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Application;


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, FileText, XCircle, Clock, Info, Send } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { studentAPI } from '../../libs/api';

// Application status enum
enum ApplicationStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

// Interface for application data
interface ApplicationData {
  id: string;
  projectId: string;
  project: {
    title: string;
    course: string;
    faculty: {
      user: {
        name: string;
      }
    }
  };
  groupId: string;
  group: {
    name: string;
    members: {
      student: {
        user: {
          name: string;
        }
      }
      memberRole: string;
    }[];
  };
  applicationStatus: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

const Application: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectIdFromUrl = queryParams.get('projectId');

  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [myGroups, setMyGroups] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<string>(projectIdFromUrl || '');
  const [motivationStatement, setMotivationStatement] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isNewApplicationModalOpen, setIsNewApplicationModalOpen] = useState<boolean>(false);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await studentAPI.getMyApplications();
        setApplications(response.data.data);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load applications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Fetch groups for application if a project ID is provided
  useEffect(() => {
    if (projectIdFromUrl) {
      const fetchGroups = async () => {
        try {
          const response = await studentAPI.getMyGroups();
          setMyGroups(response.data.data);
          setIsNewApplicationModalOpen(true);
        } catch (err) {
          console.error('Error fetching groups:', err);
        }
      };
      
      fetchGroups();
    }
  }, [projectIdFromUrl]);

  // Handle submit application
  const handleSubmitApplication = async () => {
    if (!selectedGroup || !selectedProject) {
      alert('Please select a group and project');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await studentAPI.submitApplication({
        projectId: selectedProject,
        groupId: selectedGroup
      });
      
      // Add the new application to the list
      setApplications([...applications, response.data.data]);
      setIsNewApplicationModalOpen(false);
      setSelectedGroup('');
      setSelectedProject('');
      setMotivationStatement('');
      
      // If we came from a project, navigate back to projects
      if (projectIdFromUrl) {
        navigate('/projects');
      }
    } catch (err: any) {
      console.error('Error submitting application:', err);
      alert(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle view application
  const handleViewApplication = async (applicationId: string) => {
    try {
      const response = await studentAPI.getApplicationById(applicationId);
      setSelectedApplication(response.data.data);
      setIsViewModalOpen(true);
    } catch (err) {
      console.error('Error fetching application details:', err);
      alert('Failed to fetch application details');
    }
  };

  // Handle withdraw application
  const handleWithdrawApplication = async (applicationId: string) => {
    if (!confirm('Are you sure you want to withdraw this application?')) {
      return;
    }
    
    try {
      await studentAPI.withdrawApplication(applicationId);
      // Remove the application from the list
      setApplications(applications.filter(app => app.id !== applicationId));
      setIsViewModalOpen(false);
    } catch (err: any) {
      console.error('Error withdrawing application:', err);
      alert(err.response?.data?.message || 'Failed to withdraw application');
    }
  };

  // Get status badge based on application status
  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.PENDING:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      case ApplicationStatus.APPROVED:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Approved</span>;
      case ApplicationStatus.REJECTED:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
            <p className="text-gray-600">Manage and track your project applications</p>
          </div>
          
          <button 
            onClick={() => setIsNewApplicationModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FileText className="h-4 w-4 mr-2" />
            New Application
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-700">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <FileText className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Found</h3>
            <p className="text-gray-600 mb-6">
              You haven't submitted any applications yet. Start by applying to a project.
            </p>
            <button 
              onClick={() => navigate('/projects')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Browse Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {/* Application Cards */}
            {applications.map((application) => (
              <div 
                key={application.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        {getStatusBadge(application.applicationStatus)}
                        <span className="ml-3 text-sm text-gray-500">
                          <Clock className="h-4 w-4 inline mr-1" />
                          Submitted on {new Date(application.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{application.project.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        <span className="font-medium">{application.project.course}</span> • Faculty: {application.project.faculty.user.name}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Group:</span> {application.group.name}
                    </p>
                  </div>

                  {application.applicationStatus === ApplicationStatus.APPROVED && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-start">
                      <Check className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" />
                      <div>
                        <h4 className="text-sm font-medium text-green-800">Application Approved</h4>
                        <p className="mt-1 text-sm text-green-700">
                          Your application has been approved. You can now start working on this project.
                        </p>
                      </div>
                    </div>
                  )}

                  {application.applicationStatus === ApplicationStatus.REJECTED && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-start">
                      <XCircle className="flex-shrink-0 h-5 w-5 text-red-500 mt-0.5 mr-3" />
                      <div>
                        <h4 className="text-sm font-medium text-red-800">Application Rejected</h4>
                        <p className="mt-1 text-sm text-red-700">
                          Your application has been rejected. You may apply to other projects.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleViewApplication(application.id)}
                      className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Application Modal */}
      {isViewModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
                <button 
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedApplication.project.title}</h3>
                <div className="flex items-center mb-4">
                  {getStatusBadge(selectedApplication.applicationStatus)}
                  <span className="ml-3 text-sm text-gray-500">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Last updated: {new Date(selectedApplication.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Course Type</p>
                    <p className="font-medium">{selectedApplication.project.course}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Faculty</p>
                    <p className="font-medium">{selectedApplication.project.faculty.user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Submitted On</p>
                    <p className="font-medium">
                      {new Date(selectedApplication.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Application ID</p>
                    <p className="font-medium">{selectedApplication.id}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Group Members</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="space-y-2">
                      {selectedApplication.group.members.map((member, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium mr-3">
                            {member.student.user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{member.student.user.name}</p>
                            <p className="text-xs text-gray-500">
                              {member.memberRole === 'Leader' ? 'Group Leader' : 'Member'}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {selectedApplication.applicationStatus === ApplicationStatus.PENDING && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex">
                      <Info className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-yellow-800">Pending Review</h4>
                        <p className="mt-1 text-sm text-yellow-700">
                          Your application is currently being reviewed by the faculty. You will be notified once a decision is made.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                
                {selectedApplication.applicationStatus === ApplicationStatus.PENDING && (
                  <button
                    onClick={() => handleWithdrawApplication(selectedApplication.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Withdraw Application
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Application Modal */}
      {isNewApplicationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">New Application</h2>
                <button 
                  onClick={() => setIsNewApplicationModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Group
                </label>
                {myGroups.length === 0 ? (
                  <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-yellow-700 text-sm">
                      You don't have any groups yet. Please create a group first.
                    </p>
                    <button
                      onClick={() => {
                        setIsNewApplicationModalOpen(false);
                        navigate('/groups');
                      }}
                      className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600"
                    >
                      Create Group
                    </button>
                  </div>
                ) : (
                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  >
                    <option value="">Select a Group</option>
                    {myGroups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name} ({group.members.length}/{group.maxMember} members)
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {!projectIdFromUrl && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Project
                  </label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  >
                    <option value="">Select a Project</option>
                    {/* This would be populated from an API call in a real scenario */}
                    <option value="project1">AI-Based Health Monitoring (IDP)</option>
                    <option value="project2">Smart City Traffic Control (Capstone)</option>
                    <option value="project3">Renewable Energy Forecasting (UROP)</option>
                  </select>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <Info className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Application Note</h4>
                    <p className="mt-1 text-sm text-blue-700">
                      By submitting this application, you and your group members are committing to work on this project if approved.
                      The faculty will review your application and may contact you for more information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsNewApplicationModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitApplication}
                  disabled={!selectedGroup || (!projectIdFromUrl && !selectedProject) || isSubmitting}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                    !selectedGroup || (!projectIdFromUrl && !selectedProject) || isSubmitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                      Submitting...
                    </span>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Application;