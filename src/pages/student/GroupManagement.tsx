// import React, { useState, useEffect } from 'react';
// import { Users, Plus, Copy, Check, Mail, ArrowRight, X, Info, UserPlus, Link as LinkIcon } from 'lucide-react';
// import { useAuth } from '../../hooks/useAuth';

// // Group member status enum
// enum MemberStatus {
//   INVITED = 'invited',
//   ACCEPTED = 'accepted',
//   REJECTED = 'rejected'
// }

// // Group status enum
// enum GroupStatus {
//   FORMING = 'forming',
//   PENDING_APPROVAL = 'pending_approval',
//   APPROVED = 'approved',
//   REJECTED = 'rejected'
// }

// // Project types (using the ones from Project.tsx)
// enum CourseType {
//   IDP = 'IDP',
//   UROP = 'UROP',
//   Capstone = 'Capstone'
// }

// // Group member interface
// interface GroupMember {
//   id: string;
//   name: string;
//   email: string;
//   status: MemberStatus;
//   joinedAt?: Date;
// }

// // Group interface
// interface Group {
//   id: string;
//   projectId: string;
//   projectTitle: string;
//   courseType: CourseType;
//   status: GroupStatus;
//   createdAt: Date;
//   updatedAt: Date;
//   members: GroupMember[];
//   invitationCode?: string;
//   maxMembers: number;
//   feedback?: string;
// }

// const GroupManagement: React.FC = () => {
//   const { user } = useAuth();
//   const [groups, setGroups] = useState<Group[]>([]);
//   const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
//   const [newProjectId, setNewProjectId] = useState('');
//   const [inviteEmails, setInviteEmails] = useState<string[]>(['']);
//   const [groupProjects, setGroupProjects] = useState<{id: string, title: string, course: CourseType}[]>([]);
//   const [inviteLinkCopied, setInviteLinkCopied] = useState(false);
//   const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
//   const [invitationCode, setInvitationCode] = useState('');

//   // Mocked project data for the group creation dropdown
//   useEffect(() => {
//     setGroupProjects([
//       { id: 'proj-123', title: 'AI-Based Health Monitoring', course: CourseType.IDP },
//       { id: 'proj-456', title: 'Smart City Traffic Control', course: CourseType.Capstone },
//       { id: 'proj-789', title: 'Renewable Energy Forecasting', course: CourseType.UROP }
//     ]);
//   }, []);

//   // Mocked groups data - in a real app, this would come from an API
//   useEffect(() => {
//     if (!user) return;
    
//     // Sample data
//     const mockGroups: Group[] = [
//       {
//         id: 'group-1',
//         projectId: 'proj-123',
//         projectTitle: 'AI-Based Health Monitoring',
//         courseType: CourseType.IDP,
//         status: GroupStatus.APPROVED,
//         createdAt: new Date('2025-01-15'),
//         updatedAt: new Date('2025-01-20'),
//         members: [
//           {
//             id: user.id || 'user-1',
//             name: user.name || 'Current User',
//             email: user.email || 'user@example.com',
//             status: MemberStatus.ACCEPTED,
//             joinedAt: new Date('2025-01-15')
//           },
//           {
//             id: 'user-2',
//             name: 'Jane Smith',
//             email: 'jane@example.com',
//             status: MemberStatus.ACCEPTED,
//             joinedAt: new Date('2025-01-16')
//           },
//           {
//             id: 'user-3',
//             name: 'Mike Johnson',
//             email: 'mike@example.com',
//             status: MemberStatus.ACCEPTED,
//             joinedAt: new Date('2025-01-17')
//           }
//         ],
//         maxMembers: 4,
//         invitationCode: 'IDP-AI-2025'
//       },
//       {
//         id: 'group-2',
//         projectId: 'proj-456',
//         projectTitle: 'Smart City Traffic Control',
//         courseType: CourseType.Capstone,
//         status: GroupStatus.FORMING,
//         createdAt: new Date('2025-02-10'),
//         updatedAt: new Date('2025-02-10'),
//         members: [
//           {
//             id: user.id || 'user-1',
//             name: user.name || 'Current User',
//             email: user.email || 'user@example.com',
//             status: MemberStatus.ACCEPTED,
//             joinedAt: new Date('2025-02-10')
//           },
//           {
//             id: 'user-4',
//             name: 'Sarah Williams',
//             email: 'sarah@example.com',
//             status: MemberStatus.INVITED
//           }
//         ],
//         maxMembers: 3,
//         invitationCode: 'CAP-CITY-2025'
//       }
//     ];
    
//     setGroups(mockGroups);
//   }, [user]);

//   // Handle create group
//   const handleCreateGroup = () => {
//     // Find the selected project details
//     const project = groupProjects.find(p => p.id === newProjectId);
    
//     if (!project || !user) return;
    
//     // Create a new group
//     const newGroup: Group = {
//       id: `group-${Date.now()}`,
//       projectId: project.id,
//       projectTitle: project.title,
//       courseType: project.course,
//       status: GroupStatus.FORMING,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       members: [
//         {
//           id: user.id || 'current-user',
//           name: user.name || 'Current User',
//           email: user.email || 'user@example.com',
//           status: MemberStatus.ACCEPTED,
//           joinedAt: new Date()
//         }
//       ],
//       maxMembers: 4, // Default max size
//       invitationCode: `${project.course.substring(0, 3)}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
//     };
    
