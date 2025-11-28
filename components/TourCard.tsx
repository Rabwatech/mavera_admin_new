"use client";

import React from 'react';
import { Clock, Users, MapPin, CheckCircle, XCircle, Calendar, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import { useRouter } from 'next/navigation';

export interface Tour {
  id: string;
  clientName: string;
  time: string;
  hall: string;
  guests: number;
  type: string;
  status: 'Scheduled' | 'Completed' | 'NoShow' | 'Cancelled';
  isToday: boolean;
}

interface TourCardProps {
  tour: Tour;
  onStatusChange: (id: string, status: Tour['status']) => void;
}

const TourCard: React.FC<TourCardProps> = ({ tour, onStatusChange }) => {
  const { t, direction } = useLanguage();
  const router = useRouter();

  // Determine styles based on status and time
  const isUpcoming = tour.status === 'Scheduled' && tour.isToday;
  
  return (
    <div className={`relative bg-white rounded-2xl shadow-card border transition-all duration-300 hover:shadow-lg ${isUpcoming ? 'border-mavera-gold/50 shadow-mavera-gold/5' : 'border-gray-100'}`}>
      
      {/* Time Badge or Status Badge */}
      <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto">
         {tour.status === 'Scheduled' ? (
            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${isUpcoming ? 'bg-mavera-gold text-white animate-pulse' : 'bg-gray-100 text-gray-500'}`}>
               <Clock size={12} />
               {tour.time}
            </span>
         ) : (
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
               tour.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-100' : 
               'bg-red-50 text-red-600 border-red-100'
            }`}>
               {tour.status}
            </span>
         )}
      </div>

      <div className="p-5">
         <div className="mb-4">
            <h3 className="font-bold text-mavera-navy text-lg">{tour.clientName}</h3>
            <p className="text-gray-400 text-xs mt-1 flex items-center gap-2">
               <span className="bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">{tour.type}</span>
            </p>
         </div>

         <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="flex items-center gap-2 text-sm text-gray-600">
               <Users size={16} className="text-gray-400" />
               <span>{tour.guests} Guests</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
               <MapPin size={16} className="text-gray-400" />
               <span>{tour.hall}</span>
            </div>
         </div>

         {/* Actions */}
         {tour.status === 'Scheduled' ? (
            <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
               <button 
                  onClick={() => onStatusChange(tour.id, 'Completed')}
                  className="flex-1 bg-mavera-navy text-white py-2 rounded-xl text-xs font-bold hover:bg-mavera-navyLight transition-colors"
               >
                  {t('tours.confirm')}
               </button>
               <button 
                  onClick={() => router.push('/sales/new')}
                  className="px-3 py-2 bg-mavera-gold/10 text-mavera-gold rounded-xl hover:bg-mavera-gold hover:text-white transition-colors"
                  title={t('tours.createQuote')}
               >
                  <FileText size={16} />
               </button>
               <button 
                  className="px-3 py-2 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors"
                  title={t('tours.noshow')}
                  onClick={() => onStatusChange(tour.id, 'NoShow')}
               >
                  <XCircle size={16} />
               </button>
            </div>
         ) : (
            <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
               <span className="text-xs text-gray-400 italic">Action completed</span>
               {tour.status === 'Completed' && (
                  <button onClick={() => router.push('/sales/new')} className="text-xs font-bold text-mavera-gold hover:underline">
                     Create Quote
                  </button>
               )}
            </div>
         )}
      </div>
    </div>
  );
};

export default TourCard;