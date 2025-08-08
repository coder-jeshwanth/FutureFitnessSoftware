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
  }
];

const trainerAttendance = [
  {
    id: 1,
    name: 'Vikash Kumar',
    role: 'Strength Trainer',
    checkIn: '05:30 AM',
    checkOut: '02:00 PM',
    status: 'Present',
    avatar: 'VK'
  },
  {
    id: 2,
    name: 'Sneha Reddy',
    role: 'Yoga Instructor',
    checkIn: '06:45 AM',
    checkOut: 'Active',
    status: 'Present',
    avatar: 'SR'
  },
  {
    id: 3,
    name: 'Raj Singh',
    role: 'HIIT Trainer',
    checkIn: '04:45 AM',
    checkOut: '01:00 PM',
    status: 'Present',
    avatar: 'RS'
  },
  {
    id: 4,
    name: 'Priya Sharma',
    role: 'Dance Instructor',
    checkIn: '-',
    checkOut: '-',
    status: 'On Leave',
    avatar: 'PS'
  }
];

const Attendance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'members' | 'trainers'>('members');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-900 text-green-300';
      case 'Absent': return 'bg-red-900 text-red-300';
      case 'On Leave': return 'bg-yellow-900 text-yellow-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const filteredAttendance = attendanceData.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.membershipId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTrainerAttendance = trainerAttendance.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTodayStats = () => {
    const present = attendanceData.filter(record => record.status === 'Present').length;
    const absent = attendanceData.filter(record => record.status === 'Absent').length;
    const total = attendanceData.length;
    const percentage = Math.round((present / total) * 100);

    return { present, absent, total, percentage };
  };

  const stats = getTodayStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Attendance Tracking</h2>
          <p className="text-gray-400">Monitor member and trainer attendance</p>
        </div>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Present</p>
              <p className="text-2xl font-bold text-green-400">{stats.present}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </div>
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Absent</p>
              <p className="text-2xl font-bold text-red-400">{stats.absent}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-400" />
          </div>
        </div>
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Members</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <Users className="h-8 w-8 text-gray-400" />
          </div>
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
              onClick={() => setActiveTab('members')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'members'
                  ? 'border-[#7BC843] text-[#7BC843]'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              Member Attendance ({attendanceData.length})
            </button>
            <button
              onClick={() => setActiveTab('trainers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'trainers'
                  ? 'border-[#7BC843] text-[#7BC843]'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              Trainer Attendance ({trainerAttendance.length})
            </button>
          </nav>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#23292F] border-b border-gray-700">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-white">
                  {activeTab === 'members' ? 'Member' : 'Trainer'}
                </th>
                {activeTab === 'members' && (
                  <th className="text-left py-4 px-6 font-semibold text-white">Membership ID</th>
                )}
                {activeTab === 'trainers' && (
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
              {(activeTab === 'members' ? filteredAttendance : filteredTrainerAttendance).map((record) => (
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
                      <span className="text-gray-400">{(record as any).membershipId}</span>
                    ) : (
                      <span className="text-gray-400">{(record as any).role}</span>
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
                      {activeTab === 'members' ? (record as any).duration : '-'}
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
                  <label className="block text-sm font-medium text-gray-400 mb-2">Member/Trainer</label>
                  <select className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent">
                    <option>Select person</option>
                    <option>Arjun Sharma (Member)</option>
                    <option>Priya Patel (Member)</option>
                    <option>Vikash Kumar (Trainer)</option>
                    <option>Sneha Reddy (Trainer)</option>
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