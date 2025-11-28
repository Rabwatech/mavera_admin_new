
import React, { useState } from 'react';
import { X, Calendar, Clock, User, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

interface BookAppointmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  leadName: string;
}

const BookAppointmentDialog: React.FC<BookAppointmentDialogProps> = ({ isOpen, onClose, leadName }) => {
  const { direction } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [selectedAgent, setSelectedAgent] = useState<string>('');

  if (!isOpen) return null;

  // Mock Availability Grid
  const availability = [
    { day: 'Sun', date: 'Oct 27', slots: ['10:00', '11:00', '14:00', '16:00'] },
    { day: 'Mon', date: 'Oct 28', slots: ['09:00', '10:00', '11:00', '15:00'] },
    { day: 'Tue', date: 'Oct 29', slots: ['12:00', '13:00', '14:00', '15:00', '16:00'] },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booked: ${selectedDate} at ${selectedSlot} with ${selectedAgent}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-mavera-navy/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-up flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-mavera-navy">Schedule Sales Visit</h3>
            <p className="text-sm text-gray-500">Lead: <span className="font-semibold text-mavera-gold">{leadName}</span></p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors bg-white p-2 rounded-full shadow-sm">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row h-full overflow-hidden">
           
           {/* Left: Agent Selection */}
           <div className="w-full md:w-1/3 bg-gray-50 p-6 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col gap-6 overflow-y-auto">
              <div>
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">1. Select Agent</label>
                 <div className="space-y-3">
                    {['Omar Hassan', 'Sara Ali', 'Khaled Ahmed'].map(agent => (
                       <button
                         key={agent}
                         onClick={() => setSelectedAgent(agent)}
                         className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                            selectedAgent === agent 
                            ? 'bg-white border-mavera-gold shadow-md ring-1 ring-mavera-gold' 
                            : 'bg-white border-gray-200 hover:border-gray-300'
                         }`}
                       >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${selectedAgent === agent ? 'bg-mavera-gold text-white' : 'bg-gray-100 text-gray-500'}`}>
                             {agent.charAt(0)}
                          </div>
                          <span className={`text-sm font-medium ${selectedAgent === agent ? 'text-mavera-navy' : 'text-gray-600'}`}>{agent}</span>
                          {selectedAgent === agent && <Check size={16} className="text-mavera-gold ml-auto" />}
                       </button>
                    ))}
                 </div>
              </div>
           </div>

           {/* Right: Date & Time Grid */}
           <div className="flex-1 p-6 flex flex-col overflow-y-auto">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 block">2. Select Time Slot</label>
              
              <div className="flex items-center justify-between mb-4">
                 <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft size={20} className="text-gray-400"/></button>
                 <span className="font-bold text-mavera-navy">October 2024</span>
                 <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight size={20} className="text-gray-400"/></button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                 {availability.map((dayItem) => (
                    <div key={dayItem.date} className="flex flex-col gap-3">
                       <div className="text-center pb-2 border-b border-gray-100">
                          <span className="text-xs text-gray-400 uppercase block">{dayItem.day}</span>
                          <span className="font-bold text-mavera-navy">{dayItem.date}</span>
                       </div>
                       <div className="space-y-2">
                          {dayItem.slots.map(slot => {
                             const isSelected = selectedDate === dayItem.date && selectedSlot === slot;
                             return (
                                <button
                                   key={slot}
                                   onClick={() => { setSelectedDate(dayItem.date); setSelectedSlot(slot); }}
                                   className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${
                                      isSelected 
                                      ? 'bg-mavera-navy text-white shadow-lg transform scale-105' 
                                      : 'bg-white border border-gray-100 text-gray-600 hover:border-mavera-gold hover:text-mavera-gold'
                                   }`}
                                >
                                   {slot}
                                </button>
                             )
                          })}
                       </div>
                    </div>
                 ))}
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 flex justify-end">
                 <button 
                   onClick={handleSubmit}
                   disabled={!selectedAgent || !selectedDate || !selectedSlot}
                   className="bg-mavera-gold hover:bg-mavera-goldHover text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-mavera-gold/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                 >
                    <Calendar size={18} />
                    Confirm Booking
                 </button>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default BookAppointmentDialog;
