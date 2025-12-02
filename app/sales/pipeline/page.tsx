"use client";

import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { MoreHorizontal, Calendar, CheckCircle, XCircle, Clock, Send, Filter } from 'lucide-react';

enum NafathStatus {
  PENDING = 'PENDING',
  SIGNED = 'SIGNED',
  REJECTED = 'REJECTED'
}

interface Deal {
  id: number;
  stage: string;
  client: string;
  value: string;
  date: string;
  nafathStatus?: NafathStatus;
  nafathSentDate?: string;
}

const SalesPipeline: React.FC = () => {
  const { t } = useLanguage();
  const [nafathFilter, setNafathFilter] = useState<NafathStatus | 'ALL'>('ALL');
  const [showNafathFilter, setShowNafathFilter] = useState(false);

  const stages = [
    { id: 'new', title: t('pipe.new'), color: 'border-blue-500', bg: 'bg-blue-50' },
    { id: 'tour', title: t('pipe.tour'), color: 'border-purple-500', bg: 'bg-purple-50' },
    { id: 'proposal', title: t('pipe.proposal'), color: 'border-orange-500', bg: 'bg-orange-50' },
    { id: 'nafath', title: t('pipe.nafath'), color: 'border-mavera-gold', bg: 'bg-amber-50' },
    { id: 'won', title: t('pipe.won'), color: 'border-green-500', bg: 'bg-green-50' },
  ];

  const deals: Deal[] = [
    { id: 1, stage: 'new', client: 'Fatima Al-Sayed', value: '85k', date: 'Oct 2025' },
    { id: 2, stage: 'tour', client: 'Ahmed & Sarah', value: '120k', date: 'Nov 2025' },
    { id: 3, stage: 'proposal', client: 'Golden Gala', value: '45k', date: 'Dec 2024' },
    { id: 4, stage: 'nafath', client: 'Dr. Khalid', value: '200k', date: 'Jan 2026', nafathStatus: NafathStatus.PENDING, nafathSentDate: '2024-11-25' },
    { id: 5, stage: 'tour', client: 'Corp Event', value: '30k', date: 'Oct 2024' },
    { id: 6, stage: 'nafath', client: 'Sara & Mohammed', value: '150k', date: 'Feb 2026', nafathStatus: NafathStatus.SIGNED, nafathSentDate: '2024-11-20' },
    { id: 7, stage: 'proposal', client: 'Luxury Wedding', value: '180k', date: 'Mar 2026', nafathStatus: NafathStatus.REJECTED, nafathSentDate: '2024-11-18' },
  ];

  const getNafathStatusBadge = (status?: NafathStatus) => {
    if (!status) return null;
    
    const styles = {
      [NafathStatus.PENDING]: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200', icon: <Clock size={12} /> },
      [NafathStatus.SIGNED]: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', icon: <CheckCircle size={12} /> },
      [NafathStatus.REJECTED]: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', icon: <XCircle size={12} /> }
    };
    
    const style = styles[status];
    
    return (
      <div className={`flex items-center gap-1 ${style.bg} ${style.text} border ${style.border} px-2 py-1 rounded-md text-[10px] font-bold`}>
        {style.icon}
        <span>{status}</span>
      </div>
    );
  };

  const handleResendToNafath = (dealId: number) => {
    alert(`Resending contract to Nafath for Deal #${dealId}`);
    // Here you would implement the actual resend logic
  };

  const filteredDeals = nafathFilter === 'ALL' 
    ? deals 
    : deals.filter(d => d.nafathStatus === nafathFilter);

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col animate-fade-in overflow-hidden">
      <div className="mb-6 shrink-0 flex justify-between items-start">
         <div>
           <h1 className="text-2xl font-bold text-mavera-navy">{t('pipe.title')}</h1>
           <p className="text-gray-500 text-sm">{t('pipe.subtitle')}</p>
         </div>
         
         {/* Nafath Filter */}
         <div className="relative">
           <button
             onClick={() => setShowNafathFilter(!showNafathFilter)}
             className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
               nafathFilter !== 'ALL' 
                 ? 'bg-mavera-gold text-white border-mavera-gold' 
                 : 'bg-white text-gray-600 border-gray-200 hover:border-mavera-gold'
             }`}
           >
             <Filter size={18} />
             <span className="text-sm font-medium">Nafath Status</span>
           </button>
           
           {showNafathFilter && (
             <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-xl shadow-lg p-2 w-48 z-10">
               {['ALL', ...Object.values(NafathStatus)].map((status) => (
                 <button
                   key={status}
                   onClick={() => {
                     setNafathFilter(status as any);
                     setShowNafathFilter(false);
                   }}
                   className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                     nafathFilter === status ? 'bg-mavera-gold text-white' : 'hover:bg-gray-50 text-gray-700'
                   }`}
                 >
                   {status}
                 </button>
               ))}
             </div>
           )}
         </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
         <div className="flex gap-4 min-w-[1000px] h-full">
            {stages.map(stage => (
               <div key={stage.id} className="flex-1 flex flex-col bg-gray-50 rounded-2xl border border-gray-200 min-w-[250px]">
                  {/* Header */}
                  <div className={`p-4 border-b border-gray-200 flex justify-between items-center rounded-t-2xl bg-white border-t-4 ${stage.color}`}>
                     <span className="font-bold text-mavera-navy text-sm">{stage.title}</span>
                     <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full font-mono">
                        {deals.filter(d => d.stage === stage.id).length}
                     </span>
                  </div>

                  {/* Cards */}
                  <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                     {filteredDeals.filter(d => d.stage === stage.id).map(deal => (
                        <div key={deal.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md cursor-pointer group transition-all">
                           <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-mavera-navy text-sm group-hover:text-mavera-gold transition-colors">{deal.client}</span>
                              <button className="text-gray-300 hover:text-gray-500"><MoreHorizontal size={16} /></button>
                           </div>
                           <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                              <Calendar size={12} />
                              <span>{deal.date}</span>
                           </div>
                           
                           {/* Nafath Status Badge */}
                           {deal.nafathStatus && (
                             <div className="mb-2">
                               {getNafathStatusBadge(deal.nafathStatus)}
                               {deal.nafathSentDate && (
                                 <p className="text-[10px] text-gray-400 mt-1">
                                   Sent: {new Date(deal.nafathSentDate).toLocaleDateString()}
                                 </p>
                               )}
                             </div>
                           )}
                           
                           <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                              <span className="font-bold text-mavera-navy text-xs bg-gray-50 px-2 py-1 rounded">
                                 {deal.value} SAR
                              </span>
                              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                 OH
                              </div>
                           </div>
                           
                           {/* Resend to Nafath Button */}
                           {(deal.nafathStatus === NafathStatus.PENDING || deal.nafathStatus === NafathStatus.REJECTED) && (
                             <button
                               onClick={(e) => {
                                 e.stopPropagation();
                                 handleResendToNafath(deal.id);
                               }}
                               className="w-full mt-3 flex items-center justify-center gap-1 px-3 py-2 bg-mavera-gold/10 text-mavera-gold rounded-lg text-xs font-medium hover:bg-mavera-gold hover:text-white transition-all"
                             >
                               <Send size={12} />
                               Resend to Nafath
                             </button>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default SalesPipeline;