//     setGroups([...groups, newGroup]);
//     setIsCreateModalOpen(false);
//     setNewProjectId('');
//   };

//   // Handle sending invitations
//   const handleSendInvitations = () => {
//     if (!selectedGroup) return;
    
//     // Filter out empty email addresses
//     const validEmails = inviteEmails.filter(email => email.trim() !== '');
    
//     // Create new members from the emails
//     const newMembers = validEmails.map(email => ({
//       id: `temp-${Date.now()}-${Math.random()}`,
//       name: 'Invited User',
//       email,
//       status: MemberStatus.INVITED
//     }));
    
//     // Update the selected group with new members
//     const updatedGroup = {
//       ...selectedGroup,
//       members: [...selectedGroup.members, ...newMembers],
//       updatedAt: new Date()
//     };
    
//     // Update the groups list
//     setGroups(groups.map(g => g.id === selectedGroup.id ? updatedGroup : g));
//     setSelectedGroup(updatedGroup);
//     setIsInviteModalOpen(false);
//     setInviteEmails(['']);
//   };

//   // Handle email inputs in invite modal
//   const handleEmailChange = (index: number, value: string) => {
//     const updatedEmails = [...inviteEmails];
//     updatedEmails[index] = value;
//     setInviteEmails(updatedEmails);
//   };

//   // Add another email input field
//   const addEmailField = () => {
//     setInviteEmails([...inviteEmails, '']);
//   };

//   // Remove an email input field
//   const removeEmailField = (index: number) => {
//     if (inviteEmails.length <= 1) return;
//     const updatedEmails = inviteEmails.filter((_, i) => i !== index);
//     setInviteEmails(updatedEmails);
//   };

//   // Copy invitation link
//   const copyInvitationLink = () => {
//     if (!selectedGroup || !selectedGroup.invitationCode) return;
    
//     // In a real app, this would be a proper URL
//     const inviteUrl = `https://college-project-portal.example/join/${selectedGroup.invitationCode}`;
//     navigator.clipboard.writeText(inviteUrl).then(() => {
//       setInviteLinkCopied(true);
//       setTimeout(() => setInviteLinkCopied(false), 2000);
//     });
//   };

//   // Join a group with invitation code
//   const handleJoinGroup = () => {
//     // In a real app, this would make an API call to validate and join the group
    
//     // For demo purposes, just show a success alert
//     alert(`Joined group with code: ${invitationCode}`);
    
//     setIsJoinModalOpen(false);
//     setInvitationCode('');
//   };

//   // Get status badge for group
//   const getStatusBadge = (status: GroupStatus) => {
//     switch (status) {
//       case GroupStatus.FORMING:
//         return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Forming</span>;
//       case GroupStatus.PENDING_APPROVAL:
//         return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Pending Approval</span>;
//       case GroupStatus.APPROVED:
//         return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Approved</span>;
//       case GroupStatus.REJECTED:
//         return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Rejected</span>;
//       default:
//         return null;
//     }
//   };

//   // Get member status badge
//   const getMemberStatusBadge = (status: MemberStatus) => {
//     switch (status) {
//       case MemberStatus.INVITED:
//         return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Invited</span>;
//       case MemberStatus.ACCEPTED:
//         return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Accepted</span>;
//       case MemberStatus.REJECTED:
//         return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Declined</span>;
//       default:
//         return null;
//     }
//   };

//   // Submit group for approval
//   const submitGroupForApproval = (groupId: string) => {
//     const group = groups.find(g => g.id === groupId);
//     if (!group) return;
    
//     const updatedGroup = {
//       ...group,
//       status: GroupStatus.PENDING_APPROVAL,
//       updatedAt: new Date()
//     };
    
//     setGroups(groups.map(g => g.id === groupId ? updatedGroup : g));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Group Management</h1>
//             <p className="text-gray-600">Create and manage your project groups</p>
//           </div>
//           <div className="flex space-x-3">
//             <button
//               onClick={() => setIsJoinModalOpen(true)}
//               className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
//             >
//               <LinkIcon className="h-4 w-4 mr-2" />
//               Join with Code
//             </button>
//             <button
//               onClick={() => setIsCreateModalOpen(true)}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Create Group
//             </button>
//           </div>
//         </div>

//         {/* Groups List */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {groups.length === 0 ? (
//             <div className="col-span-3 bg-white rounded-xl shadow-md p-8 text-center">
//               <div className="flex justify-center mb-4">
//                 <Users className="h-16 w-16 text-gray-400" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No Groups Found</h3>
//               <p className="text-gray-600 mb-6">
//                 You haven't created or joined any project groups yet.
//               </p>
//               <button 
//                 onClick={() => setIsCreateModalOpen(true)}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Create Your First Group
//               </button>
//             </div>
//           ) : (
//             groups.map((group) => (
//               <div 
//                 key={group.id} 
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
//               >
//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-4">
//                     <div>
//                       <div className="flex items-center mb-2">
//                         {getStatusBadge(group.status)}
//                         <span className="ml-2 text-xs text-gray-500">
//                           {group.members.filter(m => m.status === MemberStatus.ACCEPTED).length}/{group.maxMembers} members
//                         </span>
//                       </div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-1">{group.projectTitle}</h3>
//                       <p className="text-sm text-gray-600">
//                         <span className="font-medium">{group.courseType}</span>
//                       </p>
//                     </div>
//                   </div>

