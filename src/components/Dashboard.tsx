import React from 'react';
import { Users, UserCheck, IndianRupee, Calendar, AlertTriangle, TrendingUp, Activity, Clock, UserRoundX } from 'lucide-react';
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

interface DashboardProps {
  selectedBranch: string;
}

const statsCards = [
  {
    title: 'Total Members',
    value: '1,247',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'bg-[#7BC843]'
  },
  {
    title: 'Active Members',
    value: '1,156',
    change: '+8%',
    trend: 'up',
    icon: UserCheck,
    color: 'bg-blue-600'
  },
   {
    title: 'InActive Members',
    value: '1,156',
    change: '+8%',
    trend: 'up',
    icon: UserRoundX,
    color: 'bg-yellow-600'
  },
  {
    title: "This Month's Revenue",
    value: '₹2,45,680',
    change: '+15%',
    trend: 'up',
    icon: IndianRupee ,
    color: 'bg-green-600'
  },
  {
    title: 'Pending Payments',
    value: '47',
    change: '-5%',
    trend: 'down',
    icon: AlertTriangle,
    color: 'bg-red-600'
  }
];

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
          title: function(context: any) {
            return `${context[0].label}`;
          },
          label: function(context: any) {
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
          callback: function(value: any) {
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
          label: function(context: any) {
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
                <div className={`text-sm font-medium ${
                  card.trend === 'up' ? 'text-green-600' : 
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
                        title: function(tooltipItems) {
                          return tooltipItems[0].label;
                        },
                        label: function(context) {
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
                        callback: function(value) {
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
    </div>
  );
};

export default Dashboard;