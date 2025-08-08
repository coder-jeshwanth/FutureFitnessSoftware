import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, UserCheck, Search, Filter, Download, CheckCircle, XCircle, ChevronLeft, ChevronRight, Info, User, History, BarChart, List, ChevronDown } from 'lucide-react';

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
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 6)).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [sortBy, setSortBy] = useState<'all' | 'present' | 'absent' | 'onLeave'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'trends' | 'member'>('list');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [dateRange, setDateRange] = useState('Today');
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  // Generate random historical attendance data for demo purposes
  const generateHistoricalData = (days: number) => {
    const data = [];
    const today = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      // Generate random attendance counts
      const total = Math.floor(Math.random() * 5) + attendanceData.length - 3;
      const present = Math.floor(Math.random() * (total - 2)) + Math.min(3, total - 1);
      const absent = total - present - Math.floor(Math.random() * Math.min(2, total - present));
      const onLeave = total - present - absent;
      
      data.push({
        date: dateString,
        dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }),
        present,
        absent,
        onLeave,
        total,
        percentage: Math.round((present / total) * 100)
      });
    }
    
    return data;
  };
  
  // Get attendance history for a specific member
  const getMemberAttendanceHistory = (memberId: number) => {
    const member = attendanceData.find(m => m.id === memberId);
    if (!member) return null;
    
    // Generate a month of attendance records for demo
    const today = new Date();
    const history = [];
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      // Skip weekends with higher probability
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const skipProbability = isWeekend ? 0.8 : 0.3;
      
      if (Math.random() > skipProbability) {
        const checkInHour = Math.floor(Math.random() * 4) + 6; // 6 AM to 9 AM
        const checkInMin = Math.floor(Math.random() * 60);
        const durationHours = Math.floor(Math.random() * 2) + 1; // 1-3 hours
        const durationMins = Math.floor(Math.random() * 60);
        
        history.push({
          date: dateString,
          dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }),
          checkIn: `${checkInHour.toString().padStart(2, '0')}:${checkInMin.toString().padStart(2, '0')} AM`,
          checkOut: `${(checkInHour + durationHours).toString().padStart(2, '0')}:${((checkInMin + durationMins) % 60).toString().padStart(2, '0')} ${checkInHour + durationHours >= 12 ? 'PM' : 'AM'}`,
          duration: `${durationHours}h ${durationMins}m`,
          status: 'Present'
        });
      } else if (isWeekend || Math.random() > 0.7) {
        // Higher probability of absence on weekends
        history.push({
          date: dateString,
          dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }),
          checkIn: '-',
          checkOut: '-',
          duration: '-',
          status: Math.random() > 0.7 ? 'On Leave' : 'Absent'
        });
      }
    }
    
    return { member, history };
  };

  // Historical data for trends
  const [historicalData] = useState(() => generateHistoricalData(30));
  
  // Recalculate stats when active tab changes
  const [stats, setStats] = useState(getTodayStats());
  
  // Update stats when activeTab changes
  useEffect(() => {
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
        
        {/* Date Range Selector */}
        <div className="flex items-center space-x-3 bg-[#2A3037] border border-gray-700 rounded-lg px-4 py-2">
          <Calendar size={16} className="text-gray-400" />
          <div className="relative">
            <button
              className="flex items-center space-x-1 text-white"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <span>{dateRange}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            
            {showDatePicker && (
              <div className="absolute top-full right-0 mt-2 p-3 bg-[#23292F] rounded-xl border border-gray-700 shadow-lg z-10 w-52">
                <div className="space-y-2">
                  <button 
                    className="w-full px-3 py-1.5 rounded hover:bg-[#2A3037] text-left text-white text-sm"
                    onClick={() => {
                      setDateRange('Today');
                      setShowDatePicker(false);
                    }}
                  >
                    Today
                  </button>
                  <button 
                    className="w-full px-3 py-1.5 rounded hover:bg-[#2A3037] text-left text-white text-sm"
                    onClick={() => {
                      setDateRange('Yesterday');
                      setShowDatePicker(false);
                    }}
                  >
                    Yesterday
                  </button>
                  <button 
                    className="w-full px-3 py-1.5 rounded hover:bg-[#2A3037] text-left text-white text-sm"
                    onClick={() => {
                      setDateRange('This Week');
                      setShowDatePicker(false);
                    }}
                  >
                    This Week
                  </button>
                  <button 
                    className="w-full px-3 py-1.5 rounded hover:bg-[#2A3037] text-left text-white text-sm"
                    onClick={() => {
                      setDateRange('This Month');
                      setShowDatePicker(false);
                    }}
                  >
                    This Month
                  </button>
                  <button 
                    className="w-full px-3 py-1.5 rounded hover:bg-[#2A3037] text-left text-white text-sm"
                    onClick={() => {
                      setDateRange('Last 30 Days');
                      setShowDatePicker(false);
                    }}
                  >
                    Last 30 Days
                  </button>
                  <div className="pt-2 border-t border-gray-700">
                    <button 
                      className="w-full px-3 py-1.5 rounded bg-[#165D31] hover:bg-[#0D4A22] text-left text-white text-sm flex justify-between items-center"
                      onClick={() => {
                        setShowDatePicker(false);
                        // Custom date range picker logic would go here
                      }}
                    >
                      <span>Custom Range</span>
                      <Calendar size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
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

      {/* View Mode & Search */}
      <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
          {/* View Mode Selector */}
          {viewMode !== 'member' && (
            <div className="flex items-center">
              <div className="bg-[#23292F] rounded-lg overflow-hidden flex border border-gray-700">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 text-sm flex items-center space-x-1.5 ${
                    viewMode === 'list' 
                      ? 'bg-[#165D31] text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-[#1A1F24]'
                  }`}
                >
                  <List size={16} />
                  <span>List</span>
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-4 py-2 text-sm flex items-center space-x-1.5 ${
                    viewMode === 'calendar' 
                      ? 'bg-[#165D31] text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-[#1A1F24]'
                  }`}
                >
                  <Calendar size={16} />
                  <span>Calendar</span>
                </button>
                <button
                  onClick={() => setViewMode('trends')}
                  className={`px-4 py-2 text-sm flex items-center space-x-1.5 ${
                    viewMode === 'trends' 
                      ? 'bg-[#165D31] text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-[#1A1F24]'
                  }`}
                >
                  <BarChart size={16} />
                  <span>Trends</span>
                </button>
              </div>
            </div>
          )}
          
          {/* Date Selection */}
          <div className="flex items-center space-x-4">
            {viewMode === 'list' && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                />
              </div>
            )}
            
            {(viewMode === 'calendar' || viewMode === 'trends') && (
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div className="flex items-center space-x-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-4 py-2 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                  />
                  <span className="text-gray-400">to</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-4 py-2 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                  />
                </div>
              </div>
            )}
            
            <div className="flex space-x-1">
              <button 
                onClick={() => {
                  const today = new Date();
                  setStartDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6).toISOString().split('T')[0]);
                  setEndDate(today.toISOString().split('T')[0]);
                  setDateRange('Last 7 Days');
                }}
                className="px-3 py-1 text-xs bg-[#23292F] hover:bg-[#1A1F24] text-gray-300 border border-gray-700 rounded"
              >
                Last 7 days
              </button>
              <button 
                onClick={() => {
                  const today = new Date();
                  setStartDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29).toISOString().split('T')[0]);
                  setEndDate(today.toISOString().split('T')[0]);
                  setDateRange('Last 30 Days');
                }}
                className="px-3 py-1 text-xs bg-[#23292F] hover:bg-[#1A1F24] text-gray-300 border border-gray-700 rounded"
              >
                Last 30 days
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative md:w-64 lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Filter className="h-5 w-5 text-gray-400 hover:text-white" />
            </button>
          </div>
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
                if (viewMode === 'member') setViewMode('list');
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
                if (viewMode === 'member') setViewMode('list');
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
                if (viewMode === 'member') setViewMode('list');
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

        {/* List View - Standard Attendance Table */}
        {viewMode === 'list' && (
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
                          <button 
                            className="font-semibold text-white hover:text-[#7BC843] transition-colors duration-200 text-left flex items-center"
                            onClick={() => {
                              setSelectedMember(record);
                              setViewMode('member');
                            }}
                          >
                            {record.name}
                            <History className="h-4 w-4 ml-2 opacity-70" />
                          </button>
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
        )}
        
        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="p-6">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-medium text-gray-400 p-2">{day}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {[...Array(35)].map((_, index) => {
                const date = new Date();
                date.setDate(date.getDate() - 15 + index);
                const dateString = date.toISOString().split('T')[0];
                
                const isToday = dateString === new Date().toISOString().split('T')[0];
                const isSelected = dateString === selectedDate;
                
                // Random attendance data
                const present = Math.floor(Math.random() * 8) + 3;
                const absent = Math.floor(Math.random() * 3) + 1;
                const onLeave = Math.floor(Math.random() * 2);
                
                return (
                  <div 
                    key={index}
                    onClick={() => setSelectedDate(dateString)}
                    className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#165D31] border-2 border-[#7BC843]'
                        : isToday
                          ? 'bg-[#3a4148] border border-[#7BC843]'
                          : 'bg-[#23292F] border border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-medium ${isSelected || isToday ? 'text-white' : 'text-gray-400'}`}>
                        {date.getDate()}
                      </span>
                      {(isSelected || isToday) && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-[#7BC843] text-black">
                          {isToday ? 'Today' : ''}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-green-400">Present:</span>
                        <span className="text-white">{present}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-400">Absent:</span>
                        <span className="text-white">{absent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-400">Leave:</span>
                        <span className="text-white">{onLeave}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 p-4 bg-[#23292F] rounded-lg">
              <h3 className="text-lg font-medium text-white mb-3">
                Attendance for {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#2A3037] p-3 rounded-lg">
                  <h4 className="font-medium text-green-400 mb-2">Present ({stats.present})</h4>
                  <div className="space-y-2 max-h-[150px] overflow-y-auto">
                    {filteredData.filter(r => r.status === 'Present').map(record => (
                      <div key={`present-${record.id}`} className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-[#7BC843] rounded-full flex items-center justify-center">
                          <span className="text-black font-medium text-xs">{record.avatar}</span>
                        </div>
                        <span className="text-white text-sm">{record.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[#2A3037] p-3 rounded-lg">
                  <h4 className="font-medium text-red-400 mb-2">Absent ({stats.absent})</h4>
                  <div className="space-y-2 max-h-[150px] overflow-y-auto">
                    {filteredData.filter(r => r.status === 'Absent').map(record => (
                      <div key={`absent-${record.id}`} className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-[#3a4148] rounded-full flex items-center justify-center">
                          <span className="text-gray-300 font-medium text-xs">{record.avatar}</span>
                        </div>
                        <span className="text-white text-sm">{record.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[#2A3037] p-3 rounded-lg">
                  <h4 className="font-medium text-yellow-400 mb-2">On Leave ({stats.onLeave})</h4>
                  <div className="space-y-2 max-h-[150px] overflow-y-auto">
                    {filteredData.filter(r => r.status === 'On Leave').map(record => (
                      <div key={`leave-${record.id}`} className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-[#443a2a] rounded-full flex items-center justify-center">
                          <span className="text-yellow-400 font-medium text-xs">{record.avatar}</span>
                        </div>
                        <span className="text-white text-sm">{record.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Trends View */}
        {viewMode === 'trends' && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-4">Attendance Trends</h3>
              
              <div className="bg-[#23292F] rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-400 mb-3">7-Day Attendance Overview</h4>
                
                <div className="h-64 flex items-end space-x-3">
                  {generateHistoricalData(6).map((day, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      {/* Chart bars */}
                      <div className="w-full h-48 relative flex flex-col-reverse">
                        <div 
                          className="w-full bg-green-600 rounded-t-sm" 
                          style={{ height: `${(day.present / day.total) * 100}%` }}
                        />
                        <div 
                          className="w-full bg-red-600" 
                          style={{ height: `${(day.absent / day.total) * 100}%` }}
                        />
                        <div 
                          className="w-full bg-yellow-600 rounded-b-sm" 
                          style={{ height: `${(day.onLeave / day.total) * 100}%` }}
                        />
                      </div>
                      
                      {/* Labels */}
                      <div className="mt-2 text-center">
                        <div className="text-xs font-medium text-gray-400">{day.dayOfWeek}</div>
                        <div className="text-xs text-white">{day.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-4 space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
                    <span className="text-xs text-gray-300">Present</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-600 rounded-sm"></div>
                    <span className="text-xs text-gray-300">Absent</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-600 rounded-sm"></div>
                    <span className="text-xs text-gray-300">On Leave</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#2A3037] rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-400 mb-3">Peak Hours</h4>
                <div className="bg-[#23292F] rounded-lg p-3">
                  <div className="h-32 flex items-end space-x-1">
                    {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((hour) => {
                      const height = Math.floor(Math.random() * 90) + 10;
                      return (
                        <div key={hour} className="flex-1 flex flex-col items-center">
                          <div 
                            className={`w-full ${height > 75 ? 'bg-[#7BC843]' : height > 50 ? 'bg-blue-500' : height > 25 ? 'bg-blue-700' : 'bg-blue-900'} rounded-sm`}
                            style={{ height: `${height}%` }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span className="text-xs text-gray-400">6 AM</span>
                    <span className="text-xs text-gray-400">3 PM</span>
                    <span className="text-xs text-gray-400">9 PM</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#2A3037] rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-400 mb-3">Attendance Rate by Day</h4>
                <div className="space-y-3">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                    const percentage = day === 'Saturday' || day === 'Sunday' 
                      ? Math.floor(Math.random() * 30) + 40
                      : Math.floor(Math.random() * 20) + 70;
                    
                    return (
                      <div key={day}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-300">{day}</span>
                          <span className="text-sm text-white">{percentage}%</span>
                        </div>
                        <div className="w-full bg-[#23292F] rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${percentage > 80 ? 'bg-green-600' : percentage > 60 ? 'bg-[#7BC843]' : percentage > 40 ? 'bg-yellow-500' : 'bg-red-600'}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Member History View */}
        {viewMode === 'member' && selectedMember && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#7BC843] rounded-full flex items-center justify-center">
                  <span className="text-black font-medium">{selectedMember.avatar}</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white">{selectedMember.name}</h3>
                  <p className="text-gray-400">
                    {activeTab === 'members' 
                      ? `Membership ID: ${selectedMember.membershipId}`
                      : `Role: ${selectedMember.role}`}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setViewMode('list')}
                className="px-4 py-2 bg-[#23292F] hover:bg-[#1A1F24] text-gray-300 border border-gray-700 rounded-lg flex items-center space-x-2"
              >
                <ChevronLeft size={16} />
                <span>Back to List</span>
              </button>
            </div>
            
            <div className="bg-[#23292F] p-4 rounded-lg mb-6">
              <h4 className="text-lg font-medium text-white mb-4">Attendance Overview</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#2A3037] p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">Last 30 days</p>
                      <p className="text-2xl font-bold text-white">68%</p>
                    </div>
                    <div className="h-14 w-14 rounded-full border-4 border-[#7BC843] flex items-center justify-center">
                      <span className="text-[#7BC843] font-bold">68%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#2A3037] p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">Current Streak</p>
                      <p className="text-2xl font-bold text-[#7BC843]">3 days</p>
                    </div>
                    <div className="flex items-center space-x-0.5">
                      <div className="w-4 h-4 bg-[#7BC843] rounded-sm"></div>
                      <div className="w-4 h-4 bg-[#7BC843] rounded-sm"></div>
                      <div className="w-4 h-4 bg-[#7BC843] rounded-sm"></div>
                      <div className="w-4 h-4 bg-gray-700 rounded-sm"></div>
                      <div className="w-4 h-4 bg-gray-700 rounded-sm"></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#2A3037] p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">Avg. Duration</p>
                      <p className="text-2xl font-bold text-white">1h 32m</p>
                    </div>
                    <Clock className="h-10 w-10 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#23292F] p-4 rounded-lg overflow-x-auto">
              <h4 className="text-lg font-medium text-white mb-4">Attendance History</h4>
              
              <table className="w-full">
                <thead className="bg-[#2A3037] border-b border-gray-700">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-white">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-white">Day</th>
                    <th className="text-left py-3 px-4 font-semibold text-white">Check In</th>
                    <th className="text-left py-3 px-4 font-semibold text-white">Check Out</th>
                    <th className="text-left py-3 px-4 font-semibold text-white">Duration</th>
                    <th className="text-left py-3 px-4 font-semibold text-white">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {getMemberAttendanceHistory(selectedMember.id)?.history.map((record, index) => (
                    <tr key={index} className={`${record.date === new Date().toISOString().split('T')[0] ? 'bg-[#165D31] bg-opacity-20' : ''}`}>
                      <td className="py-3 px-4 text-white">
                        {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        {record.date === new Date().toISOString().split('T')[0] && (
                          <span className="ml-2 text-xs text-[#7BC843]">(Today)</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-400">{record.dayOfWeek}</td>
                      <td className="py-3 px-4 text-white">{record.checkIn}</td>
                      <td className="py-3 px-4 text-white">{record.checkOut}</td>
                      <td className="py-3 px-4 text-white">{record.duration}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="flex justify-between mt-4">
                <button className="text-sm text-blue-400 hover:text-blue-300">Previous Month</button>
                <button className="text-sm text-blue-400 hover:text-blue-300">Next Month</button>
              </div>
            </div>
          </div>
        )}
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