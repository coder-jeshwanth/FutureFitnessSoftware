import React, { useState } from 'react';
import { Calendar, Clock, Users, UserCheck, Search, Filter, Download, CheckCircle, XCircle } from 'lucide-react';

const attendanceData = [
  {
    id: 1,
    name: 'Arjun Sharma',
    membershipId: 'M001',
    checkIn: '06:30 AM',
    checkOut: '08:15 AM',
    duration: '1h 45m',
    date: '2025-01-15',
    status: 'Present',
    avatar: 'AS'
  },
  {
    id: 2,
    name: 'Priya Patel',
    membershipId: 'M002',
    checkIn: '07:15 AM',
    checkOut: '09:00 AM',
    duration: '1h 45m',
    date: '2025-01-15',
    status: 'Present',
    avatar: 'PP'
  },
  {
    id: 3,
    name: 'Rohit Kumar',
    membershipId: 'M003',
    checkIn: '-',
    checkOut: '-',
    duration: '-',
    date: '2025-01-15',
    status: 'Absent',
    avatar: 'RK'
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    membershipId: 'M004',
    checkIn: '05:45 AM',
    checkOut: 'Active',
    duration: 'In Progress',
    date: '2025-01-15',
    status: 'Present',
    avatar: 'SR'
  },
  {
    id: 5,
    name: 'Amit Singh',
    membershipId: 'M005',
    checkIn: '08:30 AM',
    checkOut: '10:15 AM',
    duration: '1h 45m',
    date: '2025-01-15',
    status: 'Present',
    avatar: 'AS'
  },
  {
    id: 6,
    name: 'Neha Gupta',
    membershipId: 'M006',
    checkIn: '-',
    checkOut: '-',
    duration: '-',
    date: '2025-01-15',
    status: 'On Leave',
    avatar: 'NG'
  },
  {
    id: 7,
    name: 'Rahul Verma',
    membershipId: 'M007',
    checkIn: '06:15 AM',
    checkOut: '07:30 AM',
    duration: '1h 15m',
    date: '2025-01-15',
    status: 'Present',
    avatar: 'RV'
  },
  {
    id: 8,
    name: 'Deepika Sharma',
    membershipId: 'M008',
    checkIn: '-',
    checkOut: '-',
    duration: '-',
    date: '2025-01-15',
    status: 'Absent',
    avatar: 'DS'
  },
  {
    id: 9,
    name: 'Vikrant Massey',
    membershipId: 'M009',
    checkIn: '05:30 AM',
    checkOut: 'Active',
    duration: 'In Progress',
    date: '2025-01-15',
    status: 'Present',
    avatar: 'VM'
  },
  {
    id: 10,
    name: 'Kiran Rao',
    membershipId: 'M010',
    checkIn: '-',
    checkOut: '-',
    duration: '-',
    date: '2025-01-15',
    status: 'On Leave',
    avatar: 'KR'
  },
  {
    id: 11,
    name: 'Sunil Chhetri',
    membershipId: 'M011',
    checkIn: '07:45 AM',
    checkOut: '09:30 AM',
    duration: '1h 45m',
    date: '2025-01-15',
    status: 'Present',
    avatar: 'SC'
  },
  {
    id: 12,
    name: 'Ananya Pandey',
    membershipId: 'M012',
    checkIn: '-',
    checkOut: '-',
    duration: '-',
    date: '2025-01-15',
    status: 'Absent',
    avatar: 'AP'
  }
];

