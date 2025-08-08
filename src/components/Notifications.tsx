import React, { useState, useEffect } from 'react';
import { Send, Bell, Mail, MessageSquare, Users, Calendar, CreditCard, Plus, Edit, Trash2, Search, Save } from 'lucide-react';

// Drafts array to store saved drafts
const drafts = [
  {
    id: 1,
    title: 'Monthly Newsletter Draft',
    subject: 'FutureFitness Monthly Update',
    message: 'This is a draft of our monthly newsletter with updates...',
    recipients: 'All Members',
    channel: 'email',
    lastSaved: '2025-08-07'
  }
];

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
  const [activeTab, setActiveTab] = useState<'sent' | 'compose' | 'templates' | 'drafts'>('sent');
  const [searchTerm, setSearchTerm] = useState('');
  const [messageType, setMessageType] = useState('Payment Reminder');
  const [messageRecipients, setMessageRecipients] = useState('All Members');
  const [messageChannel, setMessageChannel] = useState('email');
  const [messageSubject, setMessageSubject] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [draftsList, setDraftsList] = useState(drafts);
  const [selectedDraft, setSelectedDraft] = useState<number | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  // Update preview when message content changes
  const resetComposeForm = () => {
    setMessageType('Payment Reminder');
    setMessageRecipients('All Members');
    setMessageChannel('email');
    setMessageSubject('');
    setMessageContent('');
    setScheduleDate('');
    setScheduleTime('');
    setSelectedDraft(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-800 text-green-100';
      case 'scheduled': return 'bg-blue-800 text-blue-100';
      case 'pending': return 'bg-yellow-800 text-yellow-100';
      case 'failed': return 'bg-red-800 text-red-100';
      default: return 'bg-gray-800 text-gray-100';
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
      case 'email': return 'bg-blue-800 text-blue-100';
      case 'sms': return 'bg-green-800 text-green-100';
      case 'both': return 'bg-purple-800 text-purple-100';
      default: return 'bg-gray-800 text-gray-100';
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
        <button 
          onClick={() => {
            setActiveTab('compose');
            resetComposeForm();
          }}
          className="bg-[#7BC843] hover:bg-[#6AB732] text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Compose Message</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700">
        <div className="border-b border-gray-600">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('sent')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                activeTab === 'sent'
                  ? 'border-[#7BC843] text-[#7BC843]'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>Sent Messages ({notifications.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('compose')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                activeTab === 'compose'
                  ? 'border-[#7BC843] text-[#7BC843]'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              }`}
            >
              <Send className="h-4 w-4" />
              <span>Compose</span>
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                activeTab === 'templates'
                  ? 'border-[#7BC843] text-[#7BC843]'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Templates ({templates.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('drafts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                activeTab === 'drafts'
                  ? 'border-[#7BC843] text-[#7BC843]'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              }`}
            >
              <Save className="h-4 w-4" />
              <span>Drafts ({draftsList.length})</span>
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
                  className="w-full pl-10 pr-4 py-3 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                />
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div key={notification.id} className="border border-gray-700 rounded-lg p-6 bg-[#23292F] hover:bg-[#2D353F] transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="bg-[#1A2026] p-2 rounded-lg">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-100">{notification.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}>
                            {notification.status}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getChannelColor(notification.channel)}`}>
                            {notification.channel}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-3">{notification.message}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>To: {notification.recipients.join(', ')}</span>
                          <span>•</span>
                          <span>Sent: {notification.sentDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-[#1A2026] rounded-lg transition-colors duration-200">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#1A2026] rounded-lg transition-colors duration-200">
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
                  <h3 className="text-lg font-semibold text-gray-100 mb-4">Compose New Message</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Message Type</label>
                      <select 
                        className="w-full px-4 py-3 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        value={messageType}
                        onChange={(e) => setMessageType(e.target.value)}
                      >
                        <option>Payment Reminder</option>
                        <option>Class Update</option>
                        <option>General Announcement</option>
                        <option>Membership Expiry</option>
                        <option>Welcome Message</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Recipients</label>
                      <select 
                        className="w-full px-4 py-3 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        value={messageRecipients}
                        onChange={(e) => setMessageRecipients(e.target.value)}
                      >
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
                      <label className="block text-sm font-medium text-gray-300 mb-2">Channel</label>
                      <div className="grid grid-cols-3 gap-3">
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            name="channel" 
                            value="email" 
                            checked={messageChannel === 'email'}
                            onChange={() => setMessageChannel('email')}
                            className="text-[#7BC843] focus:ring-[#7BC843]" 
                          />
                          <span className="ml-2 text-sm text-gray-200">Email</span>
                        </label>
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            name="channel" 
                            value="sms" 
                            checked={messageChannel === 'sms'}
                            onChange={() => setMessageChannel('sms')}
                            className="text-[#7BC843] focus:ring-[#7BC843]" 
                          />
                          <span className="ml-2 text-sm text-gray-200">SMS</span>
                        </label>
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            name="channel" 
                            value="both"
                            checked={messageChannel === 'both'}
                            onChange={() => setMessageChannel('both')} 
                            className="text-[#7BC843] focus:ring-[#7BC843]" 
                          />
                          <span className="ml-2 text-sm text-gray-200">Both</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                      <input
                        type="text"
                        value={messageSubject}
                        onChange={(e) => setMessageSubject(e.target.value)}
                        className="w-full px-4 py-3 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        placeholder="Enter message subject"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                      <textarea
                        rows={6}
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        className="w-full px-4 py-3 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        placeholder="Type your message here..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Schedule (Optional)</label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="date"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          className="px-4 py-3 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        />
                        <input
                          type="time"
                          value={scheduleTime}
                          onChange={(e) => setScheduleTime(e.target.value)}
                          className="px-4 py-3 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-4">Preview</h3>
                  <div className="bg-[#23292F] rounded-lg p-6 border border-gray-600">
                    <div className="bg-[#2A3037] rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-gray-100 mb-2">Subject Line Preview</h4>
                      <p className="text-gray-300 mb-4">{messageSubject || 'Your message subject will appear here...'}</p>
                      <div className="border-t border-gray-600 pt-4">
                        <p className="text-gray-300">{messageContent || 'Your message content will be displayed here as members will see it.'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button 
                      onClick={() => {
                        alert('Message sent successfully!');
                        resetComposeForm();
                        setActiveTab('sent');
                      }}
                      className="w-full bg-[#7BC843] hover:bg-[#6AB732] text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Send Now
                    </button>
                    <button 
                      onClick={() => {
                        if (!scheduleDate || !scheduleTime) {
                          alert('Please select both date and time for scheduling');
                          return;
                        }
                        alert(`Message scheduled for ${scheduleDate} at ${scheduleTime}`);
                        resetComposeForm();
                        setActiveTab('sent');
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Schedule Message
                    </button>
                    <button 
                      onClick={() => {
                        const newDraft = {
                          id: draftsList.length + 1,
                          title: messageSubject || 'Untitled Draft',
                          subject: messageSubject,
                          message: messageContent,
                          recipients: messageRecipients,
                          channel: messageChannel,
                          lastSaved: new Date().toISOString().split('T')[0]
                        };
                        setDraftsList([...draftsList, newDraft]);
                        alert('Draft saved successfully!');
                        setActiveTab('drafts');
                      }}
                      className="w-full border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-[#23292F] transition-colors duration-200"
                    >
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
                <div key={template.id} className="border border-gray-600 bg-[#23292F] rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-100 mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-300">Subject: {template.subject}</p>
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
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{template.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-[#1A2026] rounded-lg transition-colors duration-200">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#1A2026] rounded-lg transition-colors duration-200">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <button 
                      onClick={() => {
                        setActiveTab('compose');
                        setMessageType(template.type);
                        setMessageSubject(template.subject);
                        setMessageContent(template.content);
                      }}
                      className="text-[#7BC843] hover:text-[#6AB732] font-medium text-sm"
                    >
                      Use Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'drafts' && (
          <div className="p-6">
            <div className="space-y-4">
              {draftsList.length === 0 ? (
                <div className="text-center p-8 border border-dashed border-gray-600 rounded-lg">
                  <p className="text-gray-400">No drafts saved yet</p>
                </div>
              ) : (
                draftsList.map((draft) => (
                  <div key={draft.id} className="border border-gray-700 rounded-lg p-6 bg-[#23292F] hover:bg-[#2D353F] transition-colors duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="bg-[#1A2026] p-2 rounded-lg">
                          <Save className="h-4 w-4 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-100">{draft.title || "Untitled Draft"}</h3>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300">
                              Draft
                            </span>
                          </div>
                          <p className="text-gray-300 mb-3">{draft.message ? (draft.message.length > 100 ? draft.message.substring(0, 100) + '...' : draft.message) : 'No content'}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>To: {draft.recipients}</span>
                            <span>•</span>
                            <span>Last saved: {draft.lastSaved}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => {
                            setActiveTab('compose');
                            setMessageSubject(draft.subject || '');
                            setMessageContent(draft.message || '');
                            setMessageChannel(draft.channel || 'email');
                            setMessageRecipients(draft.recipients || 'All Members');
                          }}
                          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-[#1A2026] rounded-lg transition-colors duration-200"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this draft?')) {
                              setDraftsList(draftsList.filter(d => d.id !== draft.id));
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#1A2026] rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;