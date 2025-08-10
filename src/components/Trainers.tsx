import React, { useState } from 'react';
import { Search, Plus, Edit, Eye, User, Phone, Mail, Calendar, Star, Clock, Award, MapPin, UserCheck, Settings, Filter, ToggleLeft, ToggleRight } from 'lucide-react';
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

const staff = [
  {
    id: 1,
    name: 'Anjali Sharma',
    email: 'anjali.sharma@fitpro.com',
    phone: '+91 98765 43210',
    role: 'Manager',
    availability: 'Mon-Sat: 9AM-6PM',
    status: 'Active',
    joinDate: '2022-01-10',
    avatar: 'AS',
    branch: 'Stonehousepet'
  },
  {
    id: 2,
    name: 'Rohit Gupta',
    email: 'rohit.gupta@fitpro.com',
    phone: '+91 87654 32109',
    role: 'Receptionist',
    availability: 'Mon-Fri: 8AM-4PM',
    status: 'Active',
    joinDate: '2022-05-15',
    avatar: 'RG',
    branch: 'Harinathpuram'
  },
  {
    id: 3,
    name: 'Priyanka Reddy',
    email: 'priyanka.reddy@fitpro.com',
    phone: '+91 76543 21098',
    role: 'Admin',
    availability: 'Tue-Sun: 10AM-7PM',
    status: 'Active',
    joinDate: '2021-09-20',
    avatar: 'PR',
    branch: 'Vanamthopu Center'
  },
  {
    id: 4,
    name: 'Kiran Kumar',
    email: 'kiran.kumar@fitpro.com',
    phone: '+91 65432 10987',
    role: 'Receptionist',
    availability: 'Mon-Fri: 12PM-9PM',
    status: 'On Leave',
    joinDate: '2023-02-14',
    avatar: 'KK',
    branch: 'Current Office Center'
  },
  {
    id: 5,
    name: 'Swathi Nair',
    email: 'swathi.nair@fitpro.com',
    phone: '+91 54321 09876',
    role: 'Manager',
    availability: 'Mon-Sat: 8AM-5PM',
    status: 'Active',
    joinDate: '2022-11-08',
    avatar: 'SN',
    branch: 'Vedayapalem'
  },
  {
    id: 6,
    name: 'Arun Patel',
    email: 'arun.patel@fitpro.com',
    phone: '+91 43210 98765',
    role: 'Admin',
    availability: 'Wed-Mon: 11AM-8PM',
    status: 'Active',
    joinDate: '2023-04-12',
    avatar: 'AP',
    branch: 'BV Nagar'
  },
  {
    id: 7,
    name: 'Lakshmi Prasad',
    email: 'lakshmi.prasad@fitpro.com',
    phone: '+91 32109 87654',
    role: 'Receptionist',
    availability: 'Mon-Fri: 6AM-2PM',
    status: 'Inactive',
    joinDate: '2022-07-25',
    avatar: 'LP',
    branch: 'Dhanalakshmi Puram'
  }
];

interface TrainersProps {
  selectedBranch?: string;
}

