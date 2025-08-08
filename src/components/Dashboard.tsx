import React from 'react';
import { Users, UserCheck, IndianRupee , Calendar, AlertTriangle, TrendingUp, Activity, Clock } from 'lucide-react';

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
    color: 'bg-[#165D31]'
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
    title: "This Month's Revenue",
    value: '₹2,45,680',
    change: '+15%',
    trend: 'up',
    icon: IndianRupee ,
    color: 'bg-green-600'
  },
  {
    title: 'Upcoming Classes',
    value: '24',
    trend: 'neutral',
    icon: Calendar,
    color: 'bg-purple-600'
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
  { label: 'Register Member', color: 'bg-[#165D31] hover:bg-[#073418]', icon: Users },
  { label: 'Assign Trainer', color: 'bg-blue-600 hover:bg-blue-700', icon: UserCheck },
  { label: 'Create Class', color: 'bg-purple-600 hover:bg-purple-700', icon: Calendar }
];

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
              <TrendingUp className="h-5 w-5 text-[#165D31]" />
            </div>
            <div className="h-48 flex items-end justify-between space-x-2">
              {[65, 78, 82, 95, 87, 102, 115].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-[#165D31] rounded-t-sm transition-all duration-500 hover:bg-[#073418]"
                    style={{ height: `${height}px` }}
                  />
                  <span className="text-xs text-gray-300 mt-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Class Participation */}
          <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Class Participation</h3>
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div className="space-y-4">
              {[
                { name: 'Yoga', percentage: 85, color: 'bg-[#165D31]' },
                { name: 'Cardio', percentage: 92, color: 'bg-blue-600' },
                { name: 'Weight Training', percentage: 78, color: 'bg-purple-600' },
                { name: 'Zumba', percentage: 65, color: 'bg-pink-600' }
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-200">{item.name}</span>
                    <span className="text-gray-300">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${item.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Trends */}
          <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Attendance Trends</h3>
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div className="space-y-3">
              {[
                { day: 'Monday', count: 156, percentage: 78 },
                { day: 'Tuesday', count: 142, percentage: 71 },
                { day: 'Wednesday', count: 167, percentage: 84 },
                { day: 'Thursday', count: 134, percentage: 67 },
                { day: 'Friday', count: 189, percentage: 95 },
                { day: 'Saturday', count: 201, percentage: 100 },
                { day: 'Sunday', count: 98, percentage: 49 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-200 w-20">{item.day}</span>
                  <div className="flex-1 mx-3">
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-300 w-12 text-right">{item.count}</span>
                </div>
              ))}
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