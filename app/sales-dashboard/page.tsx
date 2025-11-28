"use client";

import React from 'react';
import { Target, Calendar, ArrowRight, Clock, TrendingUp, ArrowLeft, Map, Trello, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../lib/i18n';

const SalesDashboard: React.FC = () => {
  const router = useRouter();
  const { t, direction } = useLanguage();

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Welcome & Actions */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
         <div>
            <h1 className="text-2xl font-bold text-mavera-navy">Welcome, Omar</h1>
            <p className="text-gray-500 text-sm mt-1">Here is your sales agenda for today.</p>
         </div>
         <div className="flex gap-3">
            <button 
               onClick={() => router.push('/sales/tours')}
               className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 hover:text-mavera-navy transition-colors text-sm shadow-sm flex items-center gap-2"
            >
               <Map size={16} />
               <span>{t('nav.tours')}</span>
            </button>
            <button 
               onClick={() => router.push('/sales/new')}
               className="px-5 py-2.5 bg-mavera-gold text-white font-bold rounded-xl hover:bg-mavera-goldHover shadow-lg shadow-mavera-gold/20 text-sm flex items-center gap-2"
            >
               <span>+ {t('dash.createQuote')}</span>
            </button>
         </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Monthly Target */}
         <div className="bg-mavera-navy text-white p-6 rounded-2xl relative overflow-hidden shadow-luxury group">
            <div className={`absolute top-0 w-40 h-40 bg-white/5 rounded-full -mt-16 group-hover:bg-white/10 transition-colors ${direction === 'rtl' ? 'left-0 -ml-16' : 'right-0 -mr-16'}`}></div>
            <div className="flex justify-between items-start mb-6">
               <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Target size={24} className="text-mavera-gold" />
               </div>
               <span className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full text-white/90">Oct 2024</span>
            </div>
            <div className="relative z-10">
               <p className="text-gray-300 text-xs font-medium uppercase tracking-wider mb-2">Monthly Sales Target</p>
               <h2 className="text-4xl font-bold mb-1">342k <span className="text-lg opacity-60 font-normal">/ 500k</span></h2>
               
               <div className="mt-6">
                  <div className="flex justify-between text-xs mb-2 opacity-80 font-medium">
                     <span>Progress</span>
                     <span>68%</span>
                  </div>
                  <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                     <div className="h-full bg-gradient-to-r from-mavera-gold to-amber-300 w-[68%] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                  </div>
               </div>
            </div>
         </div>

         {/* Pipeline Widget */}
         <div 
            onClick={() => router.push('/sales/pipeline')}
            className="bg-white p-6 rounded-2xl shadow-card hover:shadow-lg transition-all border border-transparent hover:border-blue-50 cursor-pointer group"
         >
            <div className="flex justify-between items-start mb-6">
               <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-100 transition-colors">
                  <Trello size={24} />
               </div>
               <span className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2.5 py-1 rounded-full">
                  <TrendingUp size={12} />
                  +12%
               </span>
            </div>
            <div>
               <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Active Pipeline</p>
               <h2 className="text-4xl font-bold text-mavera-navy">28</h2>
               <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                  15 pending action
               </p>
            </div>
         </div>

         {/* Upcoming Tours Widget */}
         <div 
            onClick={() => router.push('/sales/tours')}
            className="bg-white p-6 rounded-2xl shadow-card hover:shadow-lg transition-all border border-transparent hover:border-purple-50 cursor-pointer group"
         >
            <div className="flex justify-between items-start mb-6">
               <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-100 transition-colors">
                  <Calendar size={24} />
               </div>
               <span className="text-gray-400 text-xs font-medium bg-gray-50 px-3 py-1 rounded-full">Today</span>
            </div>
            <div>
               <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Tours & Visits</p>
               <h2 className="text-4xl font-bold text-mavera-navy">4</h2>
               <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Next at 4:00 PM
               </p>
            </div>
         </div>
      </div>

      {/* Appointment Feed */}
      <div>
         <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-mavera-navy text-lg">{t('dash.scheduledTours')}</h3>
            <button onClick={() => router.push('/sales/tours')} className="text-mavera-gold text-sm font-medium hover:text-mavera-navy transition-colors">See all</button>
         </div>
         
         <div className="bg-white rounded-2xl shadow-card border border-gray-100/50 overflow-hidden">
            <div className="divide-y divide-gray-50">
               {[1, 2, 3].map((i) => (
                  <div key={i} className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors group cursor-pointer">
                     <div className="flex items-center gap-5">
                        <div className="flex flex-col items-center justify-center w-14 h-14 bg-gray-50 rounded-2xl text-mavera-navy border border-gray-100 group-hover:border-mavera-gold/30 group-hover:bg-white transition-all shadow-sm">
                           <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Oct</span>
                           <span className="text-xl font-bold leading-none">2{i}</span>
                        </div>
                        <div>
                           <h4 className="font-bold text-mavera-navy text-base group-hover:text-mavera-gold transition-colors">Wedding Inquiry: Al-Fahad Family</h4>
                           <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500 font-medium">
                              <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded text-gray-600"><Clock size={12}/> 04:00 PM</span>
                              <span className="flex items-center gap-1.5"><Users size={12}/> 400 Guests</span>
                           </div>
                        </div>
                     </div>
                     <button 
                        onClick={() => router.push('/sales/new')}
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-mavera-gold group-hover:text-white transition-all shadow-sm"
                     >
                        {direction === 'rtl' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                     </button>
                  </div>
               ))}
            </div>
         </div>
      </div>

    </div>
  );
};

export default SalesDashboard;