import React, { useState } from 'react';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, Package, DollarSign, Users, Percent } from 'lucide-react';

const subscriptionPlans = [
  {
    id: 1,
    name: 'Basic Monthly',
    description: 'Perfect for beginners starting their fitness journey',
    price: 2500,
    duration: 'Monthly',
    features: ['Gym Access', 'Basic Equipment', 'Locker Facility'],
    isActive: true,
    subscribers: 45,
    discount: 0,
    color: 'border-gray-300'
  },
  {
    id: 2,
    name: 'Standard Monthly',
    description: 'Great for regular gym-goers with additional benefits',
    price: 3500,
    duration: 'Monthly',
    features: ['Gym Access', 'All Equipment', 'Group Classes', 'Personal Trainer (2 sessions)', 'Locker Facility'],
    isActive: true,
    subscribers: 78,
    discount: 10,
    color: 'border-blue-300'
  },
  {
    id: 3,
    name: 'Premium Monthly',
    description: 'Complete fitness package with premium amenities',
    price: 5000,
    duration: 'Monthly',
    features: ['Gym Access', 'All Equipment', 'Unlimited Group Classes', 'Personal Trainer (4 sessions)', 'Diet Consultation', 'Steam & Sauna', 'Premium Locker'],
    isActive: true,
    subscribers: 32,
    discount: 15,
    color: 'border-[#165D31]'
  },
  {
    id: 4,
    name: 'Basic Quarterly',
    description: '3-month basic plan with better value',
    price: 6500,
    duration: 'Quarterly',
    features: ['Gym Access', 'Basic Equipment', 'Locker Facility'],
    isActive: true,
    subscribers: 23,
    discount: 5,
    color: 'border-gray-300'
  },
  {
    id: 5,
    name: 'Premium Yearly',
    description: 'Best value premium plan for serious fitness enthusiasts',
    price: 45000,
    duration: 'Yearly',
    features: ['Gym Access', 'All Equipment', 'Unlimited Group Classes', 'Personal Trainer (50 sessions)', 'Nutrition Consultation', 'Steam & Sauna', 'Premium Locker', 'Guest Passes (4)', 'Priority Booking'],
    isActive: false,
    subscribers: 8,
    discount: 25,
    color: 'border-[#165D31]'
  }
];