const Trainers: React.FC<TrainersProps> = ({ selectedBranch: navbarSelectedBranch = 'All Branches' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTrainer, setEditTrainer] = useState<any>(null);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showEditStaffModal, setShowEditStaffModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [editStaff, setEditStaff] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'trainers' | 'staff'>('trainers');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedExperienceRange, setSelectedExperienceRange] = useState('All Experience');
  const [selectedAvailabilityDays, setSelectedAvailabilityDays] = useState('All Days');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Receptionist',
    dob: '',
    gender: 'Male',
    availability: {
      monday: { selected: false, startTime: '09:00', endTime: '17:00' },
      tuesday: { selected: false, startTime: '09:00', endTime: '17:00' },
      wednesday: { selected: false, startTime: '09:00', endTime: '17:00' },
      thursday: { selected: false, startTime: '09:00', endTime: '17:00' },
      friday: { selected: false, startTime: '09:00', endTime: '17:00' },
      saturday: { selected: false, startTime: '09:00', endTime: '17:00' },
      sunday: { selected: false, startTime: '09:00', endTime: '17:00' }
    },
    status: 'Active',
    branch: 'Stonehousepet',
    joinDate: new Date().toISOString().split('T')[0]
  });
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
    availability: {
      monday: { selected: false, startTime: '09:00', endTime: '17:00' },
      tuesday: { selected: false, startTime: '09:00', endTime: '17:00' },
      wednesday: { selected: false, startTime: '09:00', endTime: '17:00' },
      thursday: { selected: false, startTime: '09:00', endTime: '17:00' },
      friday: { selected: false, startTime: '09:00', endTime: '17:00' },
      saturday: { selected: false, startTime: '09:00', endTime: '17:00' },
      sunday: { selected: false, startTime: '09:00', endTime: '17:00' }
    },
    status: 'Active',
    branch: 'Stonehousepet'
  });

  const handleStaffInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewStaff({
      ...newStaff,
      [name]: value
    });
  };
  
  type AvailabilityDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  type AvailabilityField = 'selected' | 'startTime' | 'endTime';
  type AvailabilityObject = {
    [key in AvailabilityDay]: {
      selected: boolean;
      startTime: string;
      endTime: string;
    }
  };
  
  // Convert string availability to object format
  const parseAvailability = (availabilityString: string): AvailabilityObject => {
    const defaultAvailability: AvailabilityObject = {
      monday: { selected: false, startTime: '09:00', endTime: '17:00' },
      tuesday: { selected: false, startTime: '09:00', endTime: '17:00' },
      wednesday: { selected: false, startTime: '09:00', endTime: '17:00' },
      thursday: { selected: false, startTime: '09:00', endTime: '17:00' },
      friday: { selected: false, startTime: '09:00', endTime: '17:00' },
      saturday: { selected: false, startTime: '09:00', endTime: '17:00' },
      sunday: { selected: false, startTime: '09:00', endTime: '17:00' }
    };
    
    if (!availabilityString) return defaultAvailability;
    
    const dayMap: Record<string, AvailabilityDay> = {
      'Mon': 'monday',
      'Tue': 'tuesday',
      'Wed': 'wednesday',
      'Thu': 'thursday',
      'Fri': 'friday',
      'Sat': 'saturday',
      'Sun': 'sunday'
    };
    
    // Process entries like "Mon-Fri: 9AM-5PM", "Sat-Sun: 10AM-4PM"
    const entries = availabilityString.split(', ');
    entries.forEach(entry => {
      const [daysPart, timePart] = entry.split(': ');
      if (!daysPart || !timePart) return;
      
      let days: AvailabilityDay[] = [];
      
      // Handle ranges like "Mon-Fri" or single days
      if (daysPart.includes('-')) {
        const [startDay, endDay] = daysPart.split('-');
        const startIndex = Object.keys(dayMap).indexOf(startDay);
        const endIndex = Object.keys(dayMap).indexOf(endDay);
        
        if (startIndex >= 0 && endIndex >= 0) {
          const dayKeys = Object.keys(dayMap);
          for (let i = startIndex; i <= endIndex; i++) {
            const day = dayMap[dayKeys[i]];
            if (day) days.push(day);
          }
        }
      } else {
        const day = dayMap[daysPart];
        if (day) days.push(day);
      }
      
      // Parse time range like "9AM-5PM"
      let startTime = '09:00';
      let endTime = '17:00';
      
      if (timePart.includes('-')) {
        const [startPart, endPart] = timePart.split('-');
        
        // Convert 12h to 24h format
        const convertTime = (timeStr: string): string => {
          let hour = parseInt(timeStr.replace(/[^0-9]/g, ''));
          const isPM = timeStr.toUpperCase().includes('PM');
          
          if (isPM && hour !== 12) hour += 12;
          if (!isPM && hour === 12) hour = 0;
          
          return `${hour.toString().padStart(2, '0')}:00`;
        };
        
        startTime = convertTime(startPart);
        endTime = convertTime(endPart);
      }
      
      // Update days in result
      days.forEach(day => {
        defaultAvailability[day] = {
          selected: true,
          startTime,
          endTime
        };
      });
    });
    
    return defaultAvailability;
  };
  
  // Format object availability to string
  const formatAvailability = (availabilityObj: AvailabilityObject): string => {
    return Object.entries(availabilityObj)
      .filter(([_, value]) => value.selected)
      .map(([day, value]) => {
        const dayName = day.charAt(0).toUpperCase() + day.slice(1, 3);
        return `${dayName}: ${value.startTime}-${value.endTime}`;
      })
      .join(', ');
  };
  
  const handleAvailabilityChange = (day: string, field: AvailabilityField, value: boolean | string) => {
    setNewStaff({
      ...newStaff,
      availability: {
        ...newStaff.availability,
        [day]: {
          ...newStaff.availability[day as keyof typeof newStaff.availability],
          [field]: value
        }
      }
    });
  };

  const handleAddStaff = () => {
    // Format availability string from the selected days and times
    const formattedAvailability = Object.entries(newStaff.availability)
      .filter(([_, value]) => value.selected)
      .map(([day, value]) => {
        const dayName = day.charAt(0).toUpperCase() + day.slice(1, 3);
        return `${dayName}: ${value.startTime}-${value.endTime}`;
      })
      .join(', ');
    
    // Create a copy with formatted availability for sending to backend
    const staffData = {
      ...newStaff,
      availability: formattedAvailability
    };
    
    // Logic to add new staff would go here
    console.log('New staff data:', staffData);
    setShowAddStaffModal(false);
    
    // Reset form
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      role: 'Receptionist',
      dob: '',
      gender: 'Male',
      availability: {
        monday: { selected: false, startTime: '09:00', endTime: '17:00' },
        tuesday: { selected: false, startTime: '09:00', endTime: '17:00' },
        wednesday: { selected: false, startTime: '09:00', endTime: '17:00' },
        thursday: { selected: false, startTime: '09:00', endTime: '17:00' },
        friday: { selected: false, startTime: '09:00', endTime: '17:00' },
        saturday: { selected: false, startTime: '09:00', endTime: '17:00' },
        sunday: { selected: false, startTime: '09:00', endTime: '17:00' }
      },
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

  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || trainer.specialty === selectedSpecialty;
    const matchesStatus = selectedStatus === 'All Status' || trainer.status === selectedStatus;
    // Use navbar branch selection if available, otherwise use local selectedBranch
    const effectiveBranch = navbarSelectedBranch !== 'All Branches' ? navbarSelectedBranch : selectedBranch;
    const matchesBranch = effectiveBranch === 'All Branches' || trainer.branch === effectiveBranch;
    
    // Experience range filter
    const matchesExperience = selectedExperienceRange === 'All Experience' || (() => {
      const years = parseInt(trainer.experience);
      if (selectedExperienceRange === '0-2 years') {
        return years >= 0 && years <= 2;
      } else if (selectedExperienceRange === '3-5 years') {
        return years >= 3 && years <= 5;
      } else if (selectedExperienceRange === '6+ years') {
        return years >= 6;
      }
      return true;
    })();
    
    // Availability days filter
    const matchesAvailability = selectedAvailabilityDays === 'All Days' || (() => {
      if (selectedAvailabilityDays === 'Mon-Fri' && trainer.availability.toLowerCase().includes('mon') && trainer.availability.toLowerCase().includes('fri')) {
        return true;
      } else if (selectedAvailabilityDays === 'Sat-Sun' && (trainer.availability.toLowerCase().includes('sat') || trainer.availability.toLowerCase().includes('sun'))) {
        return true;
      } else if (selectedAvailabilityDays === 'Weekends Only' && trainer.availability.toLowerCase().includes('sat') && trainer.availability.toLowerCase().includes('sun') && 
        !trainer.availability.toLowerCase().includes('mon') && !trainer.availability.toLowerCase().includes('tue') && 
        !trainer.availability.toLowerCase().includes('wed') && !trainer.availability.toLowerCase().includes('thu') && 
        !trainer.availability.toLowerCase().includes('fri')) {
        return true;
      }
      return false;
    })();
    
    return matchesSearch && matchesSpecialty && matchesStatus && matchesBranch && matchesExperience && matchesAvailability;
  });
  
  const filteredStaff = staff.filter(staffMember => {
    const matchesSearch = staffMember.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staffMember.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staffMember.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'All Roles' || staffMember.role === selectedRole;
    const matchesStatus = selectedStatus === 'All Status' || staffMember.status === selectedStatus;
    // Use navbar branch selection if available, otherwise use local selectedBranch
    const effectiveBranch = navbarSelectedBranch !== 'All Branches' ? navbarSelectedBranch : selectedBranch;
    const matchesBranch = effectiveBranch === 'All Branches' || staffMember.branch === effectiveBranch;
    
    // Availability days filter - also apply to staff
    const matchesAvailability = selectedAvailabilityDays === 'All Days' || (() => {
      if (selectedAvailabilityDays === 'Mon-Fri' && staffMember.availability.toLowerCase().includes('mon') && staffMember.availability.toLowerCase().includes('fri')) {
        return true;
      } else if (selectedAvailabilityDays === 'Sat-Sun' && (staffMember.availability.toLowerCase().includes('sat') || staffMember.availability.toLowerCase().includes('sun'))) {
        return true;
      } else if (selectedAvailabilityDays === 'Weekends Only' && staffMember.availability.toLowerCase().includes('sat') && staffMember.availability.toLowerCase().includes('sun') && 
        !staffMember.availability.toLowerCase().includes('mon') && !staffMember.availability.toLowerCase().includes('tue') && 
        !staffMember.availability.toLowerCase().includes('wed') && !staffMember.availability.toLowerCase().includes('thu') && 
        !staffMember.availability.toLowerCase().includes('fri')) {
        return true;
      }
      return false;
    })();
    
    return matchesSearch && matchesRole && matchesStatus && matchesBranch && matchesAvailability;
  });

  const openTrainerModal = (trainer: any) => {
    setSelectedTrainer(trainer);
    setShowModal(true);
  };
  
  const openEditModal = (trainer: any) => {
    // Parse the availability string into our object format for the UI
    const availabilityObj = parseAvailability(trainer.availability);
    setEditTrainer({...trainer, availabilityObj});
    setShowEditModal(true);
  };
  
  const openStaffModal = (staff: any) => {
    setSelectedStaff(staff);
    setShowStaffModal(true);
  };
  
  const openEditStaffModal = (staff: any) => {
    // Parse the availability string into our object format for the UI
    const availabilityObj = parseAvailability(staff.availability);
    setEditStaff({...staff, availabilityObj});
    setShowEditStaffModal(true);
  };
  
  const handleEditTrainer = () => {
    // Format availability for the backend
    const formattedTrainer = {
      ...editTrainer,
      availability: editTrainer.availability,
      // Remove the UI-only availabilityObj field
      availabilityObj: undefined
    };
    
    // Logic to update trainer would go here in a real app
    console.log('Updated trainer data:', formattedTrainer);
    setShowEditModal(false);
    setEditTrainer(null);
  };

  const handleEditStaff = () => {
    // Format availability for the backend
    const formattedStaff = {
      ...editStaff,
      availability: editStaff.availability,
      // Remove the UI-only availabilityObj field
      availabilityObj: undefined
    };
    
    // Logic to update staff would go here in a real app
    console.log('Updated staff data:', formattedStaff);
    setShowEditStaffModal(false);
    setEditStaff(null);
  };
  
  // Function to update status via toggle button
  const handleStatusChange = (id: number, currentStatus: string, itemType: 'trainer' | 'staff') => {
    // Rotate through statuses: Active -> On Leave -> Inactive -> Active
    let newStatus = 'Active';
    
    if (currentStatus === 'Active') {
      newStatus = 'On Leave';
    } else if (currentStatus === 'On Leave') {
      newStatus = 'Inactive';
    }
    
    // In a real app, you would call an API to update the status
    console.log(`Updating ${itemType} ID: ${id} status from ${currentStatus} to ${newStatus}`);
    
    // For demo purposes, update the local state
    if (itemType === 'trainer') {
      // Find and update trainer status
      // Note: In a production app, this would be handled by a proper state update
      const trainerIndex = trainers.findIndex(t => t.id === id);
      if (trainerIndex !== -1) {
        trainers[trainerIndex].status = newStatus;
        // Force re-render
        setSearchTerm(searchTerm);
      }
    } else {
      // Find and update staff status
      const staffIndex = staff.findIndex(s => s.id === id);
      if (staffIndex !== -1) {
        staff[staffIndex].status = newStatus;
        // Force re-render
        setSearchTerm(searchTerm);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTrainer({
      ...newTrainer,
      [name]: value
    });
  };
  
  const handleTrainerAvailabilityChange = (day: string, field: 'selected' | 'startTime' | 'endTime', value: boolean | string) => {
    setNewTrainer({
      ...newTrainer,
      availability: {
        ...newTrainer.availability,
        [day]: {
          ...newTrainer.availability[day as keyof typeof newTrainer.availability],
          [field]: value
        }
      }
    });
  };

  const handleAddTrainer = () => {
    // Format availability string from the selected days and times
    const formattedAvailability = Object.entries(newTrainer.availability)
      .filter(([_, value]) => value.selected)
      .map(([day, value]) => {
        const dayName = day.charAt(0).toUpperCase() + day.slice(1, 3);
        return `${dayName}: ${value.startTime}-${value.endTime}`;
      })
      .join(', ');
    
    // Create a copy with formatted availability for sending to backend
    const trainerData = {
      ...newTrainer,
      availability: formattedAvailability
    };
    
    // Logic to add new trainer would go here
    console.log('New trainer data:', trainerData);
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
      availability: {
        monday: { selected: false, startTime: '09:00', endTime: '17:00' },
        tuesday: { selected: false, startTime: '09:00', endTime: '17:00' },
        wednesday: { selected: false, startTime: '09:00', endTime: '17:00' },
        thursday: { selected: false, startTime: '09:00', endTime: '17:00' },
        friday: { selected: false, startTime: '09:00', endTime: '17:00' },
        saturday: { selected: false, startTime: '09:00', endTime: '17:00' },
        sunday: { selected: false, startTime: '09:00', endTime: '17:00' }
      },
      status: 'Active',
      branch: 'Stonehousepet'
    });
  };

  // Calculate totals for cards
  const totalTrainers = trainers.length;
  const totalAdmins = staff.filter(s => s.role === 'Admin').length;
  const totalManagers = staff.filter(s => s.role === 'Manager').length;
  const totalReceptionists = staff.filter(s => s.role === 'Receptionist').length;

  return (
    <div className="space-y-6">
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <button 
          onClick={() => {
            setActiveTab('trainers');
            setSelectedRole('All Roles');
          }}
          className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6 transition-all hover:shadow-lg hover:border-[#7BC843] w-full text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Trainers</p>
              <p className="text-3xl font-bold text-white mt-2">{totalTrainers}</p>
            </div>
            <div className="w-12 h-12 bg-[#7BC843] bg-opacity-20 rounded-lg flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-[#7BC843]" />
            </div>
          </div>
        </button>
        
        <button 
          onClick={() => {
            setActiveTab('staff');
            setSelectedRole('Admin');
          }}
          className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6 transition-all hover:shadow-lg hover:border-blue-500 w-full text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Admins</p>
              <p className="text-3xl font-bold text-white mt-2">{totalAdmins}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
              <Settings className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </button>
        
        <button 
          onClick={() => {
            setActiveTab('staff');
            setSelectedRole('Manager');
          }}
          className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6 transition-all hover:shadow-lg hover:border-purple-500 w-full text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Managers</p>
              <p className="text-3xl font-bold text-white mt-2">{totalManagers}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </button>
        
        <button 
          onClick={() => {
            setActiveTab('staff');
            setSelectedRole('Receptionist');
          }}
          className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6 transition-all hover:shadow-lg hover:border-orange-500 w-full text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Receptionists</p>
              <p className="text-3xl font-bold text-white mt-2">{totalReceptionists}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 bg-opacity-20 rounded-lg flex items-center justify-center">
              <User className="h-6 w-6 text-orange-500" />
            </div>
          </div>
        </button>
      </div>
      
      {/* Tabs and Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <div className="flex border-b border-gray-700 mb-4 sm:mb-0">
          <button
            onClick={() => {
              setActiveTab('trainers');
              setSelectedSpecialty('All Specialties');
              setSelectedRole('All Roles');
              setSelectedStatus('All Status');
              setSelectedBranch('All Branches');
            }}
            className={`px-6 py-3 font-medium ${
              activeTab === 'trainers'
                ? 'border-b-2 border-[#7BC843] text-[#7BC843]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Trainers
          </button>
          <button
            onClick={() => {
              setActiveTab('staff');
              setSelectedSpecialty('All Specialties');
              setSelectedRole('All Roles');
              setSelectedStatus('All Status');
              setSelectedBranch('All Branches');
            }}
            className={`px-6 py-3 font-medium ${
              activeTab === 'staff'
                ? 'border-b-2 border-[#7BC843] text-[#7BC843]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Staff Members
          </button>
        </div>
        
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
      <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6 mb-6">
        {/* Branch Filter Indicator */}
        {navbarSelectedBranch !== 'All Branches' && (
          <div className="mb-4 p-3 bg-[#7BC843] bg-opacity-10 border border-[#7BC843] rounded-lg">
            <p className="text-[#7BC843] text-sm font-medium">
              🏢 Filtering by branch: <span className="font-bold">{navbarSelectedBranch}</span> 
              <span className="text-gray-300 ml-2">(Use navbar dropdown to change branch)</span>
            </p>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={activeTab === 'trainers' ? "Search trainers..." : "Search staff..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
            />
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowFilterModal(true)}
              className={`px-5 py-3 bg-gradient-to-r from-[#23292F] to-[#2a3138] text-white border border-gray-700 rounded-lg hover:from-[#2a3138] hover:to-[#343C44] focus:ring-2 focus:ring-[#7BC843] flex items-center space-x-2 transition-all duration-200 shadow-md ${
                (selectedSpecialty !== 'All Specialties' || 
                 selectedRole !== 'All Roles' || 
                 selectedStatus !== 'All Status' || 
                 selectedBranch !== 'All Branches' ||
                 selectedExperienceRange !== 'All Experience' || 
                 selectedAvailabilityDays !== 'All Days') ? 'border-[#7BC843]' : ''
              }`}
            >
              <Filter className="h-5 w-5 text-[#7BC843]" />
              <span>Filters</span>
              {(selectedSpecialty !== 'All Specialties' || 
                selectedRole !== 'All Roles' || 
                selectedStatus !== 'All Status' || 
                selectedBranch !== 'All Branches' ||
                selectedExperienceRange !== 'All Experience' || 
                selectedAvailabilityDays !== 'All Days') && (
                <span className="flex h-6 w-6 items-center justify-center bg-gradient-to-r from-[#7BC843] to-[#5EA932] text-white text-xs font-bold rounded-full shadow-lg ml-1">
                  {[
                    selectedSpecialty !== 'All Specialties', 
                    selectedRole !== 'All Roles', 
                    selectedStatus !== 'All Status',
                    selectedBranch !== 'All Branches',
                    selectedExperienceRange !== 'All Experience',
                    selectedAvailabilityDays !== 'All Days'
                  ].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#2A3037] to-[#23292F] rounded-xl shadow-xl border border-gray-700 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-700 p-6">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-[#7BC843] mr-2" />
                <h3 className="text-xl font-bold text-white">Filter Options</h3>
              </div>
              <button 
                onClick={() => setShowFilterModal(false)}
                className="text-gray-400 hover:text-white rounded-full hover:bg-gray-700 p-1 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Status Filter */}
                <div>
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <span className="w-3 h-3 rounded-full mr-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400"></span>
                    Status
                  </h4>
                  <div className="relative">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-[#7BC843] appearance-none"
                    >
                      <option value="All Status">All Status</option>
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Branch Filter (if not selected in navbar) */}
                {navbarSelectedBranch === 'All Branches' && (
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <span className="w-3 h-3 rounded-full mr-2 bg-[#7BC843]"></span>
                      Branch
                    </h4>
                    <div className="relative">
                      <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-[#7BC843] appearance-none"
                      >
                        <option value="All Branches">All Branches</option>
                        {branches.map((branch) => (
                          <option key={branch} value={branch}>{branch}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Role Filter (for Staff tab) */}
                {activeTab === 'staff' && (
                  <div>
                    <h4 className="text-white font-medium mb-3">Role</h4>
                    <div className="space-y-2">
                      {['All Roles', 'Admin', 'Manager', 'Receptionist'].map((role) => (
                        <label key={role} className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedRole === role}
                            onChange={() => setSelectedRole(role)}
                            className="rounded text-[#7BC843] h-4 w-4 focus:ring-[#7BC843] focus:ring-offset-gray-800"
                          />
                          <span>{role}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Specialty Filter (for Trainers tab) */}
                {activeTab === 'trainers' && (
                  <div className="mt-5">
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <span className="w-3 h-3 rounded-full mr-2 bg-[#7BC843]"></span>
                      Specialty
                    </h4>
                    <div className="relative">
                      <select
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-[#7BC843] appearance-none"
                      >
                        {['All Specialties', 'Strength Training', 'Yoga & Pilates', 'CrossFit & HIIT', 'Cardio & Dance'].map((specialty) => (
                          <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Experience Range Filter (for Trainers tab) */}
                {activeTab === 'trainers' && (
                  <div className="mt-5">
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <span className="w-3 h-3 rounded-full mr-2 bg-[#7BC843]"></span>
                      Experience Range
                    </h4>
                    <div className="relative">
                      <select
                        value={selectedExperienceRange}
                        onChange={(e) => setSelectedExperienceRange(e.target.value)}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-[#7BC843] appearance-none"
                      >
                        {['All Experience', '0-2 years', '3-5 years', '6+ years'].map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Availability Days Filter */}
                <div className="mt-5">
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <span className="w-3 h-3 rounded-full mr-2 bg-[#7BC843]"></span>
                    Availability Days
                  </h4>
                  <div className="relative">
                    <select
                      value={selectedAvailabilityDays}
                      onChange={(e) => setSelectedAvailabilityDays(e.target.value)}
                      className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-[#7BC843] appearance-none"
                    >
                      {['All Days', 'Mon-Fri', 'Sat-Sun', 'Weekends Only'].map((days) => (
                        <option key={days} value={days}>{days}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-4 border-t border-gray-700 pt-6">
                <button
                  onClick={() => {
                    setSelectedSpecialty('All Specialties');
                    setSelectedRole('All Roles');
                    setSelectedStatus('All Status');
                    setSelectedBranch('All Branches');
                    setSelectedExperienceRange('All Experience');
                    setSelectedAvailabilityDays('All Days');
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-md flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset All
                </button>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="px-8 py-2.5 bg-gradient-to-r from-[#7BC843] to-[#5EA932] text-white font-medium rounded-lg hover:from-[#8BD952] hover:to-[#6BB536] transition-all duration-200 shadow-md flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trainers Grid */}
      {activeTab === 'trainers' && (
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
                <button 
                  className={`p-2 hover:bg-[#23292F] rounded-lg transition-colors duration-200 ${
                    trainer.status === 'Active' ? 'text-green-500' : 
                    trainer.status === 'On Leave' ? 'text-yellow-500' : 'text-red-500'
                  }`}
                  title={`Status: ${trainer.status} (Click to change)`}
                  onClick={() => handleStatusChange(trainer.id, trainer.status, 'trainer')}
                >
                  {trainer.status === 'Active' ? (
                    <ToggleRight className="h-4 w-4" />
                  ) : trainer.status === 'On Leave' ? (
                    <ToggleLeft className="h-4 w-4 rotate-0" />
                  ) : (
                    <ToggleLeft className="h-4 w-4 rotate-180" />
                  )}
                </button>
              </div>
              <button 
                onClick={() => {
                  setSelectedTrainer(trainer);
                  setShowScheduleModal(true);
                }}
                className="text-[#7BC843] hover:text-[#6AB732] font-medium text-sm flex items-center"
              >
                <Calendar className="h-4 w-4 mr-1" />
                View Schedule
              </button>
            </div>
          </div>
        ))}
        </div>
      )}
      
      {/* Staff Grid */}
      {activeTab === 'staff' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((staffMember) => (
            <div key={staffMember.id} className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6 hover:bg-[#353c44] transition-colors duration-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-[#7BC843] rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-xl">{staffMember.avatar}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{staffMember.name}</h3>
                  <p className="text-gray-400 text-sm">{staffMember.role}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(staffMember.status)}`}>
                  {staffMember.status}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Branch:</span>
                  <span className="text-white font-medium text-sm">{staffMember.branch}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Email:</span>
                  <span className="text-white font-medium text-sm">{staffMember.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Phone:</span>
                  <span className="text-white font-medium text-sm">{staffMember.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Join Date:</span>
                  <span className="text-white font-medium text-sm">{staffMember.joinDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => openStaffModal(staffMember)}
                    className="p-2 text-gray-400 hover:text-[#7BC843] hover:bg-[#23292F] rounded-lg transition-colors duration-200"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => openEditStaffModal(staffMember)}
                    className="p-2 text-gray-400 hover:text-[#7BC843] hover:bg-[#23292F] rounded-lg transition-colors duration-200" 
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    className={`p-2 hover:bg-[#23292F] rounded-lg transition-colors duration-200 ${
                      staffMember.status === 'Active' ? 'text-green-500' : 
                      staffMember.status === 'On Leave' ? 'text-yellow-500' : 'text-red-500'
                    }`}
                    title={`Status: ${staffMember.status} (Click to change)`}
                    onClick={() => handleStatusChange(staffMember.id, staffMember.status, 'staff')}
                  >
                    {staffMember.status === 'Active' ? (
                      <ToggleRight className="h-4 w-4" />
                    ) : staffMember.status === 'On Leave' ? (
                      <ToggleLeft className="h-4 w-4 rotate-0" />
                    ) : (
                      <ToggleLeft className="h-4 w-4 rotate-180" />
                    )}
                  </button>
                </div>
                <button className="text-[#7BC843] hover:text-[#6AB732] font-medium text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
                      <label className="text-gray-400 text-sm mb-3">Availability *</label>
                      <div className="bg-[#23292F] border border-gray-700 rounded-lg p-4">
                        <div className="space-y-3">
                          {Object.entries(newTrainer.availability).map(([day, dayValue]) => (
                            <div key={day} className="flex flex-wrap items-center gap-3">
                              <label className="flex items-center w-[120px] cursor-pointer text-gray-300 hover:text-white">
                                <input
                                  type="checkbox"
                                  checked={dayValue.selected}
                                  onChange={(e) => handleTrainerAvailabilityChange(day, 'selected', e.target.checked)}
                                  className="rounded text-[#7BC843] h-4 w-4 focus:ring-[#7BC843] focus:ring-offset-gray-800 mr-2"
                                />
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                              </label>
                              {dayValue.selected && (
                                <div className="flex items-center space-x-2">
                                  <select
                                    value={dayValue.startTime}
                                    onChange={(e) => handleTrainerAvailabilityChange(day, 'startTime', e.target.value)}
                                    className="px-3 py-1.5 bg-[#2A3037] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-sm"
                                  >
                                    {Array.from({ length: 24 }).map((_, i) => (
                                      <option key={`start-${i}`} value={`${i.toString().padStart(2, '0')}:00`}>
                                        {`${i.toString().padStart(2, '0')}:00`}
                                      </option>
                                    ))}
                                  </select>
                                  <span className="text-gray-400">to</span>
                                  <select
                                    value={dayValue.endTime}
                                    onChange={(e) => handleTrainerAvailabilityChange(day, 'endTime', e.target.value)}
                                    className="px-3 py-1.5 bg-[#2A3037] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-sm"
                                  >
                                    {Array.from({ length: 24 }).map((_, i) => (
                                      <option key={`end-${i}`} value={`${i.toString().padStart(2, '0')}:00`}>
                                        {`${i.toString().padStart(2, '0')}:00`}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 text-xs text-gray-400">
                          Select days and set working hours for trainer availability
                        </div>
                      </div>
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
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedTrainer.availability.split(', ').map((timeSlot: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2 bg-[#23292F] px-3 py-2 rounded-lg border border-gray-700">
                            <span className="text-[#7BC843] font-medium">{timeSlot.split(': ')[0]}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-white">{timeSlot.split(': ')[1]}</span>
                          </div>
                        ))}
                      </div>
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
                      <label className="text-gray-400 text-sm mb-3">Availability *</label>
                      <div className="bg-[#23292F] border border-gray-700 rounded-lg p-4">
                        <div className="space-y-3">
                          {Object.entries(editTrainer.availabilityObj || parseAvailability(editTrainer.availability as string)).map(([day, dayValue]: [string, any]) => (
                            <div key={day} className="flex flex-wrap items-center gap-3">
                              <label className="flex items-center w-[120px] cursor-pointer text-gray-300 hover:text-white">
                                <input
                                  type="checkbox"
                                  checked={dayValue.selected}
                                  onChange={(e) => {
                                    const updatedAvailability = {
                                      ...editTrainer.availabilityObj || parseAvailability(editTrainer.availability),
                                      [day]: {
                                        ...(editTrainer.availabilityObj || parseAvailability(editTrainer.availability))[day as keyof AvailabilityObject],
                                        selected: e.target.checked
                                      }
                                    };
                                    setEditTrainer({
                                      ...editTrainer, 
                                      availabilityObj: updatedAvailability,
                                      availability: formatAvailability(updatedAvailability)
                                    });
                                  }}
                                  className="rounded text-[#7BC843] h-4 w-4 focus:ring-[#7BC843] focus:ring-offset-gray-800 mr-2"
                                />
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                              </label>
                              {dayValue.selected && (
                                <div className="flex items-center space-x-2">
                                  <select
                                    value={dayValue.startTime}
                                    onChange={(e) => {
                                      const updatedAvailability = {
                                        ...editTrainer.availabilityObj || parseAvailability(editTrainer.availability),
                                        [day]: {
                                          ...(editTrainer.availabilityObj || parseAvailability(editTrainer.availability))[day as keyof AvailabilityObject],
                                          startTime: e.target.value
                                        }
                                      };
                                      setEditTrainer({
                                        ...editTrainer, 
                                        availabilityObj: updatedAvailability,
                                        availability: formatAvailability(updatedAvailability)
                                      });
                                    }}
                                    className="px-3 py-1.5 bg-[#2A3037] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-sm"
                                  >
                                    {Array.from({ length: 24 }).map((_, i) => (
                                      <option key={`start-${i}`} value={`${i.toString().padStart(2, '0')}:00`}>
                                        {`${i.toString().padStart(2, '0')}:00`}
                                      </option>
                                    ))}
                                  </select>
                                  <span className="text-gray-400">to</span>
                                  <select
                                    value={dayValue.endTime}
                                    onChange={(e) => {
                                      const updatedAvailability = {
                                        ...editTrainer.availabilityObj || parseAvailability(editTrainer.availability),
                                        [day]: {
                                          ...(editTrainer.availabilityObj || parseAvailability(editTrainer.availability))[day as keyof AvailabilityObject],
                                          endTime: e.target.value
                                        }
                                      };
                                      setEditTrainer({
                                        ...editTrainer, 
                                        availabilityObj: updatedAvailability,
                                        availability: formatAvailability(updatedAvailability)
                                      });
                                    }}
                                    className="px-3 py-1.5 bg-[#2A3037] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-sm"
                                  >
                                    {Array.from({ length: 24 }).map((_, i) => (
                                      <option key={`end-${i}`} value={`${i.toString().padStart(2, '0')}:00`}>
                                        {`${i.toString().padStart(2, '0')}:00`}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 text-xs text-gray-400">
                          Select days and set working hours for trainer availability
                        </div>
                      </div>
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
                      <label className="text-gray-400 text-sm mb-3">Availability *</label>
                      <div className="bg-[#23292F] border border-gray-700 rounded-lg p-4">
                        <div className="space-y-3">
                          {Object.entries(newStaff.availability).map(([day, dayValue]) => (
                            <div key={day} className="flex flex-wrap items-center gap-3">
                              <label className="flex items-center w-[120px] cursor-pointer text-gray-300 hover:text-white">
                                <input
                                  type="checkbox"
                                  checked={dayValue.selected}
                                  onChange={(e) => handleAvailabilityChange(day, 'selected', e.target.checked)}
                                  className="rounded text-[#7BC843] h-4 w-4 focus:ring-[#7BC843] focus:ring-offset-gray-800 mr-2"
                                />
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                              </label>
                              {dayValue.selected && (
                                <div className="flex items-center space-x-2">
                                  <select
                                    value={dayValue.startTime}
                                    onChange={(e) => handleAvailabilityChange(day, 'startTime', e.target.value)}
                                    className="px-3 py-1.5 bg-[#2A3037] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-sm"
                                  >
                                    {Array.from({ length: 24 }).map((_, i) => (
                                      <option key={`start-${i}`} value={`${i.toString().padStart(2, '0')}:00`}>
                                        {`${i.toString().padStart(2, '0')}:00`}
                                      </option>
                                    ))}
                                  </select>
                                  <span className="text-gray-400">to</span>
                                  <select
                                    value={dayValue.endTime}
                                    onChange={(e) => handleAvailabilityChange(day, 'endTime', e.target.value)}
                                    className="px-3 py-1.5 bg-[#2A3037] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-sm"
                                  >
                                    {Array.from({ length: 24 }).map((_, i) => (
                                      <option key={`end-${i}`} value={`${i.toString().padStart(2, '0')}:00`}>
                                        {`${i.toString().padStart(2, '0')}:00`}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 text-xs text-gray-400">
                          Select days and set working hours for staff availability
                        </div>
                      </div>
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
                  className="px-6 py-3 bg-[#7BC843] hover:bg-[6AB732] text-black rounded-lg transition-colors duration-200 font-medium"
                >
                  Add Staff
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Staff Detail Modal */}
      {showStaffModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-[#7BC843] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-2xl">{selectedStaff.avatar}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedStaff.name}</h2>
                    <p className="text-gray-400">{selectedStaff.role}</p>
                    <div className="flex items-center mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedStaff.status)}`}>
                        {selectedStaff.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowStaffModal(false)}
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
                      <span className="text-gray-200">{selectedStaff.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-white">{selectedStaff.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-white">Branch: {selectedStaff.branch}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-white">Joined: {selectedStaff.joinDate}</span>
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
                      <span className="text-gray-400 text-sm">Role:</span>
                      <p className="text-white font-medium">{selectedStaff.role}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Availability:</span>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedStaff.availability.split(', ').map((timeSlot: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2 bg-[#23292F] px-3 py-2 rounded-lg border border-gray-700">
                            <span className="text-[#7BC843] font-medium">{timeSlot.split(': ')[0]}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-white">{timeSlot.split(': ')[1]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Status:</span>
                      <p className="text-white font-medium">{selectedStaff.status}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  onClick={() => {
                    setShowStaffModal(false);
                    openEditStaffModal(selectedStaff);
                  }}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  Edit Staff
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {showEditStaffModal && editStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Edit Staff Member</h2>
                <button 
                  onClick={() => setShowEditStaffModal(false)}
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
                        value={editStaff.name}
                        onChange={(e) => setEditStaff({...editStaff, name: e.target.value})}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={editStaff.email}
                        onChange={(e) => setEditStaff({...editStaff, email: e.target.value})}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={editStaff.phone}
                        onChange={(e) => setEditStaff({...editStaff, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Branch *</label>
                      <select
                        value={editStaff.branch}
                        onChange={(e) => setEditStaff({...editStaff, branch: e.target.value})}
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
                        value={editStaff.role}
                        onChange={(e) => setEditStaff({...editStaff, role: e.target.value})}
                        className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        required
                      >
                        <option value="Receptionist">Receptionist</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                      </select>
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-3">Availability *</label>
                      <div className="bg-[#23292F] border border-gray-700 rounded-lg p-4">
                        <div className="space-y-3">
                          {Object.entries(editStaff.availabilityObj || parseAvailability(editStaff.availability as string)).map(([day, dayValue]: [string, any]) => (
                            <div key={day} className="flex flex-wrap items-center gap-3">
                              <label className="flex items-center w-[120px] cursor-pointer text-gray-300 hover:text-white">
                                <input
                                  type="checkbox"
                                  checked={dayValue.selected}
                                  onChange={(e) => {
                                    const updatedAvailability = {
                                      ...editStaff.availabilityObj || parseAvailability(editStaff.availability as string),
                                      [day]: {
                                        ...(editStaff.availabilityObj || parseAvailability(editStaff.availability as string))[day as keyof AvailabilityObject],
                                        selected: e.target.checked
                                      }
                                    };
                                    setEditStaff({
                                      ...editStaff, 
                                      availabilityObj: updatedAvailability,
                                      availability: formatAvailability(updatedAvailability)
                                    });
                                  }}
                                  className="rounded text-[#7BC843] h-4 w-4 focus:ring-[#7BC843] focus:ring-offset-gray-800 mr-2"
                                />
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                              </label>
                              {dayValue.selected && (
                                <div className="flex items-center space-x-2">
                                  <select
                                    value={dayValue.startTime}
                                    onChange={(e) => {
                                      const updatedAvailability = {
                                        ...editStaff.availabilityObj || parseAvailability(editStaff.availability as string),
                                        [day]: {
                                          ...(editStaff.availabilityObj || parseAvailability(editStaff.availability as string))[day as keyof AvailabilityObject],
                                          startTime: e.target.value
                                        }
                                      };
                                      setEditStaff({
                                        ...editStaff, 
                                        availabilityObj: updatedAvailability,
                                        availability: formatAvailability(updatedAvailability)
                                      });
                                    }}
                                    className="px-3 py-1.5 bg-[#2A3037] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-sm"
                                  >
                                    {Array.from({ length: 24 }).map((_, i) => (
                                      <option key={`start-${i}`} value={`${i.toString().padStart(2, '0')}:00`}>
                                        {`${i.toString().padStart(2, '0')}:00`}
                                      </option>
                                    ))}
                                  </select>
                                  <span className="text-gray-400">to</span>
                                  <select
                                    value={dayValue.endTime}
                                    onChange={(e) => {
                                      const updatedAvailability = {
                                        ...editStaff.availabilityObj || parseAvailability(editStaff.availability as string),
                                        [day]: {
                                          ...(editStaff.availabilityObj || parseAvailability(editStaff.availability as string))[day as keyof AvailabilityObject],
                                          endTime: e.target.value
                                        }
                                      };
                                      setEditStaff({
                                        ...editStaff, 
                                        availabilityObj: updatedAvailability,
                                        availability: formatAvailability(updatedAvailability)
                                      });
                                    }}
                                    className="px-3 py-1.5 bg-[#2A3037] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-sm"
                                  >
                                    {Array.from({ length: 24 }).map((_, i) => (
                                      <option key={`end-${i}`} value={`${i.toString().padStart(2, '0')}:00`}>
                                        {`${i.toString().padStart(2, '0')}:00`}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 text-xs text-gray-400">
                          Select days and set working hours for staff availability
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="text-gray-400 text-sm mb-1">Status</label>
                      <select
                        value={editStaff.status}
                        onChange={(e) => setEditStaff({...editStaff, status: e.target.value})}
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
                  onClick={() => setShowEditStaffModal(false)}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleEditStaff}
                  className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trainer Schedule Modal */}
      {showScheduleModal && selectedTrainer && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-[#7BC843]" />
                {selectedTrainer.name}'s Schedule
              </h2>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-gradient-to-br from-[#23292F] to-[#1d2126] p-5 rounded-lg border border-gray-800 shadow-lg mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#7BC843] rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{selectedTrainer.name}</h3>
                    <p className="text-gray-400">{selectedTrainer.specialty}</p>
                  </div>
                  <div className="ml-auto">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedTrainer.status === 'Active' ? 'bg-green-900 text-green-300' :
                      selectedTrainer.status === 'On Leave' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      {selectedTrainer.status}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-[#7BC843]" />
                Weekly Schedule
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
                  const dayLower = day.toLowerCase() as AvailabilityDay;
                  const availability = parseAvailability(selectedTrainer.availability);
                  const isAvailable = availability[dayLower].selected;
                  
                  return (
                    <div key={day} className={`p-4 rounded-lg border ${isAvailable ? 'border-[#7BC843] bg-[#2a3830]' : 'border-gray-700 bg-[#23292F]'}`}>
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-white">{day}</h4>
                        {isAvailable ? (
                          <span className="text-[#7BC843] text-sm flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {availability[dayLower].startTime} - {availability[dayLower].endTime}
                          </span>
                        ) : (
                          <span className="text-gray-500 text-sm">Not Available</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 border-t border-gray-700 pt-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-[#7BC843]" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-[#23292F] rounded-lg">
                    <Phone className="h-5 w-5 text-[#7BC843]" />
                    <span className="text-gray-300">{selectedTrainer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-[#23292F] rounded-lg">
                    <Mail className="h-5 w-5 text-[#7BC843]" />
                    <span className="text-gray-300">{selectedTrainer.email}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setShowScheduleModal(false)}
                  className="px-8 py-2.5 bg-gradient-to-r from-[#7BC843] to-[#5EA932] text-white font-medium rounded-lg hover:from-[#8BD952] hover:to-[#6BB536] transition-all duration-200 shadow-md flex items-center justify-center"
                >
                  Close
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