const trainerAttendance = [
  {
    id: 1,
    name: 'Vikash Kumar',
    role: 'Strength Trainer',
    checkIn: '05:30 AM',
    checkOut: '02:00 PM',
    duration: '8h 30m',
    status: 'Present',
    avatar: 'VK'
  },
  {
    id: 2,
    name: 'Sneha Reddy',
    role: 'Yoga Instructor',
    checkIn: '06:45 AM',
    checkOut: 'Active',
    duration: 'In Progress',
    status: 'Present',
    avatar: 'SR'
  },
  {
    id: 3,
    name: 'Raj Singh',
    role: 'HIIT Trainer',
    checkIn: '04:45 AM',
    checkOut: '01:00 PM',
    duration: '8h 15m',
    status: 'Present',
    avatar: 'RS'
  },
  {
    id: 4,
    name: 'Priya Sharma',
    role: 'Dance Instructor',
    checkIn: '-',
    checkOut: '-',
    duration: '-',
    status: 'On Leave',
    avatar: 'PS'
  },
  {
    id: 5,
    name: 'Ankit Tiwari',
    role: 'Pilates Instructor',
    checkIn: '07:30 AM',
    checkOut: '03:45 PM',
    duration: '8h 15m',
    status: 'Present',
    avatar: 'AT'
  },
  {
    id: 6,
    name: 'Deepak Kumar',
    role: 'Nutrition Expert',
    checkIn: '-',
    checkOut: '-',
    duration: '-',
    status: 'Absent',
    avatar: 'DK'
  },
  {
    id: 7,
    name: 'Meera Joshi',
    role: 'Zumba Instructor',
    checkIn: '09:00 AM',
    checkOut: 'Active',
    duration: 'In Progress',
    status: 'Present',
    avatar: 'MJ'
  },
  {
    id: 8,
    name: 'Rahul Mehta',
    role: 'Boxing Coach',
    checkIn: '-',
    checkOut: '-',
    duration: '-',
    status: 'On Leave',
    avatar: 'RM'
  }
];

const staffAttendance = [
  {
    id: 1,
    name: 'Sanjay Patel',
    role: 'Receptionist',
    checkIn: '08:00 AM',
    checkOut: '05:00 PM',
    duration: '9h 00m',
    status: 'Present',
    avatar: 'SP'
  },
  {
    id: 2,
    name: 'Neha Malhotra',
    role: 'Gym Manager',
    checkIn: '07:30 AM',
    checkOut: '06:15 PM',
    duration: '10h 45m',
    status: 'Present',
    avatar: 'NM'
  },
  {
    id: 3,
    name: 'Ravi Desai',
    role: 'Maintenance',
    checkIn: '06:00 AM',
    checkOut: '02:00 PM',
    duration: '8h 00m',
    status: 'Present',
    avatar: 'RD'
  },
  {
    id: 4,
    name: 'Aarti Gupta',
    role: 'Cleaning Staff',
    checkIn: '05:30 AM',
    checkOut: '01:30 PM',
    duration: '8h 00m',
    status: 'Present',
    avatar: 'AG'
  },
  {
    id: 5,
    name: 'Kiran Shah',
    role: 'Security Guard',
    checkIn: '-',
    checkOut: '-',
    duration: '-',
    status: 'Absent',
    avatar: 'KS'
  },
  {
    id: 6,
    name: 'Vivek Sharma',
    role: 'Membership Coordinator',
    checkIn: '09:00 AM',
    checkOut: 'Active',
    duration: 'In Progress',
    status: 'Present',
    avatar: 'VS'
  },
  {
    id: 7,
    name: 'Preeti Verma',
    role: 'Accountant',
    checkIn: '-',
    checkOut: '-',
    duration: '-',
    status: 'On Leave',
    avatar: 'PV'
  }
];

