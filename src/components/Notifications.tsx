import React, { useState } from 'react';
import { Send, Bell, Mail, MessageSquare, Users, Calendar, CreditCard, Plus, Edit, Trash2, Search } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: 'Payment Reminder - Premium Plan',
    message: 'Your premium membership is due for renewal on Jan 20, 2025. Please complete the payment to continue enjoying our services.',
    recipients: ['Arjun Sharma', 'Priya Patel'],
    type: 'payment',
    status: 'sent',
    sentDate: '2025-01-15',
    channel: 'email'
  },
  {
    id: 2,
    title: 'New Yoga Class Available',
    message: 'We\'re excited to announce a new Morning Yoga class starting next week. Book your spot now!',
    recipients: ['All Yoga Members'],
    type: 'class',
    status: 'scheduled',
    sentDate: '2025-01-18',
    channel: 'sms'
  },
  {
    id: 3,
    title: 'Gym Maintenance Notice',
    message: 'The gym will be closed for maintenance on Sunday, Jan 21st from 8 AM to 12 PM. We apologize for any inconvenience.',
    recipients: ['All Members'],
    type: 'announcement',
    status: 'pending',
    sentDate: '2025-01-19',
    channel: 'both'
  },
  {
    id: 4,
    title: 'Membership Expiry Alert',
    message: 'Your membership will expire in 3 days. Renew now to avoid any interruption in your fitness journey.',
    recipients: ['Rohit Kumar', 'Amit Singh'],
    type: 'expiry',
    status: 'sent',
    sentDate: '2025-01-14',
    channel: 'email'
  }
];

const templates = [
  {
    id: 1,
    name: 'Payment Reminder',
    subject: 'Membership Payment Due',
    content: 'Dear {member_name}, your {plan_name} membership is due for renewal on {due_date}. Please complete the payment to continue enjoying our services.',
    type: 'payment'
  },
  {
    id: 2,
    name: 'Welcome New Member',
    subject: 'Welcome to FitPro Gym!',
    content: 'Welcome {member_name}! We\'re excited to have you join our fitness community. Your membership starts on {start_date}.',
    type: 'welcome'
  },
  {
    id: 3,
    name: 'Class Cancellation',
    subject: 'Class Cancelled - {class_name}',
    content: 'We regret to inform you that the {class_name} class scheduled for {class_date} at {class_time} has been cancelled. We apologize for any inconvenience.',
    type: 'class'
  },
  {
    id: 4,
    name: 'Membership Expiry',
    subject: 'Membership Expiring Soon',
    content: 'Dear {member_name}, your membership will expire on {expiry_date}. Renew now to continue your fitness journey without interruption.',
    type: 'expiry'
  }
];

const Notifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sent' | 'compose' | 'templates'>('sent');
  const [searchTerm, setSearchTerm] = useState('');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment': return <CreditCard className="h-4 w-4" />;
      case 'class': return <Calendar className="h-4 w-4" />;
      case 'announcement': return <Bell className="h-4 w-4" />;
      case 'expiry': return <Users className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'sms': return 'bg-green-100 text-green-800';
      case 'both': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="text-gray-600">Send messages and alerts to your members</p>
        </div>
        <button 
          onClick={() => setShowComposeModal(true)}
          className="bg-[#165D31] hover:bg-[#073418] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Compose Message</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('sent')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                activeTab === 'sent'
                  ? 'border-[#165D31] text-[#165D31]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>Sent Messages ({notifications.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('compose')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                activeTab === 'compose'
                  ? 'border-[#165D31] text-[#165D31]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Send className="h-4 w-4" />
              <span>Compose</span>
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                activeTab === 'templates'
                  ? 'border-[#165D31] text-[#165D31]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Templates ({templates.length})</span>
            </button>
          </nav>
        </div>

        {activeTab === 'sent' && (
          <div className="p-6">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent"
                />
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div key={notification.id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="bg-[#E7EFEA] p-2 rounded-lg">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}>
                            {notification.status}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getChannelColor(notification.channel)}`}>
                            {notification.channel}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{notification.message}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>To: {notification.recipients.join(', ')}</span>
                          <span>•</span>
                          <span>Sent: {notification.sentDate}</span>
                        </div>
                      </div>
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
              ))}
            </div>
          </div>
        )}

        {activeTab === 'compose' && (
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Compose New Message</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent">
                        <option>Payment Reminder</option>
                        <option>Class Update</option>
                        <option>General Announcement</option>
                        <option>Membership Expiry</option>
                        <option>Welcome Message</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent">
                        <option>All Members</option>
                        <option>Premium Members</option>
                        <option>Standard Members</option>
                        <option>Basic Members</option>
                        <option>Overdue Payments</option>
                        <option>Expiring Soon</option>
                        <option>Custom Selection</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Channel</label>
                      <div className="grid grid-cols-3 gap-3">
                        <label className="flex items-center">
                          <input type="radio" name="channel" value="email" className="text-[#165D31] focus:ring-[#165D31]" />
                          <span className="ml-2 text-sm">Email</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="channel" value="sms" className="text-[#165D31] focus:ring-[#165D31]" />
                          <span className="ml-2 text-sm">SMS</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="channel" value="both" className="text-[#165D31] focus:ring-[#165D31]" />
                          <span className="ml-2 text-sm">Both</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent"
                        placeholder="Enter message subject"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent"
                        placeholder="Type your message here..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Schedule (Optional)</label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="date"
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent"
                        />
                        <input
                          type="time"
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-2">Subject Line Preview</h4>
                      <p className="text-gray-600 mb-4">Your message subject will appear here...</p>
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-600">Your message content will be displayed here as members will see it.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button className="w-full bg-[#165D31] hover:bg-[#073418] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                      Send Now
                    </button>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                      Schedule Message
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                      Save as Draft
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-600">Subject: {template.subject}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      template.type === 'payment' ? 'bg-red-100 text-red-800' :
                      template.type === 'welcome' ? 'bg-green-100 text-green-800' :
                      template.type === 'class' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {template.type}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{template.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <button className="text-[#165D31] hover:text-[#073418] font-medium text-sm">
                      Use Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;