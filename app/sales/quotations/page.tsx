"use client";

import React, { useState } from 'react';
import { 
  FileText, Eye, Check, X, Clock, Send, Download, 
  Mail, MessageSquare, Plus, Search, Filter 
} from 'lucide-react';
import { useLanguage } from '../../../lib/i18n';

enum QuotationStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  VIEWED = 'VIEWED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

interface Quotation {
  id: string;
  clientName: string;
  clientEmail: string;
  eventDate: string;
  hall: string;
  totalAmount: number;
  status: QuotationStatus;
  createdAt: string;
  sentDate?: string;
  viewedDate?: string;
  respondedDate?: string;
}

const QuotationsPage: React.FC = () => {
  const { t, direction } = useLanguage();
  const [statusFilter, setStatusFilter] = useState<QuotationStatus | 'ALL'>('ALL');
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const quotations: Quotation[] = [
    {
      id: 'Q001',
      clientName: 'Fatima Al-Sayed',
      clientEmail: 'fatima@example.com',
      eventDate: '2026-02-15',
      hall: 'Grand Ballroom',
      totalAmount: 185000,
      status: QuotationStatus.SENT,
      createdAt: '2024-11-25',
      sentDate: '2024-11-25'
    },
    {
      id: 'Q002',
      clientName: 'Mohammed Aziz',
      clientEmail: 'mohammed@example.com',
      eventDate: '2026-03-20',
      hall: 'Royal Hall',
      totalAmount: 220000,
      status: QuotationStatus.VIEWED,
      createdAt: '2024-11-23',
      sentDate: '2024-11-24',
      viewedDate: '2024-11-25'
    },
    {
      id: 'Q003',
      clientName: 'Layla Mahmoud',
      clientEmail: 'layla@example.com',
      eventDate: '2026-01-10',
      hall: 'Crystal Hall',
      totalAmount: 150000,
      status: QuotationStatus.ACCEPTED,
      createdAt: '2024-11-20',
      sentDate: '2024-11-20',
      viewedDate: '2024-11-21',
      respondedDate: '2024-11-22'
    },
    {
      id: 'Q004',
      clientName: 'Ahmed Saleh',
      clientEmail: 'ahmed@example.com',
      eventDate: '2025-12-30',
      hall: 'Grand Ballroom',
      totalAmount: 195000,
      status: QuotationStatus.REJECTED,
      createdAt: '2024-11-18',
      sentDate: '2024-11-18',
      viewedDate: '2024-11-19',
      respondedDate: '2024-11-20'
    },
    {
      id: 'Q005',
      clientName: 'Noura Al-Otaibi',
      clientEmail: 'noura@example.com',
      eventDate: '2026-04-05',
      hall: 'Diamond Hall',
      totalAmount: 275000,
      status: QuotationStatus.DRAFT,
      createdAt: '2024-11-26'
    },
  ];

  const getStatusBadge = (status: QuotationStatus) => {
    const styles = {
      [QuotationStatus.DRAFT]: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', icon: <FileText size={12} /> },
      [QuotationStatus.SENT]: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', icon: <Send size={12} /> },
      [QuotationStatus.VIEWED]: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', icon: <Eye size={12} /> },
      [QuotationStatus.ACCEPTED]: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', icon: <Check size={12} /> },
      [QuotationStatus.REJECTED]: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', icon: <X size={12} /> }
    };
    
    const style = styles[status];
    
    return (
      <span className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold border ${style.bg} ${style.text} ${style.border}`}>
        {style.icon}
        {status}
      </span>
    );
  };

  const filteredQuotations = quotations.filter(q => {
    const statusMatch = statusFilter === 'ALL' || q.status === statusFilter;
    const searchMatch = q.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       q.id.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });

  const handleSendQuotation = (quotationId: string, method: 'email' | 'whatsapp') => {
    alert(`Sending quotation ${quotationId} via ${method}`);
  };

  const handleDownloadPDF = (quotationId: string) => {
    alert(`Downloading PDF for quotation ${quotationId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-mavera-navy mb-2">Quotations</h1>
            <p className="text-gray-500">Manage and track all price quotations</p>
          </div>
          <button className="px-6 py-3 bg-mavera-gold text-white rounded-xl font-bold hover:bg-mavera-goldHover flex items-center gap-2 transition-all shadow-lg shadow-mavera-gold/20">
            <Plus size={20} />
            Create New Quotation
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {[
            { label: 'Total', count: quotations.length, color: 'text-gray-600' },
            { label: 'Sent', count: quotations.filter(q => q.status === QuotationStatus.SENT).length, color: 'text-blue-600' },
            { label: 'Viewed', count: quotations.filter(q => q.status === QuotationStatus.VIEWED).length, color: 'text-purple-600' },
            { label: 'Accepted', count: quotations.filter(q => q.status === QuotationStatus.ACCEPTED).length, color: 'text-green-600' },
            { label: 'Rejected', count: quotations.filter(q => q.status === QuotationStatus.REJECTED).length, color: 'text-red-600' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8">
        {/* Filters & Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name or quotation ID..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
            />
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowStatusFilter(!showStatusFilter)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-colors ${
                statusFilter !== 'ALL' 
                  ? 'bg-mavera-gold text-white border-mavera-gold' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-mavera-gold'
              }`}
            >
              <Filter size={18} />
              <span className="font-medium">Status: {statusFilter}</span>
            </button>
            
            {showStatusFilter && (
              <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-xl shadow-lg p-2 w-48 z-10">
                {['ALL', ...Object.values(QuotationStatus)].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status as any);
                      setShowStatusFilter(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      statusFilter === status ? 'bg-mavera-gold text-white' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quotations Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Quotation ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Client</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Event Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Hall</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredQuotations.map((quotation) => (
                <tr key={quotation.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-mavera-navy">{quotation.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{quotation.clientName}</p>
                      <p className="text-sm text-gray-500">{quotation.clientEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {new Date(quotation.eventDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{quotation.hall}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-mavera-navy">
                      {quotation.totalAmount.toLocaleString()} SAR
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(quotation.status)}
                    {quotation.viewedDate && (
                      <p className="text-[10px] text-gray-400 mt-1">
                        Viewed: {new Date(quotation.viewedDate).toLocaleDateString()}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownloadPDF(quotation.id)}
                        className="p-2 text-gray-400 hover:text-mavera-navy hover:bg-gray-100 rounded-lg transition-colors"
                        title="Download PDF"
                      >
                        <Download size={16} />
                      </button>
                      {quotation.status === QuotationStatus.DRAFT && (
                        <>
                          <button
                            onClick={() => handleSendQuotation(quotation.id, 'email')}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Send via Email"
                          >
                            <Mail size={16} />
                          </button>
                          <button
                            onClick={() => handleSendQuotation(quotation.id, 'whatsapp')}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Send via WhatsApp"
                          >
                            <MessageSquare size={16} />
                          </button>
                        </>
                      )}
                      {(quotation.status === QuotationStatus.SENT || quotation.status === QuotationStatus.VIEWED) && (
                        <button
                          onClick={() => handleSendQuotation(quotation.id, 'email')}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                        >
                          Resend
                        </button>
                      )}
                      {quotation.status === QuotationStatus.ACCEPTED && (
                        <button className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors">
                          Create Booking
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredQuotations.length === 0 && (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No quotations found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotationsPage;


