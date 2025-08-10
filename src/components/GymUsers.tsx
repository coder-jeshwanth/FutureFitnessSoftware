import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, User, Phone, Mail, Calendar, CreditCard, Dumbbell, X, Save, Cake, Users as UsersIcon } from 'lucide-react';

interface GymUsersProps {
  selectedBranch?: string;
}

const users = [
  {
    id: 1,
    name: 'Arjun Sharma',
    email: 'arjun.sharma@email.com',
    phone: '+91 98765 43210',
    membership: 'Premium',
    status: 'Active',
    planExpiry: '2025-03-15',
    trainer: 'Vikash Kumar',
    joinDate: '2024-01-15',
    lastPayment: '₹5,000',
    avatar: 'AS',
    branch: 'Stonehousepet'
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91 87654 32109',
    membership: 'Basic',
    status: 'Active',
    planExpiry: '2025-02-28',
    trainer: 'Sneha Reddy',
    joinDate: '2024-02-10',
    lastPayment: '₹2,500',
    avatar: 'PP',
    branch: 'Harinathpuram'
  },
  {
    id: 3,
    name: 'Rohit Kumar',
    email: 'rohit.kumar@email.com',
    phone: '+91 76543 21098',
    membership: 'Premium',
    status: 'Expired',
    planExpiry: '2024-12-31',
    trainer: 'Raj Singh',
    joinDate: '2023-12-01',
    lastPayment: '₹5,000',
    avatar: 'RK',
    branch: 'Vanamthopu Center'
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    email: 'sneha.reddy@email.com',
    phone: '+91 65432 10987',
    membership: 'Standard',
    status: 'InActive',
    planExpiry: '2025-04-20',
    trainer: 'Vikash Kumar',
    joinDate: '2024-03-05',
    lastPayment: '₹3,500',
    avatar: 'SR',
    branch: 'Current Office Center'
  },
  {
    id: 5,
    name: 'Amit Singh',
    email: 'amit.singh@email.com',
    phone: '+91 54321 09876',
    membership: 'Premium',
    status: 'pending',
    planExpiry: '2025-01-30',
    trainer: 'Raj Singh',
    joinDate: '2023-10-15',
    lastPayment: '₹5,000',
    avatar: 'AS',
    branch: 'Vedayapalem'
  },
  {
    id: 6,
    name: 'Divya Mehta',
    email: 'divya.mehta@email.com',
    phone: '+91 89765 12345',
    membership: 'Standard',
    status: 'Active',
    planExpiry: '2025-05-10',
    trainer: 'Sneha Reddy',
    joinDate: '2024-04-15',
    lastPayment: '₹3,500',
    avatar: 'DM',
    branch: 'BV Nagar'
  },
  {
    id: 7,
    name: 'Rakesh Verma',
    email: 'rakesh.verma@email.com',
    phone: '+91 77788 99900',
    membership: 'Premium',
    status: 'Active',
    planExpiry: '2025-07-22',
    trainer: 'Vikash Kumar',
    joinDate: '2024-01-22',
    lastPayment: '₹5,000',
    avatar: 'RV',
    branch: 'Dhanalakshmi Puram'
  },
  {
    id: 8,
    name: 'Neha Gupta',
    email: 'neha.gupta@email.com',
    phone: '+91 98123 45678',
    membership: 'Basic',
    status: 'pending',
    planExpiry: '2025-01-05',
    trainer: 'Raj Singh',
    joinDate: '2023-11-05',
    lastPayment: '₹2,500',
    avatar: 'NG'
  },
   {
    id: 9,
    name: 'Neha Gupta',
    email: 'neha.gupta@email.com',
    phone: '+91 98123 45678',
    membership: 'Basic',
    status: 'pending',
    planExpiry: '2025-01-05',
    trainer: 'Raj Singh',
    joinDate: '2023-11-05',
    lastPayment: '₹2,500',
    avatar: 'NG'
  },
  {
    id: 10,
    name: 'Neha Gupta',
    email: 'neha.gupta@email.com',
    phone: '+91 98123 45678',
    membership: 'Basic',
    status: 'pending',
    planExpiry: '2025-01-05',
    trainer: 'Raj Singh',
    joinDate: '2023-11-05',
    lastPayment: '₹2,500',
    avatar: 'NG'
  },
  {
    id: 11,
    name: 'kishore',
    email: 'kishore@email.com',
    phone: '+91 98123 45678',
    membership: 'Basic',
    status: 'InActive',
    planExpiry: '2025-01-05',
    trainer: 'Raj Singh',
    joinDate: '2023-11-05',
    lastPayment: '₹2,500',
    avatar: 'NG'
  },
  {
    id: 12,
    name: 'Neha Gupta',
    email: 'neha.gupta@email.com',
    phone: '+91 98123 45678',
    membership: 'Basic',
    status: 'pending',
    planExpiry: '2025-01-05',
    trainer: 'Raj Singh',
    joinDate: '2023-11-05',
    lastPayment: '₹2,500',
    avatar: 'NG'
  },
  {
    id: 13,
    name: 'Arjun Sharma',
    email: 'arjun.sharma@email.com',
    phone: '+91 98765 43210',
    membership: 'Premium',
    status: 'Active',
    planExpiry: '2025-03-15',
    trainer: 'Vikash Kumar',
    joinDate: '2024-01-15',
    lastPayment: '₹5,000',
    avatar: 'AS'
  },
  {
    id: 14,
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91 87654 32109',
    membership: 'Basic',
    status: 'Active',
    planExpiry: '2025-02-28',
    trainer: 'Sneha Reddy',
    joinDate: '2024-02-10',
    lastPayment: '₹2,500',
    avatar: 'PP'
  },
  {
    id: 15,
    name: 'Rohit Kumar',
    email: 'rohit.kumar@email.com',
    phone: '+91 76543 21098',
    membership: 'Premium',
    status: 'Expired',
    planExpiry: '2024-12-31',
    trainer: 'Raj Singh',
    joinDate: '2023-12-01',
    lastPayment: '₹5,000',
    avatar: 'RK'
  },
  {
    id:16,
    name: 'Sneha Reddy',
    email: 'sneha.reddy@email.com',
    phone: '+91 65432 10987',
    membership: 'Standard',
    status: 'Active',
    planExpiry: '2025-04-20',
    trainer: 'Vikash Kumar',
    joinDate: '2024-03-05',
    lastPayment: '₹3,500',
    avatar: 'SR'
  },
];