const Subscriptions: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const togglePlanStatus = (planId: number) => {
    // In a real app, this would update the plan status in the backend
    console.log(`Toggling plan ${planId}`);
  };

  const getSubscriptionStats = () => {
    const totalPlans = subscriptionPlans.length;
    const activePlans = subscriptionPlans.filter(plan => plan.isActive).length;
    const totalSubscribers = subscriptionPlans.reduce((sum, plan) => sum + plan.subscribers, 0);
    const monthlyRevenue = subscriptionPlans
      .filter(plan => plan.isActive)
      .reduce((sum, plan) => {
        const monthlyPrice = plan.duration === 'Monthly' ? plan.price :
                           plan.duration === 'Quarterly' ? plan.price / 3 :
                           plan.price / 12;
        return sum + (monthlyPrice * plan.subscribers);
      }, 0);

    return { totalPlans, activePlans, totalSubscribers, monthlyRevenue };
  };

  const stats = getSubscriptionStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-[#7BC843] hover:bg-[#6AB732] text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create New Plan</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Plans</p>
              <p className="text-2xl font-bold text-white">{stats.totalPlans}</p>
            </div>
            <Package className="h-8 w-8 text-[#7BC843]" />
          </div>
        </div>
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Plans</p>
              <p className="text-2xl font-bold text-green-400">{stats.activePlans}</p>
            </div>
            <ToggleRight className="h-8 w-8 text-green-400" />
          </div>
        </div>
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Subscribers</p>
              <p className="text-2xl font-bold text-blue-400">{stats.totalSubscribers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Monthly Revenue</p>
              <p className="text-2xl font-bold text-[#7BC843]">₹{Math.round(stats.monthlyRevenue).toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-[#7BC843]" />
          </div>
        </div>
      </div>

      {/* Subscription Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => (
          <div key={plan.id} className={`bg-[#2A3037] rounded-xl shadow-sm border-2 ${plan.color === 'border-gray-300' ? 'border-gray-600' : plan.color === 'border-blue-300' ? 'border-blue-500' : 'border-[#7BC843]'} p-6 hover:shadow-md transition-all duration-200 ${!plan.isActive ? 'opacity-75' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                {plan.discount > 0 && (
                  <span className="bg-red-900 text-red-300 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Percent className="h-3 w-3 mr-1" />
                    {plan.discount}% OFF
                  </span>
                )}
              </div>
              <button
                onClick={() => togglePlanStatus(plan.id)}
                className="flex items-center"
              >
                {plan.isActive ? (
                  <ToggleRight className="h-6 w-6 text-green-400" />
                ) : (
                  <ToggleLeft className="h-6 w-6 text-gray-500" />
                )}
              </button>
            </div>

            <p className="text-gray-400 text-sm mb-4">{plan.description}</p>

            <div className="mb-6">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-white">₹{plan.price.toLocaleString()}</span>
                <span className="text-gray-400">/ {plan.duration}</span>
              </div>
              {plan.discount > 0 && (
                <div className="text-sm text-gray-400 mt-1">
                  <span className="line-through">₹{Math.round(plan.price / (1 - plan.discount / 100)).toLocaleString()}</span>
                  <span className="text-red-400 ml-2">Save ₹{Math.round(plan.price / (1 - plan.discount / 100) - plan.price).toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-white mb-2">Features:</h4>
              <ul className="space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-400 flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#7BC843] rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6 p-3 bg-[#23292F] rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Active Subscribers:</span>
                <span className="font-semibold text-white">{plan.subscribers}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setSelectedPlan(plan)}
                  className="p-2 text-gray-400 hover:text-blue-400 hover:bg-[#23292F] rounded-lg transition-colors duration-200"
                  title="Edit Plan"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#23292F] rounded-lg transition-colors duration-200" title="Delete Plan">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                plan.isActive ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'
              }`}>
                {plan.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Plan Modal */}
      {(showCreateModal || selectedPlan) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {selectedPlan ? 'Edit Plan' : 'Create New Plan'}
                </h2>
                <button 
                  onClick={() => {
                    setShowCreateModal(false);
                    setSelectedPlan(null);
                  }}
                  className="text-gray-400 hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Plan Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                    placeholder="Enter plan name"
                    defaultValue={selectedPlan?.name || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Duration</label>
                  <select className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent">
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Yearly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                    placeholder="Enter price"
                    defaultValue={selectedPlan?.price || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Discount (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                    placeholder="Enter discount percentage"
                    defaultValue={selectedPlan?.discount || 0}
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                  placeholder="Enter plan description"
                  defaultValue={selectedPlan?.description || ''}
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Features</label>
                <div className="space-y-2">
                  {['Gym Access', 'Basic Equipment', 'All Equipment', 'Group Classes', 'Personal Trainer Sessions', 'Diet Consultation', 'Steam & Sauna', 'Premium Locker', 'Guest Passes'].map((feature, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-600 bg-[#23292F] text-[#7BC843] focus:ring-[#7BC843]"
                        defaultChecked={selectedPlan?.features.includes(feature)}
                      />
                      <span className="ml-2 text-sm text-gray-400">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  className="rounded border-gray-600 bg-[#23292F] text-[#7BC843] focus:ring-[#7BC843]"
                  defaultChecked={selectedPlan?.isActive !== false}
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-400">
                  Plan is active and available for subscription
                </label>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  onClick={() => {
                    setShowCreateModal(false);
                    setSelectedPlan(null);
                  }}
                  className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-[#23292F] transition-colors duration-200"
                >
                  Cancel
                </button>
                <button className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium">
                  {selectedPlan ? 'Update Plan' : 'Create Plan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;