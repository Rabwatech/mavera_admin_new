"use client";

import React, { useState } from 'react';
import { Search, CalendarDays } from 'lucide-react';
import { useLanguage } from '../../../lib/i18n';
import TourCard, { Tour } from '../../../components/TourCard';

const SalesTours: React.FC = () => {
  const { t, direction } = useLanguage();
  const [activeTab, setActiveTab] = useState<'All' | 'Today' | 'Upcoming' | 'Completed'>('Today');

  // MOCK DATA
  const [tours, setTours] = useState<Tour[]>([
    { id: 'T1', clientName: 'Ahmed Al-Fahad', time: '16:00', hall: 'MAVERA 1', guests: 350, type: 'Wedding', status: 'Scheduled', isToday: true },
    { id: 'T2', clientName: 'Sarah Smith (Corp)', time: '17:30', hall: 'MAVERA 2', guests: 120, type: 'Corporate', status: 'Scheduled', isToday: true },
    { id: 'T3', clientName: 'Khalid & Noura', time: '10:00', hall: 'MAVERA 1', guests: 500, type: 'Wedding', status: 'Completed', isToday: true },
    { id: 'T4', clientName: 'Golden Events Co', time: '14:00', hall: 'MAVERA 2', guests: 50, type: 'Exhibition', status: 'NoShow', isToday: true },
    { id: 'T5', clientName: 'Dr. Faisal', time: '11:00', hall: 'MAVERA 1', guests: 200, type: 'Conference', status: 'Scheduled', isToday: false },
    { id: 'T6', clientName: 'Al-Otaibi Wedding', time: '19:00', hall: 'MAVERA 3', guests: 600, type: 'Wedding', status: 'Scheduled', isToday: false },
  ]);

  const handleStatusChange = (id: string, status: Tour['status']) => {
    setTours(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const filteredTours = tours.filter(tour => {
    if (activeTab === 'Today') return tour.isToday;
    if (activeTab === 'Upcoming') return !tour.isToday && tour.status === 'Scheduled';
    if (activeTab === 'Completed') return tour.status === 'Completed';
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
           <h1 className="text-2xl font-bold text-mavera-navy">{t('tours.title')}</h1>
           <p className="text-gray-500 text-sm">{t('tours.subtitle')}</p>
        </div>
        
        {/* Quick Stats */}
        <div className="flex gap-4">
           <div className="bg-mavera-gold/10 text-mavera-gold px-4 py-2 rounded-xl border border-mavera-gold/20">
              <span className="text-xs font-bold uppercase block opacity-80">{t('tours.today')}</span>
              <span className="text-xl font-bold">{tours.filter(t => t.isToday).length}</span>
           </div>
           <div className="bg-white text-gray-500 px-4 py-2 rounded-xl border border-gray-200">
              <span className="text-xs font-bold uppercase block opacity-60">Pending</span>
              <span className="text-xl font-bold">{tours.filter(t => t.status === 'Scheduled').length}</span>
           </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
         <div className="flex p-1 bg-gray-50 rounded-xl w-full sm:w-auto overflow-x-auto">
            {['All', 'Today', 'Upcoming', 'Completed'].map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab as any)}
                 className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === tab 
                    ? 'bg-white text-mavera-navy shadow-sm' 
                    : 'text-gray-400 hover:text-gray-600'
                 }`}
               >
                 {tab === 'Today' ? t('tours.today') : tab}
               </button>
            ))}
         </div>

         <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search client..." 
              className={`w-full py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-mavera-gold ${direction === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
            />
            <Search size={16} className={`absolute top-2.5 text-gray-400 ${direction === 'rtl' ? 'right-3' : 'left-3'}`} />
         </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {filteredTours.length > 0 ? (
            filteredTours.map(tour => (
               <TourCard key={tour.id} tour={tour} onStatusChange={handleStatusChange} />
            ))
         ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
               <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <CalendarDays size={32} className="opacity-20" />
               </div>
               <p>No tours found for this filter.</p>
            </div>
         )}
      </div>

    </div>
  );
};

export default SalesTours;