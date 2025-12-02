"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, FileCheck, DollarSign, FileText, MoreHorizontal, Eye } from 'lucide-react';
import { useLanguage } from '../../lib/i18n';

interface ClientRow {
  id: string;
  name: string;
  phone: string;
  eventDate: string;
  contract: 'Draft' | 'Signed' | 'Pending';
  payments: 'Paid' | 'Partial' | 'Overdue';
  arrangements: 'Pending' | 'Uploaded';
}

const ClientsPage: React.FC = () => {
  const { t, direction } = useLanguage();
  const router = useRouter();
  const [clients] = useState<ClientRow[]>([
    { id: 'C101', name: 'Al-Rajhi Family', phone: '0501234567', eventDate: '2025-10-15', contract: 'Signed', payments: 'Partial', arrangements: 'Pending' },
    { id: 'C102', name: 'Fahad & Sara', phone: '0559876543', eventDate: '2025-11-02', contract: 'Signed', payments: 'Paid', arrangements: 'Uploaded' },
    { id: 'C103', name: 'Golden Gala', phone: '0543210000', eventDate: '2025-12-10', contract: 'Draft', payments: 'Overdue', arrangements: 'Pending' },
    { id: 'C104', name: 'Ahmed Saleh', phone: '0567778888', eventDate: '2025-09-20', contract: 'Signed', payments: 'Paid', arrangements: 'Uploaded' },
  ]);

  const getStatusBadge = (type: 'contract' | 'payments' | 'arrangements', status: string) => {
     let color = 'bg-gray-100 text-gray-500';
     if (['Signed', 'Paid', 'Uploaded'].includes(status)) color = 'bg-green-50 text-green-600 border-green-100';
     if (['Partial', 'Draft'].includes(status)) color = 'bg-blue-50 text-blue-600 border-blue-100';
     if (['Overdue', 'Pending'].includes(status)) color = 'bg-orange-50 text-orange-600 border-orange-100';
     
     return <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${color}`}>{status}</span>;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
         <h1 className="text-2xl font-bold text-mavera-navy">{t('clients.title')}</h1>
         <p className="text-gray-500 text-sm">{t('clients.subtitle')}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
         <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex gap-4">
            <div className="relative flex-1 max-w-md">
               <Search size={16} className={`absolute top-3 text-gray-400 ${direction === 'rtl' ? 'left-3' : 'right-3'}`} />
               <input 
                 type="text" 
                 placeholder="Search by name, phone or ID..."
                 className={`w-full bg-white border border-gray-200 rounded-lg py-2 text-sm outline-none focus:border-mavera-gold ${direction === 'rtl' ? 'pl-10 pr-4' : 'pr-10 pl-4'}`}
               />
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
               <thead className="bg-gray-50 text-gray-500 font-medium">
                  <tr>
                     <th className="px-6 py-4 text-start">Client Name</th>
                     <th className="px-6 py-4 text-start">Event Date</th>
                     <th className="px-6 py-4 text-start"><div className="flex items-center gap-1"><FileText size={14}/> Contract</div></th>
                     <th className="px-6 py-4 text-start"><div className="flex items-center gap-1"><DollarSign size={14}/> Payments</div></th>
                     <th className="px-6 py-4 text-start"><div className="flex items-center gap-1"><FileCheck size={14}/> Arrangements</div></th>
                     <th className="px-6 py-4 text-end">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {clients.map(client => (
                     <tr key={client.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-6 py-4">
                           <div className="flex flex-col">
                              <span className="font-bold text-mavera-navy">{client.name}</span>
                              <span className="text-[10px] text-gray-400 font-mono" dir="ltr">{client.phone}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-medium">{client.eventDate}</td>
                        <td className="px-6 py-4">{getStatusBadge('contract', client.contract)}</td>
                        <td className="px-6 py-4">{getStatusBadge('payments', client.payments)}</td>
                        <td className="px-6 py-4">{getStatusBadge('arrangements', client.arrangements)}</td>
                        <td className="px-6 py-4 text-end">
                           <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => router.push(`/clients/${client.id}`)}
                                className="p-2 text-gray-400 hover:text-mavera-gold hover:bg-gray-100 rounded-lg transition-colors"
                                title={t('clients.viewDetails')}
                              >
                                 <Eye size={18} />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-mavera-navy hover:bg-gray-100 rounded-lg transition-colors">
                                 <MoreHorizontal size={18} />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default ClientsPage;