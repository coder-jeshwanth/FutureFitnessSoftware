import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Eye, Download, AlertTriangle, CheckCircle, Clock, 
  IndianRupee, FileText, Send, CreditCard,
  Smartphone, Banknote, Building2, Bell, TrendingUp,
  SortAsc, SortDesc, ChevronDown, User, MapPin
} from 'lucide-react';

// Branch options from App.tsx
const branches = [
  'Stonehousepet',
  'Harinathpuram',
  'Vanamthopu Center',
  'Current Office Center',
  'Vedayapalem',
  'BV Nagar',
  'Dhanalakshmi Puram'
];

const payments = [
  {
    id: 1,
    memberName: 'Arjun Sharma',
    membershipId: 'M001',
    amount: 5000,
    paidAmount: 5000,
    remainingAmount: 0,
    dueDate: '2025-01-20',
    paidDate: '2025-01-15',
    status: 'Paid',
    method: 'UPI',
    plan: 'Premium Monthly',
    invoice: 'INV-2025-001',
    phone: '+91 98765 43210',
    email: 'arjun.sharma@email.com',
    lastReminderSent: '2025-01-10',
    notes: 'Payment received on time',
    branch: 'Stonehousepet',
    paymentHistory: [
      { date: '2025-01-15', amount: 5000, method: 'UPI', transactionId: 'UPI123456' }
    ]
  },
  {
    id: 2,
    memberName: 'Priya Patel',
    membershipId: 'M002',
    amount: 2500,
    paidAmount: 1000,
    remainingAmount: 1500,
    dueDate: '2025-01-25',
    paidDate: null,
    status: 'Pending',
    method: null,
    plan: 'Basic Monthly',
    invoice: 'INV-2025-002',
    phone: '+91 87654 32109',
    email: 'priya.patel@email.com',
    lastReminderSent: '2025-01-20',
    notes: 'Partial payment received - ₹1,000 paid',
    branch: 'Harinathpuram',
    paymentHistory: [
      { date: '2025-01-18', amount: 1000, method: 'Cash', transactionId: 'CASH001' }
    ]
  },
  {
    id: 3,
    memberName: 'Rohit Kumar',
    membershipId: 'M003',
    amount: 15000,
    paidAmount: 0,
    remainingAmount: 15000,
    dueDate: '2025-01-10',
    paidDate: null,
    status: 'Overdue',
    method: null,
    plan: 'Premium Yearly',
    invoice: 'INV-2025-003',
    phone: '+91 76543 21098',
    email: 'rohit.kumar@email.com',
    lastReminderSent: '2025-01-12',
    notes: 'Multiple reminders sent, needs follow-up',
    branch: 'Vanamthopu Center',
    paymentHistory: []
  },
  {
    id: 4,
    memberName: 'Sneha Reddy',
    membershipId: 'M004',
    amount: 3500,
    paidAmount: 3500,
    remainingAmount: 0,
    dueDate: '2025-01-30',
    paidDate: '2025-01-14',
    status: 'Paid',
    method: 'Card',
    plan: 'Standard Monthly',
    invoice: 'INV-2025-004',
    phone: '+91 65432 10987',
    email: 'sneha.reddy@email.com',
    lastReminderSent: null,
    notes: 'Early payment received',
    branch: 'Current Office Center',
    paymentHistory: [
      { date: '2025-01-14', amount: 3500, method: 'Card', transactionId: 'CARD789' }
    ]
  },
  {
    id: 5,
    memberName: 'Amit Singh',
    membershipId: 'M005',
    amount: 8000,
    paidAmount: 3000,
    remainingAmount: 5000,
    dueDate: '2025-02-05',
    paidDate: null,
    status: 'Pending',
    method: null,
    plan: 'Premium Quarterly',
    invoice: 'INV-2025-005',
    phone: '+91 54321 09876',
    email: 'amit.singh@email.com',
    lastReminderSent: null,
    notes: 'Partial payment - ₹3,000 received, ₹5,000 pending',
    branch: 'Vedayapalem',
    paymentHistory: [
      { date: '2025-01-28', amount: 3000, method: 'UPI', transactionId: 'UPI789012' }
    ]
  },
  {
    id: 6,
    memberName: 'Ravi Verma',
    membershipId: 'M006',
    amount: 4200,
    paidAmount: 4200,
    remainingAmount: 0,
    dueDate: '2025-01-18',
    paidDate: '2025-01-17',
    status: 'Paid',
    method: 'Cash',
    plan: 'Basic Quarterly',
    invoice: 'INV-2025-006',
    phone: '+91 43210 98765',
    email: 'ravi.verma@email.com',
    lastReminderSent: null,
    notes: 'Cash payment received',
    branch: 'BV Nagar',
    paymentHistory: [
      { date: '2025-01-17', amount: 4200, method: 'Cash', transactionId: 'CASH002' }
    ]
  },
  {
    id: 7,
    memberName: 'Meera Shah',
    membershipId: 'M007',
    amount: 6500,
    paidAmount: 0,
    remainingAmount: 6500,
    dueDate: '2025-01-12',
    paidDate: null,
    status: 'Overdue',
    method: null,
    plan: 'Premium Monthly',
    invoice: 'INV-2025-007',
    phone: '+91 32109 87654',
    email: 'meera.shah@email.com',
    lastReminderSent: '2025-01-22',
    notes: 'Partial payment received, follow-up required',
    branch: 'Dhanalakshmi Puram',
    paymentHistory: []
  }
];