//                   {/* Member List Preview */}
//                   <div className="mb-4">
//                     <h4 className="text-sm font-medium text-gray-700 mb-2">Members:</h4>
//                     <ul className="space-y-2">
//                       {group.members.slice(0, 3).map((member) => (
//                         <li key={member.id} className="flex items-center justify-between">
//                           <div className="flex items-center">
//                             <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium mr-3">
//                               {member.name.charAt(0)}
//                             </div>
//                             <div className="text-sm">
//                               <p className="font-medium text-gray-900">{member.name}</p>
//                               <p className="text-gray-500 text-xs">{member.email}</p>
//                             </div>
//                           </div>
//                           {getMemberStatusBadge(member.status)}
//                         </li>
//                       ))}
//                       {group.members.length > 3 && (
//                         <li className="text-sm text-gray-600">
//                           +{group.members.length - 3} more members
//                         </li>
//                       )}
//                     </ul>
//                   </div>

//                   {/* Group Actions */}
//                   <div className="mt-4 flex justify-end space-x-2">
//                     <button
//                       onClick={() => {
//                         setSelectedGroup(group);
//                         setIsInviteModalOpen(true);
//                       }}
//                       disabled={group.status !== GroupStatus.FORMING}
//                       className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
//                         group.status === GroupStatus.FORMING
//                           ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                           : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                       }`}
//                     >
//                       <UserPlus className="h-4 w-4 mr-1" />
//                       Invite
//                     </button>
                    
//                     <button
//                       onClick={() => setSelectedGroup(group)}
//                       className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center"
//                     >
//                       <Info className="h-4 w-4 mr-1" />
//                       Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Group Details Modal */}
//         {selectedGroup && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-bold text-gray-900">Group Details</h2>
//                   <button 
//                     onClick={() => setSelectedGroup(null)}
//                     className="text-gray-400 hover:text-gray-500"
//                   >
//                     <X className="h-6 w-6" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <div className="mb-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">{selectedGroup.projectTitle}</h3>
//                       <p className="text-sm text-gray-600">
//                         <span className="font-medium">{selectedGroup.courseType}</span>
//                       </p>
//                     </div>
//                     {getStatusBadge(selectedGroup.status)}
//                   </div>
                  
//                   <div className="grid grid-cols-2 gap-4 mb-6">
//                     <div>
//                       <p className="text-sm text-gray-500">Created</p>
//                       <p className="font-medium">{selectedGroup.createdAt.toLocaleDateString()}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Last Updated</p>
//                       <p className="font-medium">{selectedGroup.updatedAt.toLocaleDateString()}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Group ID</p>
//                       <p className="font-medium">{selectedGroup.id}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Max Members</p>
//                       <p className="font-medium">{selectedGroup.maxMembers}</p>
//                     </div>
//                   </div>

//                   {/* Invitation Link */}
//                   {selectedGroup.status === GroupStatus.FORMING && (
//                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//                       <div className="flex items-start">
//                         <LinkIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
//                         <div className="flex-grow">
//                           <h4 className="text-sm font-medium text-blue-800">Invitation Code</h4>
//                           <p className="mt-1 text-sm text-blue-700">
//                             Share this code with others to join your group
//                           </p>
//                           <div className="mt-2 flex">
//                             <div className="bg-white border border-blue-300 rounded-l-lg px-3 py-2 text-blue-800 font-mono flex-grow">
//                               {selectedGroup.invitationCode}
//                             </div>
//                             <button
//                               onClick={copyInvitationLink}
//                               className={`px-3 py-2 rounded-r-lg ${
//                                 inviteLinkCopied 
//                                   ? 'bg-green-500 text-white' 
//                                   : 'bg-blue-600 text-white hover:bg-blue-700'
//                               }`}
//                             >
//                               {inviteLinkCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* Group Members */}
//                   <div className="mb-6">
//                     <div className="flex justify-between items-center mb-4">
//                       <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Members</h4>
//                       {selectedGroup.status === GroupStatus.FORMING && (
//                         <button
//                           onClick={() => {
//                             setIsInviteModalOpen(true);
//                           }}
//                           className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
//                         >
//                           <UserPlus className="h-4 w-4 mr-1" />
//                           Invite Members
//                         </button>
//                       )}
//                     </div>
//                     <div className="bg-gray-50 rounded-lg overflow-hidden">
//                       <ul className="divide-y divide-gray-200">
//                         {selectedGroup.members.map((member) => (
//                           <li key={member.id} className="p-4 flex items-center justify-between">
//                             <div className="flex items-center">
//                               <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium mr-4">
//                                 {member.name.charAt(0)}
//                               </div>
//                               <div>
//                                 <p className="font-medium text-gray-900">{member.name}</p>
//                                 <p className="text-gray-500 text-sm">{member.email}</p>
//                                 {member.joinedAt && (
//                                   <p className="text-gray-400 text-xs">
//                                     Joined {member.joinedAt.toLocaleDateString()}
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                             <div className="flex items-center">
//                               {getMemberStatusBadge(member.status)}
//                               {selectedGroup.status === GroupStatus.FORMING && 
//                                member.status === MemberStatus.INVITED && (
//                                 <button className="ml-2 text-red-500 hover:text-red-700">
//                                   <X className="h-5 w-5" />
//                                 </button>
//                               )}
//                             </div>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>

