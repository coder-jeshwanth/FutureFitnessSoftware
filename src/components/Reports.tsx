import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download, Filter, Calendar, Users, DollarSign, Activity } from 'lucide-react';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [reportType, setReportType] = useState('overview');

  const revenueData = [
    { month: 'Jan', revenue: 245680, members: 156 },
    { month: 'Feb', revenue: 289340, members: 172 },
    { month: 'Mar', revenue: 325120, members: 189 },
    { month: 'Apr', revenue: 378900, members: 203 },
    { month: 'May', revenue: 425600, members: 218 },
    { month: 'Jun', revenue: 456780, members: 234 }
  ];

  const attendanceData = [
    { day: 'Mon', count: 156 },
    { day: 'Tue', count: 142 },
    { day: 'Wed', count: 167 },
    { day: 'Thu', count: 134 },
    { day: 'Fri', count: 189 },
    { day: 'Sat', count: 201 },
    { day: 'Sun', count: 98 }
  ];

  const membershipData = [
    { plan: 'Premium', count: 89, percentage: 38 },
    { plan: 'Standard', count: 76, percentage: 32 },
    { plan: 'Basic', count: 69, percentage: 30 }
  ];

  const getReportStats = () => {
    const totalRevenue = revenueData.reduce((sum, data) => sum + data.revenue, 0);
    const totalMembers = 234;
    const avgAttendance = Math.round(attendanceData.reduce((sum, data) => sum + data.count, 0) / 7);
    const membershipGrowth = 15.2;

    return { totalRevenue, totalMembers, avgAttendance, membershipGrowth };
  };

  const stats = getReportStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600">Comprehensive insights and analytics for your gym</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="bg-[#165D31] hover:bg-[#073418] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">₹{stats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+12.5% from last period</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Members</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalMembers}</p>
              <p className="text-sm text-green-600 mt-1">+{stats.membershipGrowth}% growth</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg. Daily Attendance</p>
              <p className="text-2xl font-bold text-[#165D31]">{stats.avgAttendance}</p>
              <p className="text-sm text-green-600 mt-1">+8.3% from last week</p>
            </div>
            <Activity className="h-8 w-8 text-[#165D31]" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Revenue Per Member</p>
              <p className="text-2xl font-bold text-purple-600">₹{Math.round(stats.totalRevenue / stats.totalMembers).toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+5.2% increase</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'revenue', label: 'Revenue Analysis', icon: DollarSign },
              { id: 'membership', label: 'Membership Trends', icon: Users },
              { id: 'attendance', label: 'Attendance Patterns', icon: Activity }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setReportType(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                    reportType === tab.id
                      ? 'border-[#165D31] text-[#165D31]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {reportType === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Chart */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {revenueData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="text-xs text-gray-600 mb-2">₹{(data.revenue / 1000).toFixed(0)}k</div>
                      <div 
                        className="w-full bg-[#165D31] rounded-t-md transition-all duration-500 hover:bg-[#073418]"
                        style={{ height: `${(data.revenue / 500000) * 200}px` }}
                      />
                      <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Membership Distribution */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Distribution</h3>
                <div className="space-y-4">
                  {membershipData.map((data, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{data.plan}</span>
                        <span className="text-gray-500">{data.count} members ({data.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            index === 0 ? 'bg-[#165D31]' : 
                            index === 1 ? 'bg-blue-600' : 'bg-gray-600'
                          }`}
                          style={{ width: `${data.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {reportType === 'revenue' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-green-800 mb-2">This Month</h4>
                  <p className="text-2xl font-bold text-green-600">₹4,56,780</p>
                  <p className="text-sm text-green-600">+15.2% vs last month</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-2">This Quarter</h4>
                  <p className="text-2xl font-bold text-blue-600">₹12,89,340</p>
                  <p className="text-sm text-blue-600">+22.8% vs last quarter</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <h4 className="font-semibold text-purple-800 mb-2">This Year</h4>
                  <p className="text-2xl font-bold text-purple-600">₹45,67,890</p>
                  <p className="text-sm text-purple-600">+18.5% vs last year</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Plan Type</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Plan Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Subscribers</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Monthly Revenue</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">% of Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-4">Premium Plans</td>
                        <td className="py-3 px-4">89</td>
                        <td className="py-3 px-4">₹4,45,000</td>
                        <td className="py-3 px-4">52.3%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Standard Plans</td>
                        <td className="py-3 px-4">76</td>
                        <td className="py-3 px-4">₹2,66,000</td>
                        <td className="py-3 px-4">31.2%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Basic Plans</td>
                        <td className="py-3 px-4">69</td>
                        <td className="py-3 px-4">₹1,72,500</td>
                        <td className="py-3 px-4">16.5%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {reportType === 'membership' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">New Memberships vs Renewals</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <span className="text-green-800 font-medium">New Memberships</span>
                      <span className="text-2xl font-bold text-green-600">45</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <span className="text-blue-800 font-medium">Renewals</span>
                      <span className="text-2xl font-bold text-blue-600">78</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <span className="text-red-800 font-medium">Cancellations</span>
                      <span className="text-2xl font-bold text-red-600">12</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Retention Rate</h3>
                  <div className="text-center p-8">
                    <div className="inline-flex items-center justify-center w-32 h-32 bg-[#E7EFEA] rounded-full mb-4">
                      <span className="text-4xl font-bold text-[#165D31]">87%</span>
                    </div>
                    <p className="text-gray-600">Monthly retention rate</p>
                    <p className="text-sm text-green-600 mt-2">+3.2% improvement</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Growth Trend</h3>
                <div className="h-48 flex items-end justify-between space-x-2">
                  {revenueData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="text-xs text-gray-600 mb-2">{data.members}</div>
                      <div 
                        className="w-full bg-blue-600 rounded-t-md transition-all duration-500 hover:bg-blue-700"
                        style={{ height: `${(data.members / 250) * 150}px` }}
                      />
                      <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {reportType === 'attendance' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Attendance Pattern</h3>
                  <div className="h-48 flex items-end justify-between space-x-2">
                    {attendanceData.map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="text-xs text-gray-600 mb-2">{data.count}</div>
                        <div 
                          className="w-full bg-[#165D31] rounded-t-md transition-all duration-500 hover:bg-[#073418]"
                          style={{ height: `${(data.count / 250) * 150}px` }}
                        />
                        <span className="text-xs text-gray-500 mt-2">{data.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Peak Hours Analysis</h3>
                  <div className="space-y-3">
                    {[
                      { time: '6:00 - 8:00 AM', count: 45, percentage: 89 },
                      { time: '8:00 - 10:00 AM', count: 32, percentage: 64 },
                      { time: '6:00 - 8:00 PM', count: 52, percentage: 100 },
                      { time: '8:00 - 10:00 PM', count: 38, percentage: 73 }
                    ].map((slot, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{slot.time}</span>
                          <span className="text-gray-500">{slot.count} members</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#165D31] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${slot.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Attendance Rates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { class: 'Yoga', rate: 92, color: 'bg-purple-600' },
                    { class: 'HIIT', rate: 87, color: 'bg-red-600' },
                    { class: 'Strength', rate: 78, color: 'bg-blue-600' },
                    { class: 'Zumba', rate: 85, color: 'bg-pink-600' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-gray-900 mb-2">{item.class}</h4>
                      <div className={`inline-flex items-center justify-center w-16 h-16 ${item.color} rounded-full mb-2`}>
                        <span className="text-white font-bold">{item.rate}%</span>
                      </div>
                      <p className="text-sm text-gray-600">Attendance Rate</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;