import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Users, Search, Filter, Check, X, Eye, MessageSquare, Clock, User, Shield } from 'lucide-react';

// Group status enum
enum GroupStatus {
  FORMING = 'forming',
  PENDING_APPROVAL = 'pending_approval',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

// Project types (using the ones from Project.tsx)
enum CourseType {
  IDP = 'IDP',
  UROP = 'UROP',
  Capstone = 'Capstone'
}

// Group member interface
interface GroupMember {
  id: string;
  name: string;
  email: string;
  joinedAt?: Date;
}

// Group interface
interface Group {
  id: string;
  projectId: string;
  projectTitle: string;
  courseType: CourseType;
  status: GroupStatus;
  createdAt: Date;
  updatedAt: Date;
  members: GroupMember[];
  maxMembers: number;
  feedback?: string;
  leaderId: string;
}

const GroupReview: React.FC = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [filterStatus, setFilterStatus] = useState<GroupStatus | 'all'>('all');
  const [filterProject, setFilterProject] = useState<string>('all');
  const [filterCourse, setFilterCourse] = useState<CourseType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [uniqueProjects, setUniqueProjects] = useState<{id: string, title: string}[]>([]);

  // Mock data for groups - would be replaced with API call
  useEffect(() => {
    // Sample data
    const mockGroups: Group[] = [
      {
        id: 'group-1',
        projectId: 'proj-123',
        projectTitle: 'AI-Based Health Monitoring',
        courseType: CourseType.IDP,
        status: GroupStatus.PENDING_APPROVAL,
        createdAt: new Date('2025-01-15'),
        updatedAt: new Date('2025-01-20'),
        members: [
          {
            id: 'user-1',
            name: 'John Smith',
            email: 'john@example.com',
            joinedAt: new Date('2025-01-15')
          },
          {
            id: 'user-2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            joinedAt: new Date('2025-01-16')
          },
          {
            id: 'user-3',
            name: 'Mike Johnson',
            email: 'mike@example.com',
            joinedAt: new Date('2025-01-17')
          }
        ],
        maxMembers: 4,
        leaderId: 'user-1'
      },
      {
        id: 'group-2',
        projectId: 'proj-456',
        projectTitle: 'Cloud-Based Education Platform',
        courseType: CourseType.Capstone,
        status: GroupStatus.APPROVED,
        createdAt: new Date('2025-02-10'),
        updatedAt: new Date('2025-02-15'),
        members: [
          {
            id: 'user-4',
            name: 'Sarah Williams',
            email: 'sarah@example.com',
            joinedAt: new Date('2025-02-10')
          },
          {
            id: 'user-5',
            name: 'David Brown',
            email: 'david@example.com',
            joinedAt: new Date('2025-02-11')
          },
          {
            id: 'user-6',
            name: 'Emma Wilson',
            email: 'emma@example.com',
            joinedAt: new Date('2025-02-12')
          }
        ],
        maxMembers: 5,
        feedback: 'Group approved. Your project plan looks solid and the team composition is well balanced.',
        leaderId: 'user-4'
      },
      {
        id: 'group-3',
        projectId: 'proj-789',
        projectTitle: 'Cybersecurity Risk Assessment Tool',
        courseType: CourseType.UROP,
        status: GroupStatus.REJECTED,
        createdAt: new Date('2025-03-05'),
        updatedAt: new Date('2025-03-08'),
        members: [
          {
            id: 'user-7',
            name: 'Alex Johnson',
            email: 'alex@example.com',
            joinedAt: new Date('2025-03-05')
          },
          {
            id: 'user-8',
            name: 'Jessica Taylor',
            email: 'jessica@example.com',
            joinedAt: new Date('2025-03-06')
          }
        ],
        maxMembers: 4,
        feedback: 'Group rejected. The team size is too small for the complexity of this project. Please add more members with cybersecurity experience.',
        leaderId: 'user-7'
      }
    ];
    
    setGroups(mockGroups);
    
    // Extract unique projects
    const projects = Array.from(new Set(mockGroups.map(group => group.projectId)))
      .map(id => {
        const group = mockGroups.find(g => g.projectId === id);
        return {
          id,
          title: group?.projectTitle || 'Unknown Project'
        };
      });
    
    setUniqueProjects(projects);
  }, [user]);

