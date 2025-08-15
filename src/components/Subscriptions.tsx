import React, { useState, useEffect } from 'react';
import { Plus, Package, Users, Percent, MapPin, 
         Edit, Filter, ChevronDown, X, TrendingUp, TrendingDown } from 'lucide-react';

// Custom styles with fitness-themed gradients
const customStyles = `
  @keyframes countUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(123, 200, 67, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(123, 200, 67, 0.6), 0 0 30px rgba(123, 200, 67, 0.4);
    }
  }
  
  .fitness-gradient-1 {
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.8) 100%);
  }
  
  .fitness-gradient-2 {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%),
                linear-gradient(45deg, rgba(42, 48, 55, 0.95) 0%, rgba(55, 65, 81, 0.95) 100%);
  }
  
  .fitness-gradient-3 {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%),
                linear-gradient(45deg, rgba(42, 48, 55, 0.95) 0%, rgba(55, 65, 81, 0.95) 100%);
  }
  
  .animate-number {
    animation: countUp 0.8s ease-out forwards;
  }
  
  .hover-glow:hover {
    animation: glow 2s infinite;
    transform: scale(1.02);
    transition: all 0.3s ease-in-out;
  }
  
  .card-hover-effect {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .card-hover-effect:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 20px rgba(123, 200, 67, 0.3);
  }
  
  .discount-tag {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }
`;

// Branch-specific pricing structure
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
    '1 month': { price: 2000, discounted: null },
    '3 months': { price: 7000, discounted: 5000 },
    '6 months': { price: 9000, discounted: 7500 },
    '1 year': { price: 14000, discounted: 10000 }
  }
};

interface SubscriptionsProps {
  selectedBranch?: string;
}

