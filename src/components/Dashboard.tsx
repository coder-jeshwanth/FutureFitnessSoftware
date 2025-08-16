import React, { useState } from 'react';
import { Users, UserCheck, IndianRupee, Calendar, AlertTriangle, TrendingUp, Activity, Clock, UserRoundX, Plus, X, Save, UserIcon, CreditCard } from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

// Define User interface and generateUsers function inline to avoid import issues
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  membership: string;
  status: string;
  planExpiry: string;
  trainer: string;
  joinDate: string;
  lastPayment: string;
  avatar: string;
  branch: string;
  remainingAmount?: number;
}

const generateUsers = (count: number): User[] => {
  const today = new Date('2025-08-15'); // Hardcoded date for consistency
  const twoYearsAgo = new Date(today);
  twoYearsAgo.setFullYear(today.getFullYear() - 2);

  const firstNames = ['Arjun', 'Priya', 'Rohit', 'Sneha', 'Amit', 'Divya', 'Rakesh', 'Neha', 'Vikash', 'Ananya',
    'Rahul', 'Pooja', 'Sanjay', 'Aishwarya', 'Ravi', 'Meera', 'Suresh', 'Kavita', 'Vijay', 'Swati'];

  const lastNames = ['Sharma', 'Patel', 'Kumar', 'Reddy', 'Singh', 'Mehta', 'Verma', 'Gupta', 'Joshi', 'Das',
    'Nair', 'Khan', 'Chowdhury', 'Shah', 'Rao', 'Malhotra', 'Banerjee', 'Agarwal', 'Yadav', 'Srivastava'];

  const branches = ['Stonehousepet', 'Harinathpuram', 'Vanamthopu Center', 'Current Office Center', 'Vedayapalem',
    'BV Nagar', 'Dhanalakshmi Puram'];

  const memberships = ['Basic', 'Standard', 'Premium'];
  const statuses = ['Active', 'InActive', 'pending', 'Expired'];
  const trainers = ['Rajesh', 'Nisha', 'Vikram', 'Anjali', 'Sandeep'];

  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    // Random name components
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;

    // Create email from name
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`;

    // Generate phone number
    const phone = `+91 ${Math.floor(7000000000 + Math.random() * 3000000000)}`;

    // Random membership and status
    const membership = memberships[Math.floor(Math.random() * memberships.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    // Random trainer and branch
    const trainer = trainers[Math.floor(Math.random() * trainers.length)];
    const branch = branches[Math.floor(Math.random() * branches.length)];

    const isNewMember = i <= 25; // Make 25 users new members

    let joinDate;
    if (isNewMember) {
      // For new members, join date is within last 30 days
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);

      const randomDaysAgo = Math.floor(Math.random() * 30);
      joinDate = new Date(today);
      joinDate.setDate(today.getDate() - randomDaysAgo);
    } else {
      // For older members, join date is between 2 years ago and 31 days ago
      const thirtyOneDaysAgo = new Date(today);
      thirtyOneDaysAgo.setDate(today.getDate() - 31);

      const timeDiff = thirtyOneDaysAgo.getTime() - twoYearsAgo.getTime();
      joinDate = new Date(twoYearsAgo.getTime() + Math.random() * timeDiff);
    }

    // Format join date as 'YYYY-MM-DD'
    const formattedJoinDate = joinDate.toISOString().split('T')[0];

    // Calculate plan expiry (1 year from join date)
    const planExpiry = new Date(joinDate);
    planExpiry.setFullYear(planExpiry.getFullYear() + 1);
    const formattedPlanExpiry = planExpiry.toISOString().split('T')[0];

    // Generate payment amount based on membership
    let paymentAmount;
    if (membership === 'Basic') paymentAmount = '₹2,500';
    else if (membership === 'Standard') paymentAmount = '₹3,500';
    else paymentAmount = '₹5,000';

    // Generate avatar from initials
    const avatar = `${firstName[0]}${lastName[0]}`;

    users.push({
      id: i,
      name: fullName,
      email,
      phone,
      membership,
      status,
      planExpiry: formattedPlanExpiry,
      trainer,
      joinDate: formattedJoinDate,
      lastPayment: paymentAmount,
      avatar,
      branch,
      // Add random remaining amount for 'pending' status users
      remainingAmount: status === 'pending' ? Math.floor(Math.random() * 2000) + 500 : 0
    });
  }

  return users;
};

interface DashboardProps {
  selectedBranch: string;
}

// Generate users with the same function as in GymUsers
const users = generateUsers(100);

// Branch-specific pricing structure (same as in GymUsers.tsx)
const branchPricing = {
  'Harinathpuram': {
    '1 month': { price: 3000, discounted: null },
    '3 months': { price: 7000, discounted: 6000 },
    '6 months': { price: 10000, discounted: 9000 },
    '1 year': { price: 18000, discounted: 13000 }
  },
  'Stonehousepet': {
    '1 month': { price: 3000, discounted: null },
    '3 months': { price: 7000, discounted: 6000 },
    '6 months': { price: 10000, discounted: 9000 },
    '1 year': { price: 18000, discounted: 13000 }
  },
  'Vedayapalem': {
    '1 month': { price: 3000, discounted: null },
    '3 months': { price: 7000, discounted: 6000 },
    '6 months': { price: 10000, discounted: 9000 },
    '1 year': { price: 18000, discounted: 13000 }
  },
  'Current Office Center': {
    '1 month': { price: 2500, discounted: null },
    '3 months': { price: 6000, discounted: 5500 },
    '6 months': { price: 9000, discounted: 8000 },
    '1 year': { price: 16000, discounted: 11000 }
  },
  'Vanamthopu Center': {
    '1 month': { price: 3500, discounted: null },
    '3 months': { price: 9000, discounted: 7500 },
    '6 months': { price: 14000, discounted: 10000 },
    '1 year': { price: 20000, discounted: 14000 }
  },
  'BV Nagar': {
    '1 month': { price: 3000, discounted: null },
    '3 months': { price: 8000, discounted: 7000 },
    '6 months': { price: 12000, discounted: 10000 },
    '1 year': { price: 18000, discounted: 13000 }
  },
  'Dhanalakshmi Puram': {
    '1 month': { price: 3000, discounted: null },
    '3 months': { price: 7000, discounted: 6000 },
    '6 months': { price: 10000, discounted: 9000 },
    '1 year': { price: 18000, discounted: 13000 }
  }
};

const recentActivities = [
  { id: 1, type: 'member_joined', name: 'Arjun Sharma', time: '2 hours ago', action: 'joined the gym' },
  { id: 2, type: 'payment', name: 'Priya Patel', time: '3 hours ago', action: 'made payment of ₹2,500' },
  { id: 3, type: 'class_booked', name: 'Rohit Kumar', time: '4 hours ago', action: 'booked Yoga class' },
  { id: 4, type: 'trainer_assigned', name: 'Sneha Reddy', time: '5 hours ago', action: 'was assigned trainer Vikash' },
  { id: 5, type: 'membership_renewed', name: 'Amit Singh', time: '6 hours ago', action: 'renewed yearly membership' }
];

const quickActions = [
  { label: 'Register Member', color: 'bg-[#7BC843] hover:bg-[#6BB536]', icon: Users },
  { label: 'Assign Trainer', color: 'bg-blue-600 hover:bg-blue-700', icon: UserCheck },
  { label: 'Create Class', color: 'bg-purple-600 hover:bg-purple-700', icon: Calendar }
];

// Register the required Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler
);

const AttendanceTrendsChart = () => {
  const attendanceData = [
    { day: 'Mon', count: 156, percentage: 78, peak: 'Evening' },
    { day: 'Tue', count: 142, percentage: 71, peak: 'Morning' },
    { day: 'Wed', count: 167, percentage: 84, peak: 'Evening' },
    { day: 'Thu', count: 134, percentage: 67, peak: 'Morning' },
    { day: 'Fri', count: 189, percentage: 95, peak: 'Evening' },
    { day: 'Sat', count: 201, percentage: 100, peak: 'Afternoon' },
    { day: 'Sun', count: 98, percentage: 49, peak: 'Morning' }
  ];

  const data = {
    labels: attendanceData.map(item => item.day),
    datasets: [
      {
        label: 'Attendance',
        data: attendanceData.map(item => item.percentage),
        backgroundColor: 'rgba(123, 200, 67, 0.6)',
        borderColor: '#7BC843',
        borderWidth: 2,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(123, 200, 67, 0.8)',
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (context: any) {
            return `${context[0].label}`;
          },
          label: function (context: any) {
            const index = context.dataIndex;
            return [
              `Attendance: ${context.parsed.y}%`,
              `Members: ${attendanceData[index].count}`,
              `Peak Time: ${attendanceData[index].peak}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          callback: function (value: any) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <div className="h-60">
      <Bar data={data} options={options} />
    </div>
  );
};

