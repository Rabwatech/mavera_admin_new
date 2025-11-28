
import React, { useState } from 'react';
import { X, Phone, Mail, Clock, Calendar, MessageSquare, Save, User, MapPin } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

interface Lead {
  id: string;
  name: string;
  phone: string;
  source: string;
  status: string;
  date: string;
  notes?: string;
}

interface LeadDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onBookVisit: () => void;
}

const LeadDetailDrawer: React.FC<LeadDetailDrawerProps> = ({ isOpen, onClose, lead, onBookVisit }) => {
  const { t, direction } = useLanguage();
  const [note, setNote] = useState('');

  if (!lead) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity" 
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 bottom-0 z-50 w-full sm:w-[450px] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
        isOpen 
          ? 'translate-x-0' 
          : (direction === 'rtl' ? '-translate-x-full' : 'translate-x-full')
        } ${direction === 'rtl' ? 'left-0' : 'right-0'}`}
      >
        <div className="h-full flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
            <div>
              <h2 className="text-xl font-bold text-mavera-navy">{lead.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide ${
                  lead.status === 'New' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  lead.status === 'Contacted' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                  'bg-green-50 text-green-600 border-green-100'
                }`}>
                  {lead.status}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={12} /> {lead.date}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors p-1">
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
               <button 
                 onClick={onBookVisit}
                 className="flex items-center justify-center gap-2 bg-mavera-gold text-white py-3 rounded-xl font-bold hover:bg-mavera-goldHover shadow-lg shadow-mavera-gold/20 transition-all"
               >
                  <Calendar size={18} />
                  <span>{t('leads.bookAppt')}</span>
               </button>
               <button className="flex items-center justify-center gap-2 bg-mavera-navy text-white py-3 rounded-xl font-bold hover:bg-mavera-navyLight transition-colors">
                  <Phone size={18} />
                  <span>Call Now</span>
               </button>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Details</h3>
              <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3 shadow-sm">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                     <Phone size={16} />
                   </div>
                   <span className="text-sm font-medium text-mavera-navy font-mono" dir="ltr">{lead.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                     <Mail size={16} />
                   </div>
                   <span className="text-sm font-medium text-mavera-navy">email@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                     <MapPin size={16} />
                   </div>
                   <span className="text-sm font-medium text-mavera-navy">Riyadh, Saudi Arabia</span>
                </div>
              </div>
            </div>

            {/* Interaction Log */}
            <div className="space-y-4">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Interaction Log</h3>
               
               {/* Note Input */}
               <div className="relative">
                 <textarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Log a call note..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:border-mavera-gold outline-none min-h-[80px]"
                 />
                 <button className="absolute bottom-2 right-2 p-1.5 bg-white text-mavera-gold rounded-lg shadow-sm border border-gray-100 hover:text-mavera-navy">
                    <Save size={16} />
                 </button>
               </div>

               {/* Timeline */}
               <div className="relative border-l-2 border-gray-100 space-y-6 ml-3 pl-6 py-2">
                  <div className="relative">
                     <div className={`absolute w-3 h-3 bg-blue-500 rounded-full mt-1.5 border-2 border-white ${direction === 'rtl' ? '-right-[31px]' : '-left-[31px]'}`}></div>
                     <p className="text-xs text-gray-400 mb-1">Today, 10:23 AM</p>
                     <p className="text-sm text-gray-700 font-medium bg-gray-50 p-3 rounded-lg rounded-tl-none">
                        Initial inquiry via Instagram. Interested in November dates.
                     </p>
                  </div>
                  <div className="relative">
                     <div className={`absolute w-3 h-3 bg-gray-300 rounded-full mt-1.5 border-2 border-white ${direction === 'rtl' ? '-right-[31px]' : '-left-[31px]'}`}></div>
                     <p className="text-xs text-gray-400 mb-1">Yesterday, 4:00 PM</p>
                     <p className="text-sm text-gray-600">
                        System: Lead created from Website Form.
                     </p>
                  </div>
               </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-xs text-gray-500">
             <span>Lead ID: {lead.id}</span>
             <button className="text-red-500 hover:underline">Mark as Junk</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadDetailDrawer;
