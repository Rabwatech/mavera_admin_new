
"use client";

import React, { useState } from 'react';
import { Phone, Instagram, Globe, MessageSquare, Clock, User, CalendarPlus, Search, AlertCircle, Filter, FileSpreadsheet } from 'lucide-react';
import BookAppointmentDialog from '../../components/BookAppointmentDialog';
import LeadDetailDrawer from '../../components/LeadDetailDrawer';
import GoogleSheetImportModal from '../../components/GoogleSheetImportModal';
import { useLanguage } from '../../lib/i18n';

export enum LeadPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  source: 'Instagram' | 'Google' | 'Referral';
  status: 'New' | 'Contacted' | 'Booked';
  date: string;
  priority?: LeadPriority;
  reminderDate?: string;
}

const Leads: React.FC = () => {
  const { t, direction } = useLanguage();
  const [activeTab, setActiveTab] = useState<'New' | 'FollowUp' | 'Closed'>('New');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<LeadPriority | 'ALL'>('ALL');
  const [showPriorityFilter, setShowPriorityFilter] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  // Mock Data
  const allLeads: Lead[] = [
    { id: 'L1', name: 'Fatima Al-Sayed', phone: '+966 50 123 4567', source: 'Instagram', status: 'New', date: '10 mins ago', priority: LeadPriority.HIGH, reminderDate: '2024-12-01T10:00' },
    { id: 'L2', name: 'Mohammed Aziz', phone: '+966 55 987 6543', source: 'Google', status: 'New', date: '45 mins ago', priority: LeadPriority.MEDIUM },
    { id: 'L3', name: 'Layla Mahmoud', phone: '+966 54 321 0000', source: 'Referral', status: 'Contacted', date: '2 hours ago', priority: LeadPriority.HIGH },
    { id: 'L4', name: 'Ahmed Saleh', phone: '+966 56 777 8888', source: 'Instagram', status: 'Booked', date: 'Yesterday', priority: LeadPriority.LOW },
    { id: 'L5', name: 'Noura Al-Otaibi', phone: '+966 59 111 2222', source: 'Google', status: 'Contacted', date: '3 hours ago', priority: LeadPriority.MEDIUM },
  ];

  const filteredLeads = allLeads.filter(lead => {
    let statusMatch = false;
    if (activeTab === 'New') statusMatch = lead.status === 'New';
    else if (activeTab === 'FollowUp') statusMatch = lead.status === 'Contacted';
    else statusMatch = lead.status === 'Booked';
    
    const priorityMatch = priorityFilter === 'ALL' || lead.priority === priorityFilter;
    
    return statusMatch && priorityMatch;
  });

  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleBookClick = (e: React.MouseEvent, lead: Lead) => {
    e.stopPropagation();
    setSelectedLead(lead);
    setIsDialogOpen(true);
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Instagram': return <Instagram size={14} className="text-pink-600" />;
      case 'Google': return <Globe size={14} className="text-blue-500" />;
      default: return <User size={14} className="text-mavera-gold" />;
    }
  };

  const getPriorityBadge = (priority?: LeadPriority) => {
    if (!priority) return null;
    
    const styles = {
      [LeadPriority.HIGH]: 'bg-red-50 text-red-600 border-red-200',
      [LeadPriority.MEDIUM]: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      [LeadPriority.LOW]: 'bg-gray-50 text-gray-600 border-gray-200'
    };
    
    return (
      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border flex items-center gap-1 ${styles[priority]}`}>
        {priority === LeadPriority.HIGH && <AlertCircle size={10} />}
        {priority}
      </span>
    );
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col animate-fade-in gap-4">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-mavera-navy">{t('leads.title')}</h1>
            <p className="text-gray-500 text-sm mt-1">{t('leads.subtitle')}</p>
          </div>
          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 flex items-center gap-2 transition-all shadow-sm"
          >
            <FileSpreadsheet size={18} />
            <span className="hidden sm:inline">Import from Sheet</span>
          </button>
        </div>
        
        {/* Search Bar & Filters */}
        <div className="w-full sm:w-auto flex gap-2">
            <div className="relative flex-1 sm:w-64">
               <input 
                 type="text" 
                 placeholder={t('leads.search')} 
                 className={`w-full py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-mavera-gold focus:ring-1 focus:ring-mavera-gold shadow-sm ${direction === 'rtl' ? 'pr-4 pl-10' : 'pl-4 pr-10'}`} 
               />
               <Search size={16} className={`absolute top-3 text-gray-400 ${direction === 'rtl' ? 'left-3' : 'right-3'}`} />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowPriorityFilter(!showPriorityFilter)}
                className={`p-2.5 rounded-xl border transition-colors ${priorityFilter !== 'ALL' ? 'bg-mavera-gold text-white border-mavera-gold' : 'bg-white text-gray-500 border-gray-200 hover:border-mavera-gold'}`}
              >
                <Filter size={18} />
              </button>
              {showPriorityFilter && (
                <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-xl shadow-lg p-2 w-40 z-10">
                  {['ALL', ...Object.values(LeadPriority)].map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setPriorityFilter(p as any);
                        setShowPriorityFilter(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        priorityFilter === p ? 'bg-mavera-gold text-white' : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
        </div>
      </div>

      {/* Workflow Tabs */}
      <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 flex gap-1 w-full sm:w-fit shrink-0 overflow-x-auto">
         {[
           { id: 'New', label: 'New Inquiries', count: 2 },
           { id: 'FollowUp', label: 'Follow Up', count: 2 },
           { id: 'Closed', label: 'Booked / Closed', count: 1 }
         ].map(tab => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
               activeTab === tab.id 
               ? 'bg-mavera-navy text-white shadow-md' 
               : 'text-gray-500 hover:bg-gray-50 hover:text-mavera-navy'
             }`}
           >
             <span>{tab.label}</span>
             <span className={`px-1.5 py-0.5 rounded text-[10px] ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
               {tab.count}
             </span>
           </button>
         ))}
      </div>

      {/* Main Content Area: High Density List */}
      <div className="flex-1 bg-white rounded-2xl shadow-luxury border border-gray-100 flex flex-col overflow-hidden">
        
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
           <div className="col-span-4 md:col-span-3">Lead Details</div>
           <div className="col-span-3 md:col-span-2 hidden md:block">Source</div>
           <div className="col-span-2 hidden lg:block">Priority</div>
           <div className="col-span-2 md:col-span-2">Received</div>
           <div className="col-span-2 hidden md:block">Status</div>
           <div className="col-span-4 md:col-span-1 text-end">Actions</div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
           {filteredLeads.map((lead) => (
              <div 
                 key={lead.id} 
                 onClick={() => handleRowClick(lead)}
                 className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-blue-50/20 cursor-pointer transition-colors group ${selectedLead?.id === lead.id ? 'bg-blue-50/40' : ''}`}
              >
                 {/* Name & Phone */}
                 <div className="col-span-4 md:col-span-3">
                    <div className="flex flex-col">
                       <span className="font-bold text-mavera-navy text-sm group-hover:text-mavera-gold transition-colors">{lead.name}</span>
                       <span className="text-xs text-gray-400 font-mono mt-0.5" dir="ltr">{lead.phone}</span>
                    </div>
                 </div>

                 {/* Source */}
                 <div className="col-span-3 md:col-span-2 hidden md:flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-gray-50 border border-gray-100">
                       {getSourceIcon(lead.source)}
                    </div>
                    <span className="text-sm text-gray-600">{lead.source}</span>
                 </div>

                 {/* Priority */}
                 <div className="col-span-2 hidden lg:flex items-center">
                    {getPriorityBadge(lead.priority)}
                 </div>

                 {/* Time */}
                 <div className="col-span-2 md:col-span-2 flex items-center gap-2 text-xs text-gray-500">
                    <Clock size={14} className="text-gray-300" />
                    <span>{lead.date}</span>
                 </div>

                 {/* Status (Badge) */}
                 <div className="col-span-2 hidden md:flex">
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${
                       lead.status === 'New' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                       lead.status === 'Contacted' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                       'bg-green-50 text-green-600 border-green-100'
                    }`}>
                       {lead.status}
                    </span>
                 </div>

                 {/* Actions */}
                 <div className="col-span-4 md:col-span-1 flex justify-end items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button 
                       className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                       title="Log Call"
                       onClick={(e) => e.stopPropagation()}
                    >
                       <Phone size={16} />
                    </button>
                    <button 
                       className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                       title="Quick Note"
                       onClick={(e) => e.stopPropagation()}
                    >
                       <MessageSquare size={16} />
                    </button>
                    <button 
                       onClick={(e) => handleBookClick(e, lead)}
                       className="flex items-center gap-1.5 px-3 py-1.5 bg-mavera-gold text-white text-xs font-bold rounded-lg hover:bg-mavera-goldHover shadow-sm transition-all whitespace-nowrap"
                    >
                       <CalendarPlus size={14} />
                       {t('leads.bookAppt')}
                    </button>
                 </div>
              </div>
           ))}
           
           {filteredLeads.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                 <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <Search size={24} className="opacity-20" />
                 </div>
                 <p>No leads found in this category.</p>
              </div>
           )}
        </div>
        
        {/* Footer Stats */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
           <span>Showing {filteredLeads.length} leads</span>
           <span>Sorted by: Newest First</span>
        </div>
      </div>

      {/* Drawers & Dialogs */}
      <LeadDetailDrawer 
        isOpen={!!selectedLead} 
        onClose={() => setSelectedLead(null)} 
        lead={selectedLead}
        onBookVisit={() => {
           if(selectedLead) {
             setIsDialogOpen(true);
             setSelectedLead(null); 
           }
        }}
      />

      <BookAppointmentDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        leadName={selectedLead?.name || 'Selected Lead'} 
      />

      <GoogleSheetImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={(data) => {
          console.log('Imported leads:', data);
          // Here you would typically save the imported leads to your database
          alert(`Successfully imported ${data.length} leads!`);
        }}
      />
    </div>
  );
};

export default Leads;
