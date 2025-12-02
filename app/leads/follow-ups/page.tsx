"use client";

import React, { useState } from 'react';
import { 
  Calendar, Phone, MessageSquare, CheckCircle, Clock, 
  AlertCircle, User, Bell, Filter, Search, CalendarPlus 
} from 'lucide-react';
import { useLanguage } from '../../../lib/i18n';
import LeadDetailDrawer from '../../../components/LeadDetailDrawer';
import BookAppointmentDialog from '../../../components/BookAppointmentDialog';

enum LeadPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

interface FollowUpLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: 'Instagram' | 'Google' | 'Referral';
  priority: LeadPriority;
  reminderDate: string;
  reminderTime: string;
  notes?: string;
  lastContact?: string;
  isOverdue: boolean;
}

const TodaysFollowUpsPage: React.FC = () => {
  const { t, direction } = useLanguage();
  const [selectedLead, setSelectedLead] = useState<FollowUpLead | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterPriority, setFilterPriority] = useState<LeadPriority | 'ALL'>('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'DUE' | 'OVERDUE'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data - Today's Follow-ups
  const today = new Date();
  const followUps: FollowUpLead[] = [
    {
      id: 'L001',
      name: 'Fatima Al-Sayed',
      phone: '+966 50 123 4567',
      email: 'fatima@example.com',
      source: 'Instagram',
      priority: LeadPriority.HIGH,
      reminderDate: today.toISOString().split('T')[0],
      reminderTime: '10:00',
      notes: 'Interested in February dates, budget 200k',
      lastContact: '2024-11-28',
      isOverdue: false
    },
    {
      id: 'L002',
      name: 'Mohammed Aziz',
      phone: '+966 55 987 6543',
      email: 'mohammed@example.com',
      source: 'Google',
      priority: LeadPriority.HIGH,
      reminderDate: today.toISOString().split('T')[0],
      reminderTime: '09:30',
      notes: 'Wants to visit the venue this week',
      lastContact: '2024-11-27',
      isOverdue: true
    },
    {
      id: 'L003',
      name: 'Layla Mahmoud',
      phone: '+966 54 321 0000',
      source: 'Referral',
      priority: LeadPriority.MEDIUM,
      reminderDate: today.toISOString().split('T')[0],
      reminderTime: '14:00',
      notes: 'Follow up on quotation sent',
      lastContact: '2024-11-25',
      isOverdue: false
    },
    {
      id: 'L004',
      name: 'Ahmed Saleh',
      phone: '+966 56 777 8888',
      source: 'Instagram',
      priority: LeadPriority.MEDIUM,
      reminderDate: today.toISOString().split('T')[0],
      reminderTime: '16:30',
      notes: 'Check on decision about package',
      lastContact: '2024-11-26',
      isOverdue: false
    },
    {
      id: 'L005',
      name: 'Noura Al-Otaibi',
      phone: '+966 59 111 2222',
      source: 'Google',
      priority: LeadPriority.LOW,
      reminderDate: today.toISOString().split('T')[0],
      reminderTime: '15:00',
      notes: 'General inquiry, no urgency',
      lastContact: '2024-11-24',
      isOverdue: false
    }
  ];

  const filteredFollowUps = followUps.filter(lead => {
    const priorityMatch = filterPriority === 'ALL' || lead.priority === filterPriority;
    const statusMatch = 
      filterStatus === 'ALL' || 
      (filterStatus === 'OVERDUE' && lead.isOverdue) ||
      (filterStatus === 'DUE' && !lead.isOverdue);
    const searchMatch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);
    
    return priorityMatch && statusMatch && searchMatch;
  });

  const handleMarkAsContacted = (leadId: string) => {
    alert(`Marked lead ${leadId} as contacted`);
  };

  const handleSnoozeReminder = (leadId: string) => {
    alert(`Snoozed reminder for lead ${leadId}`);
  };

  const getPriorityColor = (priority: LeadPriority) => {
    switch (priority) {
      case LeadPriority.HIGH: return 'bg-red-50 text-red-600 border-red-200';
      case LeadPriority.MEDIUM: return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case LeadPriority.LOW: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Instagram': return '📸';
      case 'Google': return '🔍';
      case 'Referral': return '👥';
      default: return '📧';
    }
  };

  const overdueCount = followUps.filter(l => l.isOverdue).length;
  const highPriorityCount = followUps.filter(l => l.priority === LeadPriority.HIGH).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-mavera-navy mb-2 flex items-center gap-3">
              <Bell size={32} className="text-mavera-gold" />
              Today's Follow-ups
            </h1>
            <p className="text-gray-500">Scheduled reminders and follow-up tasks for today</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Date</p>
            <p className="text-lg font-bold text-mavera-navy">
              {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={20} className="text-blue-600" />
              <p className="text-xs font-bold text-blue-600 uppercase">Total Today</p>
            </div>
            <p className="text-2xl font-bold text-blue-900">{followUps.length}</p>
          </div>

          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={20} className="text-red-600" />
              <p className="text-xs font-bold text-red-600 uppercase">Overdue</p>
            </div>
            <p className="text-2xl font-bold text-red-900">{overdueCount}</p>
          </div>

          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={20} className="text-orange-600" />
              <p className="text-xs font-bold text-orange-600 uppercase">High Priority</p>
            </div>
            <p className="text-2xl font-bold text-orange-900">{highPriorityCount}</p>
          </div>

          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={20} className="text-green-600" />
              <p className="text-xs font-bold text-green-600 uppercase">Completed</p>
            </div>
            <p className="text-2xl font-bold text-green-900">0</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or phone..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
            />
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          </div>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as any)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:border-mavera-gold outline-none"
          >
            <option value="ALL">All Priorities</option>
            <option value={LeadPriority.HIGH}>High Priority</option>
            <option value={LeadPriority.MEDIUM}>Medium Priority</option>
            <option value={LeadPriority.LOW}>Low Priority</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:border-mavera-gold outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="DUE">Due Today</option>
            <option value="OVERDUE">Overdue</option>
          </select>
        </div>

        {/* Follow-ups List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredFollowUps.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredFollowUps.map((lead) => (
                <div
                  key={lead.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    lead.isOverdue ? 'bg-red-50/30' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-mavera-navy">{lead.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-bold border ${getPriorityColor(lead.priority)}`}>
                          {lead.priority}
                        </span>
                        {lead.isOverdue && (
                          <span className="px-2 py-1 bg-red-500 text-white rounded text-xs font-bold flex items-center gap-1">
                            <AlertCircle size={12} />
                            OVERDUE
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={14} />
                          <span className="font-mono">{lead.phone}</span>
                        </div>
                        {lead.email && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MessageSquare size={14} />
                            <span>{lead.email}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{getSourceIcon(lead.source)}</span>
                          <span>{lead.source}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock size={14} />
                          <span className="font-bold">{lead.reminderTime}</span>
                        </div>
                      </div>

                      {lead.notes && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
                          <p className="text-sm text-gray-700 italic">"{lead.notes}"</p>
                        </div>
                      )}

                      {lead.lastContact && (
                        <p className="text-xs text-gray-500">
                          Last contact: {new Date(lead.lastContact).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLead(lead as any);
                          setIsDialogOpen(true);
                        }}
                        className="px-4 py-2 bg-mavera-gold text-white rounded-lg text-sm font-bold hover:bg-mavera-goldHover flex items-center gap-2 transition-all whitespace-nowrap"
                      >
                        <CalendarPlus size={16} />
                        Book Visit
                      </button>
                      <button
                        onClick={() => handleMarkAsContacted(lead.id)}
                        className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-bold hover:bg-green-100 flex items-center gap-2 transition-all whitespace-nowrap"
                      >
                        <CheckCircle size={16} />
                        Mark Done
                      </button>
                      <button
                        onClick={() => handleSnoozeReminder(lead.id)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center gap-2 transition-all whitespace-nowrap"
                      >
                        <Clock size={16} />
                        Snooze
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <CheckCircle size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium">No follow-ups found</p>
              <p className="text-sm mt-2">All caught up! 🎉</p>
            </div>
          )}
        </div>
      </div>

      {/* Book Appointment Dialog */}
      <BookAppointmentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        leadName={selectedLead?.name || ''}
      />
    </div>
  );
};

export default TodaysFollowUpsPage;