const Subscriptions: React.FC<SubscriptionsProps> = ({ selectedBranch: propSelectedBranch = 'All Branches' }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [selectedBranch, setSelectedBranch] = useState(propSelectedBranch);
  const [subscriptionPlans, setSubscriptionPlans] = useState<any[]>([]);
  const [animateNumbers, setAnimateNumbers] = useState(false);
  const [filterBy, setFilterBy] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [planToToggle, setPlanToToggle] = useState<any>(null);
  
  // Modal form state
  const [modalFeatures, setModalFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');
  const [modalSelectedBranch, setModalSelectedBranch] = useState('');
  const [modalPrice, setModalPrice] = useState<number>(0);
  const [modalDiscount, setModalDiscount] = useState<number>(0);

  // Reset modal form when modal opens/closes
  useEffect(() => {
    if (showCreateModal || selectedPlan) {
      setModalFeatures(selectedPlan?.features || []);
      setModalSelectedBranch(selectedPlan?.branchName || Object.keys(branchPricing)[0]);
      setNewFeature('');
      setModalPrice(selectedPlan?.originalPrice || selectedPlan?.price || 0);
      setModalDiscount(selectedPlan?.discount || 0);
    }
  }, [showCreateModal, selectedPlan]);

  // Feature management functions
  const addFeature = () => {
    const trimmedFeature = newFeature.trim();
    if (trimmedFeature && !modalFeatures.includes(trimmedFeature)) {
      setModalFeatures([...modalFeatures, trimmedFeature]);
      setNewFeature('');
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setModalFeatures(modalFeatures.filter(feature => feature !== featureToRemove));
  };

  const handleFeatureKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFeature();
    }
  };

  // Calculate discounted price
  const calculateDiscountedPrice = () => {
    if (modalPrice && modalDiscount > 0) {
      return modalPrice - (modalPrice * modalDiscount / 100);
    }
    return modalPrice;
  };

  // Toggle plan active status
  const togglePlanStatus = (planId: number) => {
    const plan = subscriptionPlans.find(p => p.id === planId);
    if (plan) {
      setPlanToToggle(plan);
      setShowConfirmModal(true);
    }
  };

  // Confirm status toggle
  const confirmToggle = () => {
    if (planToToggle) {
      setSubscriptionPlans(prevPlans => 
        prevPlans.map(plan => 
          plan.id === planToToggle.id 
            ? { ...plan, isActive: !plan.isActive }
            : plan
        )
      );
      setShowConfirmModal(false);
      setPlanToToggle(null);
    }
  };

  // Cancel status toggle
  const cancelToggle = () => {
    setShowConfirmModal(false);
    setPlanToToggle(null);
  };

  // Inject custom styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = customStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  // Trigger number animation when branch changes
  useEffect(() => {
    setAnimateNumbers(false);
    const timer = setTimeout(() => setAnimateNumbers(true), 100);
    return () => clearTimeout(timer);
  }, [selectedBranch]);

  // Update local branch when prop changes
  useEffect(() => {
    setSelectedBranch(propSelectedBranch);
  }, [propSelectedBranch]);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (!target.closest('.filter-dropdown')) {
        setShowFilterDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Generate subscription plans based on selected branch
  const generatePlansForBranch = (branchName: string) => {
    if (branchName === 'All Branches') {
      // Show all branches' subscriptions grouped by branch
      const allPlans: any[] = [];
      let planId = 1;
      
      Object.keys(branchPricing).forEach((branch) => {
        const pricing = branchPricing[branch as keyof typeof branchPricing];
        
        // Add plans for each branch
        const branchPlans = [
          {
            id: planId++,
            name: `${branch} - Monthly Plan`,
            description: `1-month membership at ${branch} branch`,
            price: pricing['1 month'].price,
            originalPrice: pricing['1 month'].discounted,
            duration: '1 month',
            features: ['Gym Access', 'Basic Equipment', 'Locker Facility'],
            isActive: true,
            subscribers: Math.floor(Math.random() * 50) + 20,
            discount: 0,
            color: 'border-gray-300',
            branchName: branch
          },
          {
            id: planId++,
            name: `${branch} - Quarterly Plan`,
            description: `3-month membership at ${branch} branch with savings`,
            price: pricing['3 months'].discounted || pricing['3 months'].price,
            originalPrice: pricing['3 months'].discounted ? pricing['3 months'].price : null,
            duration: '3 months',
            features: ['Gym Access', 'All Equipment', 'Group Classes', 'Personal Trainer (6 sessions)', 'Locker Facility'],
            isActive: true,
            subscribers: Math.floor(Math.random() * 80) + 40,
            discount: pricing['3 months'].discounted ? Math.round(((pricing['3 months'].price - pricing['3 months'].discounted) / pricing['3 months'].price) * 100) : 0,
            color: 'border-blue-300',
            branchName: branch
          },
          {
            id: planId++,
            name: `${branch} - Half-Yearly Plan`,
            description: `6-month membership at ${branch} branch with significant savings`,
            price: pricing['6 months'].discounted || pricing['6 months'].price,
            originalPrice: pricing['6 months'].discounted ? pricing['6 months'].price : null,
            duration: '6 months',
            features: ['Gym Access', 'All Equipment', 'Unlimited Group Classes', 'Personal Trainer (12 sessions)', 'Diet Consultation', 'Steam & Sauna', 'Premium Locker'],
            isActive: true,
            subscribers: Math.floor(Math.random() * 40) + 15,
            discount: pricing['6 months'].discounted ? Math.round(((pricing['6 months'].price - pricing['6 months'].discounted) / pricing['6 months'].price) * 100) : 0,
            color: 'border-[#165D31]',
            branchName: branch
          },
          {
            id: planId++,
            name: `${branch} - Annual Plan`,
            description: `Best value yearly membership at ${branch} branch`,
            price: pricing['1 year'].discounted || pricing['1 year'].price,
            originalPrice: pricing['1 year'].discounted ? pricing['1 year'].price : null,
            duration: '1 year',
            features: ['Gym Access', 'All Equipment', 'Unlimited Group Classes', 'Personal Trainer (50 sessions)', 'Nutrition Consultation', 'Steam & Sauna', 'Premium Locker', 'Guest Passes (4)', 'Priority Booking'],
            isActive: true,
            subscribers: Math.floor(Math.random() * 30) + 10,
            discount: pricing['1 year'].discounted ? Math.round(((pricing['1 year'].price - pricing['1 year'].discounted) / pricing['1 year'].price) * 100) : 0,
            color: 'border-[#165D31]',
            branchName: branch
          }
        ];
        
        allPlans.push(...branchPlans);
      });
      
      return allPlans;
    }

    // Get pricing for specific branch
    const pricing = branchPricing[branchName as keyof typeof branchPricing];
    if (!pricing) return [];

    return [
      {
        id: 1,
        name: 'Monthly Plan',
        description: 'Perfect for beginners starting their fitness journey',
        price: pricing['1 month'].price,
        originalPrice: pricing['1 month'].discounted,
        duration: '1 month',
        features: ['Gym Access', 'Basic Equipment', 'Locker Facility'],
        isActive: true,
        subscribers: 45,
        discount: 0,
        color: 'border-gray-300',
        branchName: branchName
      },
      {
        id: 2,
        name: 'Quarterly Plan',
        description: '3-month plan with better value and savings',
        price: pricing['3 months'].discounted || pricing['3 months'].price,
        originalPrice: pricing['3 months'].discounted ? pricing['3 months'].price : null,
        duration: '3 months',
        features: ['Gym Access', 'All Equipment', 'Group Classes', 'Personal Trainer (6 sessions)', 'Locker Facility'],
        isActive: true,
        subscribers: 78,
        discount: pricing['3 months'].discounted ? Math.round(((pricing['3 months'].price - pricing['3 months'].discounted) / pricing['3 months'].price) * 100) : 0,
        color: 'border-blue-300',
        branchName: branchName
      },
      {
        id: 3,
        name: 'Half-Yearly Plan',
        description: '6-month plan with significant savings',
        price: pricing['6 months'].discounted || pricing['6 months'].price,
        originalPrice: pricing['6 months'].discounted ? pricing['6 months'].price : null,
        duration: '6 months',
        features: ['Gym Access', 'All Equipment', 'Unlimited Group Classes', 'Personal Trainer (12 sessions)', 'Diet Consultation', 'Steam & Sauna', 'Premium Locker'],
        isActive: true,
        subscribers: 32,
        discount: pricing['6 months'].discounted ? Math.round(((pricing['6 months'].price - pricing['6 months'].discounted) / pricing['6 months'].price) * 100) : 0,
        color: 'border-[#165D31]',
        branchName: branchName
      },
      {
        id: 4,
        name: 'Annual Plan',
        description: 'Best value yearly plan for serious fitness enthusiasts',
        price: pricing['1 year'].discounted || pricing['1 year'].price,
        originalPrice: pricing['1 year'].discounted ? pricing['1 year'].price : null,
        duration: '1 year',
        features: ['Gym Access', 'All Equipment', 'Unlimited Group Classes', 'Personal Trainer (50 sessions)', 'Nutrition Consultation', 'Steam & Sauna', 'Premium Locker', 'Guest Passes (4)', 'Priority Booking'],
        isActive: true,
        subscribers: 25,
        discount: pricing['1 year'].discounted ? Math.round(((pricing['1 year'].price - pricing['1 year'].discounted) / pricing['1 year'].price) * 100) : 0,
        color: 'border-[#165D31]',
        branchName: branchName
      }
    ];
  };

  // Update plans when branch changes
  useEffect(() => {
    const plans = generatePlansForBranch(selectedBranch);
    setSubscriptionPlans(plans);
  }, [selectedBranch]);

  // Filter plans based on selected filter
  const getFilteredPlans = () => {
    if (filterBy === 'all') return subscriptionPlans;
    
    return subscriptionPlans.filter(plan => {
      switch (filterBy) {
        case 'monthly':
          return plan.duration === '1 month';
        case 'quarterly':
          return plan.duration === '3 months';
        case 'halfyearly':
          return plan.duration === '6 months';
        case 'yearly':
          return plan.duration === '1 year';
        case 'discounted':
          return plan.discount > 0;
        case 'active':
          return plan.isActive;
        case 'inactive':
          return !plan.isActive;
        default:
          return true;
      }
    });
  };

  const filteredPlans = getFilteredPlans();

  const getSubscriptionStats = () => {
    const totalPlans = subscriptionPlans.length;
    const activePlans = subscriptionPlans.filter(plan => plan.isActive).length;
    const totalSubscribers = subscriptionPlans.reduce((sum, plan) => sum + plan.subscribers, 0);

    // Calculate breakdown by duration
    const monthlyCount = subscriptionPlans.filter(plan => plan.duration === '1 month').reduce((sum, plan) => sum + plan.subscribers, 0);
    const quarterlyCount = subscriptionPlans.filter(plan => plan.duration === '3 months').reduce((sum, plan) => sum + plan.subscribers, 0);
    const halfYearlyCount = subscriptionPlans.filter(plan => plan.duration === '6 months').reduce((sum, plan) => sum + plan.subscribers, 0);
    const yearlyCount = subscriptionPlans.filter(plan => plan.duration === '1 year').reduce((sum, plan) => sum + plan.subscribers, 0);

    const breakdown = [
      { 
        type: 'Monthly', 
        count: monthlyCount, 
        percentage: totalSubscribers > 0 ? (monthlyCount / totalSubscribers * 100) : 0,
        color: 'bg-blue-500',
        trend: Math.random() > 0.5 ? 'up' : 'down',
        change: (Math.random() * 10).toFixed(1)
      },
      { 
        type: 'Quarterly', 
        count: quarterlyCount, 
        percentage: totalSubscribers > 0 ? (quarterlyCount / totalSubscribers * 100) : 0,
        color: 'bg-emerald-500',
        trend: Math.random() > 0.5 ? 'up' : 'down',
        change: (Math.random() * 10).toFixed(1)
      },
      { 
        type: 'Half-Yearly', 
        count: halfYearlyCount, 
        percentage: totalSubscribers > 0 ? (halfYearlyCount / totalSubscribers * 100) : 0,
        color: 'bg-purple-500',
        trend: Math.random() > 0.5 ? 'up' : 'down',
        change: (Math.random() * 10).toFixed(1)
      },
      { 
        type: 'Yearly', 
        count: yearlyCount, 
        percentage: totalSubscribers > 0 ? (yearlyCount / totalSubscribers * 100) : 0,
        color: 'bg-orange-500',
        trend: Math.random() > 0.5 ? 'up' : 'down',
        change: (Math.random() * 10).toFixed(1)
      }
    ];

    return { 
      totalPlans, 
      activePlans, 
      totalSubscribers, 
      breakdown
    };
  };

  const stats = getSubscriptionStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div></div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Total Plans Card */}
        <div className="bg-gradient-to-br from-[#1a2332] via-[#1f2937] to-[#0f172a] rounded-2xl shadow-2xl border border-gray-700/50 p-6 hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:border-[#7BC843]/30 group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-2 h-2 bg-[#7BC843] rounded-full animate-pulse"></div>
                <p className="text-gray-300 text-sm font-semibold tracking-wide uppercase">Total Plans</p>
              </div>
              <p className={`text-3xl font-black text-white mb-2 leading-none ${animateNumbers ? 'animate-number' : ''}`}>
                {stats.totalPlans}
              </p>
              <p className="text-xs text-gray-400 font-medium">Active subscription types</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-[#7BC843] to-[#5da832] rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Package className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        
        {/* Subscription Duration Breakdown Card */}
        <div className="bg-gradient-to-br from-[#1a2332] via-[#1f2937] to-[#0f172a] rounded-2xl shadow-2xl border border-gray-700/50 p-6 hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:border-indigo-500/30 group">
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
              <h3 className="text-gray-300 text-sm font-semibold tracking-wide uppercase">Subscription Breakdown</h3>
            </div>
            <p className="text-xs text-gray-400 font-medium">Distribution by duration</p>
          </div>
          
          <div className="space-y-3">
            {stats.breakdown.map((item, index) => {
              const maxPercentage = Math.max(...stats.breakdown.map(b => b.percentage));
              const barWidth = maxPercentage > 0 ? (item.percentage / maxPercentage) * 100 : 0;
              
              return (
                <div key={index} className="group/bar">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-medium text-gray-300">{item.type}</span>
                      <div className="flex items-center space-x-1">
                        {item.trend === 'up' ? (
                          <TrendingUp className="h-2 w-2 text-green-400" />
                        ) : (
                          <TrendingDown className="h-2 w-2 text-red-400" />
                        )}
                        <span className={`text-xs ${item.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                          {item.change}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-white">{item.count}</span>
                      <span className="text-xs text-gray-400 ml-1">({item.percentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                  
                  <div className="relative h-2 bg-gray-700/50 rounded-full overflow-hidden">
                    <div 
                      className={`absolute left-0 top-0 h-full ${item.color} rounded-full transition-all duration-700 ease-out group-hover/bar:brightness-110`}
                      style={{ width: `${barWidth}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-full"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Total Subscribers Card */}
        <div className="bg-gradient-to-br from-[#1a2332] via-[#1f2937] to-[#0f172a] rounded-2xl shadow-2xl border border-gray-700/50 p-6 hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:border-purple-500/30 group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <p className="text-gray-300 text-sm font-semibold tracking-wide uppercase">Total Subscribers</p>
              </div>
              <p className={`text-3xl font-black text-white mb-2 leading-none ${animateNumbers ? 'animate-number' : ''}`}>
                {stats.totalSubscribers}
              </p>
              <p className="text-xs text-gray-400 font-medium">Across all plans</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Plans Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {selectedBranch === 'All Branches' ? 'All Branch Plans' : `${selectedBranch} Plans`}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Showing {filteredPlans.length} subscription plan{filteredPlans.length !== 1 ? 's' : ''}
            {selectedBranch === 'All Branches' && ` across ${Object.keys(branchPricing).length} branches`}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Filter Dropdown */}
          <div className="relative filter-dropdown">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center space-x-2 px-4 py-2 bg-[#2A3037] text-gray-300 rounded-lg hover:bg-[#3A4049] transition-all duration-200 border border-gray-600"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showFilterDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showFilterDropdown && (
              <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg shadow-xl bg-[#2A3037] ring-1 ring-gray-600 overflow-hidden">
                <div className="py-1">
                  {[
                    { value: 'all', label: 'All Plans' },
                    { value: 'monthly', label: 'Monthly Plans' },
                    { value: 'quarterly', label: 'Quarterly Plans' },
                    { value: 'halfyearly', label: 'Half-Yearly Plans' },
                    { value: 'yearly', label: 'Yearly Plans' },
                    { value: 'active', label: 'Active Plans' },
                    { value: 'inactive', label: 'Inactive Plans' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setFilterBy(option.value);
                        setShowFilterDropdown(false);
                      }}
                      className={`block px-4 py-3 text-sm w-full text-left transition-all duration-200 ${
                        filterBy === option.value 
                          ? 'bg-[#7BC843] text-black font-medium' 
                          : 'text-gray-300 hover:bg-[#3A4049] hover:text-[#7BC843]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-[#7BC843] to-[#6AB732] hover:from-[#6AB732] hover:to-[#5BA628] text-black px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Plan</span>
          </button>
        </div>
      </div>

      {/* Enhanced Subscription Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlans.map((plan) => {
          return (
            <div 
              key={plan.id} 
              className="bg-[#2A3037] rounded-xl shadow-lg border border-gray-600 p-8 card-hover-effect relative overflow-hidden transition-all duration-300 hover:border-[#7BC843] hover:shadow-xl"
            >
              {/* Plan Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  {plan.branchName && selectedBranch === 'All Branches' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-[#7BC843]" />
                      <span className="text-[#7BC843] text-sm font-medium">{plan.branchName} Branch</span>
                    </div>
                  )}
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  plan.isActive 
                    ? 'bg-emerald-500 bg-opacity-20 text-emerald-400 border border-emerald-500' 
                    : 'bg-gray-700 text-gray-300 border border-gray-600'
                }`}>
                  {plan.isActive ? '✓ Active' : '○ Inactive'}
                </span>
              </div>

              {/* Pricing Section */}
              <div className="mb-8">
                <div className="flex items-baseline space-x-4 mb-3">
                  <span className="text-4xl font-bold text-white">₹{plan.price.toLocaleString()}</span>
                  <span className="text-gray-400 text-lg">/ {plan.duration}</span>
                  {plan.discount > 0 && (
                    <span className="discount-tag text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <Percent className="h-3 w-3" />
                      <span>{plan.discount}% OFF</span>
                    </span>
                  )}
                  {plan.originalPrice && (
                    <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-base font-bold">
                      Save ₹{(plan.originalPrice - plan.price).toLocaleString()}
                    </span>
                  )}
                </div>
                {plan.originalPrice && (
                  <div className="flex items-center">
                    <span className="text-lg text-gray-400 line-through">₹{plan.originalPrice.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="font-semibold text-white mb-4 text-lg">Plan Features</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="text-gray-300 flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#7BC843] rounded-full flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subscribers Info */}
              <div className="mb-6 p-4 bg-black bg-opacity-30 rounded-lg border border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-[#7BC843]" />
                    <span className="text-gray-400 text-sm">Active Subscribers</span>
                  </div>
                  <span className="font-bold text-white text-lg">{plan.subscribers}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-600">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setSelectedPlan(plan)}
                    className="group flex items-center justify-center p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-all duration-200 hover:shadow-md"
                    title="Edit Plan"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => togglePlanStatus(plan.id)}
                    className={`group flex items-center justify-center p-2 rounded-lg transition-all duration-200 hover:shadow-md ${
                      plan.isActive 
                        ? 'bg-red-600 hover:bg-red-500 text-white' 
                        : 'bg-green-600 hover:bg-green-500 text-white'
                    }`}
                    title={plan.isActive ? 'Deactivate Plan' : 'Activate Plan'}
                  >
                    {plan.isActive ? (
                      <span className="text-xs font-medium px-2">Inactive</span>
                    ) : (
                      <span className="text-xs font-medium px-2">Active</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create/Edit Plan Modal */}
      {(showCreateModal || selectedPlan) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#7BC843] rounded-lg">
                    <Plus className="h-6 w-6 text-black" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedPlan ? 'Edit Plan' : 'Create New Plan'}
                  </h2>
                </div>
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
                  <label className="block text-sm font-medium text-gray-400 mb-2">Plan Type</label>
                  <select 
                    className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                    defaultValue={selectedPlan?.duration || '1 month'}
                  >
                    <option value="1 month">Monthly Plan</option>
                    <option value="3 months">Quarterly Plan</option>
                    <option value="6 months">Half-Yearly Plan</option>
                    <option value="1 year">Yearly Plan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Branch</label>
                  <select 
                    value={modalSelectedBranch}
                    onChange={(e) => setModalSelectedBranch(e.target.value)}
                    className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                  >
                    {Object.keys(branchPricing).map((branch) => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={modalPrice}
                    onChange={(e) => setModalPrice(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                    placeholder="Enter original price"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Discount (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={modalDiscount}
                    onChange={(e) => setModalDiscount(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                    placeholder="Enter discount percentage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Final Price (₹)</label>
                  <input
                    type="number"
                    value={calculateDiscountedPrice()}
                    readOnly
                    className="w-full px-4 py-3 bg-[#1a1f26] text-gray-300 border border-gray-600 rounded-lg cursor-not-allowed"
                    placeholder="Auto-calculated final price"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {modalDiscount > 0 ? `You save ₹${(modalPrice - calculateDiscountedPrice()).toLocaleString()} (${modalDiscount}% off)` : 'No discount applied'}
                  </p>
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
                
                {/* Feature Input */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={handleFeatureKeyPress}
                    className="flex-1 px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                    placeholder="Enter a feature name..."
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium"
                  >
                    Add Feature
                  </button>
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 min-h-[60px] p-3 bg-[#23292F] border border-gray-700 rounded-lg">
                  {modalFeatures.length === 0 ? (
                    <span className="text-gray-500 text-sm italic">No features added yet. Add features using the input above.</span>
                  ) : (
                    modalFeatures.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-[#7BC843] text-black text-sm font-medium rounded-full"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(feature)}
                          className="text-black hover:text-red-600 transition-colors duration-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))
                  )}
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

      {/* Confirmation Modal */}
      {showConfirmModal && planToToggle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
                  <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  {planToToggle.isActive ? 'Deactivate Plan' : 'Activate Plan'}
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  Are you sure you want to {planToToggle.isActive ? 'deactivate' : 'activate'} the "{planToToggle.name}" subscription plan?
                  {planToToggle.isActive && (
                    <span className="block mt-2 text-yellow-400">
                      Deactivating will prevent new subscriptions to this plan.
                    </span>
                  )}
                </p>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={cancelToggle}
                  className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-[#23292F] transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmToggle}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors duration-200 font-medium ${
                    planToToggle.isActive
                      ? 'bg-red-600 hover:bg-red-500 text-white'
                      : 'bg-green-600 hover:bg-green-500 text-white'
                  }`}
                >
                  {planToToggle.isActive ? 'Deactivate' : 'Activate'}
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