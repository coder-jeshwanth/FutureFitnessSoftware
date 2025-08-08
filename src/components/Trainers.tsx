import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, User, Phone, Mail, Calendar, Star, Clock, Award, MapPin } from 'lucide-react';
const branches = [
  'Stonehousepet',
  'Harinathpuram',
  'Vanamthopu Center',
  'Current Office Center',
  'Vedayapalem',
  'BV Nagar',
  'Dhanalakshmi Puram'
];

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
    avatar: 'VK',
    branch: 'Stonehousepet'
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
    avatar: 'SR',
    branch: 'Harinathpuram'
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
    avatar: 'RS',
    branch: 'Vanamthopu Center'
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
    avatar: 'PS',
    branch: 'Current Office Center'
  }
];

const Trainers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTrainer, setEditTrainer] = useState<any>(null);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Receptionist',
    experience: '',
    dob: '',
    gender: 'Male',
    availability: '',
    status: 'Active',
    branch: 'Stonehousepet',
    joinDate: new Date().toISOString().split('T')[0]
  });

  const handleStaffInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewStaff({
      ...newStaff,
      [name]: value
    });
  };

  const handleAddStaff = () => {
    // Logic to add new staff would go here
    console.log('New staff data:', newStaff);
    setShowAddStaffModal(false);
    // Reset form
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      role: 'Receptionist',
      experience: '',
      dob: '',
      gender: 'Male',
      availability: '',
      status: 'Active',
      branch: 'Stonehousepet',
      joinDate: new Date().toISOString().split('T')[0]
    });
  };

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
  
  const openEditModal = (trainer: any) => {
    setEditTrainer({...trainer});
    setShowEditModal(true);
  };
  
  const handleEditTrainer = () => {
    // Logic to update trainer would go here in a real app
    console.log('Updated trainer data:', editTrainer);
    setShowEditModal(false);
    setEditTrainer(null);
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTrainer, setNewTrainer] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: 'Strength Training',
    experience: '',
    dob: '',
    gender: 'Male',
    certifications: [],
    availability: '',
    status: 'Active',
    branch: 'Stonehousepet'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTrainer({
      ...newTrainer,
      [name]: value
    });
  };

  const handleAddTrainer = () => {
    // Logic to add new trainer would go here
    console.log('New trainer data:', newTrainer);
    setShowAddModal(false);
    // Reset form
    setNewTrainer({
      name: '',
      email: '',
      phone: '',
      specialty: 'Strength Training',
      experience: '',
      dob: '',
      gender: 'Male',
      certifications: [],
      availability: '',
      status: 'Active',
      branch: 'Stonehousepet'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-white">Trainers & Staff</h2>
        <div className="flex space-x-4">
          <button 
            onClick={() => setShowAddStaffModal(true)}
            className="bg-[#2A3037] hover:bg-[#3A4049] border border-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Staff</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#7BC843] hover:bg-[#6AB732] text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Trainer</span>
          </button>
        </div>
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
                <span className="text-gray-400 text-sm">Branch:</span>
                <span className="text-white font-medium text-sm">{trainer.branch}</span>
              </div>
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
                <button 
                  onClick={() => openEditModal(trainer)}
                  className="p-2 text-gray-400 hover:text-[#7BC843] hover:bg-[#23292F] rounded-lg transition-colors duration-200" 
                  title="Edit"
                >
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

      {/* Add New Trainer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Add New Trainer</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-[#7BC843]" />
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={newTrainer.name}
                        onChange={handleInputChange}
                        placeholder="Enter full name"
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={newTrainer.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={newTrainer.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        name="dob"
                        value={newTrainer.dob}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Gender *</label>
                      <select
                        name="gender"
                        value={newTrainer.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Branch *</label>
                      <select
                        name="branch"
                        value={newTrainer.branch}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      >
                        {branches.map((branch) => (
                          <option key={branch} value={branch}>{branch}</option>
                        ))}
                      </select>
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
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Specialty *</label>
                      <select
                        name="specialty"
                        value={newTrainer.specialty}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      >
                        <option value="Strength Training">Strength Training</option>
                        <option value="Yoga & Pilates">Yoga & Pilates</option>
                        <option value="CrossFit & HIIT">CrossFit & HIIT</option>
                        <option value="Cardio & Dance">Cardio & Dance</option>
                        <option value="Nutrition">Nutrition</option>
                      </select>
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Experience *</label>
                      <input
                        type="text"
                        name="experience"
                        value={newTrainer.experience}
                        onChange={handleInputChange}
                        placeholder="E.g. 3 years"
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Certifications</label>
                      <input
                        type="text"
                        placeholder="Enter certifications (comma separated)"
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Availability *</label>
                      <input
                        type="text"
                        name="availability"
                        value={newTrainer.availability}
                        onChange={handleInputChange}
                        placeholder="E.g. Mon-Fri: 6AM-2PM"
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Status</label>
                      <select
                        name="status"
                        value={newTrainer.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                      >
                        <option value="Active">Active</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Inactive">Inactive</option>
                      </select>
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
                  onClick={handleAddTrainer}
                  className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium"
                >
                  Add Trainer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-white">Branch: {selectedTrainer.branch}</span>
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
      
      {/* Edit Trainer Modal */}
      {showEditModal && editTrainer && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Edit Trainer</h2>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-[#7BC843]" />
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={editTrainer.name}
                        onChange={(e) => setEditTrainer({...editTrainer, name: e.target.value})}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={editTrainer.email}
                        onChange={(e) => setEditTrainer({...editTrainer, email: e.target.value})}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={editTrainer.phone}
                        onChange={(e) => setEditTrainer({...editTrainer, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={editTrainer.dob || ''}
                        onChange={(e) => setEditTrainer({...editTrainer, dob: e.target.value})}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Gender</label>
                      <select
                        value={editTrainer.gender || 'Male'}
                        onChange={(e) => setEditTrainer({...editTrainer, gender: e.target.value})}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Branch *</label>
                      <select
                        value={editTrainer.branch}
                        onChange={(e) => setEditTrainer({...editTrainer, branch: e.target.value})}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      >
                        {branches.map((branch) => (
                          <option key={branch} value={branch}>{branch}</option>
                        ))}
                      </select>
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
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Specialty *</label>
                      <select
                        value={editTrainer.specialty}
                        onChange={(e) => setEditTrainer({...editTrainer, specialty: e.target.value})}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      >
                        <option value="Strength Training">Strength Training</option>
                        <option value="Yoga & Pilates">Yoga & Pilates</option>
                        <option value="CrossFit & HIIT">CrossFit & HIIT</option>
                        <option value="Cardio & Dance">Cardio & Dance</option>
                        <option value="Nutrition">Nutrition</option>
                      </select>
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Experience *</label>
                      <input
                        type="text"
                        value={editTrainer.experience}
                        onChange={(e) => setEditTrainer({...editTrainer, experience: e.target.value})}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Certifications</label>
                      <input
                        type="text"
                        value={editTrainer.certifications ? editTrainer.certifications.join(', ') : ''}
                        onChange={(e) => setEditTrainer({...editTrainer, certifications: e.target.value.split(', ')})}
                        placeholder="Enter certifications (comma separated)"
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Availability *</label>
                      <input
                        type="text"
                        value={editTrainer.availability}
                        onChange={(e) => setEditTrainer({...editTrainer, availability: e.target.value})}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Status</label>
                      <select
                        value={editTrainer.status}
                        onChange={(e) => setEditTrainer({...editTrainer, status: e.target.value})}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                      >
                        <option value="Active">Active</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleEditTrainer}
                  className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {showAddStaffModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Add New Staff</h2>
                <button 
                  onClick={() => setShowAddStaffModal(false)}
                  className="text-gray-400 hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-[#7BC843]" />
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={newStaff.name}
                        onChange={handleStaffInputChange}
                        placeholder="Enter full name"
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={newStaff.email}
                        onChange={handleStaffInputChange}
                        placeholder="Enter email address"
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={newStaff.phone}
                        onChange={handleStaffInputChange}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        name="dob"
                        value={newStaff.dob}
                        onChange={handleStaffInputChange}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Gender *</label>
                      <select
                        name="gender"
                        value={newStaff.gender}
                        onChange={handleStaffInputChange}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Branch *</label>
                      <select
                        name="branch"
                        value={newStaff.branch}
                        onChange={handleStaffInputChange}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      >
                        {branches.map((branch) => (
                          <option key={branch} value={branch}>{branch}</option>
                        ))}
                      </select>
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
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Role *</label>
                      <select
                        name="role"
                        value={newStaff.role}
                        onChange={handleStaffInputChange}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      >
                        <option value="Receptionist">Receptionist</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                      </select>
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Experience *</label>
                      <input
                        type="text"
                        name="experience"
                        value={newStaff.experience}
                        onChange={handleStaffInputChange}
                        placeholder="E.g. 3 years"
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Availability *</label>
                      <input
                        type="text"
                        name="availability"
                        value={newStaff.availability}
                        onChange={handleStaffInputChange}
                        placeholder="E.g. Mon-Fri: 9AM-5PM"
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Status</label>
                      <select
                        name="status"
                        value={newStaff.status}
                        onChange={handleStaffInputChange}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                      >
                        <option value="Active">Active</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  onClick={() => setShowAddStaffModal(false)}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddStaff}
                  className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium"
                >
                  Add Staff
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