interface PaymentsProps {
  selectedBranch?: string;
}

const Payments: React.FC<PaymentsProps> = ({ selectedBranch = 'All Branches' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [methodFilter, setMethodFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');
  const [branchFilter, setBranchFilter] = useState(selectedBranch);
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showActionDropdown, setShowActionDropdown] = useState<number | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentNotes, setPaymentNotes] = useState('');
  const [showPartialPaymentModal, setShowPartialPaymentModal] = useState(false);

  // Sync branch filter with selected branch from navbar
  useEffect(() => {
    setBranchFilter(selectedBranch);
  }, [selectedBranch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.action-dropdown')) {
        setShowActionDropdown(null);
      }
    };
    
    if (showActionDropdown !== null) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showActionDropdown]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-900 text-green-300';
      case 'Pending': return 'bg-yellow-900 text-yellow-300';
      case 'Overdue': return 'bg-red-900 text-red-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid': return <CheckCircle className="h-4 w-4" />;
      case 'Pending': return <Clock className="h-4 w-4" />;
      case 'Overdue': return <AlertTriangle className="h-4 w-4 animate-pulse" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getMethodIcon = (method: string | null) => {
    if (!method) return null;
    switch (method) {
      case 'UPI': return <Smartphone className="h-4 w-4 text-blue-400" />;
      case 'Card': return <CreditCard className="h-4 w-4 text-purple-400" />;
      case 'Cash': return <Banknote className="h-4 w-4 text-green-400" />;
      case 'Bank Transfer': return <Building2 className="h-4 w-4 text-orange-400" />;
      default: return <IndianRupee className="h-4 w-4 text-gray-400" />;
    }
  };

  const getDaysOverdue = (dueDate: string) => {
    return Math.max(0, Math.floor((new Date().getTime() - new Date(dueDate).getTime()) / (1000 * 60 * 60 * 24)));
  };

  const openPartialPaymentModal = (payment: any) => {
    setSelectedPayment(payment);
    setPaymentAmount('');
    setPaymentMethod('');
    setPaymentNotes('');
    setShowPartialPaymentModal(true);
    setShowActionDropdown(null);
  };

  const closePartialPaymentModal = () => {
    setShowPartialPaymentModal(false);
    setPaymentAmount('');
    setPaymentMethod('');
    setPaymentNotes('');
    setSelectedPayment(null);
  };

  const handlePartialPayment = () => {
    if (!selectedPayment || !paymentAmount || !paymentMethod) return;
    
    const amount = parseFloat(paymentAmount);
    if (amount <= 0 || amount > selectedPayment.remainingAmount) return;
    
    const remainingAfterPayment = selectedPayment.remainingAmount - amount;
    
    // Here you would typically make an API call to update the payment
    console.log('Processing partial payment:', {
      paymentId: selectedPayment.id,
      amount,
      method: paymentMethod,
      notes: paymentNotes,
      remainingAmount: remainingAfterPayment
    });
    
    // Show success message or handle API response
    alert(`Payment of ₹${amount.toLocaleString()} processed successfully!`);
    
    // Close modal and reset form
    closePartialPaymentModal();
  };

  const getMethodColor = (method: string | null) => {
    if (!method) return 'bg-gray-700 text-gray-300';
    switch (method) {
      case 'UPI': return 'bg-blue-900 text-blue-300';
      case 'Card': return 'bg-purple-900 text-purple-300';
      case 'Cash': return 'bg-green-900 text-green-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.membershipId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.plan.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || payment.status === statusFilter;
    const matchesMethod = methodFilter === 'All' || payment.method === methodFilter;
    const matchesPlan = planFilter === 'All' || payment.plan.toLowerCase().includes(planFilter.toLowerCase());
    const matchesBranch = branchFilter === 'All Branches' || payment.branch === branchFilter;
    
    return matchesSearch && matchesStatus && matchesMethod && matchesPlan && matchesBranch;
  }).sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'dueDate':
        aValue = new Date(a.dueDate).getTime();
        bValue = new Date(b.dueDate).getTime();
        break;
      case 'amount':
        aValue = a.amount;
        bValue = b.amount;
        break;
      case 'memberName':
        aValue = a.memberName.toLowerCase();
        bValue = b.memberName.toLowerCase();
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      default:
        aValue = a.dueDate;
        bValue = b.dueDate;
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const getPaymentStats = () => {
    const totalDue = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const totalPaid = payments.filter(p => p.status === 'Paid').reduce((sum, payment) => sum + payment.amount, 0);
    const overdue = payments.filter(p => p.status === 'Overdue').length;
    const pending = payments.filter(p => p.status === 'Pending').length;
    const collectionRate = totalDue > 0 ? (totalPaid / totalDue) * 100 : 0;

    return { totalDue, totalPaid, overdue, pending, collectionRate };
  };

  const stats = getPaymentStats();

  return (
    <div className="space-y-6">

      {/* Revenue Collection Progress */}
      <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Revenue Collection Progress</h3>
          <span className="text-2xl font-bold text-[#7BC843]">{stats.collectionRate.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
          <div 
            className="bg-gradient-to-r from-[#7BC843] to-green-400 h-4 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(stats.collectionRate, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Collected: ₹{stats.totalPaid.toLocaleString()}</span>
          <span className="text-gray-400">Outstanding: ₹{(stats.totalDue - stats.totalPaid).toLocaleString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-green-400">₹{stats.totalPaid.toLocaleString()}</p>
              <p className="text-xs text-green-300 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% from last month
              </p>
            </div>
            <IndianRupee className="h-8 w-8 text-green-400" />
          </div>
        </div>
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Outstanding</p>
              <p className="text-2xl font-bold text-blue-400">₹{(stats.totalDue - stats.totalPaid).toLocaleString()}</p>
              <p className="text-xs text-blue-300 mt-1">{((stats.totalDue - stats.totalPaid) / stats.totalDue * 100).toFixed(1)}% of total</p>
            </div>
            <Clock className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-red-500 p-6 animate-pulse">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Overdue Payments</p>
              <p className="text-2xl font-bold text-red-400">{stats.overdue}</p>
              <p className="text-xs text-red-300 mt-1">Requires immediate attention</p>
            </div>
            <div className="relative">
              <AlertTriangle className="h-8 w-8 text-red-400 animate-bounce" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending Payments</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              <p className="text-xs text-yellow-300 mt-1">Awaiting payment</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Search and Action Bar */}
      <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by member name, ID, plan, or invoice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => setShowFilterModal(true)}
              className="px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg hover:bg-[#2D3439] focus:ring-2 focus:ring-[#7BC843] focus:border-transparent transition-colors duration-200 flex items-center space-x-2"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
            
            <button className="bg-[#1E5AB3] hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Payments Table */}
      <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#23292F] border-b border-gray-700">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-white">Member</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Plan</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Branch</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Amount</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Due Date</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Method</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Contact</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Last Reminder</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredPayments.map((payment) => {
                const daysOverdue = payment.status === 'Overdue' ? getDaysOverdue(payment.dueDate) : 0;
                
                return (
                  <tr 
                    key={payment.id} 
                    className={`hover:bg-[#353c44] transition-colors duration-200 ${
                      payment.status === 'Overdue' ? 'bg-red-900/10 border-l-4 border-red-500' : ''
                    }`}
                    onClick={(e) => {
                      // Prevent row click when clicking on buttons or dropdowns
                      const target = e.target as Element;
                      if (!target.closest('button') && !target.closest('.action-dropdown')) {
                        // Optional: Handle row click here
                      }
                    }}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <User className="h-8 w-8 text-gray-400 bg-gray-600 rounded-full p-1" />
                        <div>
                          <div className="font-semibold text-white">{payment.memberName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <span className="text-white font-medium">{payment.plan}</span>
                        {payment.paidAmount > 0 && payment.remainingAmount > 0 && (
                          <div className="text-xs text-blue-400 mt-1">
                            Partial payment made
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-[#7BC843]" />
                        <span className="text-white font-medium">{payment.branch}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-lg font-semibold text-white">₹{payment.amount.toLocaleString()}</div>
                        {payment.paidAmount > 0 && (
                          <div className="text-sm text-green-400">Paid: ₹{payment.paidAmount.toLocaleString()}</div>
                        )}
                        {payment.remainingAmount > 0 && (
                          <div className="text-sm text-orange-400">Remaining: ₹{payment.remainingAmount.toLocaleString()}</div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className={`text-white ${payment.status === 'Overdue' ? 'text-red-400 font-semibold' : ''}`}>
                          {payment.dueDate}
                        </div>
                        {payment.paidDate && (
                          <div className="text-sm text-green-400">Paid: {payment.paidDate}</div>
                        )}
                        {payment.status === 'Overdue' && (
                          <div className="text-xs text-red-400">{daysOverdue} days overdue</div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        <span>{payment.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {payment.method ? (
                        <div className="flex items-center space-x-2">
                          {getMethodIcon(payment.method)}
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMethodColor(payment.method)}`}>
                            {payment.method}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="text-white text-sm">{payment.phone}</div>
                        <div className="text-gray-400 text-sm">{payment.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        {payment.lastReminderSent ? (
                          <div>
                            <div className="text-white">{payment.lastReminderSent}</div>
                            <div className="text-gray-400 flex items-center mt-1">
                              <Bell className="h-3 w-3 mr-1" />
                              Sent
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-500">No reminders</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInvoice(payment);
                          }}
                          className="p-2 text-gray-400 hover:text-[#7BC843] hover:bg-[#23292F] rounded-lg transition-colors duration-200"
                          title="View Invoice"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-[#23292F] rounded-lg transition-colors duration-200" 
                          title="Download Invoice"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        {payment.status !== 'Paid' && (
                          <div className="relative action-dropdown">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowActionDropdown(showActionDropdown === payment.id ? null : payment.id);
                              }}
                              className="flex items-center space-x-1 text-[#7BC843] hover:text-[#6AB732] font-medium text-sm bg-[#23292F] px-3 py-2 rounded-lg hover:bg-[#1A1F24] transition-colors duration-200"
                            >
                              <span>Actions</span>
                              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showActionDropdown === payment.id ? 'rotate-180' : ''}`} />
                            </button>
                            {showActionDropdown === payment.id && (
                              <div className="absolute right-0 mt-2 w-52 bg-[#23292F] border border-gray-700 rounded-lg shadow-xl z-20 overflow-hidden">
                                {payment.remainingAmount > 0 && (
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openPartialPaymentModal(payment);
                                    }}
                                    className="w-full text-left px-4 py-3 text-blue-400 hover:bg-[#1A1F24] flex items-center space-x-2 transition-colors duration-200"
                                  >
                                    <IndianRupee className="h-4 w-4" />
                                    <span>Make Payment</span>
                                  </button>
                                )}
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle mark fully paid
                                    console.log('Mark fully paid for payment:', payment.id);
                                    setShowActionDropdown(null);
                                  }}
                                  className="w-full text-left px-4 py-3 text-green-400 hover:bg-[#1A1F24] flex items-center space-x-2 transition-colors duration-200"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                  <span>Mark Fully Paid</span>
                                </button>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle send reminder
                                    console.log('Send reminder for payment:', payment.id);
                                    setShowActionDropdown(null);
                                  }}
                                  className="w-full text-left px-4 py-3 text-blue-400 hover:bg-[#1A1F24] flex items-center space-x-2 transition-colors duration-200"
                                >
                                  <Send className="h-4 w-4" />
                                  <span>Send Reminder</span>
                                </button>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle generate invoice
                                    console.log('Generate invoice for payment:', payment.id);
                                    setShowActionDropdown(null);
                                  }}
                                  className="w-full text-left px-4 py-3 text-purple-400 hover:bg-[#1A1F24] flex items-center space-x-2 transition-colors duration-200"
                                >
                                  <FileText className="h-4 w-4" />
                                  <span>Generate Invoice</span>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Preview Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Invoice Preview</h2>
                <button 
                  onClick={() => setSelectedInvoice(null)}
                  className="text-gray-400 hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#7BC843]">Future Fitness</h1>
                  <p className="text-gray-400 mt-2">123 Fitness Street<br />Nellore, Andhra Pradesh 400001<br />Phone: +91 98765 43210</p>
                </div>
                <div className="text-right">
                  <h2 className="text-xl font-bold text-white">INVOICE</h2>
                  <p className="text-gray-400 mt-2">
                    Invoice #: {selectedInvoice.invoice}<br />
                    Date: {selectedInvoice.paidDate || 'Pending'}<br />
                    Due Date: {selectedInvoice.dueDate}
                  </p>
                </div>
              </div>

              {/* Bill To */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-2">Bill To:</h3>
                <p className="text-gray-400">
                  {selectedInvoice.memberName}<br />
                  Member ID: {selectedInvoice.membershipId}<br />
                  Branch: {selectedInvoice.branch}<br />
                  Email: {selectedInvoice.email}<br />
                  Phone: {selectedInvoice.phone}
                </p>
              </div>

              {/* Invoice Items */}
              <div className="mb-8">
                <table className="w-full border border-gray-700">
                  <thead className="bg-[#23292F]">
                    <tr>
                      <th className="text-left p-4 border-b border-gray-700 text-white">Description</th>
                      <th className="text-right p-4 border-b border-gray-700 text-white">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 border-b border-gray-700">
                        <div>
                          <div className="font-medium text-white">{selectedInvoice.plan}</div>
                          <div className="text-sm text-gray-400">Membership fee for the period</div>
                        </div>
                      </td>
                      <td className="text-right p-4 border-b border-gray-700 font-semibold text-white">
                        ₹{selectedInvoice.amount.toLocaleString()}
                      </td>
                    </tr>
                    {selectedInvoice.paidAmount > 0 && selectedInvoice.remainingAmount > 0 && (
                      <>
                        <tr>
                          <td className="p-4 border-b border-gray-700">
                            <div className="text-green-400">Payments Received</div>
                          </td>
                          <td className="text-right p-4 border-b border-gray-700 font-semibold text-green-400">
                            -₹{selectedInvoice.paidAmount.toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-4 border-b border-gray-700">
                            <div className="text-orange-400">Outstanding Balance</div>
                          </td>
                          <td className="text-right p-4 border-b border-gray-700 font-semibold text-orange-400">
                            ₹{selectedInvoice.remainingAmount.toLocaleString()}
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                  <tfoot className="bg-[#23292F]">
                    <tr>
                      <td className="p-4 font-bold text-right text-white">
                        {selectedInvoice.remainingAmount > 0 ? 'Amount Due:' : 'Total Amount:'}
                      </td>
                      <td className="p-4 font-bold text-right text-lg text-white">
                        ₹{(selectedInvoice.remainingAmount > 0 ? selectedInvoice.remainingAmount : selectedInvoice.amount).toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Payment History */}
              {selectedInvoice.paymentHistory && selectedInvoice.paymentHistory.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Payment History</h4>
                  <div className="bg-[#23292F] rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-[#1A1F24]">
                        <tr>
                          <th className="text-left p-3 text-gray-400 text-sm">Date</th>
                          <th className="text-left p-3 text-gray-400 text-sm">Amount</th>
                          <th className="text-left p-3 text-gray-400 text-sm">Method</th>
                          <th className="text-left p-3 text-gray-400 text-sm">Transaction ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedInvoice.paymentHistory.map((history: any, index: number) => (
                          <tr key={index} className="border-b border-gray-700 last:border-b-0">
                            <td className="p-3 text-white">{history.date}</td>
                            <td className="p-3 text-green-400 font-semibold">₹{history.amount.toLocaleString()}</td>
                            <td className="p-3 text-white">{history.method}</td>
                            <td className="p-3 text-gray-400 font-mono text-sm">{history.transactionId}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Payment Status */}
              <div className="mb-8 p-4 bg-[#23292F] rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">Payment Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedInvoice.status)}`}>
                    {selectedInvoice.status}
                  </span>
                </div>
                {selectedInvoice.method && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-medium text-white">Payment Method:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMethodColor(selectedInvoice.method)}`}>
                      {selectedInvoice.method}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <button className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-[#23292F] transition-colors duration-200 flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </button>
                <button className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium">
                  Send Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Partial Payment Modal */}
      {showPartialPaymentModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Make Payment</h2>
                <button 
                  onClick={closePartialPaymentModal}
                  className="text-gray-400 hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Payment Summary */}
              <div className="bg-[#23292F] rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <User className="h-10 w-10 text-gray-400 bg-gray-600 rounded-full p-2" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{selectedPayment.memberName}</h3>
                    <p className="text-gray-400">{selectedPayment.membershipId} • {selectedPayment.plan}</p>
                    <div className="flex items-center space-x-1 text-sm text-gray-400 mt-1">
                      <MapPin className="h-3 w-3 text-[#7BC843]" />
                      <span>{selectedPayment.branch}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Total Amount</p>
                    <p className="text-white font-semibold">₹{selectedPayment.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Paid Amount</p>
                    <p className="text-green-400 font-semibold">₹{selectedPayment.paidAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Remaining Amount</p>
                    <p className="text-orange-400 font-semibold">₹{selectedPayment.remainingAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Due Date</p>
                    <p className={`font-semibold ${selectedPayment.status === 'Overdue' ? 'text-red-400' : 'text-white'}`}>
                      {selectedPayment.dueDate}
                    </p>
                  </div>
                </div>

              </div>

              {/* Payment Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Payment Amount *
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="Enter amount to pay"
                      max={selectedPayment.remainingAmount}
                      className="w-full pl-10 pr-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-gray-400">Max: ₹{selectedPayment.remainingAmount.toLocaleString()}</span>
                    <button 
                      onClick={() => setPaymentAmount(selectedPayment.remainingAmount.toString())}
                      className="text-[#7BC843] hover:text-[#6AB732]"
                    >
                      Pay Full Amount
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Payment Method *
                  </label>
                  <select 
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                  >
                    <option value="">Select payment method</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={paymentNotes}
                    onChange={(e) => setPaymentNotes(e.target.value)}
                    placeholder="Add payment notes..."
                    rows={3}
                    className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Payment History */}
              {selectedPayment.paymentHistory && selectedPayment.paymentHistory.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Payment History</h4>
                  <div className="bg-[#23292F] rounded-lg p-3 max-h-32 overflow-y-auto">
                    {selectedPayment.paymentHistory.map((history: any, index: number) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                        <div>
                          <p className="text-white text-sm">₹{history.amount.toLocaleString()}</p>
                          <p className="text-gray-400 text-xs">{history.date} • {history.method}</p>
                        </div>
                        {history.transactionId && (
                          <p className="text-gray-500 text-xs">{history.transactionId}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end space-x-4">
                <button 
                  onClick={closePartialPaymentModal}
                  className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-[#23292F] transition-colors duration-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePartialPayment}
                  disabled={!paymentAmount || !paymentMethod || parseFloat(paymentAmount) <= 0 || parseFloat(paymentAmount) > selectedPayment.remainingAmount}
                  className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  Process Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Filter Payments</h2>
                <button 
                  onClick={() => setShowFilterModal(false)}
                  className="text-gray-400 hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  Payment Status
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['All', 'Paid', 'Pending', 'Overdue'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        statusFilter === status 
                          ? 'bg-[#7BC843] text-black' 
                          : 'bg-[#23292F] text-gray-300 hover:bg-[#353c44] border border-gray-700'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['All', 'UPI', 'Card', 'Cash', 'Bank Transfer'].map((method) => (
                    <button
                      key={method}
                      onClick={() => setMethodFilter(method)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        methodFilter === method 
                          ? 'bg-[#7BC843] text-black' 
                          : 'bg-[#23292F] text-gray-300 hover:bg-[#353c44] border border-gray-700'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plan Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  Membership Plan
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['All', 'Basic', 'Standard', 'Premium'].map((plan) => (
                    <button
                      key={plan}
                      onClick={() => setPlanFilter(plan)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        planFilter === plan 
                          ? 'bg-[#7BC843] text-black' 
                          : 'bg-[#23292F] text-gray-300 hover:bg-[#353c44] border border-gray-700'
                      }`}
                    >
                      {plan}
                    </button>
                  ))}
                </div>
              </div>

              {/* Branch Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  Branch Location
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setBranchFilter('All Branches')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      branchFilter === 'All Branches' 
                        ? 'bg-[#7BC843] text-black' 
                        : 'bg-[#23292F] text-gray-300 hover:bg-[#353c44] border border-gray-700'
                    }`}
                  >
                    All Branches
                  </button>
                  {branches.map((branch) => (
                    <button
                      key={branch}
                      onClick={() => setBranchFilter(branch)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-left ${
                        branchFilter === branch 
                          ? 'bg-[#7BC843] text-black' 
                          : 'bg-[#23292F] text-gray-300 hover:bg-[#353c44] border border-gray-700'
                      }`}
                    >
                      {branch}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  Sort By
                </label>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: 'dueDate', label: 'Due Date' },
                      { value: 'amount', label: 'Amount' },
                      { value: 'memberName', label: 'Member Name' },
                      { value: 'status', label: 'Status' }
                    ].map((sort) => (
                      <button
                        key={sort.value}
                        onClick={() => setSortBy(sort.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          sortBy === sort.value 
                            ? 'bg-[#7BC843] text-black' 
                            : 'bg-[#23292F] text-gray-300 hover:bg-[#353c44] border border-gray-700'
                        }`}
                      >
                        {sort.label}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSortOrder('asc')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        sortOrder === 'asc' 
                          ? 'bg-[#7BC843] text-black' 
                          : 'bg-[#23292F] text-gray-300 hover:bg-[#353c44] border border-gray-700'
                      }`}
                    >
                      <SortAsc className="h-4 w-4" />
                      <span>Ascending</span>
                    </button>
                    <button
                      onClick={() => setSortOrder('desc')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        sortOrder === 'desc' 
                          ? 'bg-[#7BC843] text-black' 
                          : 'bg-[#23292F] text-gray-300 hover:bg-[#353c44] border border-gray-700'
                      }`}
                    >
                      <SortDesc className="h-4 w-4" />
                      <span>Descending</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4 border-t border-gray-700">
                <button 
                  onClick={() => {
                    setStatusFilter('All');
                    setMethodFilter('All');
                    setPlanFilter('All');
                    setBranchFilter('All Branches');
                    setSortBy('dueDate');
                    setSortOrder('asc');
                  }}
                  className="px-6 py-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Clear All Filters
                </button>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setShowFilterModal(false)}
                    className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-[#23292F] transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setShowFilterModal(false)}
                    className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;