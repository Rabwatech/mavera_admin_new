"use client";

import React, { useState } from 'react';
import { AlertCircle, CheckCircle, RefreshCw, Download, AlertTriangle, DollarSign } from 'lucide-react';

interface PaymentRecord {
  id: string;
  bookingId: string;
  clientName: string;
  amount: number;
  date: string;
  source: 'SYSTEM' | 'GATEWAY' | 'ERP';
}

interface Discrepancy {
  id: string;
  bookingId: string;
  clientName: string;
  systemAmount: number;
  gatewayAmount: number;
  erpAmount: number;
  difference: number;
  status: 'UNRESOLVED' | 'RESOLVED';
}

const ReconciliationPage: React.FC = () => {
  const [isReconciling, setIsReconciling] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');

  // Mock data
  const systemPayments: PaymentRecord[] = [
    { id: 'SYS-001', bookingId: 'B001', clientName: 'Al-Rajhi Wedding', amount: 50000, date: '2024-11-20', source: 'SYSTEM' },
    { id: 'SYS-002', bookingId: 'B002', clientName: 'Golden Gala', amount: 15000, date: '2024-11-22', source: 'SYSTEM' },
    { id: 'SYS-003', bookingId: 'B003', clientName: 'Fahad & Sara', amount: 25000, date: '2024-11-23', source: 'SYSTEM' },
  ];

  const gatewayPayments: PaymentRecord[] = [
    { id: 'GW-001', bookingId: 'B001', clientName: 'Al-Rajhi Wedding', amount: 50000, date: '2024-11-20', source: 'GATEWAY' },
    { id: 'GW-002', bookingId: 'B002', clientName: 'Golden Gala', amount: 14500, date: '2024-11-22', source: 'GATEWAY' }, // Discrepancy
    { id: 'GW-003', bookingId: 'B003', clientName: 'Fahad & Sara', amount: 25000, date: '2024-11-23', source: 'GATEWAY' },
  ];

  const erpPayments: PaymentRecord[] = [
    { id: 'ERP-001', bookingId: 'B001', clientName: 'Al-Rajhi Wedding', amount: 50000, date: '2024-11-20', source: 'ERP' },
    { id: 'ERP-002', bookingId: 'B002', clientName: 'Golden Gala', amount: 15000, date: '2024-11-22', source: 'ERP' },
    // Missing B003 in ERP - Discrepancy
  ];

  const discrepancies: Discrepancy[] = [
    {
      id: 'DISC-001',
      bookingId: 'B002',
      clientName: 'Golden Gala',
      systemAmount: 15000,
      gatewayAmount: 14500,
      erpAmount: 15000,
      difference: -500,
      status: 'UNRESOLVED'
    },
    {
      id: 'DISC-002',
      bookingId: 'B003',
      clientName: 'Fahad & Sara',
      systemAmount: 25000,
      gatewayAmount: 25000,
      erpAmount: 0,
      difference: -25000,
      status: 'UNRESOLVED'
    },
  ];

  const handleReconcile = () => {
    setIsReconciling(true);
    setTimeout(() => {
      alert('Reconciliation completed!');
      setIsReconciling(false);
    }, 2000);
  };

  const handleResolveDiscrepancy = (id: string) => {
    alert(`Resolving discrepancy ${id}...`);
  };

  const totalSystem = systemPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalGateway = gatewayPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalErp = erpPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-mavera-navy mb-2">Payment Reconciliation</h1>
            <p className="text-gray-500">Compare payments across System, Payment Gateway, and ERP</p>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
            >
              <option value="today">Today</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
            <button
              onClick={handleReconcile}
              disabled={isReconciling}
              className="px-6 py-2 bg-mavera-gold text-white rounded-xl font-bold hover:bg-mavera-goldHover disabled:opacity-50 flex items-center gap-2 transition-all"
            >
              {isReconciling ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  Reconciling...
                </>
              ) : (
                <>
                  <RefreshCw size={18} />
                  Run Reconciliation
                </>
              )}
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={20} className="text-blue-600" />
              <p className="text-xs font-bold text-blue-600 uppercase">System Total</p>
            </div>
            <p className="text-2xl font-bold text-blue-900">{totalSystem.toLocaleString()} SAR</p>
            <p className="text-xs text-blue-700 mt-1">{systemPayments.length} payments</p>
          </div>

          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={20} className="text-green-600" />
              <p className="text-xs font-bold text-green-600 uppercase">Gateway Total</p>
            </div>
            <p className="text-2xl font-bold text-green-900">{totalGateway.toLocaleString()} SAR</p>
            <p className="text-xs text-green-700 mt-1">{gatewayPayments.length} payments</p>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={20} className="text-purple-600" />
              <p className="text-xs font-bold text-purple-600 uppercase">ERP Total</p>
            </div>
            <p className="text-2xl font-bold text-purple-900">{totalErp.toLocaleString()} SAR</p>
            <p className="text-xs text-purple-700 mt-1">{erpPayments.length} payments</p>
          </div>

          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={20} className="text-red-600" />
              <p className="text-xs font-bold text-red-600 uppercase">Discrepancies</p>
            </div>
            <p className="text-2xl font-bold text-red-900">{discrepancies.filter(d => d.status === 'UNRESOLVED').length}</p>
            <p className="text-xs text-red-700 mt-1">need attention</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 space-y-6">
        {/* Discrepancies Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-mavera-navy flex items-center gap-2">
              <AlertTriangle size={20} className="text-red-600" />
              Discrepancies Found
            </h2>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center gap-2 transition-colors">
              <Download size={16} />
              Export Report
            </button>
          </div>

          {discrepancies.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {discrepancies.map((disc) => (
                <div key={disc.id} className="px-6 py-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{disc.clientName}</h3>
                      <p className="text-sm text-gray-500">Booking ID: {disc.bookingId}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-md text-xs font-bold border ${
                      disc.status === 'UNRESOLVED'
                        ? 'bg-red-50 text-red-600 border-red-200'
                        : 'bg-green-50 text-green-600 border-green-200'
                    }`}>
                      {disc.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-blue-600 font-medium mb-1">System</p>
                      <p className="text-lg font-bold text-blue-900">{disc.systemAmount.toLocaleString()} SAR</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-green-600 font-medium mb-1">Gateway</p>
                      <p className="text-lg font-bold text-green-900">{disc.gatewayAmount.toLocaleString()} SAR</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-xs text-purple-600 font-medium mb-1">ERP</p>
                      <p className="text-lg font-bold text-purple-900">{disc.erpAmount.toLocaleString()} SAR</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={16} className="text-red-600" />
                      <span className="text-sm font-medium text-red-900">
                        Difference: <span className="font-bold">{Math.abs(disc.difference).toLocaleString()} SAR</span>
                      </span>
                    </div>
                    {disc.status === 'UNRESOLVED' && (
                      <button
                        onClick={() => handleResolveDiscrepancy(disc.id)}
                        className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors"
                      >
                        Resolve
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
              <p className="text-gray-600 font-medium">No discrepancies found!</p>
              <p className="text-sm text-gray-500 mt-1">All payments are reconciled correctly.</p>
            </div>
          )}
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-mavera-navy">Payment Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Booking ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">System</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Gateway</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">ERP</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {systemPayments.map((payment) => {
                  const gwPayment = gatewayPayments.find(p => p.bookingId === payment.bookingId);
                  const erpPayment = erpPayments.find(p => p.bookingId === payment.bookingId);
                  const hasDiscrepancy = 
                    (gwPayment && gwPayment.amount !== payment.amount) ||
                    (!erpPayment || erpPayment.amount !== payment.amount);

                  return (
                    <tr key={payment.id} className={hasDiscrepancy ? 'bg-red-50' : 'hover:bg-gray-50'}>
                      <td className="px-6 py-4 font-mono font-medium text-gray-900">{payment.bookingId}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{payment.clientName}</td>
                      <td className="px-6 py-4 text-gray-600">{new Date(payment.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right font-mono text-gray-900">
                        {payment.amount.toLocaleString()} SAR
                      </td>
                      <td className="px-6 py-4 text-right font-mono">
                        {gwPayment ? (
                          <span className={gwPayment.amount === payment.amount ? 'text-gray-900' : 'text-red-600 font-bold'}>
                            {gwPayment.amount.toLocaleString()} SAR
                          </span>
                        ) : (
                          <span className="text-red-600 font-bold">Missing</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right font-mono">
                        {erpPayment ? (
                          <span className={erpPayment.amount === payment.amount ? 'text-gray-900' : 'text-red-600 font-bold'}>
                            {erpPayment.amount.toLocaleString()} SAR
                          </span>
                        ) : (
                          <span className="text-red-600 font-bold">Missing</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {hasDiscrepancy ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-bold">
                            <AlertCircle size={12} />
                            Mismatch
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-600 rounded text-xs font-bold">
                            <CheckCircle size={12} />
                            Matched
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReconciliationPage;


