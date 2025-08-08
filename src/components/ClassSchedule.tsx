import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

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
    date: '2025-08-08', // Today
    type: 'Yoga',
    room: 'Studio A'
  },
  {
    id: 2,
    name: 'HIIT Training',
    trainer: 'Raj Singh',
    time: '08:30 AM',
    duration: 45,
    capacity: 15,
    booked: 12,
    date: '2025-08-08', // Today
    type: 'HIIT',
    room: 'Gym Floor'
  },
  {
    id: 3,
    name: 'Strength Training',
    trainer: 'Vikash Kumar',
    time: '10:00 AM',
    duration: 75,
    capacity: 12,
    booked: 8,
    date: '2025-08-08', // Today
    type: 'Strength',
    room: 'Weight Room'
  },
  {
    id: 4,
    name: 'Zumba Dance',
    trainer: 'Priya Sharma',
    time: '06:00 PM',
    duration: 50,
    capacity: 25,
    booked: 22,
    date: '2025-08-08', // Today
    type: 'Dance',
    room: 'Studio B'
  },
  {
    id: 5,
    name: 'Evening Yoga',
    trainer: 'Sneha Reddy',
    time: '07:30 PM',
    duration: 60,
    capacity: 20,
    booked: 18,
    date: '2025-08-08', // Today
    type: 'Yoga',
    room: 'Studio A'
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
    date: '2025-08-09', // Tomorrow
    type: 'Cardio',
    room: 'Gym Floor'
  },
  {
    id: 7,
    name: 'Power Yoga',
    trainer: 'Sneha Reddy',
    time: '09:00 AM',
    duration: 60,
    capacity: 15,
    booked: 13,
    date: '2025-08-09', // Tomorrow
    type: 'Yoga',
    room: 'Studio A'
  },
  {
    id: 8,
    name: 'Kickboxing',
    trainer: 'Vikash Kumar',
    time: '11:00 AM',
    duration: 45,
    capacity: 12,
    booked: 10,
    date: '2025-08-09', // Tomorrow
    type: 'Martial Arts',
    room: 'Studio B'
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
    date: '2025-08-10', // Day after tomorrow
    type: 'Pilates',
    room: 'Studio A'
  },
  {
    id: 10,
    name: 'CrossFit',
    trainer: 'Raj Singh',
    time: '10:00 AM',
    duration: 60,
    capacity: 12,
    booked: 12,
    date: '2025-08-10', // Day after tomorrow
    type: 'CrossFit',
    room: 'Gym Floor'
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
    date: '2025-08-11', // Next week Monday
    type: 'Cardio',
    room: 'Spinning Room'
  },
  {
    id: 12,
    name: 'Aerial Yoga',
    trainer: 'Sneha Reddy',
    time: '06:00 PM',
    duration: 75,
    capacity: 10,
    booked: 7,
    date: '2025-08-12', // Next week Tuesday
    type: 'Yoga',
    room: 'Studio A'
  }
];

const timeSlots = [
  '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'
];

const ClassSchedule: React.FC = () => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [filterType, setFilterType] = useState<string>('All Types');
  const [filterTrainer, setFilterTrainer] = useState<string>('All Trainers');
  const [filterDate, setFilterDate] = useState<string>('');

  const getClassTypeColor = (type: string) => {
    switch (type) {
      case 'Yoga': return 'bg-purple-100 text-purple-800';
      case 'HIIT': return 'bg-red-100 text-red-800';
      case 'Strength': return 'bg-blue-100 text-blue-800';
      case 'Dance': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCapacityColor = (booked: number, capacity: number) => {
    const percentage = (booked / capacity) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getFilteredClasses = () => {
    return classes.filter(cls => {
      const matchesType = filterType === 'All Types' || cls.type === filterType;
      const matchesTrainer = filterTrainer === 'All Trainers' || cls.trainer === filterTrainer;
      
      // Date filtering
      let matchesDate = true;
      if (filterDate) {
        matchesDate = cls.date === filterDate;
      }
      
      return matchesType && matchesTrainer && matchesDate;
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

  return (
    <div className="space-y-6 bg-[#2A3037] p-6 rounded-lg min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
            <h1 className="text-white">Manage and schedule gym classes</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-[#3a4148] rounded-lg p-1">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                viewMode === 'calendar' 
                  ? 'bg-[#165D31] text-white shadow-sm' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                viewMode === 'list' 
                  ? 'bg-[#165D31] text-white shadow-sm' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              List
            </button>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-[#165D31] hover:bg-[#073418] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Class</span>
          </button>
        </div>
      </div>

      {/* Date Navigation - Only visible in calendar view */}
      {viewMode === 'calendar' && (
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
        /* Calendar View */
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
                const dayClasses = classes.filter(cls => {
                  const classDate = new Date(cls.date);
                  return cls.time === timeSlot && 
                         classDate.getFullYear() === day.getFullYear() &&
                         classDate.getMonth() === day.getMonth() &&
                         classDate.getDate() === day.getDate();
                });
                
                return (
                  <div key={dayIndex} className="p-2 min-h-[80px] border-r border-gray-700 last:border-r-0 relative bg-[#2A3037]">
                    {dayClasses.map((cls) => (
                      <div
                        key={cls.id}
                        className="bg-[#3a4148] border-l-4 border-[#165D31] rounded-lg p-2 mb-1 text-xs hover:shadow-md transition-shadow duration-200 cursor-pointer"
                      >
                        <div className="font-medium text-white">{cls.name}</div>
                        <div className="text-gray-300">{cls.trainer}</div>
                        <div className="flex items-center mt-1">
                          <Users className="h-3 w-3 mr-1 text-gray-300" />
                          <span className={getCapacityColor(cls.booked, cls.capacity)}>
                            {cls.booked}/{cls.capacity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
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
                  onClick={() => setShowCreateModal(false)}
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
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
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
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Capacity</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                    placeholder="20"
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