const Attendance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'members' | 'trainers' | 'staff'>('members');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [sortBy, setSortBy] = useState<'all' | 'present' | 'absent' | 'onLeave'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-900 text-green-300';
      case 'Absent': return 'bg-red-900 text-red-300';
      case 'On Leave': return 'bg-yellow-900 text-yellow-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  // Define a type for attendance records
  type AttendanceRecord = {
    id: number;
    name: string;
    status: string;
    checkIn: string;
    checkOut: string;
    duration: string;
    avatar: string;
    membershipId?: string;
    role?: string;
  };
  
  // Get filtered data based on active tab, search term, and sort criteria
  const getFilteredData = (): AttendanceRecord[] => {
    let dataSource: AttendanceRecord[] = [];
    
    // Select the appropriate data source based on active tab
    switch (activeTab) {
      case 'members':
        dataSource = attendanceData.filter(record =>
          record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.membershipId.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case 'trainers':
        dataSource = trainerAttendance.filter(record =>
          record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case 'staff':
        dataSource = staffAttendance.filter(record =>
          record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
    }
    
    // Apply sorting based on status if needed
    if (sortBy !== 'all') {
      const statusMap: Record<string, string> = {
        'present': 'Present',
        'absent': 'Absent',
        'onLeave': 'On Leave'
      };
      dataSource = dataSource.filter(record => record.status === statusMap[sortBy]);
    }
    
    return dataSource;
  };

  const filteredData = getFilteredData();

  const getTodayStats = () => {
    // Select the appropriate data array based on the active tab
    const currentData = activeTab === 'members' ? attendanceData : 
                        activeTab === 'trainers' ? trainerAttendance : 
                        staffAttendance;
    
    const present = currentData.filter(record => record.status === 'Present').length;
    const absent = currentData.filter(record => record.status === 'Absent').length;
    const onLeave = currentData.filter(record => record.status === 'On Leave').length;
    const total = currentData.length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return { present, absent, onLeave, total, percentage };
  };

  // Recalculate stats when active tab changes
  const [stats, setStats] = useState(getTodayStats());
  
  // Update stats when activeTab changes
  React.useEffect(() => {
    setStats(getTodayStats());
  }, [activeTab]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowCheckInModal(true)}
            className="bg-[#1E5AB3] hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <UserCheck className="h-5 w-5" />
            <span>Manual Check-in</span>
          </button>
          <button className="bg-[#7BC843] hover:bg-[#6AB732] text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div 
          className={`bg-[#2A3037] rounded-xl shadow-sm border ${sortBy === 'present' ? 'border-green-500' : 'border-gray-700'} p-6 cursor-pointer hover:bg-[#353c44] transition-colors duration-200`}
          onClick={() => setSortBy(sortBy === 'present' ? 'all' : 'present')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{activeTab === 'members' ? 'Members Present' : activeTab === 'trainers' ? 'Trainers Present' : 'Staff Present'}</p>
              <p className="text-2xl font-bold text-green-400">{stats.present}</p>
            </div>
            <CheckCircle className={`h-8 w-8 ${sortBy === 'present' ? 'text-green-500' : 'text-green-400'}`} />
          </div>
          {sortBy === 'present' && (
            <div className="mt-2 text-xs text-green-400">
              Showing present members only
            </div>
          )}
        </div>

        <div 
          className={`bg-[#2A3037] rounded-xl shadow-sm border ${sortBy === 'absent' ? 'border-red-500' : 'border-gray-700'} p-6 cursor-pointer hover:bg-[#353c44] transition-colors duration-200`}
          onClick={() => setSortBy(sortBy === 'absent' ? 'all' : 'absent')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{activeTab === 'members' ? 'Members Absent' : activeTab === 'trainers' ? 'Trainers Absent' : 'Staff Absent'}</p>
              <p className="text-2xl font-bold text-red-400">{stats.absent}</p>
            </div>
            <XCircle className={`h-8 w-8 ${sortBy === 'absent' ? 'text-red-500' : 'text-red-400'}`} />
          </div>
          {sortBy === 'absent' && (
            <div className="mt-2 text-xs text-red-400">
              Showing absent members only
            </div>
          )}
        </div>
        
        <div 
          className={`bg-[#2A3037] rounded-xl shadow-sm border ${sortBy === 'onLeave' ? 'border-yellow-500' : 'border-gray-700'} p-6 cursor-pointer hover:bg-[#353c44] transition-colors duration-200`}
          onClick={() => setSortBy(sortBy === 'onLeave' ? 'all' : 'onLeave')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{activeTab === 'members' ? 'Members on Leave' : activeTab === 'trainers' ? 'Trainers on Leave' : 'Staff on Leave'}</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.onLeave}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-8 w-8 ${sortBy === 'onLeave' ? 'text-yellow-500' : 'text-yellow-400'}`}>
              <path d="M9 14V7h4l-2 3h3l-6 7.5"></path>
              <circle cx="9" cy="9" r="7"></circle>
            </svg>
          </div>
          {sortBy === 'onLeave' && (
            <div className="mt-2 text-xs text-yellow-400">
              Showing on-leave members only
            </div>
          )}
        </div>

        <div 
          className={`bg-[#2A3037] rounded-xl shadow-sm border ${sortBy === 'all' ? 'border-blue-500' : 'border-gray-700'} p-6 cursor-pointer hover:bg-[#353c44] transition-colors duration-200`}
          onClick={() => setSortBy('all')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total {activeTab === 'members' ? 'Members' : activeTab === 'trainers' ? 'Trainers' : 'Staff'}</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <Users className={`h-8 w-8 ${sortBy === 'all' ? 'text-blue-400' : 'text-gray-400'}`} />
          </div>
          {sortBy === 'all' && (
            <div className="mt-2 text-xs text-blue-400">
              Showing all members
            </div>
          )}
        </div>

        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Attendance Rate</p>
              <p className="text-2xl font-bold text-[#7BC843]">{stats.percentage}%</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#7BC843] flex items-center justify-center">
              <span className="text-black text-sm font-bold">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Date Selection and Search */}
      <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-4">
            <Calendar className="h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
            />
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search members or trainers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
            />
          </div>
          <button className="px-4 py-3 bg-[#23292F] border border-gray-700 rounded-lg hover:bg-[#1A1F24] transition-colors duration-200">
            <Filter className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700">
        <div className="border-b border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => {
                setActiveTab('members');
                setSortBy('all'); // Reset sorting when changing tabs
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'members'
                  ? 'border-[#7BC843] text-[#7BC843]'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              Member Attendance ({attendanceData.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('trainers');
                setSortBy('all'); // Reset sorting when changing tabs
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'trainers'
                  ? 'border-[#7BC843] text-[#7BC843]'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              Trainer Attendance ({trainerAttendance.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('staff');
                setSortBy('all'); // Reset sorting when changing tabs
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'staff'
                  ? 'border-[#7BC843] text-[#7BC843]'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              Staff Attendance ({staffAttendance.length})
            </button>
          </nav>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto">
          {sortBy !== 'all' && (
            <div className="p-3 bg-[#23292F] border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-white">
                    {sortBy === 'present' && `Showing Present ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Only`}
                    {sortBy === 'absent' && `Showing Absent ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Only`}
                    {sortBy === 'onLeave' && `Showing On-Leave ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Only`}
                  </span>
                  <span className="text-sm text-gray-400">
                    ({filteredData.length} records)
                  </span>
                </div>
                <button 
                  onClick={() => setSortBy('all')}
                  className="text-sm text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                >
                  <span>Clear Filter</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          )}
          <table className="w-full">
            <thead className="bg-[#23292F] border-b border-gray-700">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-white">
                  {activeTab === 'members' ? 'Member' : activeTab === 'trainers' ? 'Trainer' : 'Staff'}
                </th>
                {activeTab === 'members' && (
                  <th className="text-left py-4 px-6 font-semibold text-white">Membership ID</th>
                )}
                {(activeTab === 'trainers' || activeTab === 'staff') && (
                  <th className="text-left py-4 px-6 font-semibold text-white">Role</th>
                )}
                <th className="text-left py-4 px-6 font-semibold text-white">Check In</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Check Out</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Duration</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredData.map((record) => (
                <tr key={record.id} className="hover:bg-[#353c44] transition-colors duration-200">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#7BC843] rounded-full flex items-center justify-center">
                        <span className="text-black font-medium text-sm">{record.avatar}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{record.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {activeTab === 'members' ? (
                      <span className="text-gray-400">{record.membershipId}</span>
                    ) : (
                      <span className="text-gray-400">{record.role}</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-white">{record.checkIn}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-white">{record.checkOut}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-white">
                      {record.duration || '-'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {record.status === 'Absent' && (
                        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                          Mark Present
                        </button>
                      )}
                      {record.checkOut === 'Active' && (
                        <button className="text-red-400 hover:text-red-300 text-sm font-medium">
                          Check Out
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Check-in Modal */}
      {showCheckInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Manual Check-in</h2>
                <button 
                  onClick={() => setShowCheckInModal(false)}
                  className="text-gray-400 hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Person Type</label>
                  <select className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent">
                    <option value="">Select type</option>
                    <option value="members" selected={activeTab === 'members'}>Member</option>
                    <option value="trainers" selected={activeTab === 'trainers'}>Trainer</option>
                    <option value="staff" selected={activeTab === 'staff'}>Staff</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Person</label>
                  <select className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent">
                    <option>Select person</option>
                    {activeTab === 'members' && attendanceData.map((member) => (
                      <option key={member.id} value={member.id}>{member.name} (Member)</option>
                    ))}
                    {activeTab === 'trainers' && trainerAttendance.map((trainer) => (
                      <option key={trainer.id} value={trainer.id}>{trainer.name} (Trainer)</option>
                    ))}
                    {activeTab === 'staff' && staffAttendance.map((staff) => (
                      <option key={staff.id} value={staff.id}>{staff.name} (Staff)</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Action</label>
                  <select className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent">
                    <option>Check In</option>
                    <option>Check Out</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                    defaultValue={new Date().toTimeString().slice(0, 5)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Note (Optional)</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                    placeholder="Add any notes..."
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button 
                  onClick={() => setShowCheckInModal(false)}
                  className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-[#23292F] transition-colors duration-200"
                >
                  Cancel
                </button>
                <button className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;