"use client";

import React, { useState } from 'react';
import { Check, X, Clock } from 'lucide-react';
import { useLanguage } from '../../lib/i18n';

interface Request {
  id: string;
  client: string;
  date: string;
  originalPrice: number;
  requestedPrice: number;
  discount: number;
  agent: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const ApprovalsPage: React.FC = () => {
  const { t } = useLanguage();
  const [requests, setRequests] = useState<Request[]>([
    { 
      id: 'REQ-001', 
      client: 'Al-Jaber Wedding', 
      date: '2025-11-20', 
      originalPrice: 100000, 
      requestedPrice: 88000, 
      discount: 12, 
      agent: 'Omar Hassan', 
      reason: 'Client is a recurring customer (3rd event). Requested matching competitor price.', 
      status: 'Pending' 
    },
    { 
      id: 'REQ-002', 
      client: 'Golden Gala Corp', 
      date: '2025-12-15', 
      originalPrice: 150000, 
      requestedPrice: 140000, 
      discount: 6.6, 
      agent: 'Omar Hassan', 
      reason: 'Large booking, full upfront payment offered.', 
      status: 'Pending' 
    }
  ]);

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
  };

  const pendingRequests = requests.filter(r => r.status === 'Pending');
  const historyRequests = requests.filter(r => r.status !== 'Pending');

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div>
         <h1 className="text-2xl font-bold text-mavera-navy">{t('approvals.title')}</h1>
         <p className="text-gray-500 text-sm">{t('approvals.subtitle')}</p>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
         {/* Pending List */}
         <div className="flex-1 space-y-4">
            <h3 className="font-bold text-mavera-navy flex items-center gap-2">
               <Clock size={18} className="text-orange-500" /> 
               Pending Review 
               <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full">{pendingRequests.length}</span>
            </h3>

            {pendingRequests.length === 0 && (
               <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-400">
                  <Check size={32} className="mx-auto mb-2 opacity-20" />
                  <p>All caught up! No pending requests.</p>
               </div>
            )}

            {pendingRequests.map(req => (
               <div key={req.id} className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
                  <div className="p-5 border-b border-gray-50">
                     <div className="flex justify-between items-start">
                        <div>
                           <h4 className="font-bold text-mavera-navy text-lg">{req.client}</h4>
                           <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                              <span className="bg-gray-100 px-1.5 py-0.5 rounded">{req.date}</span>
                              <span>by <span className="font-semibold text-mavera-gold">{req.agent}</span></span>
                           </p>
                        </div>
                        <span className="bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded-lg text-sm font-bold animate-pulse">
                           -{req.discount}%
                        </span>
                     </div>
                  </div>
                  
                  <div className="p-5 bg-gray-50/50 space-y-4">
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Original Price:</span>
                        <span className="font-mono text-gray-400 line-through">{req.originalPrice.toLocaleString()} SAR</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-mavera-navy">Requested Price:</span>
                        <span className="font-mono font-bold text-mavera-navy text-lg">{req.requestedPrice.toLocaleString()} SAR</span>
                     </div>
                     <div className="bg-white p-3 rounded-lg border border-gray-100 text-xs text-gray-600 italic">
                        "{req.reason}"
                     </div>
                  </div>

                  <div className="p-4 flex gap-3 bg-white border-t border-gray-100">
                     <button 
                       onClick={() => handleAction(req.id, 'Rejected')}
                       className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                     >
                        Reject
                     </button>
                     <button 
                       onClick={() => handleAction(req.id, 'Approved')}
                       className="flex-1 py-2 rounded-xl bg-mavera-navy text-white font-bold text-sm hover:bg-mavera-navyLight shadow-lg transition-all"
                     >
                        Approve Request
                     </button>
                  </div>
               </div>
            ))}
         </div>

         {/* History / Recent Decisions */}
         <div className="w-full lg:w-80 space-y-4">
            <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider">Recent History</h3>
            <div className="space-y-3">
               {historyRequests.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No history available.</p>
               ) : historyRequests.map(req => (
                  <div key={req.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm opacity-75 hover:opacity-100 transition-opacity">
                     <div className="flex justify-between items-start mb-2">
                        <h5 className="font-bold text-gray-700 text-sm">{req.client}</h5>
                        {req.status === 'Approved' ? (
                           <Check size={14} className="text-green-500" />
                        ) : (
                           <X size={14} className="text-red-500" />
                        )}
                     </div>
                     <p className="text-xs text-gray-400 mb-2">{req.agent} • {req.date}</p>
                     <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${req.status === 'Approved' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {req.status}
                     </span>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default ApprovalsPage;