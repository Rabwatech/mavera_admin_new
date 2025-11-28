"use client";

import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import { MoreHorizontal, Calendar } from 'lucide-react';

const SalesPipeline: React.FC = () => {
  const { t } = useLanguage();

  const stages = [
    { id: 'new', title: t('pipe.new'), color: 'border-blue-500', bg: 'bg-blue-50' },
    { id: 'tour', title: t('pipe.tour'), color: 'border-purple-500', bg: 'bg-purple-50' },
    { id: 'proposal', title: t('pipe.proposal'), color: 'border-orange-500', bg: 'bg-orange-50' },
    { id: 'nafath', title: t('pipe.nafath'), color: 'border-mavera-gold', bg: 'bg-amber-50' },
    { id: 'won', title: t('pipe.won'), color: 'border-green-500', bg: 'bg-green-50' },
  ];

  const deals = [
    { id: 1, stage: 'new', client: 'Fatima Al-Sayed', value: '85k', date: 'Oct 2025' },
    { id: 2, stage: 'tour', client: 'Ahmed & Sarah', value: '120k', date: 'Nov 2025' },
    { id: 3, stage: 'proposal', client: 'Golden Gala', value: '45k', date: 'Dec 2024' },
    { id: 4, stage: 'nafath', client: 'Dr. Khalid', value: '200k', date: 'Jan 2026' },
    { id: 5, stage: 'tour', client: 'Corp Event', value: '30k', date: 'Oct 2024' },
  ];

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col animate-fade-in overflow-hidden">
      <div className="mb-6 shrink-0">
         <h1 className="text-2xl font-bold text-mavera-navy">{t('pipe.title')}</h1>
         <p className="text-gray-500 text-sm">{t('pipe.subtitle')}</p>
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
                     {deals.filter(d => d.stage === stage.id).map(deal => (
                        <div key={deal.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md cursor-pointer group transition-all">
                           <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-mavera-navy text-sm group-hover:text-mavera-gold transition-colors">{deal.client}</span>
                              <button className="text-gray-300 hover:text-gray-500"><MoreHorizontal size={16} /></button>
                           </div>
                           <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                              <Calendar size={12} />
                              <span>{deal.date}</span>
                           </div>
                           <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                              <span className="font-bold text-mavera-navy text-xs bg-gray-50 px-2 py-1 rounded">
                                 {deal.value} SAR
                              </span>
                              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                 OH
                              </div>
                           </div>
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