const ClassParticipationChart = () => {
  const classData = [
    { name: 'Yoga', percentage: 85, color: '#7BC843' },
    { name: 'Cardio', percentage: 92, color: '#2563eb' },
    { name: 'Weight Training', percentage: 78, color: '#9333ea' },
    { name: 'Zumba', percentage: 65, color: '#db2777' }
  ];

  const data = {
    labels: [],
    datasets: [
      {
        data: classData.map(item => item.percentage),
        backgroundColor: classData.map(item => item.color),
        borderColor: classData.map(item => item.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(42, 48, 55, 0.9)',
        titleColor: '#fff',
        bodyColor: '#e5e7eb',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            const index = context.dataIndex;
            return `${classData[index].name}: ${context.raw}%`;
          }
        }
      }
    },
    maintainAspectRatio: true,
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-stretch h-auto md:h-60 gap-6 md:gap-0">
      <div className="w-full md:w-5/12 flex items-center justify-center py-2">
        <div className="h-40 w-40 sm:h-48 sm:w-48 relative">
          <Doughnut data={data} options={options} />
        </div>
      </div>
      <div className="w-full md:w-7/12 flex flex-col justify-center md:justify-between py-2">
        <div className="space-y-3 md:space-y-4">
          {classData.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
              <div className="flex flex-col flex-grow min-w-0">
                <span className="text-sm font-medium text-gray-200 truncate">{item.name}</span>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-full h-1.5 bg-gray-700 rounded-full">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-9 flex-shrink-0">{item.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 h-4"></div> {/* Extra space at the end */}
      </div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ selectedBranch }) => {
  // State for Add New Member Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  
  // State for Create Class Modal
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    type: '',
    trainer: '',
    room: '',
    date: '',
    time: '',
    duration: '',
    capacity: '',
    branch: selectedBranch !== 'All Branches' ? selectedBranch : '',
    description: ''
  });
  const [classValidationErrors, setClassValidationErrors] = useState<{[key: string]: string}>({});
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    branch: '',
    trainer: '',
    gender: '',
    dob: '',
    paymentMethod: '',
    cashReceived: '',
    membershipPlan: '', // Selected plan (1 month, 3 months, etc.)
    membershipPrice: 0, // The full price of the selected plan
    remainingAmount: 0 // The remaining amount to be paid
  });
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  // Function to generate an invoice preview
  const showInvoicePreview = (userData: any) => {
    // Generate a unique invoice number
    const invoiceNumber = `INV-${Date.now().toString().substring(6)}`;

    // Format today's date
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Calculate membership end date based on the plan
    const endDate = new Date();

    // Extract the duration from the plan name (e.g., "1 month", "3 months", "6 months", "1 year")
    if (userData.membershipPlan) {
      if (userData.membershipPlan.includes("month")) {
        // Get the number from the plan (e.g., "1" from "1 month" or "3" from "3 months")
        const months = parseInt(userData.membershipPlan);
        endDate.setMonth(today.getMonth() + months);
      } else if (userData.membershipPlan.includes("year")) {
        // Get the number from the plan (e.g., "1" from "1 year")
        const years = parseInt(userData.membershipPlan);
        endDate.setFullYear(today.getFullYear() + years);
      }
    }

    const formattedEndDate = endDate.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Create invoice data
    const invoice = {
      invoiceNumber,
      date: formattedDate,
      memberName: userData.name,
      email: userData.email,
      phone: userData.phone,
      gender: userData.gender,
      branch: userData.branch,
      membershipPlan: userData.membershipPlan,
      trainer: userData.trainer,
      startDate: formattedDate,
      endDate: formattedEndDate,
      totalAmount: userData.membershipPrice,
      paidAmount: parseFloat(userData.cashReceived) || 0,
      remainingAmount: userData.remainingAmount,
      paymentMethod: userData.paymentMethod
    };

    // Set invoice data and show modal
    setInvoiceData(invoice);
    setShowInvoiceModal(true);
  };

  const handleAddUser = () => {
    // Validate age requirement before submitting
    let errors: { [key: string]: string } = {};
    let isValid = true;

    // Check DOB for age requirement
    if (newUser.dob) {
      const birthDate = new Date(newUser.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 15) {
        errors.dob = 'Member must be at least 15 years old';
        isValid = false;
      }
    } else if (!newUser.dob) {
      errors.dob = 'Date of Birth is required';
      isValid = false;
    }

    // Required fields validation
    if (!newUser.name) {
      errors.name = 'Name is required';
      isValid = false;
    }
    if (!newUser.branch) {
      errors.branch = 'Branch is required';
      isValid = false;
    }
    if (!newUser.membershipPlan) {
      errors.membershipPlan = 'Membership Plan is required';
      isValid = false;
    }

    // Update validation errors
    setValidationErrors(errors);

    // If form is valid, submit
    if (isValid) {
      // Here you would typically call an API to save the new user
      console.log('Adding new user:', newUser);
      setShowAddModal(false);

      // Reset the form
      setNewUser({
        name: '',
        email: '',
        phone: '',
        branch: '',
        trainer: '',
        gender: '',
        dob: '',
        paymentMethod: '',
        cashReceived: '',
        membershipPlan: '',
        membershipPrice: 0,
        remainingAmount: 0
      });
      // Clear validation errors
      setValidationErrors({});
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'branch') {
      // When branch changes, reset plan selection
      setNewUser(prev => ({
        ...prev,
        [name]: value,
        membershipPlan: '',
        membershipPrice: 0,
        remainingAmount: 0
      }));
      // Clear branch-related validation errors
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
    else if (name === 'membershipPlan' && newUser.branch) {
      // When membership plan changes, update the price
      const branchPlans = branchPricing[newUser.branch as keyof typeof branchPricing];
      if (branchPlans && value) {
        const planPrice = branchPlans[value as keyof typeof branchPlans]?.discounted ||
          branchPlans[value as keyof typeof branchPlans]?.price || 0;

        // Calculate remaining amount if cash received value exists
        const cashReceived = parseFloat(newUser.cashReceived) || 0;
        const remaining = planPrice - cashReceived;

        setNewUser(prev => ({
          ...prev,
          [name]: value,
          membershipPrice: planPrice,
          remainingAmount: remaining >= 0 ? remaining : 0
        }));
        // Clear plan-related validation errors
        setValidationErrors(prev => ({ ...prev, [name]: '' }));
      } else {
        setNewUser(prev => ({
          ...prev,
          [name]: value
        }));
      }
    }
    else if (name === 'cashReceived' && newUser.membershipPrice > 0) {
      // When cash received changes, update the remaining amount
      const cashAmount = parseFloat(value) || 0;
      const remaining = newUser.membershipPrice - cashAmount;

      setNewUser(prev => ({
        ...prev,
        [name]: value,
        remainingAmount: remaining >= 0 ? remaining : 0
      }));
      // Clear cash-related validation errors
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
    else if (name === 'dob') {
      // Age validation for Date of Birth
      if (value) {
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // If birth month hasn't occurred yet this year or if birth month is current month but birth day hasn't occurred yet
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        // Check if age is at least 15 years
        if (age < 15) {
          setValidationErrors(prev => ({
            ...prev,
            [name]: 'Member must be at least 15 years old'
          }));
        } else {
          setValidationErrors(prev => ({ ...prev, [name]: '' }));
        }
      }

      setNewUser(prev => ({
        ...prev,
        [name]: value
      }));
    }
    else {
      // Default handler for other fields
      setNewUser(prev => ({
        ...prev,
        [name]: value
      }));
      // Clear field-specific validation errors
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Class form handlers
  const handleClassInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewClass(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field-specific validation errors
    setClassValidationErrors(prev => ({...prev, [name]: ''}));
  };

  const handleCreateClass = () => {
    // Validate required fields
    let errors: {[key: string]: string} = {};
    let isValid = true;
    
    if (!newClass.name) {
      errors.name = 'Class name is required';
      isValid = false;
    }
    if (!newClass.type) {
      errors.type = 'Class type is required';
      isValid = false;
    }
    if (!newClass.trainer) {
      errors.trainer = 'Trainer is required';
      isValid = false;
    }
    if (!newClass.room) {
      errors.room = 'Room is required';
      isValid = false;
    }
    if (!newClass.date) {
      errors.date = 'Date is required';
      isValid = false;
    }
    if (!newClass.time) {
      errors.time = 'Time is required';
      isValid = false;
    }
    if (!newClass.duration) {
      errors.duration = 'Duration is required';
      isValid = false;
    }
    if (!newClass.capacity) {
      errors.capacity = 'Capacity is required';
      isValid = false;
    }
    if (!newClass.branch) {
      errors.branch = 'Branch is required';
      isValid = false;
    }
    
    // Update validation errors
    setClassValidationErrors(errors);
    
    // If form is valid, submit
    if (isValid) {
      // Here you would typically call an API to save the new class
      console.log('Creating new class:', newClass);
      setShowCreateClassModal(false);
      
      // Reset the form
      setNewClass({
        name: '',
        type: '',
        trainer: '',
        room: '',
        date: '',
        time: '',
        duration: '',
        capacity: '',
        branch: selectedBranch !== 'All Branches' ? selectedBranch : '',
        description: ''
      });
      // Clear validation errors
      setClassValidationErrors({});
      
      // Show success message
      alert('Class created successfully!');
    }
  };
  
  // Filter users and generate dynamic stats based on selectedBranch
  const filteredUsers = selectedBranch === 'All Branches'
    ? users
    : users.filter((user: User) => user.branch === selectedBranch);

  // Calculate counts
  const totalMembers = filteredUsers.length;
  const activeMembers = filteredUsers.filter((user: User) => user.status === 'Active').length;
  const inactiveMembers = filteredUsers.filter((user: User) => user.status === 'InActive').length;
  const pendingPayments = filteredUsers.filter((user: User) => user.status === 'pending').length;

  // Create stats cards with real data
  const statsCards = [
    {
      title: 'Total Members',
      value: totalMembers.toLocaleString(),
      change: '+12%', // Could calculate this dynamically in a real app
      trend: 'up',
      icon: Users,
      color: 'bg-[#7BC843]'
    },
    {
      title: 'Active Members',
      value: activeMembers.toLocaleString(),
      change: '+8%',
      trend: 'up',
      icon: UserCheck,
      color: 'bg-blue-600'
    },
    {
      title: 'InActive Members',
      value: inactiveMembers.toLocaleString(),
      change: '+2%',
      trend: 'up',
      icon: UserRoundX,
      color: 'bg-yellow-600'
    },
    {
      title: "This Month's Revenue",
      value: '₹2,45,680',
      change: '+15%',
      trend: 'up',
      icon: IndianRupee,
      color: 'bg-green-600'
    },
    {
      title: 'Pending Payments',
      value: pendingPayments.toLocaleString(),
      change: '-5%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'bg-red-600'
    }
  ];

  return (
    <div className="space-y-6 bg-black p-6 rounded-lg">
      {/* Branch Title */}
      <div className="mb-4">
        <h3 className="text-xl text-gray-300 font-medium">
          {selectedBranch !== 'All Branches' ? `${selectedBranch} Branch` : 'All Branches'}
        </h3>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-[#2A3037] rounded-xl shadow-sm  p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className={`text-sm font-medium ${card.trend === 'up' ? 'text-green-600' :
                    card.trend === 'down' ? 'text-red-600' :
                      'text-white-600'
                  }`}>
                  {card.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{card.value}</h3>
              <p className="text-white text-sm">{card.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Member Growth Chart */}
          <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Member Growth</h3>
              <TrendingUp className="h-5 w-5 text-[#7BC843]" />
            </div>
            <div className="h-52">
              <Line
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                  datasets: [
                    {
                      label: 'New Members',
                      data: [25, 38, 42, 53, 47, 62, 75],
                      backgroundColor: 'rgba(123, 200, 67, 0.2)',
                      borderColor: '#7BC843',
                      pointBackgroundColor: '#7BC843',
                      pointBorderColor: '#fff',
                      pointRadius: 4,
                      tension: 0.3,
                    },
                    {
                      label: 'Cumulative Total',
                      data: [25, 63, 105, 158, 205, 267, 342],
                      backgroundColor: 'rgba(59, 130, 246, 0.2)',
                      borderColor: '#3b82f6',
                      pointBackgroundColor: '#3b82f6',
                      pointBorderColor: '#fff',
                      pointRadius: 4,
                      tension: 0.3,
                      fill: true,
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top',
                      labels: {
                        color: '#e5e7eb',
                        font: {
                          size: 10
                        }
                      }
                    },
                    tooltip: {
                      backgroundColor: 'rgba(42, 48, 55, 0.9)',
                      titleColor: '#fff',
                      bodyColor: '#e5e7eb',
                      borderColor: '#374151',
                      borderWidth: 1,
                      padding: 10,
                      displayColors: true,
                      callbacks: {
                        title: function (tooltipItems) {
                          return tooltipItems[0].label;
                        },
                        label: function (context) {
                          const datasetLabel = context.dataset.label || '';
                          const value = context.parsed.y || 0;
                          return `${datasetLabel}: ${value} members`;
                        }
                      }
                    }
                  },
                  scales: {
                    x: {
                      grid: {
                        color: 'rgba(75, 85, 99, 0.2)',
                      },
                      ticks: {
                        color: '#9ca3af'
                      }
                    },
                    y: {
                      grid: {
                        color: 'rgba(75, 85, 99, 0.2)',
                      },
                      ticks: {
                        color: '#9ca3af',
                        callback: function (value) {
                          return value;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (action.label === 'Register Member') {
                        setShowAddModal(true);
                      } else if (action.label === 'Create Class') {
                        setShowCreateClassModal(true);
                      }
                      // Add other action handlers here if needed
                    }}
                    className={`w-full ${action.color} text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Attendance Trends */}
          <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Attendance Trends</h3>
              <Clock className="h-5 w-5 text-[#7BC843]" />
            </div>
            <AttendanceTrendsChart />
          </div>

          {/* Class Participation */}
          <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Class Participation</h3>
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div className="w-full h-full">
              <ClassParticipationChart />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                <div className="w-2 h-2 bg-[#7BC843] rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">
                    <span className="font-medium">{activity.name}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-[#7BC843] hover:text-white font-medium text-sm border border-[#7BC843] hover:border-white rounded-lg py-2 transition-colors duration-200">
            View All Activities
          </button>
        </div>
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
                    <UserIcon className="h-5 w-5 mr-2 text-[#7BC843]" />
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
                        className={`w-full h-10 bg-[#23292F] text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 ${validationErrors.name ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-[#7BC843] border-none'}`}
                        placeholder="Enter full name"
                      />
                      {validationErrors.name && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
                      )}
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
                        className={`w-full h-10 bg-[#23292F] text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 ${validationErrors.dob ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-[#7BC843] border-none'}`}
                      />
                      {validationErrors.dob && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.dob}</p>
                      )}
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
                    {/* First: Branch Location */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Branch Location</label>
                      <select
                        name="branch"
                        value={newUser.branch}
                        onChange={handleInputChange}
                        className={`w-full h-10 bg-[#23292F] text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 ${validationErrors.branch ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-[#7BC843] border-none'}`}
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
                      {validationErrors.branch && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.branch}</p>
                      )}
                    </div>


                    {/* Membership Plan */}
                    <div>
                      <div className="flex justify-between items-center">
                        <label className="block text-gray-400 text-sm mb-1">Membership Plan</label>
                        {newUser.membershipPrice > 0 && (
                          <span className="text-green-400 text-sm font-medium mb-1 bg-green-400 bg-opacity-10 px-2 py-0.5 rounded">
                            ₹{newUser.membershipPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <select
                        name="membershipPlan"
                        value={newUser.membershipPlan}
                        onChange={handleInputChange}
                        disabled={!newUser.branch}
                        className={`w-full h-10 bg-[#23292F] text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 ${validationErrors.membershipPlan ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-[#7BC843] border-none'} disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <option value="">Select Membership Plan</option>
                        {newUser.branch && Object.keys(branchPricing[newUser.branch as keyof typeof branchPricing] || {}).map(planKey => {
                          const plan = branchPricing[newUser.branch as keyof typeof branchPricing][planKey as keyof typeof branchPricing[keyof typeof branchPricing]];
                          const price = plan.discounted || plan.price;
                          return (
                            <option key={planKey} value={planKey}>
                              {planKey} (₹{price.toLocaleString()})
                            </option>
                          );
                        })}
                      </select>
                      {validationErrors.membershipPlan && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.membershipPlan}</p>
                      )}
                    </div>

                    {/* Third: Assigned Trainer */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Assigned Trainer</label>
                      <select
                        name="trainer"
                        value={newUser.trainer}
                        onChange={handleInputChange}
                        disabled={!newUser.branch || !newUser.membershipPlan}
                        className="w-full h-10 bg-[#23292F] text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7BC843] border-none disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">Select Trainer</option>
                        <option value="Vikash Kumar">Vikash Kumar</option>
                        <option value="Sneha Reddy">Sneha Reddy</option>
                        <option value="Raj Singh">Raj Singh</option>
                        <option value="Ananya Desai">Ananya Desai</option>
                        <option value="Kiran Rao">Kiran Rao</option>
                      </select>
                    </div>

                    {/* Payment Details */}
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
                      <label className="block text-gray-400 text-sm mb-1">Amount Received</label>
                      <input
                        type="text"
                        name="cashReceived"
                        value={newUser.cashReceived}
                        onChange={handleInputChange}
                        className="w-full h-10 bg-[#23292F] text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7BC843] border-none"
                        placeholder="Enter amount received"
                      />

                      {/* Show remaining amount if any */}
                      {newUser.membershipPrice > 0 && newUser.cashReceived && newUser.remainingAmount > 0 && (
                        <p className="text-red-500 text-sm mt-2 font-medium">
                          Remaining amount: ₹{newUser.remainingAmount.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                {/* Show remaining amount warning if needed */}
                {newUser.membershipPrice > 0 && newUser.cashReceived && newUser.remainingAmount > 0 && (
                  <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
                    <p className="text-red-500 font-medium flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Remaining Amount: ₹{newUser.remainingAmount.toLocaleString()}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  {/* Invoice Button (Left Side) */}
                  <button
                    onClick={() => showInvoicePreview(newUser)}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 font-medium flex items-center"
                    disabled={!newUser.name || !newUser.branch || !newUser.membershipPlan}
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Invoice
                  </button>

                  {/* Cancel and Save Buttons (Right Side) */}
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddUser}
                      className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium flex items-center"
                      disabled={!newUser.name || !newUser.branch || !newUser.membershipPlan || !newUser.trainer}
                    >
                      <Save className="h-5 w-5 mr-2" />
                      Save Member
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Preview Modal */}
      {showInvoiceModal && invoiceData && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-300 flex justify-between items-center bg-gray-100">
              <div className="flex items-center space-x-3">
                <div className="bg-[#7BC843] p-2 rounded-full">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Membership Invoice</h2>
              </div>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="text-gray-600 hover:text-gray-800 text-2xl"
              >
                <X />
              </button>
            </div>

            <div className="p-8">
              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Future Fitness</h1>
                  <p className="text-gray-600 mt-1">Your Path to a Healthier Tomorrow</p>
                  <p className="text-gray-600 mt-4">{invoiceData.branch} Branch</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-gray-800">INVOICE</p>
                  <p className="text-gray-600 mt-1">#{invoiceData.invoiceNumber}</p>
                  <p className="text-gray-600 mt-1">Date: {invoiceData.date}</p>
                </div>
              </div>

              {/* Member Information */}
              <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Member Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-gray-800 font-medium">{invoiceData.memberName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-800">{invoiceData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-800">{invoiceData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="text-gray-800">{invoiceData.gender}</p>
                  </div>
                </div>
              </div>

              {/* Membership Details */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Membership Details</h3>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Membership Plan</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{invoiceData.membershipPlan}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Assigned Trainer</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{invoiceData.trainer || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Start Date</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{invoiceData.startDate}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">End Date</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{invoiceData.endDate}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Information</h3>
                <div className="bg-gray-100 p-6 rounded-lg">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="text-gray-800 font-semibold">₹{invoiceData.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="text-gray-800">{invoiceData.paymentMethod || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Paid Amount:</span>
                    <span className="text-green-600 font-semibold">₹{invoiceData.paidAmount.toLocaleString()}</span>
                  </div>
                  {invoiceData.remainingAmount > 0 && (
                    <div className="flex justify-between pt-4 border-t border-gray-300">
                      <span className="text-gray-600 font-medium">Remaining Amount:</span>
                      <span className="text-red-600 font-semibold">₹{invoiceData.remainingAmount.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Print/Download Buttons */}
              <div className="mt-10 flex justify-end space-x-4">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors duration-200 font-medium flex items-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Invoice
                </button>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Class Modal */}
      {showCreateClassModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Create New Class</h2>
                <button 
                  onClick={() => setShowCreateClassModal(false)}
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
                    name="name"
                    value={newClass.name}
                    onChange={handleClassInputChange}
                    className={`w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-white ${classValidationErrors.name ? 'border-red-500' : ''}`}
                    placeholder="Enter class name"
                  />
                  {classValidationErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{classValidationErrors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Class Type</label>
                  <select 
                    name="type"
                    value={newClass.type}
                    onChange={handleClassInputChange}
                    className={`w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-white ${classValidationErrors.type ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select type</option>
                    <option value="Yoga">Yoga</option>
                    <option value="HIIT">HIIT</option>
                    <option value="Strength">Strength</option>
                    <option value="Dance">Dance</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Martial Arts">Martial Arts</option>
                    <option value="Pilates">Pilates</option>
                    <option value="CrossFit">CrossFit</option>
                  </select>
                  {classValidationErrors.type && (
                    <p className="text-red-500 text-xs mt-1">{classValidationErrors.type}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Trainer</label>
                  <select 
                    name="trainer"
                    value={newClass.trainer}
                    onChange={handleClassInputChange}
                    className={`w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-white ${classValidationErrors.trainer ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select trainer</option>
                    <option value="Sneha Reddy">Sneha Reddy</option>
                    <option value="Raj Singh">Raj Singh</option>
                    <option value="Vikash Kumar">Vikash Kumar</option>
                    <option value="Priya Sharma">Priya Sharma</option>
                  </select>
                  {classValidationErrors.trainer && (
                    <p className="text-red-500 text-xs mt-1">{classValidationErrors.trainer}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Room</label>
                  <select 
                    name="room"
                    value={newClass.room}
                    onChange={handleClassInputChange}
                    className={`w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-white ${classValidationErrors.room ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select room</option>
                    <option value="Studio A">Studio A</option>
                    <option value="Studio B">Studio B</option>
                    <option value="Gym Floor">Gym Floor</option>
                    <option value="Weight Room">Weight Room</option>
                    <option value="Spinning Room">Spinning Room</option>
                  </select>
                  {classValidationErrors.room && (
                    <p className="text-red-500 text-xs mt-1">{classValidationErrors.room}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newClass.date}
                    onChange={handleClassInputChange}
                    className={`w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-white ${classValidationErrors.date ? 'border-red-500' : ''}`}
                  />
                  {classValidationErrors.date && (
                    <p className="text-red-500 text-xs mt-1">{classValidationErrors.date}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={newClass.time}
                    onChange={handleClassInputChange}
                    className={`w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-white ${classValidationErrors.time ? 'border-red-500' : ''}`}
                  />
                  {classValidationErrors.time && (
                    <p className="text-red-500 text-xs mt-1">{classValidationErrors.time}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    value={newClass.duration}
                    onChange={handleClassInputChange}
                    className={`w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-white ${classValidationErrors.duration ? 'border-red-500' : ''}`}
                    placeholder="60"
                  />
                  {classValidationErrors.duration && (
                    <p className="text-red-500 text-xs mt-1">{classValidationErrors.duration}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Capacity</label>
                    <input
                      type="number"
                      name="capacity"
                      value={newClass.capacity}
                      onChange={handleClassInputChange}
                      className={`w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-white ${classValidationErrors.capacity ? 'border-red-500' : ''}`}
                      placeholder="20"
                    />
                    {classValidationErrors.capacity && (
                      <p className="text-red-500 text-xs mt-1">{classValidationErrors.capacity}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Branch</label>
                    <select 
                      name="branch"
                      value={newClass.branch}
                      onChange={handleClassInputChange}
                      className={`w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-white ${classValidationErrors.branch ? 'border-red-500' : ''}`}
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
                    {classValidationErrors.branch && (
                      <p className="text-red-500 text-xs mt-1">{classValidationErrors.branch}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
                <textarea
                  name="description"
                  value={newClass.description}
                  onChange={handleClassInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-white"
                  placeholder="Class description..."
                />
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  onClick={() => setShowCreateClassModal(false)}
                  className="px-6 py-3 border border-gray-600 text-gray-200 rounded-lg hover:bg-[#3a4148] transition-colors duration-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateClass}
                  className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium"
                >
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

export default Dashboard;