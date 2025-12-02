"use client";

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Copy, Eye, EyeOff, Tag, Calendar, TrendingUp, Search } from 'lucide-react';

interface DiscountCode {
  id: string;
  code: string;
  percentage: number;
  expiryDate: string;
  maxUses: number;
  currentUses: number;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}

const DiscountCodesPage: React.FC = () => {
  const [codes, setCodes] = useState<DiscountCode[]>([
    {
      id: 'DC001',
      code: 'SUMMER2024',
      percentage: 15,
      expiryDate: '2024-12-31',
      maxUses: 50,
      currentUses: 23,
      isActive: true,
      createdBy: 'Admin',
      createdAt: '2024-11-01'
    },
    {
      id: 'DC002',
      code: 'VIP20',
      percentage: 20,
      expiryDate: '2025-06-30',
      maxUses: 100,
      currentUses: 45,
      isActive: true,
      createdBy: 'Admin',
      createdAt: '2024-10-15'
    },
    {
      id: 'DC003',
      code: 'WEDDING10',
      percentage: 10,
      expiryDate: '2024-11-30',
      maxUses: 30,
      currentUses: 30,
      isActive: false,
      createdBy: 'Sales Manager',
      createdAt: '2024-09-01'
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<DiscountCode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    code: '',
    percentage: 0,
    expiryDate: '',
    maxUses: 0
  });

  const filteredCodes = codes.filter(c =>
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCode = () => {
    const newCode: DiscountCode = {
      id: `DC${String(codes.length + 1).padStart(3, '0')}`,
      ...formData,
      currentUses: 0,
      isActive: true,
      createdBy: 'Current User',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCodes([...codes, newCode]);
    resetForm();
  };

  const handleUpdateCode = () => {
    if (!editingCode) return;
    setCodes(codes.map(c => c.id === editingCode.id ? { ...c, ...formData } : c));
    resetForm();
  };

  const handleToggleActive = (id: string) => {
    setCodes(codes.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const handleDeleteCode = (id: string) => {
    if (confirm('Are you sure you want to delete this discount code?')) {
      setCodes(codes.filter(c => c.id !== id));
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Code "${code}" copied to clipboard!`);
  };

  const openEditModal = (code: DiscountCode) => {
    setEditingCode(code);
    setFormData({
      code: code.code,
      percentage: code.percentage,
      expiryDate: code.expiryDate,
      maxUses: code.maxUses
    });
    setIsAddModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      code: '',
      percentage: 0,
      expiryDate: '',
      maxUses: 0
    });
    setEditingCode(null);
    setIsAddModalOpen(false);
  };

  const isExpired = (date: string) => new Date(date) < new Date();
  const isFullyUsed = (code: DiscountCode) => code.currentUses >= code.maxUses;

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-mavera-navy mb-2">Discount Codes</h1>
            <p className="text-gray-500">Manage promotional discount codes</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="px-6 py-3 bg-mavera-gold text-white rounded-xl font-bold hover:bg-mavera-goldHover flex items-center gap-2 transition-all shadow-lg shadow-mavera-gold/20"
          >
            <Plus size={20} />
            Create Discount Code
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Total Codes', count: codes.length, color: 'text-gray-600', icon: <Tag size={20} /> },
            { label: 'Active', count: codes.filter(c => c.isActive).length, color: 'text-green-600', icon: <Eye size={20} /> },
            { label: 'Expired', count: codes.filter(c => isExpired(c.expiryDate)).length, color: 'text-red-600', icon: <Calendar size={20} /> },
            { label: 'Total Uses', count: codes.reduce((sum, c) => sum + c.currentUses, 0), color: 'text-blue-600', icon: <TrendingUp size={20} /> },
          ].map((stat, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <span className={stat.color}>{stat.icon}</span>
                <p className="text-xs font-bold text-gray-500 uppercase">{stat.label}</p>
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8">
        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search discount codes..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
            />
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Codes Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Code</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Discount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Expiry Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Usage</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Created By</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCodes.map((code) => {
                const expired = isExpired(code.expiryDate);
                const fullyUsed = isFullyUsed(code);
                const usagePercentage = (code.currentUses / code.maxUses) * 100;

                return (
                  <tr key={code.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-mavera-navy">{code.code}</span>
                        <button
                          onClick={() => handleCopyCode(code.code)}
                          className="p-1 text-gray-400 hover:text-mavera-gold rounded transition-colors"
                          title="Copy code"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-mavera-gold/10 text-mavera-gold rounded-lg font-bold">
                        {code.percentage}% OFF
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={expired ? 'text-red-600 font-medium' : 'text-gray-600'}>
                        {new Date(code.expiryDate).toLocaleDateString()}
                      </span>
                      {expired && (
                        <span className="block text-xs text-red-600 mt-1">Expired</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-bold ${fullyUsed ? 'text-red-600' : 'text-gray-900'}`}>
                            {code.currentUses} / {code.maxUses}
                          </span>
                        </div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${fullyUsed ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold border flex items-center gap-1 w-fit ${
                        code.isActive && !expired && !fullyUsed
                          ? 'bg-green-50 text-green-600 border-green-200'
                          : 'bg-gray-50 text-gray-600 border-gray-200'
                      }`}>
                        {code.isActive && !expired && !fullyUsed ? (
                          <>
                            <Eye size={12} />
                            ACTIVE
                          </>
                        ) : (
                          <>
                            <EyeOff size={12} />
                            INACTIVE
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-900 font-medium">{code.createdBy}</p>
                        <p className="text-xs text-gray-500">{new Date(code.createdAt).toLocaleDateString()}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleToggleActive(code.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            code.isActive
                              ? 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                              : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                          }`}
                          title={code.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {code.isActive ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        <button
                          onClick={() => openEditModal(code)}
                          className="p-2 text-gray-400 hover:text-mavera-navy hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteCode(code.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredCodes.length === 0 && (
            <div className="text-center py-12">
              <Tag size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No discount codes found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={resetForm} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-xl font-bold text-mavera-navy">
                  {editingCode ? 'Edit Discount Code' : 'Create Discount Code'}
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">
                    Code
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none font-mono"
                    placeholder="e.g., SUMMER2024"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">
                    Discount Percentage
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.percentage}
                      onChange={(e) => setFormData({ ...formData, percentage: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
                      placeholder="0"
                      min="0"
                      max="100"
                    />
                    <span className="absolute right-4 top-3 text-gray-500">%</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">
                    Maximum Uses
                  </label>
                  <input
                    type="number"
                    value={formData.maxUses}
                    onChange={(e) => setFormData({ ...formData, maxUses: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingCode ? handleUpdateCode : handleAddCode}
                  disabled={!formData.code || formData.percentage <= 0 || !formData.expiryDate || formData.maxUses <= 0}
                  className="px-6 py-2.5 bg-mavera-gold text-white rounded-xl font-bold hover:bg-mavera-goldHover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {editingCode ? 'Update Code' : 'Create Code'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DiscountCodesPage;


