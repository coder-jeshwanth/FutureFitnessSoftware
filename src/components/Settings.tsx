import React, { useState } from 'react';
import { Save, Upload, Shield, CreditCard, Bell, Building, Users, Key, Globe, Smartphone } from 'lucide-react';

const AppSettings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');

  const sections = [
    { id: 'general', label: 'General Settings', icon: Building },
    { id: 'permissions', label: 'User Permissions', icon: Shield },
    { id: 'payments', label: 'Payment Settings', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'branches', label: 'Multi-Branch', icon: Building }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center space-y-4 sm:space-y-0">
        <button className="bg-[#7BC843] hover:bg-[#6AB732] text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
          <Save className="h-5 w-5" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-4">
          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    activeSection === section.id
                      ? 'bg-[#1A2026] text-[#7BC843] font-medium'
                      : 'text-gray-300 hover:bg-[#23292F] hover:text-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm">{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
          {activeSection === 'general' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-100">General Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Gym Name</label>
                  <input
                    type="text"
                    defaultValue="Future Fitness"
                    className="w-full px-4 py-3 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contact Email</label>
                  <input
                    type="email"
                    defaultValue="contact@fitprogym.com"
                    className="w-full px-4 py-3 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="+91 98765 43210"
                    className="w-full px-4 py-3 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Time Zone</label>
                  <select className="w-full px-4 py-3 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent">
                    <option>Asia/Kolkata (IST)</option>
                    <option>America/New_York (EST)</option>
                    <option>Europe/London (GMT)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                <textarea
                  rows={3}
                  defaultValue="123 Fitness Street, Mumbai, Maharashtra 400001"
                  className="w-full px-4 py-3 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Logo</label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[#7BC843] rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold text-xl">FP</span>
                  </div>
                  <button className="bg-[#23292F] hover:bg-[#1A2026] text-gray-300 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                    <Upload className="h-4 w-4" />
                    <span>Upload New Logo</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'permissions' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-100">User Permissions</h3>
              
              <div className="space-y-6">
                {[
                  { role: 'Admin', description: 'Full access to all features and settings' },
                  { role: 'Manager', description: 'Access to member management and reports' },
                  { role: 'Trainer', description: 'Access to assigned members and workout plans' },
                  { role: 'Receptionist', description: 'Basic access to member check-in and information' }
                ].map((role) => (
                  <div key={role.role} className="border border-gray-600 bg-[#23292F] rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-100">{role.role}</h4>
                        <p className="text-gray-400 text-sm">{role.description}</p>
                      </div>
                      <Users className="h-6 w-6 text-gray-400" />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        'View Dashboard',
                        'Manage Members',
                        'Manage Trainers',
                        'Manage Classes',
                        'View Reports',
                        'Manage Payments',
                        'System Settings',
                        'Export Data'
                      ].map((permission) => (
                        <label key={permission} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-600 bg-[#1A2026] text-[#7BC843] focus:ring-[#7BC843]"
                            defaultChecked={role.role === 'Admin' || (role.role === 'Manager' && !permission.includes('Settings'))}
                          />
                          <span className="ml-2 text-sm text-gray-300">{permission}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'payments' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-100">Payment Gateway Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-600 bg-[#23292F] rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-100">Razorpay</h4>
                    <div className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-600 bg-[#1A2026] text-[#7BC843] focus:ring-[#7BC843]" defaultChecked />
                      <span className="ml-2 text-sm text-gray-400">Enabled</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">API Key</label>
                      <input
                        type="password"
                        placeholder="Enter Razorpay API Key"
                        className="w-full px-4 py-3 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Secret Key</label>
                      <input
                        type="password"
                        placeholder="Enter Razorpay Secret Key"
                        className="w-full px-4 py-3 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="border border-gray-600 bg-[#23292F] rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-100">Stripe</h4>
                    <div className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-600 bg-[#1A2026] text-[#7BC843] focus:ring-[#7BC843]" />
                      <span className="ml-2 text-sm text-gray-400">Disabled</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Publishable Key</label>
                      <input
                        type="text"
                        placeholder="Enter Stripe Publishable Key"
                        className="w-full px-4 py-3 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Secret Key</label>
                      <input
                        type="password"
                        placeholder="Enter Stripe Secret Key"
                        className="w-full px-4 py-3 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-600 bg-[#23292F] rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-100 mb-4">Payment Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Default Currency</label>
                    <select className="w-full px-4 py-3 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent">
                      <option>INR (₹)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Late Payment Fee</label>
                    <input
                      type="number"
                      defaultValue="100"
                      className="w-full px-4 py-3 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-100">Notification Settings</h3>
              
              <div className="space-y-6">
                <div className="border border-gray-600 bg-[#23292F] rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-100 mb-4">Email Notifications</h4>
                  <div className="space-y-4">
                    {[
                      'Payment reminders',
                      'Membership expiry alerts',
                      'Class cancellations',
                      'New member welcome emails',
                      'Trainer assignment notifications'
                    ].map((notification) => (
                      <label key={notification} className="flex items-center justify-between">
                        <span className="text-gray-300">{notification}</span>
                        <input
                          type="checkbox"
                          className="rounded border-gray-600 bg-[#1A2026] text-[#7BC843] focus:ring-[#7BC843]"
                          defaultChecked
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-600 bg-[#23292F] rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-100 mb-4">SMS Notifications</h4>
                  <div className="space-y-4">
                    {[
                      'Payment due reminders',
                      'Class booking confirmations',
                      'Emergency announcements',
                      'Membership expiry warnings'
                    ].map((notification) => (
                      <label key={notification} className="flex items-center justify-between">
                        <span className="text-gray-300">{notification}</span>
                        <input
                          type="checkbox"
                          className="rounded border-gray-600 bg-[#1A2026] text-[#7BC843] focus:ring-[#7BC843]"
                          defaultChecked
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'integrations' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-100">Third-Party Integrations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-600 bg-[#23292F] rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-8 w-8 text-green-500" />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-100">WhatsApp Business</h4>
                        <p className="text-sm text-gray-400">Send notifications via WhatsApp</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-600 bg-[#1A2026] text-[#7BC843] focus:ring-[#7BC843]" />
                      <span className="ml-2 text-sm text-gray-400">Disabled</span>
                    </div>
                  </div>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                    Connect WhatsApp
                  </button>
                </div>

                <div className="border border-gray-600 bg-[#23292F] rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Key className="h-8 w-8 text-blue-500" />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-100">Biometric System</h4>
                        <p className="text-sm text-gray-400">Fingerprint check-in integration</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-600 bg-[#1A2026] text-[#7BC843] focus:ring-[#7BC843]" defaultChecked />
                      <span className="ml-2 text-sm text-gray-400">Enabled</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Device IP Address"
                      className="w-full px-4 py-2 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                    />
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                      Test Connection
                    </button>
                  </div>
                </div>

                <div className="border border-gray-600 bg-[#23292F] rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-8 w-8 text-purple-500" />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-100">CRM Integration</h4>
                        <p className="text-sm text-gray-400">Sync with external CRM systems</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-600 bg-[#1A2026] text-[#7BC843] focus:ring-[#7BC843]" />
                      <span className="ml-2 text-sm text-gray-400">Disabled</span>
                    </div>
                  </div>
                  <select className="w-full mb-3 px-4 py-2 bg-[#23292F] border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent">
                    <option>Select CRM Platform</option>
                    <option>Salesforce</option>
                    <option>HubSpot</option>
                    <option>Zoho CRM</option>
                  </select>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                    Configure CRM
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'branches' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-100">Multi-Branch Management</h3>
              
              <div className="border border-gray-600 bg-[#23292F] rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-100">Current Branches</h4>
                  <button className="bg-[#7BC843] hover:bg-[#6AB732] text-black px-4 py-2 rounded-lg transition-colors duration-200">
                    Add Branch
                  </button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: 'Main Branch - Mumbai', address: '123 Fitness Street, Mumbai', status: 'Active', members: 234 },
                    { name: 'Branch 2 - Pune', address: '456 Health Avenue, Pune', status: 'Active', members: 189 },
                    { name: 'Branch 3 - Delhi', address: '789 Wellness Road, Delhi', status: 'Inactive', members: 0 }
                  ].map((branch, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#1A2026] rounded-lg">
                      <div>
                        <h5 className="font-semibold text-gray-100">{branch.name}</h5>
                        <p className="text-sm text-gray-400">{branch.address}</p>
                        <p className="text-sm text-gray-400">Members: {branch.members}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          branch.status === 'Active' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'
                        }`}>
                          {branch.status}
                        </span>
                        <button className="text-[#7BC843] hover:text-[#6AB732] font-medium text-sm">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-600 bg-[#23292F] rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-100 mb-4">Branch Settings</h4>
                <div className="space-y-4">
                  <label className="flex items-center justify-between">
                    <span className="text-gray-300">Allow cross-branch membership access</span>
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 bg-[#1A2026] text-[#7BC843] focus:ring-[#7BC843]"
                      defaultChecked
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-300">Centralized payment processing</span>
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 bg-[#1A2026] text-[#7BC843] focus:ring-[#7BC843]"
                      defaultChecked
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-300">Unified reporting across branches</span>
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 bg-[#1A2026] text-[#7BC843] focus:ring-[#7BC843]"
                      defaultChecked
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-300">Branch-specific trainer assignments</span>
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 bg-[#1A2026] text-[#7BC843] focus:ring-[#7BC843]"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppSettings;