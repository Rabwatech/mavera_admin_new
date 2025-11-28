"use client";

import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, Search, Clock } from 'lucide-react';
import { BookingStatus } from '../../types';
import { useLanguage } from '../../lib/i18n';

interface MockBooking {
  id: string;
  name: string;
  date: string;
  status: BookingStatus;
  file?: string;
}

const Arrangements: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<MockBooking | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const { t, direction } = useLanguage();

  // Mock Data
  const bookings: MockBooking[] = [
    { id: 'B-101', name: 'Al-Rajhi Wedding', date: '2024-10-15', status: BookingStatus.CONFIRMED },
    { id: 'B-102', name: 'Fahad & Sara', date: '2024-11-02', status: BookingStatus.READY_FOR_EXECUTION, file: 'arrangements_v1.pdf' },
    { id: 'B-103', name: 'Golden Gala Event', date: '2024-12-10', status: BookingStatus.CONFIRMED },
  ];

  const filteredBookings = bookings.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        setUploadComplete(true);
      }, 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto min-h-[80vh] flex flex-col gap-8">
      
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-mavera-navy">{t('arr.title')}</h1>
        <p className="text-gray-500">{t('arr.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
        
        {/* Search List */}
        <div className="bg-white rounded-2xl shadow-luxury border border-stone-100 overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b border-gray-100 bg-stone-50">
            <div className="relative">
              <Search className={`absolute top-3 text-gray-400 ${direction === 'rtl' ? 'left-3' : 'right-3'}`} size={18} />
              <input 
                type="text" 
                placeholder={t('leads.search')}
                className={`w-full py-2.5 rounded-lg border border-gray-200 focus:border-mavera-gold focus:ring-1 focus:ring-mavera-gold outline-none text-sm ${direction === 'rtl' ? 'pl-10 pr-4' : 'pr-10 pl-4'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredBookings.map(b => (
              <button
                key={b.id}
                onClick={() => { setSelectedBooking(b); setUploadComplete(false); }}
                className={`w-full text-start p-4 border-b border-gray-50 hover:bg-mavera-cream transition-colors flex justify-between items-center group ${selectedBooking?.id === b.id ? 'bg-mavera-cream ' + (direction === 'rtl' ? 'border-r-4 border-r-mavera-gold' : 'border-l-4 border-l-mavera-gold') : ''}`}
              >
                <div>
                  <h4 className={`font-bold text-sm ${selectedBooking?.id === b.id ? 'text-mavera-navy' : 'text-gray-700'}`}>{b.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">{b.date}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{b.id}</span>
                  {b.status === BookingStatus.READY_FOR_EXECUTION && <CheckCircle size={14} className="text-green-500" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Upload Area */}
        <div className="md:col-span-2">
           {selectedBooking ? (
             <div className="bg-white rounded-2xl shadow-luxury border border-stone-100 p-8 h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
                
                {uploadComplete ? (
                  <div className="animate-fade-in flex flex-col items-center">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-mavera-navy mb-2">{t('arr.uploadSuccess')}</h2>
                    <p className="text-gray-500 mb-6">Client notified via WhatsApp. Status updated to <span className="font-bold text-mavera-navy">Ready for Execution</span>.</p>
                    <button 
                      onClick={() => setUploadComplete(false)}
                      className="text-mavera-gold hover:underline text-sm font-medium"
                    >
                      Upload updated version?
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-mavera-navy mb-1">{selectedBooking.name}</h2>
                      <p className="text-gray-400 text-sm">Event Date: {selectedBooking.date}</p>
                    </div>

                    <div className="w-full max-w-md">
                      <label className={`block w-full border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-all duration-300 ${isUploading ? 'border-mavera-gold bg-mavera-gold/5' : 'border-gray-200 hover:border-mavera-navy hover:bg-stone-50'}`}>
                         <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} disabled={isUploading} />
                         
                         <div className="flex flex-col items-center gap-4">
                           {isUploading ? (
                              <div className="w-12 h-12 border-4 border-mavera-gold border-t-transparent rounded-full animate-spin"></div>
                           ) : (
                              <div className="w-16 h-16 bg-stone-100 text-mavera-navy rounded-full flex items-center justify-center">
                                <UploadCloud size={32} />
                              </div>
                           )}
                           
                           <div>
                             <p className="font-bold text-mavera-navy text-lg">{isUploading ? 'Uploading...' : t('arr.clickUpload')}</p>
                             <p className="text-xs text-gray-400 mt-2">Max file size 10MB. Must be signed.</p>
                           </div>
                         </div>
                      </label>
                    </div>

                    <div className="mt-8 w-full max-w-md flex justify-between items-center text-xs text-gray-400 border-t border-gray-100 pt-4">
                       <span className="flex items-center gap-1"><Clock size={12}/> Last meeting: 2 days ago</span>
                       <button className="text-mavera-gold font-bold hover:text-mavera-navy transition-colors">+ Request Additional Invoice</button>
                    </div>
                  </>
                )}
             </div>
           ) : (
             <div className="bg-stone-50 rounded-2xl border-2 border-dashed border-gray-200 h-full flex flex-col items-center justify-center text-gray-400">
                <FileText size={48} className="mb-4 opacity-20" />
                <p>Select a booking from the list to manage arrangements</p>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default Arrangements;