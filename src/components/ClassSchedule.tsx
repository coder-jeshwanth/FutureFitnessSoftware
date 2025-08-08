import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const classes = [
  {
    id: 1,
    name: 'Morning Yoga',
    trainer: 'Sneha Reddy',
    time: '07:00 AM',
    duration: 60,
    capacity: 20,
    booked: 15,
    date: '2025-01-15',
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
    date: '2025-01-15',
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
    date: '2025-01-15',
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
    date: '2025-01-15',
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
    date: '2025-01-15',
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Class Schedule</h2>
          <p className="text-gray-600">Manage and schedule gym classes</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                viewMode === 'calendar' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                viewMode === 'list' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
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

      {/* Date Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(selectedDate.getDate() - 7);
              setSelectedDate(newDate);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900">
            {formatDate(selectedDate)}
          </h3>
          <button
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(selectedDate.getDate() + 7);
              setSelectedDate(newDate);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Week View */}
        <div className="grid grid-cols-7 gap-2">
          {getWeekDays().map((day, index) => (
            <div
              key={index}
              onClick={() => setSelectedDate(day)}
              className={`text-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                day.toDateString() === selectedDate.toDateString()
                  ? 'bg-[#165D31] text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="text-sm font-medium">
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="text-lg font-bold mt-1">
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {viewMode === 'calendar' ? (
        /* Calendar View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div className="p-4 font-semibold text-gray-900 border-r border-gray-200">Time</div>
            {getWeekDays().map((day, index) => (
              <div key={index} className="p-4 font-semibold text-gray-900 text-center border-r border-gray-200 last:border-r-0">
                {day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            ))}
          </div>
          
          {timeSlots.map((timeSlot, index) => (
            <div key={index} className="grid grid-cols-8 border-b border-gray-200 last:border-b-0">
              <div className="p-4 text-sm text-gray-600 border-r border-gray-200 bg-gray-50">
                {timeSlot}
              </div>
              {getWeekDays().map((day, dayIndex) => {
                const dayClasses = classes.filter(cls => 
                  cls.time === timeSlot && 
                  new Date(cls.date).toDateString() === day.toDateString()
                );
                
                return (
                  <div key={dayIndex} className="p-2 min-h-[80px] border-r border-gray-200 last:border-r-0 relative">
                    {dayClasses.map((cls) => (
                      <div
                        key={cls.id}
                        className="bg-[#E7EFEA] border-l-4 border-[#165D31] rounded-lg p-2 mb-1 text-xs hover:shadow-md transition-shadow duration-200 cursor-pointer"
                      >
                        <div className="font-medium text-gray-900">{cls.name}</div>
                        <div className="text-gray-600">{cls.trainer}</div>
                        <div className="flex items-center mt-1">
                          <Users className="h-3 w-3 mr-1" />
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent">
                <option>All Types</option>
                <option>Yoga</option>
                <option>HIIT</option>
                <option>Strength</option>
                <option>Dance</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent">
                <option>All Trainers</option>
                <option>Sneha Reddy</option>
                <option>Raj Singh</option>
                <option>Vikash Kumar</option>
                <option>Priya Sharma</option>
              </select>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {classes.map((cls) => (
              <div key={cls.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#165D31] rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{cls.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {cls.time} ({cls.duration} mins)
                        </div>
                        <span>•</span>
                        <span>{cls.trainer}</span>
                        <span>•</span>
                        <span>{cls.room}</span>
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
                      <div className="text-sm text-gray-600">Capacity</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Class Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Create New Class</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent"
                    placeholder="Enter class name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent">
                    <option>Select type</option>
                    <option>Yoga</option>
                    <option>HIIT</option>
                    <option>Strength</option>
                    <option>Dance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trainer</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent">
                    <option>Select trainer</option>
                    <option>Sneha Reddy</option>
                    <option>Raj Singh</option>
                    <option>Vikash Kumar</option>
                    <option>Priya Sharma</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent">
                    <option>Select room</option>
                    <option>Studio A</option>
                    <option>Studio B</option>
                    <option>Gym Floor</option>
                    <option>Weight Room</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent"
                    placeholder="60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent"
                    placeholder="20"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent"
                  placeholder="Class description..."
                />
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
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
    </div>
  );
};

export default ClassSchedule;