const GymUsers: React.FC<GymUsersProps> = ({ selectedBranch = 'All Branches' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    membership: 'Basic',
    branch: '',
    trainer: '',
    gender: '',
    dob: '',
    paymentMethod: '',
    cashReceived: ''
  });
  // Filter states
  const [statusFilters, setStatusFilters] = useState<{[key: string]: boolean}>({
    Active: false,
    pending: false,
    Expired: false
  });
  const [membershipFilters, setMembershipFilters] = useState<{[key: string]: boolean}>({
    Basic: false,
    Standard: false,
    Premium: false
  });
  const [trainerFilters, setTrainerFilters] = useState<{[key: string]: boolean}>({});
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  
  const itemsPerPage = 8;
  
  // Initialize trainer filters from data
  useEffect(() => {
    const uniqueTrainers = Array.from(new Set(users.map(user => user.trainer)));
    const initialTrainerFilters = uniqueTrainers.reduce((acc, trainer) => {
      acc[trainer] = false;
      return acc;
    }, {} as {[key: string]: boolean});
    setTrainerFilters(initialTrainerFilters);
  }, []);

  // Reset to first page when branch changes or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBranch, showPendingOnly, statusFilters, membershipFilters, trainerFilters]);

  // Status and membership color functions removed as they're now inlined

  // Filter users based on search term, selected branch, and applied filters
  const filteredUsers = users.filter(user => {
    // Search term filter
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.membership.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.trainer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.planExpiry.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Branch filter
    const matchesBranch = selectedBranch === 'All Branches' || user.branch === selectedBranch;
    
    // Status filter
    const anyStatusSelected = Object.values(statusFilters).some(value => value);
    const matchesStatus = !anyStatusSelected || statusFilters[user.status] === true;
    
    // Membership filter
    const anyMembershipSelected = Object.values(membershipFilters).some(value => value);
    const matchesMembership = !anyMembershipSelected || membershipFilters[user.membership] === true;
    
    // Trainer filter
    const anyTrainerSelected = Object.values(trainerFilters).some(value => value);
    const matchesTrainer = !anyTrainerSelected || trainerFilters[user.trainer] === true;
    
    // Pending only filter
    const matchesPending = !showPendingOnly || user.status === 'pending';
    
    return matchesSearch && matchesBranch && matchesStatus && matchesMembership && matchesTrainer && matchesPending;
  });

  // Calculate pagination
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Handle page navigation
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const openUserModal = (user: any) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  
  const handleAddUser = () => {
    // Here you would typically call an API to save the new user
    // For now, we'll just log the new user and close the modal
    console.log('Adding new user:', newUser);
    setShowAddModal(false);
    
    // Reset the form
    setNewUser({
      name: '',
      email: '',
      phone: '',
      membership: 'Basic',
      branch: '',
      trainer: '',
      gender: '',
      dob: '',
      paymentMethod: '',
      cashReceived: ''
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Filter management functions
  const handleStatusFilterChange = (status: string) => {
    setStatusFilters(prev => ({
      ...prev,
      [status]: !prev[status]
    }));
  };
  
  const handleMembershipFilterChange = (membership: string) => {
    setMembershipFilters(prev => ({
      ...prev,
      [membership]: !prev[membership]
    }));
  };
  
  const handleTrainerFilterChange = (trainer: string) => {
    setTrainerFilters(prev => ({
      ...prev,
      [trainer]: !prev[trainer]
    }));
  };
  
  const clearAllFilters = () => {
    setStatusFilters({
      Active: false,
      pending: false,
      Expired: false
    });
    setMembershipFilters({
      Basic: false,
      Standard: false,
      Premium: false
    });
    setTrainerFilters(Object.keys(trainerFilters).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {} as {[key: string]: boolean}));
    setShowPendingOnly(false);
  };

  return (
    <div className="space-y-6 bg-black p-6 rounded-lg">
      {/* Stats Cards */}
      {/* Branch Indicator - Only show when a specific branch is selected */}
      {selectedBranch !== 'All Branches' && (
        <div className="bg-[#2A3037] p-4 rounded-xl mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-[#7BC843] bg-opacity-20 p-2 rounded-full mr-3">
              <svg className="h-5 w-5 text-[#7BC843]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Currently Viewing</p>
              <h3 className="text-white font-medium">{selectedBranch} Branch</h3>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            {filteredUsers.length} {filteredUsers.length === 1 ? 'member' : 'members'}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Members Card */}
        <div className="bg-[#2A3037] p-8 rounded-xl flex justify-between items-center h-[130px]">
          <div className="flex items-center">
            <div className="text-[#7BC843] mr-6">
              <User className="h-12 w-12" />
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Total Members</p>
              <h2 className="text-white text-4xl font-bold">451</h2>
            </div>
          </div>
        </div>

        {/* New Members Card */}
        <div 
          className="bg-[#2A3037] p-8 rounded-xl flex justify-between items-center h-[130px] hover:bg-[#353c44] transition-colors duration-200 group"
        >
          <div className="flex items-center">
            <div className="text-[#7BC843] mr-6">
              <Plus className="h-12 w-12 bg-[#7BC843] bg-opacity-20 p-2 rounded-full group-hover:bg-opacity-40 transition-all" />
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">New Members</p>
              <div className="flex items-end">
                <h2 className="text-white text-4xl font-bold">40</h2>
                <span className="text-gray-400 text-xs ml-2 mb-1">(last 30 days)</span>
              </div>
            </div>
          </div>
          <div className="group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </button>
          </div>
        </div>

        {/* Pending Dues Card */}
        <div 
          className="bg-[#2A3037] p-8 rounded-xl flex justify-between items-center h-[130px] cursor-pointer hover:bg-[#353c44] transition-colors duration-200 group"
          onClick={() => setShowPendingOnly(prev => !prev)}
        >
          <div className="flex items-center">
            <div className="text-red-500 mr-6">
              <CreditCard className="h-12 w-12 bg-red-500 bg-opacity-20 p-2 rounded-full group-hover:bg-opacity-40 transition-all" />
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Pending Dues</p>
              <h2 className="text-white text-4xl font-bold">5</h2>
            </div>
          </div>
          {showPendingOnly && (
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded">Filtered</div>
          )}
        </div>
      </div>

      {/* Combined Search + Table Container */}
      <div className="bg-[#2A3037] rounded-xl shadow-sm overflow-hidden">
        {/* Header (Search + Filter) */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:items-center justify-between">
            <div className="flex items-center md:w-64 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[#7BC843]" />
              </div>
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#23292F] text-white pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7BC843] border-none text-sm"
              />
            </div>

            <div className="flex items-center space-x-8">
              <div className="bg-[#23292F] rounded-lg p-1 flex space-x-1">
                <button className="px-3 py-1.5 text-gray-300 text-xs font-medium rounded hover:bg-[#3A4049] hover:text-[#7BC843] transition-colors">1d</button>
                <button className="px-3 py-1.5 text-gray-300 text-xs font-medium rounded hover:bg-[#3A4049] hover:text-[#7BC843] transition-colors">3d</button>
                <button className="px-3 py-1.5 text-gray-300 text-xs font-medium rounded hover:bg-[#3A4049] hover:text-[#7BC843] transition-colors">1w</button>
                <button className="px-3 py-1.5 text-gray-300 text-xs font-medium rounded hover:bg-[#3A4049] hover:text-[#7BC843] transition-colors">1m</button>
                <button className="px-3 py-1.5 text-gray-300 text-xs font-medium rounded hover:bg-[#3A4049] hover:text-[#7BC843] transition-colors">Custom</button>
              </div>
              <button 
                onClick={() => setShowFilterModal(true)}
                className="px-4 py-2 bg-[#23292F] text-gray-300 text-sm rounded-lg hover:bg-[#3A4049] transition-colors flex items-center"
              >
                <Filter className="h-4 w-4 mr-2 text-[#7BC843]" />
                <span>Filter</span>
                {Object.values({...statusFilters, ...membershipFilters, ...trainerFilters}).some(v => v) && (
                  <span className="ml-2 bg-[#7BC843] text-black text-xs px-2 py-0.5 rounded-full">Active</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#23292F] border-b border-gray-700">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-white">Member Name</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Contact</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Membership</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Plan Expiry</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Trainer</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Status</th>
                <th className="text-right py-4 px-6 font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#3A4049] transition-colors duration-200">
                  <td className="py-4 px-6">
                    <div className="font-medium text-white">{user.name}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-300">xxxxxxx27</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-white">{user.membership}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-300">{user.planExpiry}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-300">{user.trainer}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-green-600 text-white' : 
                      user.status === 'pending' ? 'bg-yellow-500 text-black' : 
                      user.status === 'InActive' ? 'bg-orange-500 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => openUserModal(user)}
                        className="p-2 text-white hover:text-[#7BC843] rounded-lg transition-colors duration-200"
                        title="View Details"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-white hover:text-[#7BC843] rounded-lg transition-colors duration-200" title="Edit">
                        <Edit className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="py-4 px-6 flex items-center justify-between border-t border-gray-700">
            <div className="text-sm text-gray-400">
              Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} members
              {selectedBranch !== 'All Branches' && (
                <span className="ml-1 text-[#7BC843]"> from {selectedBranch} branch</span>
              )}
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={goToPrevPage} 
                disabled={currentPage === 1}
                className={`p-2 rounded-lg flex items-center ${
                  currentPage === 1 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : 'text-gray-300 hover:bg-[#3A4049] hover:text-[#7BC843]'
                } transition-colors duration-200`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-1">Previous</span>
              </button>
              <button 
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg flex items-center ${
                  currentPage === totalPages 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : 'text-gray-300 hover:bg-[#3A4049] hover:text-[#7BC843]'
                } transition-colors duration-200`}
              >
                <span className="mr-1">Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add New User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-[#7BC843] bg-opacity-20 p-2 rounded-full">
                  <Plus className="h-6 w-6 text-[#7BC843]" />
                </div>
                <h2 className="text-2xl font-bold text-white">Add New Member</h2>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                <X />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-[#7BC843]" />
                    Personal Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Full Name</label>
                      <input 
                        type="text"
                        name="name"
                        value={newUser.name}
                        onChange={handleInputChange}
                        className="w-full h-10 bg-[#23292F] text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7BC843] border-none"
                        placeholder="Enter full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Email</label>
                      <input 
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                        className="w-full h-10 bg-[#23292F] text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7BC843] border-none"
                        placeholder="Enter email address"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Phone</label>
                      <input 
                        type="text"
                        name="phone"
                        value={newUser.phone}
                        onChange={handleInputChange}
                        className="w-full h-10 bg-[#23292F] text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7BC843] border-none"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Date of Birth</label>
                      <input 
                        type="date"
                        name="dob"
                        value={newUser.dob}
                        onChange={handleInputChange}
                        className="w-full h-10 bg-[#23292F] text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7BC843] border-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Gender</label>
                      <select
                        name="gender"
                        value={newUser.gender}
                        onChange={handleInputChange}
                        className="w-full h-10 bg-[#23292F] text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7BC843] border-none"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Membership Details */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-[#7BC843]" />
                    Membership Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Membership Plan</label>
                      <select
                        name="membership"
                        value={newUser.membership}
                        onChange={handleInputChange}
                        className="w-full h-10 bg-[#23292F] text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7BC843] border-none"
                      >
                        <option value="Basic">Basic(1000)</option>
                        <option value="Standard">Standard(1500)</option>
                        <option value="Premium">Premium(2000)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Assigned Trainer</label>
                      <select
                        name="trainer"
                        value={newUser.trainer}
                        onChange={handleInputChange}
                        className="w-full h-10 bg-[#23292F] text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7BC843] border-none"
                      >
                        <option value="">Select Trainer</option>
                        <option value="Vikash Kumar">Vikash Kumar</option>
                        <option value="Sneha Reddy">Sneha Reddy</option>
                        <option value="Raj Singh">Raj Singh</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Branch Location</label>
                      <select
                        name="branch"
                        value={newUser.branch}
                        onChange={handleInputChange}
                        className="w-full h-10 bg-[#23292F] text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7BC843] border-none"
                      >
                        <option value="">Select Branch</option>
                        <option value="Stonehousepet">Stonehousepet</option>
                        <option value="Harinathpuram">Harinathpuram</option>
                        <option value="Vanamthopu Center">Vanamthopu Center</option>
                        <option value="Current Office Center">Current Office Center</option>
                        <option value="Vedayapalem">Vedayapalem</option>
                        <option value="BV Nagar">BV Nagar</option>
                        <option value="Dhanalakshmi Puram">Dhanalakshmi Puram</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Payment Method</label>
                      <select
                        name="paymentMethod"
                        value={newUser.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full h-10 bg-[#23292F] text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7BC843] border-none"
                      >
                        <option value="">Select Payment Method</option>
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI</option>
                        <option value="Card">Card</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Cash Received</label>
                      <input 
                        type="text"
                        name="cashReceived"
                        value={newUser.cashReceived}
                        onChange={handleInputChange}
                        className="w-full h-10 bg-[#23292F] text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7BC843] border-none"
                        placeholder="Enter amount received"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddUser}
                  className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium flex items-center"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[#7BC843] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xl">{selectedUser.avatar}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedUser.name}</h2>
                    <p className="text-gray-400">{selectedUser.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-[#7BC843]" />
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-200">{selectedUser.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-200">{selectedUser.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-200">Joined: {selectedUser.joinDate}</span>
                    </div>
                    {selectedUser.branch && (
                      <div className="flex items-center space-x-3">
                        <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        <span className="text-gray-200">Branch: {selectedUser.branch}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Membership Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-[#7BC843]" />
                    Membership Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Plan Type:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium bg-opacity-20 ${
                        selectedUser.membership === 'Premium' ? 'bg-purple-600 text-purple-300' : 
                        selectedUser.membership === 'Standard' ? 'bg-blue-600 text-blue-300' : 
                        'bg-gray-600 text-gray-300'
                      }`}>
                        {selectedUser.membership}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedUser.status === 'Active' ? 'bg-green-600 text-white' : 
                        selectedUser.status === 'pending' ? 'bg-yellow-500 text-white' : 
                        'bg-red-600 text-white'
                      }`}>
                        {selectedUser.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Expires:</span>
                      <span className="text-white font-medium">{selectedUser.planExpiry}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Last Payment:</span>
                      <span className="text-white font-medium">{selectedUser.lastPayment}</span>
                    </div>
                  </div>
                </div>

                {/* Trainer Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Dumbbell className="h-5 w-5 mr-2 text-[#7BC843]" />
                    Trainer & Workout
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Assigned Trainer:</span>
                      <span className="text-white font-medium">{selectedUser.trainer}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Workout Plan:</span>
                      <span className="text-white font-medium">Strength Training</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Sessions This Month:</span>
                      <span className="text-white font-medium">18/24</span>
                    </div>
                  </div>
                </div>

                {/* Attendance Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-[#7BC843]" />
                    Attendance Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">This Week:</span>
                      <span className="text-white font-medium">5/7 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">This Month:</span>
                      <span className="text-white font-medium">22/31 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Last Visit:</span>
                      <span className="text-white font-medium">Today, 7:30 AM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                  Edit Member
                </button>
                <button className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-[#7BC843] bg-opacity-20 p-2 rounded-full">
                  <Filter className="h-6 w-6 text-[#7BC843]" />
                </div>
                <h2 className="text-2xl font-bold text-white">Filter Members</h2>
              </div>
              <button 
                onClick={() => setShowFilterModal(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                <X />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Status Filters */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Status</h3>
                  <div className="space-y-3">
                    {Object.keys(statusFilters).map(status => (
                      <label key={status} className="flex items-center space-x-3 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={statusFilters[status]}
                          onChange={() => handleStatusFilterChange(status)}
                          className="form-checkbox h-5 w-5 text-[#7BC843] rounded border-gray-600 bg-[#23292F] focus:ring-[#7BC843] focus:ring-offset-gray-800"
                        />
                        <span className={`text-white ${status === 'Active' ? 'text-green-500' : status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Membership Filters */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Membership</h3>
                  <div className="space-y-3">
                    {Object.keys(membershipFilters).map(membership => (
                      <label key={membership} className="flex items-center space-x-3 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={membershipFilters[membership]}
                          onChange={() => handleMembershipFilterChange(membership)}
                          className="form-checkbox h-5 w-5 text-[#7BC843] rounded border-gray-600 bg-[#23292F] focus:ring-[#7BC843] focus:ring-offset-gray-800"
                        />
                        <span className="text-white">{membership}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Trainer Filters */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Trainers</h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {Object.keys(trainerFilters).map(trainer => (
                      <label key={trainer} className="flex items-center space-x-3 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={trainerFilters[trainer]}
                          onChange={() => handleTrainerFilterChange(trainer)}
                          className="form-checkbox h-5 w-5 text-[#7BC843] rounded border-gray-600 bg-[#23292F] focus:ring-[#7BC843] focus:ring-offset-gray-800"
                        />
                        <span className="text-white">{trainer}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  onClick={clearAllFilters}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  Clear All
                </button>
                <button 
                  onClick={() => setShowFilterModal(false)}
                  className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GymUsers;