  // Filter groups based on selected filters
  const filteredGroups = groups.filter(group => 
    (filterStatus === 'all' || group.status === filterStatus) &&
    (filterProject === 'all' || group.projectId === filterProject) &&
    (filterCourse === 'all' || group.courseType === filterCourse) &&
    (
      searchTerm === '' || 
      group.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.members.some(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  );

  // Handle group approval
  const handleApproveGroup = () => {
    if (!selectedGroup) return;
    
    const updatedGroup = {
      ...selectedGroup,
      status: GroupStatus.APPROVED,
      feedback: feedbackText,
      updatedAt: new Date()
    };
    
    setGroups(groups.map(group => 
      group.id === selectedGroup.id ? updatedGroup : group
    ));
    
    setIsReviewModalOpen(false);
    setSelectedGroup(null);
    setFeedbackText('');
  };

  // Handle group rejection
  const handleRejectGroup = () => {
    if (!selectedGroup) return;
    
    const updatedGroup = {
      ...selectedGroup,
      status: GroupStatus.REJECTED,
      feedback: feedbackText,
      updatedAt: new Date()
    };
    
    setGroups(groups.map(group => 
      group.id === selectedGroup.id ? updatedGroup : group
    ));
    
    setIsReviewModalOpen(false);
    setSelectedGroup(null);
    setFeedbackText('');
  };

  // Get status badge
  const getStatusBadge = (status: GroupStatus) => {
    switch (status) {
      case GroupStatus.FORMING:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Forming</span>;
      case GroupStatus.PENDING_APPROVAL:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending Approval</span>;
      case GroupStatus.APPROVED:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Approved</span>;
      case GroupStatus.REJECTED:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Rejected</span>;
      default:
        return null;
    }
  };

  // Find group leader
  const getGroupLeader = (group: Group) => {
    return group.members.find(member => member.id === group.leaderId);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Group Review</h1>
          <p className="text-gray-600">Review and manage student project groups</p>
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
                onChange={(e) => setFilterStatus(e.target.value as GroupStatus | 'all')}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="all">All Statuses</option>
                {Object.values(GroupStatus).map((status) => (
                  <option key={status} value={status}>{status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</option>
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
                placeholder="Search project or student..."
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

        {/* Groups List */}
        {filteredGroups.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <Users className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Groups Found</h3>
            <p className="text-gray-600 mb-6">
              {groups.length === 0 
                ? "No student groups have been created for your projects yet." 
                : "No groups match your selected filters."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <div 
                key={group.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        {getStatusBadge(group.status)}
                        <span className="ml-2 text-xs text-gray-500">
                          {group.members.length}/{group.maxMembers} members
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{group.projectTitle}</h3>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{group.courseType}</span>
                      </p>
                    </div>
                  </div>

                  {/* Group Leader */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Group Leader</h4>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium mr-3">
                        {getGroupLeader(group)?.name.charAt(0) || '?'}
                      </div>
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">{getGroupLeader(group)?.name || 'Unknown'}</p>
                        <p className="text-gray-500 text-xs">{getGroupLeader(group)?.email || 'No email'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Group Info */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500">Created</p>
                      <p className="font-medium">{group.createdAt.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Updated</p>
                      <p className="font-medium">{group.updatedAt.toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Group Actions */}
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setSelectedGroup(group);
                        setIsViewModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </button>
                    
                    {group.status === GroupStatus.PENDING_APPROVAL && (
                      <button
                        onClick={() => {
                          setSelectedGroup(group);
                          setFeedbackText('');
                          setIsReviewModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-yellow-600 text-white rounded-lg text-sm hover:bg-yellow-700 flex items-center"
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Group Details Modal */}
        {isViewModalOpen && selectedGroup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Group Details</h2>
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
                      <h3 className="text-lg font-semibold text-gray-900">{selectedGroup.projectTitle}</h3>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{selectedGroup.courseType}</span>
                      </p>
                    </div>
                    {getStatusBadge(selectedGroup.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Created</p>
                      <p className="font-medium">{selectedGroup.createdAt.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium">{selectedGroup.updatedAt.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Group ID</p>
                      <p className="font-medium">{selectedGroup.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Max Members</p>
                      <p className="font-medium">{selectedGroup.maxMembers}</p>
                    </div>
                  </div>

                  {/* Group Members */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Group Members ({selectedGroup.members.length})</h4>
                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                      <ul className="divide-y divide-gray-200">
                        {selectedGroup.members.map((member) => (
                          <li key={member.id} className="p-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium mr-4 ${
                                member.id === selectedGroup.leaderId ? 'bg-blue-600' : 'bg-gray-400'
                              }`}>
                                {member.name.charAt(0)}
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <p className="font-medium text-gray-900">{member.name}</p>
                                  {member.id === selectedGroup.leaderId && (
                                    <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full flex items-center">
                                      <Shield className="h-3 w-3 mr-1" />
                                      Leader
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-500 text-sm">{member.email}</p>
                                {member.joinedAt && (
                                  <p className="text-gray-400 text-xs">
                                    Joined {member.joinedAt.toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Faculty Feedback (if rejected or approved) */}
                  {selectedGroup.feedback && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Your Feedback</h4>
                      <div className={`p-4 rounded-lg ${
                        selectedGroup.status === GroupStatus.APPROVED ? 'bg-green-50 border border-green-200' :
                        selectedGroup.status === GroupStatus.REJECTED ? 'bg-red-50 border border-red-200' :
                        'bg-gray-50 border border-gray-200'
                      }`}>
                        <p className="text-gray-700 whitespace-pre-line">{selectedGroup.feedback}</p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setIsViewModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                    
                    {selectedGroup.status === GroupStatus.PENDING_APPROVAL && (
                      <button
                        onClick={() => {
                          setIsViewModalOpen(false);
                          setFeedbackText('');
                          setIsReviewModalOpen(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Review Group
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Review Group Modal */}
        {isReviewModalOpen && selectedGroup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Review Group</h2>
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
                      <h3 className="text-lg font-semibold text-gray-900">{selectedGroup.projectTitle}</h3>
                      <p className="text-sm text-gray-600 mb-2 sm:mb-0">
                        {selectedGroup.members.length} members • Led by {getGroupLeader(selectedGroup)?.name || 'Unknown'}
                      </p>
                    </div>
                    {getStatusBadge(selectedGroup.status)}
                  </div>
                  
                  {/* Group Summary */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Group Summary</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        This group has {selectedGroup.members.length} members out of a maximum of {selectedGroup.maxMembers}.
                        {selectedGroup.members.length < 2 
                          ? " The group size may be too small for the project scope."
                          : selectedGroup.members.length >= selectedGroup.maxMembers
                            ? " The group has reached its maximum size."
                            : " The group size appears appropriate for the project."
                        }
                      </p>
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
                      placeholder="Enter your feedback about the group composition, size, and any other comments..."
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
                      onClick={handleRejectGroup}
                      className="w-full sm:w-auto mb-3 sm:mb-0 sm:ml-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject Group
                    </button>
                    
                    <button
                      onClick={handleApproveGroup}
                      className="w-full sm:w-auto sm:ml-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve Group
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

export default GroupReview;