//                   {/* Faculty Feedback (if rejected or approved) */}
//                   {selectedGroup.feedback && (
//                     <div className="mb-6">
//                       <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Faculty Feedback</h4>
//                       <div className={`p-4 rounded-lg ${
//                         selectedGroup.status === GroupStatus.APPROVED ? 'bg-green-50 border border-green-200' :
//                         selectedGroup.status === GroupStatus.REJECTED ? 'bg-red-50 border border-red-200' :
//                         'bg-gray-50 border border-gray-200'
//                       }`}>
//                         <p className="text-gray-700 whitespace-pre-line">{selectedGroup.feedback}</p>
//                       </div>
//                     </div>
//                   )}

//                   {/* Action Buttons */}
//                   <div className="flex justify-end space-x-3 mt-6">
//                     <button
//                       onClick={() => setSelectedGroup(null)}
//                       className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                     >
//                       Close
//                     </button>
                    
//                     {selectedGroup.status === GroupStatus.FORMING && (
//                       <button
//                         onClick={() => submitGroupForApproval(selectedGroup.id)}
//                         disabled={selectedGroup.members.filter(m => m.status === MemberStatus.ACCEPTED).length < 2}
//                         className={`px-4 py-2 rounded-lg font-medium flex items-center ${
//                           selectedGroup.members.filter(m => m.status === MemberStatus.ACCEPTED).length < 2
//                             ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                             : 'bg-blue-600 text-white hover:bg-blue-700'
//                         }`}
//                       >
//                         <ArrowRight className="h-4 w-4 mr-2" />
//                         Submit for Approval
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Create Group Modal */}
//         {isCreateModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-bold text-gray-900">Create New Group</h2>
//                   <button 
//                     onClick={() => setIsCreateModalOpen(false)}
//                     className="text-gray-400 hover:text-gray-500"
//                   >
//                     <X className="h-6 w-6" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Select Project
//                   </label>
//                   <select
//                     value={newProjectId}
//                     onChange={(e) => setNewProjectId(e.target.value)}
//                     className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
//                     required
//                   >
//                     <option value="">Select a project</option>
//                     {groupProjects.map((project) => (
//                       <option key={project.id} value={project.id}>
//                         {project.title} ({project.course})
//                       </option>
//                     ))}
//                   </select>
//                   <p className="mt-1 text-sm text-gray-500">
//                     Choose the project you want to create a group for
//                   </p>
//                 </div>

//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
//                   <div className="flex">
//                     <Info className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
//                     <div>
//                       <h4 className="text-sm font-medium text-yellow-800">Important Note</h4>
//                       <p className="mt-1 text-sm text-yellow-700">
//                         Creating a group will make you the group leader. You'll need at least one more member to submit the group for approval.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-end space-x-3">
//                   <button
//                     onClick={() => setIsCreateModalOpen(false)}
//                     className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleCreateGroup}
//                     disabled={!newProjectId}
//                     className={`px-4 py-2 rounded-lg font-medium ${
//                       newProjectId
//                         ? 'bg-blue-600 text-white hover:bg-blue-700'
//                         : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     }`}
//                   >
//                     Create Group
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Invite Members Modal */}
//         {isInviteModalOpen && selectedGroup && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-bold text-gray-900">Invite Members</h2>
//                   <button 
//                     onClick={() => setIsInviteModalOpen(false)}
//                     className="text-gray-400 hover:text-gray-500"
//                   >
//                     <X className="h-6 w-6" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <div className="mb-6">
//                   <h3 className="text-sm font-medium text-gray-700 mb-4">
//                     Inviting to: <span className="font-semibold text-gray-900">{selectedGroup.projectTitle}</span>
//                   </h3>
                  
//                   <div className="space-y-3">
//                     {inviteEmails.map((email, index) => (
//                       <div key={index} className="flex items-center">
//                         <input
//                           type="email"
//                           value={email}
//                           onChange={(e) => handleEmailChange(index, e.target.value)}
//                           placeholder="Enter email address"
//                           className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
//                         />
//                         <button
//                           onClick={() => removeEmailField(index)}
//                           className="ml-2 text-gray-400 hover:text-red-500"
//                           disabled={inviteEmails.length <= 1}
//                         >
//                           <X className="h-5 w-5" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
                  
//                   <button
//                     onClick={addEmailField}
//                     className="mt-3 text-sm text-blue-600 hover:text-blue-800 flex items-center"
//                     disabled={selectedGroup.members.length + inviteEmails.filter(e => e.trim() !== '').length >= selectedGroup.maxMembers}
//                   >
//                     <Plus className="h-4 w-4 mr-1" />
//                     Add Another Email
//                   </button>
                  
