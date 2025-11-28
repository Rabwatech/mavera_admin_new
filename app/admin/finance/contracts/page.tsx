"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Download, ShieldCheck, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../../../lib/i18n';

const FinanceContracts: React.FC = () => {
  const { t, direction } = useLanguage();
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const contracts = [
    { 
       id: 'CNT-2024-882', 
       client: 'Al-Rajhi Wedding', 
       date: '2024-09-15', 
       status: 'Active', 
       value: 150000,
       addons: []
    },
    { 
       id: 'CNT-2024-890', 
       client: 'Golden Gala Event', 
       date: '2024-10-01', 
       status: 'Active', 
       value: 200000,
       addons: [
          { id: 'SUP-01', type: 'Add-on', desc: 'Supplementary Invoice: VIP Dinner', value: 15000, date: '2024-10-10' },
          { id: 'AMD-02', type: 'Amendment', desc: 'Extended Hall Hours', value: 5000, date: '2024-10-12' }
       ]
    },
    { 
       id: 'CNT-2024-895', 
       client: 'Cancelled Event #99', 
       date: '2024-10-05', 
       status: 'Refunded', 
       value: 50000,
       addons: []
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
       <div>
         <h1 className="text-2xl font-bold text-mavera-navy">Contracts Repository</h1>
         <p className="text-gray-500 text-sm">Legal archive, amendment tracking, and audit logs.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
         <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="relative max-w-md">
               <input 
                 type="text" 
                 placeholder="Search contracts..." 
                 className={`w-full py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-mavera-gold ${direction === 'rtl' ? 'pl-10 pr-4' : 'pl-4 pr-10'}`}
               />
               <Search size={16} className={`absolute top-3 text-gray-400 ${direction === 'rtl' ? 'left-3' : 'right-3'}`} />
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[800px]">
               <thead className="bg-gray-50 text-gray-500 font-medium">
                  <tr>
                     <th className="w-12"></th>
                     <th className="px-6 py-4 text-start">Contract ID</th>
                     <th className="px-6 py-4 text-start">Client</th>
                     <th className="px-6 py-4 text-start">Signed Date</th>
                     <th className="px-6 py-4 text-start">Status</th>
                     <th className="px-6 py-4 text-start">Total Value</th>
                     <th className="px-6 py-4 text-end">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {contracts.map(contract => (
                     <React.Fragment key={contract.id}>
                        <tr className={`hover:bg-gray-50 transition-colors ${contract.status === 'Refunded' ? 'opacity-75' : ''}`}>
                           <td className="px-4 text-center">
                              {contract.addons.length > 0 && (
                                 <button 
                                    onClick={() => setExpandedRow(expandedRow === contract.id ? null : contract.id)}
                                    className="p-1 rounded hover:bg-gray-200 text-gray-500 transition-colors"
                                 >
                                    {expandedRow === contract.id ? <ChevronDown size={16} /> : (direction === 'rtl' ? <ChevronDown size={16} className="rotate-90" /> : <ChevronRight size={16} />)}
                                 </button>
                              )}
                           </td>
                           <td className="px-6 py-4 font-mono font-bold text-mavera-navy">{contract.id}</td>
                           <td className="px-6 py-4 font-bold text-gray-700">{contract.client}</td>
                           <td className="px-6 py-4 text-gray-500">{contract.date}</td>
                           <td className="px-6 py-4">
                              <span className={`px-2 py-0.5 rounded text-xs font-bold border flex items-center gap-1 w-fit ${
                                 contract.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                 contract.status === 'Refunded' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                 'bg-blue-50 text-blue-600 border-blue-100'
                              }`}>
                                 {contract.status === 'Active' ? <ShieldCheck size={12}/> : <AlertCircle size={12}/>}
                                 {contract.status}
                              </span>
                           </td>
                           <td className="px-6 py-4 font-bold text-mavera-navy">{contract.value.toLocaleString()} SAR</td>
                           <td className="px-6 py-4 text-end">
                              <button className="text-gray-400 hover:text-mavera-navy p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Download Legal Copy">
                                 <Download size={18} />
                              </button>
                           </td>
                        </tr>
                        {/* Nested Add-ons */}
                        {expandedRow === contract.id && contract.addons.map(addon => (
                           <tr key={addon.id} className="bg-gray-50/50">
                              <td></td>
                              <td colSpan={2} className="px-6 py-3 pl-12 text-gray-500 flex items-center gap-2">
                                 <div className={`w-6 h-6 border-l-2 border-b-2 border-gray-300 rounded-bl-lg ${direction === 'rtl' ? 'border-r-2 border-l-0 rounded-br-lg rounded-bl-none' : ''}`}></div>
                                 <span className="text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-600 px-2 py-0.5 rounded">{addon.type}</span>
                                 <span className="text-sm font-medium">{addon.desc}</span>
                              </td>
                              <td className="px-6 py-3 text-xs text-gray-400">{addon.date}</td>
                              <td></td>
                              <td className="px-6 py-3 font-mono text-xs font-bold text-gray-600">+{addon.value.toLocaleString()}</td>
                              <td className="px-6 py-3 text-end">
                                 <button className="text-xs text-mavera-gold hover:underline font-bold">View Addendum</button>
                              </td>
                           </tr>
                        ))}
                     </React.Fragment>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default FinanceContracts;