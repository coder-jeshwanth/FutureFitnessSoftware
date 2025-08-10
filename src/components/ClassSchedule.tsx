import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Filter, Search, List, Copy, Dumbbell, Heart, Zap, Target, Activity, Music, Flame, Shield, Award } from 'lucide-react';

// All available branches - same as in App.tsx
const branches = [
  'All Branches',
  'Stonehousepet',
  'Harinathpuram',
  'Vanamthopu Center',
  'Current Office Center',
  'Vedayapalem',
  'BV Nagar',
  'Dhanalakshmi Puram'
];

const classes = [
  // Today's classes
  {
    id: 1,
    name: 'Morning Yoga',
    trainer: 'Sneha Reddy',
    time: '07:00 AM',
    duration: 60,
    capacity: 20,
    booked: 15,
    date: '2025-08-10', // Today
    type: 'Yoga',
    room: 'Studio A',
    branch: 'Stonehousepet', // Added branch property
    members: [
      { id: 1, name: 'Sarah Johnson', avatar: 'SJ' },
      { id: 2, name: 'Mike Chen', avatar: 'MC' },
      { id: 3, name: 'Emma Davis', avatar: 'ED' },
      { id: 4, name: 'Alex Kumar', avatar: 'AK' },
      { id: 5, name: 'Lisa Zhang', avatar: 'LZ' }
    ]
  },
  {
    id: 2,
    name: 'HIIT Training',
    trainer: 'Raj Singh',
    time: '08:30 AM',
    duration: 45,
    capacity: 15,
    booked: 12,
    date: '2025-08-10', // Today
    type: 'HIIT',
    room: 'Gym Floor',
    members: [
      { id: 6, name: 'John Smith', avatar: 'JS' },
      { id: 7, name: 'Maria Garcia', avatar: 'MG' },
      { id: 8, name: 'David Lee', avatar: 'DL' }
    ]
  },
  {
    id: 3,
    name: 'Strength Training',
    trainer: 'Vikash Kumar',
    time: '10:00 AM',
    duration: 75,
    capacity: 12,
    booked: 8,
    date: '2025-08-10', // Today
    type: 'Strength',
    room: 'Weight Room',
    members: [
      { id: 9, name: 'Tom Wilson', avatar: 'TW' },
      { id: 10, name: 'Amy Rodriguez', avatar: 'AR' }
    ]
  },
  {
    id: 4,
    name: 'Zumba Dance',
    trainer: 'Priya Sharma',
    time: '06:00 PM',
    duration: 50,
    capacity: 25,
    booked: 24,
    date: '2025-08-10', // Today
    type: 'Dance',
    room: 'Studio B',
    members: [
      { id: 11, name: 'Grace Kim', avatar: 'GK' },
      { id: 12, name: 'Carlos Rivera', avatar: 'CR' },
      { id: 13, name: 'Nina Patel', avatar: 'NP' },
      { id: 14, name: 'Jake Brown', avatar: 'JB' }
    ]
  },
  {
    id: 5,
    name: 'Evening Yoga',
    trainer: 'Sneha Reddy',
    time: '07:30 PM',
    duration: 60,
    capacity: 20,
    booked: 18,
    date: '2025-08-10', // Today
    type: 'Yoga',
    room: 'Studio A',
    members: [
      { id: 15, name: 'Olivia Turner', avatar: 'OT' },
      { id: 16, name: 'Ryan Murphy', avatar: 'RM' }
    ]
  },
  
  // Tomorrow's classes
  {
    id: 6,
    name: 'Morning Cardio',
    trainer: 'Raj Singh',
    time: '07:00 AM',
    duration: 60,
    capacity: 18,
    booked: 12,
    date: '2025-08-11', // Tomorrow
    type: 'Cardio',
    room: 'Gym Floor',
    members: []
  },
  {
    id: 7,
    name: 'Power Yoga',
    trainer: 'Sneha Reddy',
    time: '09:00 AM',
    duration: 60,
    capacity: 15,
    booked: 13,
    date: '2025-08-11', // Tomorrow
    type: 'Yoga',
    room: 'Studio A',
    members: []
  },
  {
    id: 8,
    name: 'Kickboxing',
    trainer: 'Vikash Kumar',
    time: '11:00 AM',
    duration: 45,
    capacity: 12,
    booked: 10,
    date: '2025-08-11', // Tomorrow
    type: 'Martial Arts',
    room: 'Studio B',
    members: []
  },
  
  // Day after tomorrow
  {
    id: 9,
    name: 'Pilates',
    trainer: 'Priya Sharma',
    time: '08:00 AM',
    duration: 60,
    capacity: 15,
    booked: 8,
    date: '2025-08-12', // Day after tomorrow
    type: 'Pilates',
    room: 'Studio A',
    members: []
  },
  {
    id: 10,
    name: 'CrossFit',
    trainer: 'Raj Singh',
    time: '10:00 AM',
    duration: 60,
    capacity: 12,
    booked: 12,
    date: '2025-08-12', // Day after tomorrow
    type: 'CrossFit',
    room: 'Gym Floor',
    members: []
  },
  
  // Next week's classes
  {
    id: 11,
    name: 'Spinning',
    trainer: 'Vikash Kumar',
    time: '07:00 AM',
    duration: 45,
    capacity: 20,
    booked: 15,
    date: '2025-08-13', // Next week Monday
    type: 'Cardio',
    room: 'Spinning Room',
    members: []
  },
  {
    id: 12,
    name: 'Aerial Yoga',
    trainer: 'Sneha Reddy',
    time: '06:00 PM',
    duration: 75,
    capacity: 10,
    booked: 7,
    date: '2025-08-14', // Next week Tuesday
    type: 'Yoga',
    room: 'Studio A',
    members: []
  }
];

