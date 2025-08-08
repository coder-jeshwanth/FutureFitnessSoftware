import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, User, Phone, Mail, Calendar, Star, Clock, Award } from 'lucide-react';

const trainers = [
  {
    id: 1,
    name: 'Vikash Kumar',
    email: 'vikash.kumar@fitpro.com',
    phone: '+91 99887 76543',
    specialty: 'Strength Training',
    experience: '5 years',
    certifications: ['ACE Certified', 'NASM-CPT'],
    assignedMembers: 25,
    status: 'Active',
    rating: 4.8,
    availability: 'Mon-Fri: 6AM-2PM',
    joinDate: '2022-03-15',
    avatar: 'VK'
  },
  {
    id: 2,
    name: 'Sneha Reddy',
    email: 'sneha.reddy@fitpro.com',
    phone: '+91 88776 65432',
    specialty: 'Yoga & Pilates',
    experience: '4 years',
    certifications: ['RYT-200', 'PMA Certified'],
    assignedMembers: 30,
    status: 'Active',
    rating: 4.9,
    availability: 'Mon-Sat: 7AM-3PM',
    joinDate: '2022-08-20',
    avatar: 'SR'
  },
  {
    id: 3,
    name: 'Raj Singh',
    email: 'raj.singh@fitpro.com',
    phone: '+91 77665 54321',
    specialty: 'CrossFit & HIIT',
    experience: '6 years',
    certifications: ['CrossFit Level 2', 'ACSM-CPT'],
    assignedMembers: 22,
    status: 'Active',
    rating: 4.7,
    availability: 'Tue-Sun: 5AM-1PM',
    joinDate: '2021-11-10',
    avatar: 'RS'
  },
  {
    id: 4,
    name: 'Priya Sharma',
    email: 'priya.sharma@fitpro.com',
    phone: '+91 66554 43210',
    specialty: 'Cardio & Dance',
    experience: '3 years',
    certifications: ['AFAA Certified', 'Zumba Instructor'],
    assignedMembers: 35,
    status: 'On Leave',
    rating: 4.6,
    availability: 'Mon-Fri: 9AM-5PM',
    joinDate: '2023-01-25',
    avatar: 'PS'
  }
];

const Trainers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openTrainerModal = (trainer: any) => {
    setSelectedTrainer(trainer);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">

        <button className="bg-[#7BC843] hover:bg-[#6AB732] text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add New Trainer</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search trainers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
            />
          </div>
          <div className="flex space-x-3">
            <select className="px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent">
              <option>All Specialties</option>
              <option>Strength Training</option>
              <option>Yoga & Pilates</option>
              <option>CrossFit & HIIT</option>
              <option>Cardio & Dance</option>
            </select>
            <select className="px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent">
              <option>All Status</option>
              <option>Active</option>
              <option>On Leave</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainers.map((trainer) => (
          <div key={trainer.id} className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6 hover:bg-[#353c44] transition-colors duration-200">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-[#7BC843] rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xl">{trainer.avatar}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{trainer.name}</h3>
                <p className="text-gray-400 text-sm">{trainer.specialty}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-400 ml-1">{trainer.rating}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(trainer.status)}`}>
                {trainer.status}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Experience:</span>
                <span className="text-white font-medium text-sm">{trainer.experience}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Assigned Members:</span>
                <span className="text-white font-medium text-sm">{trainer.assignedMembers}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Availability:</span>
                <span className="text-white font-medium text-sm">{trainer.availability}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => openTrainerModal(trainer)}
                  className="p-2 text-gray-400 hover:text-[#7BC843] hover:bg-[#23292F] rounded-lg transition-colors duration-200"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-[#7BC843] hover:bg-[#23292F] rounded-lg transition-colors duration-200" title="Edit">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-[#23292F] rounded-lg transition-colors duration-200" title="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <button className="text-[#7BC843] hover:text-[#6AB732] font-medium text-sm">
                View Schedule
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trainer Detail Modal */}
      {showModal && selectedTrainer && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-[#7BC843] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-2xl">{selectedTrainer.avatar}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedTrainer.name}</h2>
                    <p className="text-gray-400">{selectedTrainer.specialty}</p>
                    <div className="flex items-center mt-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="text-gray-400 ml-1">{selectedTrainer.rating} rating</span>
                      <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTrainer.status)}`}>
                        {selectedTrainer.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-300 text-2xl"
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
                      <span className="text-gray-200">{selectedTrainer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-white">{selectedTrainer.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-white">Joined: {selectedTrainer.joinDate}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-200">Experience: {selectedTrainer.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-[#7BC843]" />
                    Professional Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-gray-400 text-sm">Specialty:</span>
                      <p className="text-white font-medium">{selectedTrainer.specialty}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Certifications:</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedTrainer.certifications.map((cert: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-[#23292F] text-[#7BC843] border border-[#7BC843] rounded-full text-sm">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Assigned Members:</span>
                      <span className="text-white font-medium">{selectedTrainer.assignedMembers}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Availability:</span>
                      <p className="text-white font-medium">{selectedTrainer.availability}</p>
                    </div>
                  </div>
                </div>

                {/* Weekly Schedule */}
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold text-white mb-4">Weekly Schedule</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                      <div key={day} className="text-center">
                        <div className="font-medium text-white mb-2">{day}</div>
                        <div className="space-y-1">
                          {index < 5 ? (
                            <>
                              <div className="bg-[#7BC843] text-black text-xs p-1 rounded">6-8 AM</div>
                              <div className="bg-[#1E5AB3] text-white text-xs p-1 rounded">10-12 PM</div>
                              <div className="bg-[#663399] text-white text-xs p-1 rounded">2-4 PM</div>
                            </>
                          ) : index === 5 ? (
                            <>
                              <div className="bg-[#7BC843] text-black text-xs p-1 rounded">7-9 AM</div>
                              <div className="bg-[#1E5AB3] text-white text-xs p-1 rounded">11-1 PM</div>
                            </>
                          ) : (
                            <div className="bg-[#23292F] text-gray-400 text-xs p-1 rounded">Off</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                  Edit Trainer
                </button>
                <button className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium">
                  Assign Members
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trainers;