//                   {selectedGroup.members.length + inviteEmails.filter(e => e.trim() !== '').length >= selectedGroup.maxMembers && (
//                     <p className="mt-2 text-sm text-red-500">
//                       Maximum group size reached ({selectedGroup.maxMembers} members)
//                     </p>
//                   )}
//                 </div>

//                 <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                   <div className="flex items-start">
//                     <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-900">Invitation Method</h4>
//                       <p className="mt-1 text-sm text-gray-600">
//                         Invitees will receive an email with instructions to join your group.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-end space-x-3">
//                   <button
//                     onClick={() => setIsInviteModalOpen(false)}
//                     className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSendInvitations}
//                     disabled={!inviteEmails.some(email => email.trim() !== '')}
//                     className={`px-4 py-2 rounded-lg font-medium flex items-center ${
//                       inviteEmails.some(email => email.trim() !== '')
//                         ? 'bg-blue-600 text-white hover:bg-blue-700'
//                         : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     }`}
//                   >
//                     <Mail className="h-4 w-4 mr-2" />
//                     Send Invitations
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Join Group Modal */}
//         {isJoinModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-bold text-gray-900">Join a Group</h2>
//                   <button 
//                     onClick={() => setIsJoinModalOpen(false)}
//                     className="text-gray-400 hover:text-gray-500"
//                   >
//                     <X className="h-6 w-6" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Enter Invitation Code
//                   </label>
//                   <input
//                     type="text"
//                     value={invitationCode}
//                     onChange={(e) => setInvitationCode(e.target.value)}
//                     placeholder="e.g. IDP-AI-2025"
//                     className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all uppercase"
//                   />
//                   <p className="mt-1 text-sm text-gray-500">
//                     Enter the invitation code provided by your group leader
//                   </p>
//                 </div>

//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//                   <div className="flex">
//                     <Info className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
//                     <div>
//                       <h4 className="text-sm font-medium text-blue-800">What happens next?</h4>
//                       <p className="mt-1 text-sm text-blue-700">
//                         Once you join a group, you will be listed as a member and can participate in project activities. You can only be a member of one group per project.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-end space-x-3">
//                   <button
//                     onClick={() => setIsJoinModalOpen(false)}
//                     className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleJoinGroup}
//                     disabled={!invitationCode.trim()}
//                     className={`px-4 py-2 rounded-lg font-medium flex items-center ${
//                       invitationCode.trim()
//                         ? 'bg-blue-600 text-white hover:bg-blue-700'
//                         : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     }`}
//                   >
//                     <Users className="h-4 w-4 mr-2" />
//                     Join Group
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GroupManagement;