const timeSlots = [
  '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'
];

interface ClassScheduleProps {
  selectedBranch?: string;
}

const ClassSchedule: React.FC<ClassScheduleProps> = ({ selectedBranch = 'All Branches' }) => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'day' | 'month'>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [filterType, setFilterType] = useState<string>('All Types');
  const [filterTrainer, setFilterTrainer] = useState<string>('All Trainers');
  const [filterDate, setFilterDate] = useState<string>('');
  const [hoveredClass, setHoveredClass] = useState<any>(null);
  const [showClassDetails, setShowClassDetails] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ time: string; date: string } | null>(null);

  // Track mouse position for tooltip
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  


  const getClassTypeColor = (type: string) => {
    switch (type) {
      case 'Yoga': return 'bg-purple-600 text-white border-purple-500';
      case 'HIIT': return 'bg-red-600 text-white border-red-500';
      case 'Strength': return 'bg-blue-600 text-white border-blue-500';
      case 'Dance': return 'bg-pink-600 text-white border-pink-500';
      case 'Cardio': return 'bg-orange-600 text-white border-orange-500';
      case 'Martial Arts': return 'bg-yellow-600 text-white border-yellow-500';
      case 'Pilates': return 'bg-green-600 text-white border-green-500';
      case 'CrossFit': return 'bg-indigo-600 text-white border-indigo-500';
      default: return 'bg-gray-600 text-white border-gray-500';
    }
  };

  const getClassTypeIcon = (type: string) => {
    switch (type) {
      case 'Yoga': return <Heart className="h-4 w-4 text-white" />;
      case 'HIIT': return <Zap className="h-4 w-4 text-white" />;
      case 'Strength': return <Dumbbell className="h-4 w-4 text-white" />;
      case 'Dance': return <Music className="h-4 w-4 text-white" />;
      case 'Cardio': return <Activity className="h-4 w-4 text-white" />;
      case 'Martial Arts': return <Shield className="h-4 w-4 text-white" />;
      case 'Pilates': return <Award className="h-4 w-4 text-white" />;
      case 'CrossFit': return <Flame className="h-4 w-4 text-white" />;
      default: return <Target className="h-4 w-4 text-white" />;
    }
  };

  const getCapacityColor = (booked: number, capacity: number) => {
    const percentage = (booked / capacity) * 100;
    if (percentage >= 95) return 'text-red-500 font-semibold'; // Full/Almost full
    if (percentage >= 80) return 'text-orange-500 font-medium'; // Almost full
    if (percentage >= 60) return 'text-yellow-500 font-medium'; // Getting full
    return 'text-green-500 font-medium'; // Open slots
  };

  const getCapacityStatus = (booked: number, capacity: number) => {
    const percentage = (booked / capacity) * 100;
    if (percentage >= 95) return { status: 'full', color: 'bg-red-500', text: 'Full' };
    if (percentage >= 80) return { status: 'almost-full', color: 'bg-orange-500', text: 'Almost Full' };
    if (percentage >= 60) return { status: 'filling', color: 'bg-yellow-500', text: 'Filling Up' };
    return { status: 'open', color: 'bg-green-500', text: 'Open' };
  };

  const getClassCardColor = (type: string) => {
    switch (type) {
      case 'Yoga': return 'bg-gradient-to-r from-purple-900/20 to-purple-800/10 border-l-purple-500';
      case 'HIIT': return 'bg-gradient-to-r from-red-900/20 to-red-800/10 border-l-red-500';
      case 'Strength': return 'bg-gradient-to-r from-blue-900/20 to-blue-800/10 border-l-blue-500';
      case 'Dance': return 'bg-gradient-to-r from-pink-900/20 to-pink-800/10 border-l-pink-500';
      case 'Cardio': return 'bg-gradient-to-r from-orange-900/20 to-orange-800/10 border-l-orange-500';
      case 'Martial Arts': return 'bg-gradient-to-r from-yellow-900/20 to-yellow-800/10 border-l-yellow-500';
      case 'Pilates': return 'bg-gradient-to-r from-green-900/20 to-green-800/10 border-l-green-500';
      case 'CrossFit': return 'bg-gradient-to-r from-indigo-900/20 to-indigo-800/10 border-l-indigo-500';
      default: return 'bg-gradient-to-r from-gray-800/20 to-gray-700/10 border-l-gray-500';
    }
  };

  const getFilteredClasses = () => {
    return classes.filter(cls => {
      const matchesType = filterType === 'All Types' || cls.type === filterType;
      const matchesTrainer = filterTrainer === 'All Trainers' || cls.trainer === filterTrainer;
      
      // Branch filtering - use the branch property if available, otherwise use the ID-based approach
      const matchesBranch = selectedBranch === 'All Branches' || 
        (cls.branch ? cls.branch === selectedBranch : 
        (cls.id % (branches.length - 1) === branches.indexOf(selectedBranch) - 1));
      
      // Search functionality
      const matchesSearch = searchTerm === '' || 
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.trainer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.room.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Date filtering
      let matchesDate = true;
      if (filterDate) {
        matchesDate = cls.date === filterDate;
      }
      
      return matchesType && matchesTrainer && matchesDate && matchesSearch && matchesBranch;
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getWeekDays = () => {
    const week = [];
    const startDate = new Date(selectedDate);
    startDate.setDate(selectedDate.getDate() - selectedDate.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const convertTo24Hour = (time12h: string) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = (parseInt(hours, 10) + 12).toString();
    }
    return `${hours}:${minutes}`;
  };

  return (
    <div className="space-y-6 bg-[#2A3037] p-6 rounded-lg min-h-screen">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        {/* Branch Indicator - Only show when a specific branch is selected */}
        {selectedBranch !== 'All Branches' && (
          <div className="bg-[#3a4148] p-4 rounded-xl mb-2 flex items-center justify-between">
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
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <p className="text-gray-100 mt-1">Manage and schedule gym classes</p>
          </div>
          <div className="flex items-center space-x-3">
            {/* View Mode Selector */}
            <div className="flex bg-[#3a4148] rounded-lg p-1">
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'day' 
                    ? 'bg-[#7BC843] text-black shadow-sm' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'calendar' 
                    ? 'bg-[#7BC843] text-black shadow-sm' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'month' 
                    ? 'bg-[#7BC843] text-black shadow-sm' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-[#7BC843] text-black shadow-sm' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-[#7BC843] hover:bg-[#6AB732] text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 shadow-md"
            >
              <Plus className="h-5 w-5" />
              <span>Add Class</span>
            </button>
          </div>
        </div>

        {/* Enhanced Search and Filter Bar */}
        <div className="bg-[#3a4148] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search classes, trainers, or rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#2A3037] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#7BC843] focus:border-[#7BC843] placeholder-gray-400"
              />
            </div>
            
            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="min-w-[140px] px-4 py-3 bg-[#2A3037] border border-gray-700 text-white rounded-lg 
                             focus:ring-2 focus:ring-[#7BC843] focus:border-[#7BC843] appearance-none pr-10
                             hover:bg-[#3a4148] hover:border-[#7BC843] transition-all duration-200"
                >
                  <option>All Types</option>
                  <option>Yoga</option>
                  <option>HIIT</option>
                  <option>Strength</option>
                  <option>Dance</option>
                  <option>Cardio</option>
                  <option>Martial Arts</option>
                  <option>Pilates</option>
                  <option>CrossFit</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <select 
                  value={filterTrainer}
                  onChange={(e) => setFilterTrainer(e.target.value)}
                  className="min-w-[140px] px-4 py-3 bg-[#2A3037] border border-gray-700 text-white rounded-lg 
                             focus:ring-2 focus:ring-[#7BC843] focus:border-[#7BC843] appearance-none pr-10
                             hover:bg-[#3a4148] hover:border-[#7BC843] transition-all duration-200"
                >
                  <option>All Trainers</option>
                  <option>Sneha Reddy</option>
                  <option>Raj Singh</option>
                  <option>Vikash Kumar</option>
                  <option>Priya Sharma</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setFilterType('All Types');
                  setFilterTrainer('All Trainers');
                  setFilterDate('');
                  setSearchTerm('');
                }}
                className="px-4 py-3 bg-[#2A3037] border border-gray-700 text-white rounded-lg hover:bg-[#3a4148] hover:border-[#7BC843] transition-all duration-200"
              >
                Clear
              </button>
            </div>
          </div>
          
          {/* Category Legend */}
          <div className="mt-6 pt-5 border-t border-gray-700">
            <div className="flex items-center space-x-2 text-lg font-medium text-white mb-3">
              <List className="h-5 w-5" />
              <span>Category Legend</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {['Yoga', 'HIIT', 'Strength', 'Dance', 'Cardio', 'Martial Arts', 'Pilates', 'CrossFit'].map((type) => (
                <div key={type} className="flex items-center space-x-2 bg-[#3a4148] px-3 py-2 rounded-lg">
                  <div className={`w-8 h-8 rounded-full ${getClassTypeColor(type).split(' ')[0]} flex items-center justify-center`}>
                    {React.cloneElement(getClassTypeIcon(type), { className: "h-5 w-5 text-white" })}
                  </div>
                  <span className="text-sm font-medium text-white">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Date Navigation - Only visible in calendar view but simplified */}
      {viewMode === 'calendar' && (
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(selectedDate.getDate() - 7);
                setSelectedDate(newDate);
              }}
              className="p-2 hover:bg-[#3a4148] rounded-lg transition-colors duration-200"
            >
              <ChevronLeft className="h-5 w-5 text-gray-300" />
            </button>
            <div className="flex space-x-2 items-center">
              <button 
                onClick={() => setSelectedDate(new Date())}
                className="bg-[#165D31] hover:bg-[#073418] text-white px-3 py-1 rounded text-sm transition-colors duration-200"
              >
                Today
              </button>
              <span className="text-sm font-medium text-gray-300">
                Week of {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <button
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(selectedDate.getDate() + 7);
                setSelectedDate(newDate);
              }}
              className="p-2 hover:bg-[#3a4148] rounded-lg transition-colors duration-200"
            >
              <ChevronRight className="h-5 w-5 text-gray-300" />
            </button>
          </div>
        </div>
      )}
      
      {/* Week View - Only visible in list view */}
      {viewMode === 'list' && (
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(selectedDate.getDate() - 7);
                setSelectedDate(newDate);
              }}
              className="p-2 hover:bg-[#3a4148] rounded-lg transition-colors duration-200"
            >
              <ChevronLeft className="h-5 w-5 text-gray-300" />
            </button>
            <h3 className="text-lg font-semibold text-white">
              {formatDate(selectedDate)}
            </h3>
            <button
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(selectedDate.getDate() + 7);
                setSelectedDate(newDate);
              }}
              className="p-2 hover:bg-[#3a4148] rounded-lg transition-colors duration-200"
            >
              <ChevronRight className="h-5 w-5 text-gray-300" />
            </button>
          </div>

          {/* Week View */}
          <div className="grid grid-cols-7 gap-2">
            {getWeekDays().map((day, index) => {
              // Check if this day is the currently filtered date
              const dayStr = day.toISOString().split('T')[0];
              const isActiveDay = filterDate === dayStr;
              
              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedDate(day);
                    // When clicking a date, set the filter date to show only classes for that date
                    const dateString = day.toISOString().split('T')[0]; // Format: YYYY-MM-DD
                    setFilterDate(dateString);
                  }}
                  className={`text-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                    isActiveDay
                      ? 'bg-[#165D31] text-white'
                      : 'text-gray-300 hover:bg-[#3a4148]'
                  }`}
                >
                  <div className="text-sm font-medium">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="text-lg font-bold mt-1">
                    {day.getDate()}
                  </div>
                  <div className="text-xs mt-1 text-gray-400">
                    {isActiveDay ? 'Selected' : 'Click to view'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode === 'calendar' ? (
        /* Enhanced Calendar View */
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 overflow-hidden">
          <div className="grid grid-cols-8 border-b border-gray-700">
            <div className="p-4 font-semibold text-white border-r border-gray-700">Time</div>
            {getWeekDays().map((day, index) => (
              <div key={index} className="p-4 font-semibold text-white text-center border-r border-gray-700 last:border-r-0">
                {day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            ))}
          </div>
          
          {timeSlots.map((timeSlot, index) => (
            <div key={index} className="grid grid-cols-8 border-b border-gray-700 last:border-b-0">
              <div className="p-4 text-sm text-gray-300 border-r border-gray-700 bg-[#3a4148]">
                {timeSlot}
              </div>
              {getWeekDays().map((day, dayIndex) => {
                const dayClasses = getFilteredClasses().filter(cls => {
                  const classDate = new Date(cls.date);
                  return cls.time === timeSlot && 
                         classDate.getFullYear() === day.getFullYear() &&
                         classDate.getMonth() === day.getMonth() &&
                         classDate.getDate() === day.getDate();
                });
                
                return (
                  <div 
                    key={dayIndex} 
                    className="p-2 min-h-[100px] border-r border-gray-700 last:border-r-0 relative bg-[#2A3037] hover:bg-[#3a4148] transition-colors duration-200"
                    onClick={() => {
                      if (dayClasses.length === 0) {
                        const dateStr = day.toISOString().split('T')[0];
                        setSelectedTimeSlot({ time: timeSlot, date: dateStr });
                        setShowCreateModal(true);
                      }
                    }}
                  >
                    {dayClasses.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500 hover:text-gray-300 cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-200">
                        <Plus className="h-6 w-6" />
                      </div>
                    )}
                    {dayClasses.map((cls) => {
                      const capacityStatus = getCapacityStatus(cls.booked, cls.capacity);
                      return (
                        <div
                          key={cls.id}
                          className={`${getClassCardColor(cls.type)} border-l-4 rounded-lg p-3 mb-1 text-xs 
                                     hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer 
                                     group relative overflow-hidden`}
                          onMouseEnter={() => setHoveredClass(cls)}
                          onMouseLeave={() => setHoveredClass(null)}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedClass(cls);
                            setShowClassDetails(true);
                          }}
                        >
                          {/* Class Type Icon */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-1">
                              {getClassTypeIcon(cls.type)}
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getClassTypeColor(cls.type)}`}>
                                {cls.type}
                              </span>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${capacityStatus.color}`} title={capacityStatus.text}></div>
                          </div>

                          <div className="font-medium text-white text-sm mb-1">{cls.name}</div>
                          <div className="text-gray-300 text-xs mb-2">{cls.trainer}</div>
                          
                          {/* Duration Badge */}
                          <div className="flex items-center justify-between text-xs mb-2">
                            <div className="flex items-center text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{cls.duration}min</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-3 w-3 mr-1 text-gray-300" />
                              <span className={getCapacityColor(cls.booked, cls.capacity)}>
                                {cls.booked}/{cls.capacity}
                              </span>
                            </div>
                          </div>

                          {/* Member Avatars Preview */}
                          {cls.members && cls.members.length > 0 && (
                            <div className="flex items-center space-x-1 mt-2">
                              <div className="flex -space-x-1">
                                {cls.members.slice(0, 3).map((member) => (
                                  <div
                                    key={member.id}
                                    className="w-5 h-5 rounded-full bg-[#7BC843] text-black text-xs flex items-center justify-center border border-gray-700"
                                    title={member.name}
                                  >
                                    {member.avatar}
                                  </div>
                                ))}
                                {cls.members.length > 3 && (
                                  <div className="w-5 h-5 rounded-full bg-gray-600 text-white text-xs flex items-center justify-center border border-gray-700">
                                    +{cls.members.length - 3}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Hover Actions */}
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedClass(cls);
                                setShowEditModal(true);
                              }}
                              className="p-1 bg-[#3a4148] hover:bg-[#4a5158] rounded text-white transition-colors duration-200"
                              title="Edit Class"
                            >
                              <Edit className="h-3 w-3" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                // Duplicate class logic
                                alert(`Duplicating ${cls.name}...`);
                              }}
                              className="p-1 bg-[#3a4148] hover:bg-[#4a5158] rounded text-white transition-colors duration-200"
                              title="Duplicate Class"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ) : viewMode === 'day' ? (
        /* Day View */
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(selectedDate.getDate() - 1);
                  setSelectedDate(newDate);
                }}
                className="p-2 hover:bg-[#3a4148] rounded-lg transition-colors duration-200"
              >
                <ChevronLeft className="h-5 w-5 text-gray-300" />
              </button>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white">
                  {formatDate(selectedDate)}
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                  {getFilteredClasses().filter(cls => cls.date === selectedDate.toISOString().split('T')[0]).length} classes scheduled
                </p>
              </div>
              <button
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(selectedDate.getDate() + 1);
                  setSelectedDate(newDate);
                }}
                className="p-2 hover:bg-[#3a4148] rounded-lg transition-colors duration-200"
              >
                <ChevronRight className="h-5 w-5 text-gray-300" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {getFilteredClasses()
                .filter(cls => cls.date === selectedDate.toISOString().split('T')[0])
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((cls) => {
                  const capacityStatus = getCapacityStatus(cls.booked, cls.capacity);
                  return (
                    <div
                      key={cls.id}
                      className={`${getClassCardColor(cls.type)} border-l-4 rounded-xl p-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer group`}
                      onClick={() => {
                        setSelectedClass(cls);
                        setShowClassDetails(true);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="flex items-center space-x-2">
                              {getClassTypeIcon(cls.type)}
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getClassTypeColor(cls.type)}`}>
                                {cls.type}
                              </span>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${capacityStatus.color} text-white`}>
                              {capacityStatus.text}
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-semibold text-white mb-2">{cls.name}</h3>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center text-gray-300">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{cls.time} ({cls.duration}min)</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                              <Users className="h-4 w-4 mr-2" />
                              <span className={getCapacityColor(cls.booked, cls.capacity)}>
                                {cls.booked}/{cls.capacity} spots
                              </span>
                            </div>
                            <div className="flex items-center text-gray-300">
                              <span className="w-4 h-4 mr-2 flex items-center justify-center">👤</span>
                              <span>{cls.trainer}</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                              <span className="w-4 h-4 mr-2 flex items-center justify-center">🏠</span>
                              <span>{cls.room}</span>
                            </div>
                          </div>
                          
                          {/* Member Avatars */}
                          {cls.members && cls.members.length > 0 && (
                            <div className="mt-4">
                              <p className="text-gray-400 text-xs mb-2">Registered Members:</p>
                              <div className="flex items-center space-x-2">
                                <div className="flex -space-x-2">
                                  {cls.members.slice(0, 8).map((member) => (
                                    <div
                                      key={member.id}
                                      className="w-8 h-8 rounded-full bg-[#7BC843] text-black text-sm flex items-center justify-center border-2 border-[#2A3037]"
                                      title={member.name}
                                    >
                                      {member.avatar}
                                    </div>
                                  ))}
                                  {cls.members.length > 8 && (
                                    <div className="w-8 h-8 rounded-full bg-gray-600 text-white text-sm flex items-center justify-center border-2 border-[#2A3037]">
                                      +{cls.members.length - 8}
                                    </div>
                                  )}
                                </div>
                                {cls.members.length > 0 && (
                                  <span className="text-gray-400 text-xs ml-2">
                                    and {cls.booked - cls.members.length} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedClass(cls);
                              setShowEditModal(true);
                            }}
                            className="p-2 bg-[#3a4148] hover:bg-[#4a5158] rounded-lg text-white transition-colors duration-200"
                            title="Edit Class"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(`Duplicating ${cls.name}...`);
                            }}
                            className="p-2 bg-[#3a4148] hover:bg-[#4a5158] rounded-lg text-white transition-colors duration-200"
                            title="Duplicate Class"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`Delete ${cls.name}?`)) {
                                alert('Class deleted successfully!');
                              }
                            }}
                            className="p-2 bg-[#3a4148] hover:bg-red-600 rounded-lg text-white transition-colors duration-200"
                            title="Delete Class"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              
              {getFilteredClasses().filter(cls => cls.date === selectedDate.toISOString().split('T')[0]).length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg font-medium mb-2">No classes scheduled</div>
                  <div className="text-gray-500">Click "Add Class" to schedule a new class for this day</div>
                  <button 
                    onClick={() => setShowCreateModal(true)}
                    className="mt-4 bg-[#7BC843] hover:bg-[#6AB732] text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Schedule a Class
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : viewMode === 'month' ? (
        /* Month View */
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(selectedDate.getMonth() - 1);
                  setSelectedDate(newDate);
                }}
                className="p-2 hover:bg-[#3a4148] rounded-lg transition-colors duration-200"
              >
                <ChevronLeft className="h-5 w-5 text-gray-300" />
              </button>
              <h3 className="text-xl font-semibold text-white">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <button
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(selectedDate.getMonth() + 1);
                  setSelectedDate(newDate);
                }}
                className="p-2 hover:bg-[#3a4148] rounded-lg transition-colors duration-200"
              >
                <ChevronRight className="h-5 w-5 text-gray-300" />
              </button>
            </div>
          </div>
          
          {/* Month Calendar Grid */}
          <div className="p-6">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium text-gray-300 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
                const startOfCalendar = new Date(startOfMonth);
                startOfCalendar.setDate(startOfCalendar.getDate() - startOfMonth.getDay());
                
                const currentDay = new Date(startOfCalendar);
                currentDay.setDate(startOfCalendar.getDate() + i);
                
                const isCurrentMonth = currentDay.getMonth() === selectedDate.getMonth();
                const isToday = currentDay.toDateString() === new Date().toDateString();
                const dayClasses = getFilteredClasses().filter(cls => cls.date === currentDay.toISOString().split('T')[0]);
                
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedDate(currentDay);
                      setViewMode('day');
                    }}
                    className={`aspect-square p-2 border border-gray-700 rounded-lg cursor-pointer transition-colors duration-200 ${
                      isCurrentMonth 
                        ? 'bg-[#3a4148] hover:bg-[#4a5158]' 
                        : 'bg-[#2A3037] opacity-50'
                    } ${
                      isToday ? 'ring-2 ring-[#7BC843]' : ''
                    }`}
                  >
                    <div className={`text-sm font-medium ${
                      isCurrentMonth ? 'text-white' : 'text-gray-500'
                    } ${
                      isToday ? 'text-[#7BC843]' : ''
                    }`}>
                      {currentDay.getDate()}
                    </div>
                    
                    {dayClasses.length > 0 && (
                      <div className="mt-1">
                        <div className="flex flex-wrap gap-1">
                          {dayClasses.slice(0, 3).map((cls) => (
                            <div
                              key={cls.id}
                              className={`w-2 h-2 rounded-full ${getClassTypeColor(cls.type).split(' ')[0]}`}
                              title={cls.name}
                            ></div>
                          ))}
                          {dayClasses.length > 3 && (
                            <div className="w-2 h-2 rounded-full bg-gray-500" title={`+${dayClasses.length - 3} more`}></div>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {dayClasses.length} class{dayClasses.length !== 1 ? 'es' : ''}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-white mr-2" />
                <span className="text-white font-medium">Filter:</span>
              </div>
              <select 
                className="px-4 py-2 bg-[#3a4148] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option>All Types</option>
                <option>Yoga</option>
                <option>HIIT</option>
                <option>Strength</option>
                <option>Dance</option>
                <option>Cardio</option>
                <option>Martial Arts</option>
                <option>Pilates</option>
                <option>CrossFit</option>
              </select>
              <select 
                className="px-4 py-2 bg-[#3a4148] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent"
                value={filterTrainer}
                onChange={(e) => setFilterTrainer(e.target.value)}
              >
                <option>All Trainers</option>
                <option>Sneha Reddy</option>
                <option>Raj Singh</option>
                <option>Vikash Kumar</option>
                <option>Priya Sharma</option>
              </select>
              {filterDate && (
                <div className="flex items-center bg-[#165D31] px-3 py-2 rounded-lg text-white">
                  <span className="text-sm font-medium mr-2">
                    {new Date(filterDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <button 
                    onClick={() => setFilterDate('')}
                    className="hover:bg-[#0d4424] p-1 rounded-full"
                    title="Clear date filter"
                  >
                    ×
                  </button>
                </div>
              )}
              {!filterDate && (
                <button
                  onClick={() => {
                    // Set filter date to the currently selected date
                    const dateString = selectedDate.toISOString().split('T')[0];
                    setFilterDate(dateString);
                  }}
                  className="px-4 py-2 bg-[#3a4148] border border-gray-700 text-white rounded-lg hover:bg-[#4a5158] transition-colors duration-200"
                >
                  Show Today's Classes
                </button>
              )}
              <button
                onClick={() => {
                  setFilterType('All Types');
                  setFilterTrainer('All Trainers');
                  setFilterDate('');
                }}
                className="px-4 py-2 bg-[#3a4148] border border-gray-700 text-white rounded-lg hover:bg-[#4a5158] transition-colors duration-200"
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          <div className="px-6 py-3 bg-[#3a4148] flex justify-between items-center">
            <span className="text-white font-medium">
              {getFilteredClasses().length} {getFilteredClasses().length === 1 ? 'class' : 'classes'} found
              {filterDate && (
                <span className="ml-2 text-gray-300 text-sm">
                  on {new Date(filterDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              )}
            </span>
            {(filterType !== 'All Types' || filterTrainer !== 'All Trainers') && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 text-sm">Active filters:</span>
                {filterType !== 'All Types' && (
                  <span className="bg-[#165D31] text-white text-xs px-2 py-1 rounded-full">{filterType}</span>
                )}
                {filterTrainer !== 'All Trainers' && (
                  <span className="bg-[#165D31] text-white text-xs px-2 py-1 rounded-full">{filterTrainer}</span>
                )}
              </div>
            )}
          </div>
          <div className="divide-y divide-gray-700">
            {getFilteredClasses().length > 0 ? getFilteredClasses().map((cls) => (
              <div key={cls.id} className="p-6 hover:bg-[#3a4148] transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#165D31] rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{cls.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-300 mt-1">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {cls.time} ({cls.duration} mins)
                        </div>
                        <span>•</span>
                        <span>{cls.trainer}</span>
                        <span>•</span>
                        <span>{cls.room}</span>
                        <span>•</span>
                        <span>{new Date(cls.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getClassTypeColor(cls.type)}`}>
                      {cls.type}
                    </span>
                    <div className="text-right">
                      <div className={`text-lg font-semibold ${getCapacityColor(cls.booked, cls.capacity)}`}>
                        {cls.booked}/{cls.capacity}
                      </div>
                      <div className="text-sm text-gray-300">Capacity</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedClass(cls);
                          setShowEditModal(true);
                        }}
                        className="p-2 bg-[#2A3037] text-white hover:bg-[#1a2128] rounded-lg transition-colors duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete ${cls.name}?`)) {
                            // Here you would typically call a function to delete the class
                            alert(`Class ${cls.name} deleted successfully!`);
                          }
                        }}
                        className="p-2 bg-[#2A3037] text-white hover:bg-[#1a2128] rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="p-12 text-center">
                <div className="text-white text-lg font-medium mb-2">No classes found</div>
                <div className="text-gray-400">Try adjusting your filters to see more results</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Class Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Create New Class</h2>
                <button 
                  onClick={() => {
                    setShowCreateModal(false);
                    setSelectedTimeSlot(null);
                  }}
                  className="text-gray-400 hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 bg-[#2A3037] text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Class Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                    placeholder="Enter class name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Class Type</label>
                  <select className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white">
                    <option>Select type</option>
                    <option>Yoga</option>
                    <option>HIIT</option>
                    <option>Strength</option>
                    <option>Dance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Trainer</label>
                  <select className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white">
                    <option>Select trainer</option>
                    <option>Sneha Reddy</option>
                    <option>Raj Singh</option>
                    <option>Vikash Kumar</option>
                    <option>Priya Sharma</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Room</label>
                  <select className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white">
                    <option>Select room</option>
                    <option>Studio A</option>
                    <option>Studio B</option>
                    <option>Gym Floor</option>
                    <option>Weight Room</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                    defaultValue={selectedTimeSlot?.date || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                    defaultValue={selectedTimeSlot?.time ? convertTo24Hour(selectedTimeSlot.time) : ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                    placeholder="60"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Capacity</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                      placeholder="20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Branch</label>
                    <select className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white">
                      {branches.filter(branch => branch !== 'All Branches').map((branch, index) => (
                        <option key={index} value={branch}>{branch}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                  placeholder="Class description..."
                />
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 border border-gray-600 text-gray-200 rounded-lg hover:bg-[#3a4148] transition-colors duration-200"
                >
                  Cancel
                </button>
                <button className="px-6 py-3 bg-[#165D31] hover:bg-[#073418] text-white rounded-lg transition-colors duration-200">
                  Create Class
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Class Details Popup */}
      {showClassDetails && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowClassDetails(false)}>
          <div 
            className="bg-[#2A3037] rounded-xl shadow-2xl max-w-md w-full animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getClassTypeColor(selectedClass.type)}`}>
                    {selectedClass.type}
                  </span>
                </div>
                <button 
                  onClick={() => setShowClassDetails(false)}
                  className="text-gray-400 hover:text-gray-200 text-xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-5 bg-[#2A3037] text-white">
              <h3 className="text-xl font-bold mb-3">{selectedClass.name}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-3 mt-0.5 text-gray-300" />
                  <div>
                    <div className="font-medium">{new Date(selectedClass.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</div>
                    <div className="text-sm text-gray-300">Date</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 mt-0.5 text-gray-300" />
                  <div>
                    <div className="font-medium">{selectedClass.time} ({selectedClass.duration} minutes)</div>
                    <div className="text-sm text-gray-300">Time & Duration</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="h-5 w-5 mr-3 mt-0.5 text-gray-300" />
                  <div>
                    <div className="font-medium">
                      <span className={getCapacityColor(selectedClass.booked, selectedClass.capacity)}>
                        {selectedClass.booked}/{selectedClass.capacity}
                      </span> spots filled
                    </div>
                    <div className="text-sm text-gray-300">Attendance</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-5 w-5 mr-3 mt-0.5 flex justify-center items-center">👤</div>
                  <div>
                    <div className="font-medium">{selectedClass.trainer}</div>
                    <div className="text-sm text-gray-300">Instructor</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-5 w-5 mr-3 mt-0.5 flex justify-center items-center">🏠</div>
                  <div>
                    <div className="font-medium">{selectedClass.room}</div>
                    <div className="text-sm text-gray-300">Location</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-5 w-5 mr-3 mt-0.5 flex justify-center items-center">🏢</div>
                  <div>
                    <div className="font-medium">
                      {/* Display branch from property if available, otherwise use ID-based approach */}
                      {selectedClass.branch || branches.filter(b => b !== 'All Branches')[selectedClass.id % (branches.length - 1)]}
                    </div>
                    <div className="text-sm text-gray-300">Branch</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-2">
                <button 
                  onClick={() => {
                    setShowClassDetails(false);
                    setShowEditModal(true);
                  }}
                  className="flex-1 px-4 py-2 bg-[#3a4148] hover:bg-[#4a5158] text-white rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button 
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${selectedClass.name}?`)) {
                      setShowClassDetails(false);
                      // Here you would typically call a function to delete the class
                      alert(`Class ${selectedClass.name} deleted successfully!`);
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-[#3a4148] hover:bg-[#4a5158] text-white rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Hover Class Tooltip */}
      {hoveredClass && !showClassDetails && (
        <div 
          className="fixed z-50 bg-[#2A3037] rounded-lg shadow-xl max-w-xs w-full p-4 text-white animate-fade-in border border-gray-700"
          style={{
            left: `${Math.min(window.innerWidth - 320, Math.max(10, mousePosition.x))}px`,
            top: `${Math.min(window.innerHeight - 200, Math.max(10, mousePosition.y + 10))}px`
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${getClassTypeColor(hoveredClass.type)}`}>
              {hoveredClass.type}
            </span>
            <span className={`text-xs font-medium ${getCapacityColor(hoveredClass.booked, hoveredClass.capacity)}`}>
              {hoveredClass.booked}/{hoveredClass.capacity}
            </span>
          </div>
          <div className="font-bold">{hoveredClass.name}</div>
          <div className="text-sm text-gray-300">{hoveredClass.trainer}</div>
          <div className="text-xs text-gray-400 mt-1">{hoveredClass.room} • {hoveredClass.time}</div>
          <div className="text-xs mt-2 text-gray-300">Click for more details</div>
        </div>
      )}

      {/* Edit Class Modal */}
      {showEditModal && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Edit Class</h2>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 bg-[#2A3037] text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Class Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                    placeholder="Enter class name"
                    defaultValue={selectedClass.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Class Type</label>
                  <select 
                    className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                    defaultValue={selectedClass.type}
                  >
                    <option>Select type</option>
                    <option>Yoga</option>
                    <option>HIIT</option>
                    <option>Strength</option>
                    <option>Dance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Trainer</label>
                  <select 
                    className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                    defaultValue={selectedClass.trainer}
                  >
                    <option>Select trainer</option>
                    <option>Sneha Reddy</option>
                    <option>Raj Singh</option>
                    <option>Vikash Kumar</option>
                    <option>Priya Sharma</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Room</label>
                  <select 
                    className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                    defaultValue={selectedClass.room}
                  >
                    <option>Select room</option>
                    <option>Studio A</option>
                    <option>Studio B</option>
                    <option>Gym Floor</option>
                    <option>Weight Room</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                    defaultValue={selectedClass.date}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                    defaultValue={selectedClass.time.slice(0, 5)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                    placeholder="60"
                    defaultValue={selectedClass.duration}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Capacity</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                    placeholder="20"
                    defaultValue={selectedClass.capacity}
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                  placeholder="Class description..."
                />
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-3 border border-gray-600 text-gray-200 rounded-lg hover:bg-[#3a4148] transition-colors duration-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    // Here you would typically save the changes
                    alert(`Class ${selectedClass.name} updated successfully!`);
                    setShowEditModal(false);
                  }}
                  className="px-6 py-3 bg-[#165D31] hover:bg-[#073418] text-white rounded-lg transition-colors duration-200"
                >
                  Update Class
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassSchedule;