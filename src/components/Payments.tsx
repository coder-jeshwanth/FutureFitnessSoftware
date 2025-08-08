import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Download, AlertTriangle, CheckCircle, Clock, IndianRupee  } from 'lucide-react';

const payments = [
  {
    id: 1,
    memberName: 'Arjun Sharma',
    membershipId: 'M001',
    amount: 5000,
    dueDate: '2025-01-20',
    paidDate: '2025-01-15',
    status: 'Paid',
    method: 'UPI',
    plan: 'Premium Monthly',
    invoice: 'INV-2025-001'
  },
  {
    id: 2,
    memberName: 'Priya Patel',
    membershipId: 'M002',
    amount: 2500,
    dueDate: '2025-01-25',
    paidDate: null,
    status: 'Pending',
    method: null,
    plan: 'Basic Monthly',
    invoice: 'INV-2025-002'
  },
  {
    id: 3,
    memberName: 'Rohit Kumar',
    membershipId: 'M003',
    amount: 15000,
    dueDate: '2025-01-10',
    paidDate: null,
    status: 'Overdue',
    method: null,
    plan: 'Premium Yearly',
    invoice: 'INV-2025-003'
  },
  {
    id: 4,
    memberName: 'Sneha Reddy',
    membershipId: 'M004',
    amount: 3500,
    dueDate: '2025-01-30',
    paidDate: '2025-01-14',
    status: 'Paid',
    method: 'Card',
    plan: 'Standard Monthly',
    invoice: 'INV-2025-004'
  },
  {
    id: 5,
    memberName: 'Amit Singh',
    membershipId: 'M005',
    amount: 8000,
    dueDate: '2025-02-05',
    paidDate: null,
    status: 'Pending',
    method: null,
    plan: 'Premium Quarterly',
    invoice: 'INV-2025-005'
  }
];

const Payments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

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
      case 'Overdue': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
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
                         payment.invoice.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getPaymentStats = () => {
    const totalDue = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const totalPaid = payments.filter(p => p.status === 'Paid').reduce((sum, payment) => sum + payment.amount, 0);
    const overdue = payments.filter(p => p.status === 'Overdue').length;
    const pending = payments.filter(p => p.status === 'Pending').length;

    return { totalDue, totalPaid, overdue, pending };
  };

  const stats = getPaymentStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
       
        <div className="flex items-center space-x-3">
          <button className="bg-[#1E5AB3] hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Export Report</span>
          </button>
          <button 
            onClick={() => setShowPaymentModal(true)}
            className="bg-[#7BC843] hover:bg-[#6AB732] text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Payment</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-green-400">₹{stats.totalPaid.toLocaleString()}</p>
            </div>
            <IndianRupee className="h-8 w-8 text-green-400" />
          </div>
        </div>
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Outstanding</p>
              <p className="text-2xl font-bold text-blue-400">₹{(stats.totalDue - stats.totalPaid).toLocaleString()}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Overdue Payments</p>
              <p className="text-2xl font-bold text-red-400">{stats.overdue}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
        </div>
        <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending Payments</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 p-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
            />
          </div>
          <div className="flex space-x-3">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
            >
              <option>All Status</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
            <select className="px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent">
              <option>All Plans</option>
              <option>Premium</option>
              <option>Standard</option>
              <option>Basic</option>
            </select>
            <button className="px-4 py-3 bg-[#23292F] border border-gray-700 rounded-lg hover:bg-[#1A1F24] transition-colors duration-200">
              <Filter className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-[#2A3037] rounded-xl shadow-sm border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#23292F] border-b border-gray-700">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-white">Member</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Plan</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Amount</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Due Date</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Method</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-[#353c44] transition-colors duration-200">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-white">{payment.memberName}</div>
                      <div className="text-sm text-gray-400">{payment.membershipId}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-white">{payment.plan}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-lg font-semibold text-white">₹{payment.amount.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-white">{payment.dueDate}</div>
                      {payment.paidDate && (
                        <div className="text-sm text-gray-400">Paid: {payment.paidDate}</div>
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
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMethodColor(payment.method)}`}>
                        {payment.method}
                      </span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedPayment(payment)}
                        className="p-2 text-gray-400 hover:text-[#7BC843] hover:bg-[#23292F] rounded-lg transition-colors duration-200"
                        title="View Invoice"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-[#23292F] rounded-lg transition-colors duration-200" title="Download Invoice">
                        <Download className="h-4 w-4" />
                      </button>
                      {payment.status !== 'Paid' && (
                        <button className="text-[#7BC843] hover:text-[#6AB732] font-medium text-sm">
                          Mark Paid
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Add Payment</h2>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Member</label>
                  <select className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent">
                    <option>Select member</option>
                    <option>Arjun Sharma (M001)</option>
                    <option>Priya Patel (M002)</option>
                    <option>Rohit Kumar (M003)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Plan</label>
                  <select className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent">
                    <option>Select plan</option>
                    <option>Premium Monthly - ₹5,000</option>
                    <option>Standard Monthly - ₹3,500</option>
                    <option>Basic Monthly - ₹2,500</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Amount</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Payment Method</label>
                  <select className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent">
                    <option>Select method</option>
                    <option>UPI</option>
                    <option>Card</option>
                    <option>Cash</option>
                    <option>Bank Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Payment Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Due Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Notes</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 bg-[#23292F] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7BC843] focus:border-transparent"
                  placeholder="Add any notes..."
                />
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-[#23292F] transition-colors duration-200"
                >
                  Cancel
                </button>
                <button className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium">
                  Add Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Preview Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Invoice Preview</h2>
                <button 
                  onClick={() => setSelectedPayment(null)}
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
                    Invoice #: {selectedPayment.invoice}<br />
                    Date: {selectedPayment.paidDate || 'Pending'}<br />
                    Due Date: {selectedPayment.dueDate}
                  </p>
                </div>
              </div>

              {/* Bill To */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-2">Bill To:</h3>
                <p className="text-gray-400">
                  {selectedPayment.memberName}<br />
                  Member ID: {selectedPayment.membershipId}<br />
                  Email: member@email.com<br />
                  Phone: +91 98765 43210
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
                          <div className="font-medium text-white">{selectedPayment.plan}</div>
                          <div className="text-sm text-gray-400">Membership fee for the period</div>
                        </div>
                      </td>
                      <td className="text-right p-4 border-b border-gray-700 font-semibold text-white">
                        ₹{selectedPayment.amount.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-[#23292F]">
                    <tr>
                      <td className="p-4 font-bold text-right text-white">Total Amount:</td>
                      <td className="p-4 font-bold text-right text-lg text-white">₹{selectedPayment.amount.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Payment Status */}
              <div className="mb-8 p-4 bg-[#23292F] rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">Payment Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedPayment.status)}`}>
                    {selectedPayment.status}
                  </span>
                </div>
                {selectedPayment.method && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-medium text-white">Payment Method:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMethodColor(selectedPayment.method)}`}>
                      {selectedPayment.method}
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
    </div>
  );
};

export default Payments;