import React, { useState, useEffect } from 'react';
import { Users, Plus, Copy, Check, Mail, ArrowRight, X, Info, UserPlus, Link as LinkIcon, Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { studentAPI } from '../../libs/api';

// Group status enum
enum GroupStatus {
  FORMING = 'forming',
  PENDING_APPROVAL = 'pending_approval',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

// Member role enum
enum MemberRole {
  Leader = 'Leader',
  Member = 'Member'
}

// Interface for project data
interface Project {
  id: string;
  title: string;
  course: string;
  faculty: {
    user: {
      name: string;
    }
  }
}

// Interface for group member
interface GroupMember {
  id: string;
  studentId: string;
  memberRole: MemberRole;
  student: {
    user: {
      name: string;
      email: string;
      profilePicture?: string;
    }
  }
}

// Interface for group data
interface Group {
  id: string;
  name: string;
  projectId: string;
  project: Project;
  inviteCode: string;
  maxMember: number;
  isOpen: boolean;
  members: GroupMember[];
  createdAt: string;
  updatedAt: string;
  projectApplication?: {
    id: string;
    applicationStatus: string;
  }[];
}

const GroupManagement: React.FC = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [availableProjects, setAvailableProjects] = useState<Project[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [maxMembers, setMaxMembers] = useState(4);
  const [inviteEmails, setInviteEmails] = useState<string[]>(['']);
  const [inviteCode, setInviteCode] = useState('');
  const [inviteLinkCopied, setInviteLinkCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  
  // Fetch groups
  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await studentAPI.getMyGroups();
        setGroups(response.data.data);
      } catch (err) {
        console.error('Error fetching groups:', err);
        setError('Failed to load groups. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  // Fetch available projects when creating a group
  const fetchAvailableProjects = async () => {
    try {
      const response = await studentAPI.getAvailableProjects();
      setAvailableProjects(response.data.data);
    } catch (err) {
      console.error('Error fetching available projects:', err);
      alert('Failed to load available projects');
    }
  };

  // Create a new group
  const handleCreateGroup = async () => {
    if (!newGroupName || !selectedProjectId) {
      alert('Please fill all required fields');
      return;
    }

    setCreateLoading(true);
    try {
      const response = await studentAPI.createGroup({
        name: newGroupName,
        projectId: selectedProjectId,
        maxMember: maxMembers
      });

      // Add the new group to the list
      setGroups([...groups, response.data.data]);
      setIsCreateModalOpen(false);
      setNewGroupName('');
      setSelectedProjectId('');
      setMaxMembers(4);
    } catch (err: any) {
      console.error('Error creating group:', err);
      alert(err.response?.data?.message || 'Failed to create group');
    } finally {
      setCreateLoading(false);
    }
  };

  // Join a group with invite code
  const handleJoinGroup = async () => {
    if (!inviteCode) {
      alert('Please enter an invitation code');
      return;
    }

    setJoinLoading(true);
    try {
      const response = await studentAPI.joinGroup({
        inviteCode: inviteCode
      });

      // Add the joined group to the list
      setGroups([...groups, response.data.data]);
      setIsJoinModalOpen(false);
      setInviteCode('');
    } catch (err: any) {
      console.error('Error joining group:', err);
      alert(err.response?.data?.message || 'Failed to join group');
    } finally {
      setJoinLoading(false);
    }
  };

  // Leave a group
  const handleLeaveGroup = async (groupId: string) => {
    if (!confirm('Are you sure you want to leave this group?')) {
      return;
    }

    try {
      await studentAPI.leaveGroup(groupId);
      // Remove the group from the list
      setGroups(groups.filter(g => g.id !== groupId));
      setIsViewModalOpen(false);
      setSelectedGroup(null);
    } catch (err: any) {
      console.error('Error leaving group:', err);
      alert(err.response?.data?.message || 'Failed to leave group');
    }
  };

  // Promote a member to leader
  const handlePromoteToLeader = async (groupId: string, memberId: string) => {
    if (!confirm('Are you sure you want to promote this member to leader? You will become a regular member.')) {
      return;
    }

    try {
      const response = await studentAPI.promoteToLeader(groupId, memberId);
      
      // Update the group in the list
      setGroups(groups.map(g => g.id === groupId ? response.data.data : g));
      
      // If viewing this group, update the selected group
      if (selectedGroup && selectedGroup.id === groupId) {
        setSelectedGroup(response.data.data);
      }
    } catch (err: any) {
      console.error('Error promoting member:', err);
      alert(err.response?.data?.message || 'Failed to promote member');
    }
  };

  // Remove a member from the group
  const handleRemoveMember = async (groupId: string, memberId: string) => {
    if (!confirm('Are you sure you want to remove this member from the group?')) {
      return;
    }

    try {
      const response = await studentAPI.removeMember(groupId, memberId);
      
      // Update the group in the list
      setGroups(groups.map(g => g.id === groupId ? response.data.data : g));
      
      // If viewing this group, update the selected group
      if (selectedGroup && selectedGroup.id === groupId) {
        setSelectedGroup(response.data.data);
      }
    } catch (err: any) {
      console.error('Error removing member:', err);
      alert(err.response?.data?.message || 'Failed to remove member');
    }
  };

  // Regenerate invite code
  const handleRegenerateInviteCode = async (groupId: string) => {
    try {
      const response = await studentAPI.regenerateInviteCode(groupId);
      
      // Update the invite code in the selected group
      if (selectedGroup && selectedGroup.id === groupId) {
        setSelectedGroup({
          ...selectedGroup,
          inviteCode: response.data.data.inviteCode
        });
      }
      
      // Update the group in the list
      setGroups(groups.map(g => g.id === groupId ? {
        ...g,
        inviteCode: response.data.data.inviteCode
      } : g));
      
      // Show success message
      alert('Invitation code regenerated successfully');
    } catch (err: any) {
      console.error('Error regenerating invite code:', err);
      alert(err.response?.data?.message || 'Failed to regenerate invite code');
    }
  };

  // Copy invitation link
  const copyInvitationLink = (inviteCode: string) => {
    // In a real app, this would be a proper URL
    const inviteUrl = `${window.location.origin}/join?code=${inviteCode}`;
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setInviteLinkCopied(true);
      setTimeout(() => setInviteLinkCopied(false), 2000);
    });
  };

  // Handle email inputs in invite modal
  const handleEmailChange = (index: number, value: string) => {
    const updatedEmails = [...inviteEmails];
    updatedEmails[index] = value;
    setInviteEmails(updatedEmails);
  };

  // Add another email input field
  const addEmailField = () => {
    setInviteEmails([...inviteEmails, '']);
  };

  // Remove an email input field
  const removeEmailField = (index: number) => {
    if (inviteEmails.length <= 1) return;
    const updatedEmails = inviteEmails.filter((_, i) => i !== index);
    setInviteEmails(updatedEmails);
  };

  // Get status badge
  const getStatusBadge = (group: Group) => {
    // Check if the group has any applications
    if (group.projectApplication && group.projectApplication.length > 0) {
      const application = group.projectApplication[0];
      
      switch (application.applicationStatus.toLowerCase()) {
        case 'approved':
          return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Approved</span>;
        case 'rejected':
          return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Rejected</span>;
        case 'pending':
          return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Application Pending</span>;
        default:
          return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Forming</span>;
      }
    } else {
      return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Forming</span>;
    }
  };

  // Find group leader
  const getGroupLeader = (members: GroupMember[]) => {
    return members.find(member => member.memberRole === MemberRole.Leader);
  };

  // Check if current user is leader of a group
  const isUserLeader = (group: Group) => {
    const leader = getGroupLeader(group.members);
    return leader?.student.user.email === user?.email;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Group Management</h1>
            <p className="text-gray-600">Create and manage your project groups</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsJoinModalOpen(true)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              Join with Code
            </button>
            <button
              onClick={() => {
                fetchAvailableProjects();
                setIsCreateModalOpen(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </button>
          </div>
        </div>

        {/* Groups List */}
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
        ) : groups.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <Users className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Groups Found</h3>
            <p className="text-gray-600 mb-6">
              You haven't created or joined any project groups yet.
            </p>
            <button 
              onClick={() => {
                fetchAvailableProjects();
                setIsCreateModalOpen(true);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Group
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div 
                key={group.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        {getStatusBadge(group)}
                        <span className="ml-2 text-xs text-gray-500">
                          {group.members.length}/{group.maxMember} members
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{group.name}</h3>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{group.project.course}</span> • {group.project.title}
                      </p>
                    </div>
                  </div>

                  {/* Member List Preview */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Members:</h4>
                    <ul className="space-y-2">
                      {group.members.slice(0, 3).map((member) => (
                        <li key={member.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium mr-3">
                              {member.student.user.name.charAt(0)}
                            </div>
                            <div className="text-sm">
                              <div className="flex items-center">
                                <p className="font-medium text-gray-900">{member.student.user.name}</p>
                                {member.memberRole === MemberRole.Leader && (
                                  <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                                    Leader
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-500 text-xs">{member.student.user.email}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                      {group.members.length > 3 && (
                        <li className="text-sm text-gray-600">
                          +{group.members.length - 3} more members
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Group Actions */}
                  <div className="mt-4 flex justify-end space-x-2">
                    {isUserLeader(group) && group.projectApplication?.length === 0 && (
                      <button
                        onClick={() => {
                          setSelectedGroup(group);
                          setIsInviteModalOpen(true);
                          setInviteEmails(['']);
                        }}
                        className="px-3 py-1.5 rounded-lg text-sm flex items-center bg-gray-100 text-gray-700 hover:bg-gray-200"
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        Invite
                      </button>
                    )}
                    
                    <button
                      onClick={() => {
                        setSelectedGroup(group);
                        setIsViewModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center"
                    >
                      <Info className="h-4 w-4 mr-1" />
                      Details
                    </button>
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
                      <h3 className="text-lg font-semibold text-gray-900">{selectedGroup.name}</h3>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{selectedGroup.project.course}</span> • {selectedGroup.project.title}
                      </p>
                    </div>
                    {getStatusBadge(selectedGroup)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Created</p>
                      <p className="font-medium">{new Date(selectedGroup.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium">{new Date(selectedGroup.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Group ID</p>
                      <p className="font-medium">{selectedGroup.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Max Members</p>
                      <p className="font-medium">{selectedGroup.maxMember}</p>
                    </div>
                  </div>

                  {/* Invitation Link */}
                  {(!selectedGroup.projectApplication || selectedGroup.projectApplication.length === 0) && isUserLeader(selectedGroup) && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start">
                        <LinkIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div className="flex-grow">
                          <h4 className="text-sm font-medium text-blue-800">Invitation Code</h4>
                          <p className="mt-1 text-sm text-blue-700">
                            Share this code with others to join your group
                          </p>
                          <div className="mt-2 flex">
                            <div className="bg-white border border-blue-300 rounded-l-lg px-3 py-2 text-blue-800 font-mono flex-grow">
                              {selectedGroup.inviteCode}
                            </div>
                            <button
                              onClick={() => copyInvitationLink(selectedGroup.inviteCode)}
                              className={`px-3 py-2 rounded-r-lg ${
                                inviteLinkCopied 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                            >
                              {inviteLinkCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                            </button>
                          </div>
                          <button 
                            onClick={() => handleRegenerateInviteCode(selectedGroup.id)}
                            className="mt-2 text-sm text-blue-700 hover:text-blue-900"
                          >
                            Regenerate Code
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Group Members */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Members</h4>
                      {isUserLeader(selectedGroup) && (!selectedGroup.projectApplication || selectedGroup.projectApplication.length === 0) && (
                        <button
                          onClick={() => {
                            setIsViewModalOpen(false);
                            setIsInviteModalOpen(true);
                            setInviteEmails(['']);
                          }}
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <UserPlus className="h-4 w-4 mr-1" />
                          Invite Members
                        </button>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                      <ul className="divide-y divide-gray-200">
                        {selectedGroup.members.map((member) => (
                          <li key={member.id} className="p-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium mr-4">
                                {member.student.user.name.charAt(0)}
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <p className="font-medium text-gray-900">{member.student.user.name}</p>
                                  {member.memberRole === MemberRole.Leader && (
                                    <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full flex items-center">
                                      <Shield className="h-3 w-3 mr-1" />
                                      Leader
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-500 text-sm">{member.student.user.email}</p>
                              </div>
                            </div>
                            
                            {/* Member Actions (only if current user is leader and viewing a member that is not themselves) */}
                            {isUserLeader(selectedGroup) && 
                             member.student.user.email !== user?.email &&
                             (!selectedGroup.projectApplication || selectedGroup.projectApplication.length === 0) && (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handlePromoteToLeader(selectedGroup.id, member.id)}
                                  className="p-1 text-blue-600 hover:text-blue-800 rounded"
                                  title="Promote to Leader"
                                >
                                  <Shield className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => handleRemoveMember(selectedGroup.id, member.id)}
                                  className="p-1 text-red-600 hover:text-red-800 rounded"
                                  title="Remove from Group"
                                >
                                  <X className="h-5 w-5" />
                                </button>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Application Status */}
                  {selectedGroup.projectApplication && selectedGroup.projectApplication.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Application Status</h4>
                      <div className={`p-4 rounded-lg ${
                        selectedGroup.projectApplication[0].applicationStatus.toLowerCase() === 'approved' 
                          ? 'bg-green-50 border border-green-200' 
                          : selectedGroup.projectApplication[0].applicationStatus.toLowerCase() === 'rejected'
                            ? 'bg-red-50 border border-red-200'
                            : 'bg-yellow-50 border border-yellow-200'
                      }`}>
                        <p className="text-gray-700">
                          Your group's application for this project is currently
                          <span className="font-semibold"> {selectedGroup.projectApplication[0].applicationStatus}</span>.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="border-t border-gray-200 pt-6 flex justify-end">
                    <button
                      onClick={() => setIsViewModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors mr-3"
                    >
                      Close
                    </button>
                    
                    {/* Leave Group button */}
                    <button
                      onClick={() => handleLeaveGroup(selectedGroup.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Leave Group
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Group Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Create New Group</h2>
                  <button 
                    onClick={() => setIsCreateModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group Name
                  </label>
                  <input
                    type="text"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Enter a name for your group"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Project
                  </label>
                  {availableProjects.length === 0 ? (
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-yellow-700 text-sm">
                        No available projects found. You might already be in groups for all active projects.
                      </p>
                      <button
                        onClick={() => {
                          setIsCreateModalOpen(false);
                          window.location.href = '/projects';
                        }}
                        className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600"
                      >
                        Browse Projects
                      </button>
                    </div>
                  ) : (
                    <select
                      value={selectedProjectId}
                      onChange={(e) => setSelectedProjectId(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    >
                      <option value="">Select a project</option>
                      {availableProjects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.title} ({project.course})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Members
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="10"
                    value={maxMembers}
                    onChange={(e) => setMaxMembers(parseInt(e.target.value))}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Set the maximum number of members for your group (2-10)
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <Info className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">Important Note</h4>
                      <p className="mt-1 text-sm text-yellow-700">
                        Creating a group will make you the group leader. You'll need at least one more member to submit an application.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateGroup}
                    disabled={!newGroupName || !selectedProjectId || createLoading}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      !newGroupName || !selectedProjectId || createLoading
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {createLoading ? (
                      <span className="flex items-center">
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                        Creating...
                      </span>
                    ) : 'Create Group'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invite Members Modal */}
        {isInviteModalOpen && selectedGroup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Invite Members</h2>
                  <button 
                    onClick={() => setIsInviteModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">
                    Inviting to: <span className="font-semibold text-gray-900">{selectedGroup.name}</span>
                  </h3>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Share Invitation Code</h4>
                    <div className="flex">
                      <div className="bg-gray-100 border border-gray-300 rounded-l-lg px-3 py-2 text-gray-800 font-mono flex-grow">
                        {selectedGroup.inviteCode}
                      </div>
                      <button
                        onClick={() => copyInvitationLink(selectedGroup.inviteCode)}
                        className={`px-3 py-2 rounded-r-lg ${
                          inviteLinkCopied 
                            ? 'bg-green-500 text-white' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {inviteLinkCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Share this code with others to let them join your group
                    </p>
                    <button 
                      onClick={() => handleRegenerateInviteCode(selectedGroup.id)}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                      Generate New Code
                    </button>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Current Members</h4>
                    <ul className="space-y-2 mb-4">
                      {selectedGroup.members.map((member) => (
                        <li key={member.id} className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium mr-3">
                            {member.student.user.name.charAt(0)}
                          </div>
                          <div className="text-sm">
                            <div className="flex items-center">
                              <p className="font-medium text-gray-900">{member.student.user.name}</p>
                              {member.memberRole === MemberRole.Leader && (
                                <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                                  Leader
                                </span>
                              )}
                            </div>
                            <p className="text-gray-500 text-xs">{member.student.user.email}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>


                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Invitation Methods</h4>
                      <p className="mt-1 text-sm text-blue-700">
                        Share the invitation code with potential members or invite them directly using the group's unique code.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsInviteModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Join Group Modal */}
        {isJoinModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Join a Group</h2>
                  <button 
                    onClick={() => setIsJoinModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Invitation Code
                  </label>
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    placeholder="e.g. IDP-AI-2025"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all uppercase"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter the invitation code provided by your group leader
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <Info className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">What happens next?</h4>
                      <p className="mt-1 text-sm text-blue-700">
                        Once you join a group, you will be listed as a member and can participate in project activities. You can only be a member of one group per project.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsJoinModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleJoinGroup}
                    disabled={!inviteCode.trim() || joinLoading}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                      !inviteCode.trim() || joinLoading
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {joinLoading ? (
                      <span className="flex items-center">
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                        Joining...
                      </span>
                    ) : (
                      <>
                        <Users className="h-4 w-4 mr-2" />
                        Join Group
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupManagement;