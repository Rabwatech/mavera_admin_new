"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, FileText, Calendar, User, DollarSign, Send, Clock, CheckCircle2, XCircle, Eye, MoreHorizontal, X, Phone, Mail, MapPin, Edit, Trash2, Download } from 'lucide-react';
import { useLanguage } from '../../../lib/i18n';
import { BookingStatus } from '../../../types';
import { Card, CardHeader, CardContent } from '../../../components/ui/card';

interface DraftBooking {
  id: string;
  clientName: string;
  clientPhone: string;
  eventDate: string;
  hall: string;
  guests: number;
  packagePrice: number;
  discountPercentage: number;
  finalPrice: number;
  createdAt: string;
  sentToNafath: boolean;
  nafathSentAt?: string;
  clientApproved: boolean;
  clientApprovedAt?: string;
  status: BookingStatus;
}

const DraftBookingsPage: React.FC = () => {
  const { t, direction } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<DraftBooking | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Mock Data
  const [drafts, setDrafts] = useState<DraftBooking[]>([
    {
      id: 'D-001',
      clientName: 'Ahmed Al-Rajhi',
      clientPhone: '0501234567',
      eventDate: '2025-11-15',
      hall: 'MAVERA 1',
      guests: 500,
      packagePrice: 150000,
      discountPercentage: 3,
      finalPrice: 145500,
      createdAt: '2024-10-10',
      sentToNafath: false,
      clientApproved: false,
      status: BookingStatus.DRAFT,
    },
    {
      id: 'D-002',
      clientName: 'Fatima & Khalid',
      clientPhone: '0559876543',
      eventDate: '2025-12-20',
      hall: 'MAVERA 2',
      guests: 300,
      packagePrice: 120000,
      discountPercentage: 5,
      finalPrice: 114000,
      createdAt: '2024-10-08',
      sentToNafath: true,
      nafathSentAt: '2024-10-08',
      clientApproved: false,
      status: BookingStatus.DRAFT,
    },
    {
      id: 'D-003',
      clientName: 'Golden Events Co',
      clientPhone: '0543210000',
      eventDate: '2025-10-30',
      hall: 'MAVERA 3',
      guests: 200,
      packagePrice: 80000,
      discountPercentage: 0,
      finalPrice: 80000,
      createdAt: '2024-10-12',
      sentToNafath: true,
      nafathSentAt: '2024-10-12',
      clientApproved: true,
      clientApprovedAt: '2024-10-13',
      status: BookingStatus.DRAFT,
    },
  ]);

  const filteredDrafts = drafts.filter(draft =>
    draft.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    draft.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    draft.clientPhone.includes(searchTerm)
  );

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId) {
        const menuElement = menuRefs.current[openMenuId];
        if (menuElement && !menuElement.contains(event.target as Node)) {
          setOpenMenuId(null);
        }
      }
    };

    if (openMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  const handleViewDetails = (draft: DraftBooking) => {
    setSelectedBooking(draft);
    setIsDrawerOpen(true);
  };

  const handleMenuToggle = (draftId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === draftId ? null : draftId);
  };

  const handleEdit = (draft: DraftBooking) => {
    setOpenMenuId(null);
    // في التطبيق الحقيقي، سيتم الانتقال لصفحة التعديل أو فتح modal
    alert(`تعديل الحجز: ${draft.id}\nسيتم فتح صفحة التعديل...`);
    // يمكن استخدام: router.push(`/bookings/drafts/${draft.id}/edit`);
  };

  const handleDownload = (draft: DraftBooking) => {
    setOpenMenuId(null);
    // في التطبيق الحقيقي، سيتم تحميل PDF أو ملف
    alert(`تحميل الحجز: ${draft.id}\nسيتم تحميل ملف PDF...`);
    // يمكن إنشاء PDF باستخدام مكتبة مثل jsPDF أو إرسال طلب API
  };

  const handleDelete = (draft: DraftBooking) => {
    setOpenMenuId(null);
    // تأكيد قبل الحذف
    if (window.confirm(`هل أنت متأكد من حذف الحجز ${draft.id}؟\nالعميل: ${draft.clientName}`)) {
      setDrafts(prev => prev.filter(d => d.id !== draft.id));
      alert(`تم حذف الحجز ${draft.id} بنجاح`);
    }
  };

  const handleSendToNafath = (draftId: string) => {
    setDrafts(prev => prev.map(draft => 
      draft.id === draftId 
        ? { ...draft, sentToNafath: true, nafathSentAt: new Date().toISOString().split('T')[0] }
        : draft
    ));
    // في التطبيق الحقيقي، سيتم إرسال طلب API هنا
  };

  const getStatusBadge = (draft: DraftBooking) => {
    if (draft.clientApproved) {
      return (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold border bg-green-50 text-green-600 border-green-100">
          {t('bookings.clientApproved')}
        </span>
      );
    }
    if (draft.sentToNafath) {
      return (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold border bg-orange-50 text-orange-600 border-orange-100">
          {t('bookings.pendingClientApproval')}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold border bg-blue-50 text-blue-600 border-blue-100">
        {t('bookings.draft')}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-mavera-navy">{t('bookings.draftsTitle')}</h1>
        <p className="text-gray-500 text-sm">{t('bookings.draftsSubtitle')}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">{t('bookings.totalDrafts')}</p>
                <p className="text-2xl font-bold text-mavera-navy">{drafts.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <FileText size={24} className="text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">{t('bookings.pendingApproval')}</p>
                <p className="text-2xl font-bold text-orange-600">
                  {drafts.filter(d => d.sentToNafath && !d.clientApproved).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                <Clock size={24} className="text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">{t('bookings.approved')}</p>
                <p className="text-2xl font-bold text-green-600">
                  {drafts.filter(d => d.clientApproved).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle2 size={24} className="text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">{t('bookings.notSent')}</p>
                <p className="text-2xl font-bold text-gray-600">
                  {drafts.filter(d => !d.sentToNafath).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                <XCircle size={24} className="text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className={`absolute top-3 text-gray-400 ${direction === 'rtl' ? 'left-3' : 'right-3'}`} />
              <input
                type="text"
                placeholder={t('bookings.searchDrafts')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full bg-white border border-gray-200 rounded-lg py-2 text-sm outline-none focus:border-mavera-gold ${direction === 'rtl' ? 'pl-10 pr-4' : 'pr-10 pl-4'}`}
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Drafts Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-bold text-mavera-navy">{t('bookings.draftsList')}</h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[1000px]">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4 text-start">{t('bookings.bookingId')}</th>
                  <th className="px-6 py-4 text-start">{t('bookings.client')}</th>
                  <th className="px-6 py-4 text-start">{t('bookings.eventDate')}</th>
                  <th className="px-6 py-4 text-start">{t('bookings.hall')}</th>
                  <th className="px-6 py-4 text-start">{t('bookings.totalPrice')}</th>
                  <th className="px-6 py-4 text-start">{t('bookings.status')}</th>
                  <th className="px-6 py-4 text-start">{t('bookings.clientStatus')}</th>
                  <th className="px-6 py-4 text-end">{t('bookings.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredDrafts.length > 0 ? (
                  filteredDrafts.map((draft) => (
                    <tr key={draft.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-gray-400">{draft.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-mavera-navy">{draft.clientName}</span>
                          <span className="text-[10px] text-gray-400 font-mono" dir="ltr">{draft.clientPhone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{draft.eventDate}</td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600">{draft.hall}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-mavera-navy">{draft.finalPrice.toLocaleString()} SAR</span>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(draft)}
                      </td>
                      <td className="px-6 py-4">
                        {draft.sentToNafath ? (
                          draft.clientApproved ? (
                            <div className="flex items-center gap-2 text-green-600">
                              <CheckCircle2 size={16} />
                              <span className="text-xs font-medium">{t('bookings.approved')}</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-orange-600">
                              <Clock size={16} />
                              <span className="text-xs font-medium">{t('bookings.waitingForApproval')}</span>
                            </div>
                          )
                        ) : (
                          <div className="flex items-center gap-2 text-gray-400">
                            <XCircle size={16} />
                            <span className="text-xs font-medium">{t('bookings.notSentYet')}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-end">
                        <div className="flex items-center justify-end gap-2">
                          {!draft.sentToNafath && (
                            <button
                              onClick={() => handleSendToNafath(draft.id)}
                              className="flex items-center gap-2 px-3 py-1.5 bg-mavera-gold text-white rounded-lg text-xs font-bold hover:bg-mavera-goldHover transition-colors"
                            >
                              <Send size={14} />
                              {t('bookings.sendToNafath')}
                            </button>
                          )}
                          {draft.sentToNafath && !draft.clientApproved && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-xs font-medium border border-orange-100">
                              <Clock size={14} />
                              {t('bookings.pendingApproval')}
                            </div>
                          )}
                          {draft.clientApproved && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-medium border border-green-100">
                              <CheckCircle2 size={14} />
                              {t('bookings.approved')}
                            </div>
                          )}
                          <button 
                            onClick={() => handleViewDetails(draft)}
                            className="p-2 text-gray-400 hover:text-mavera-gold hover:bg-gray-100 rounded-lg transition-colors"
                            title={t('bookings.viewDetails')}
                          >
                            <Eye size={18} />
                          </button>
                          <div 
                            className="relative" 
                            ref={(el) => {
                              if (el) {
                                menuRefs.current[draft.id] = el;
                              }
                            }}
                          >
                            <button 
                              onClick={(e) => handleMenuToggle(draft.id, e)}
                              className="p-2 text-gray-400 hover:text-mavera-navy hover:bg-gray-100 rounded-lg transition-colors"
                              title={t('bookings.moreActions')}
                            >
                              <MoreHorizontal size={18} />
                            </button>
                            {openMenuId === draft.id && (
                              <div 
                                className={`absolute z-50 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 ${direction === 'rtl' ? 'left-0' : 'right-0'}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewDetails(draft);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-start"
                                >
                                  <Eye size={16} />
                                  {t('bookings.viewDetails')}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(draft);
                                  }}
                                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-start"
                                >
                                  <Edit size={16} />
                                  {t('bookings.edit')}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDownload(draft);
                                  }}
                                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-start"
                                >
                                  <Download size={16} />
                                  {t('bookings.download')}
                                </button>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(draft);
                                  }}
                                  className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 text-start"
                                >
                                  <Trash2 size={16} />
                                  {t('bookings.delete')}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                      {t('bookings.noDraftsFound')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Client Approval Status Info */}
      {selectedBooking && selectedBooking.sentToNafath && !selectedBooking.clientApproved && (
        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-orange-500 mt-0.5" />
              <div>
                <h4 className="font-bold text-orange-700 mb-1">{t('bookings.clientNotApprovedYet')}</h4>
                <p className="text-sm text-orange-600">
                  {t('bookings.clientNotApprovedDesc')}
                </p>
                {selectedBooking.nafathSentAt && (
                  <p className="text-xs text-orange-500 mt-2">
                    {t('bookings.sentOn')}: {selectedBooking.nafathSentAt}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Booking Details Drawer */}
      {isDrawerOpen && selectedBooking && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity" 
            onClick={() => {
              setIsDrawerOpen(false);
              setSelectedBooking(null);
            }}
          />

          {/* Drawer */}
          <div className={`fixed top-0 bottom-0 z-50 w-full sm:w-[450px] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            isDrawerOpen 
              ? 'translate-x-0' 
              : (direction === 'rtl' ? '-translate-x-full' : 'translate-x-full')
            } ${direction === 'rtl' ? 'left-0' : 'right-0'}`}
          >
            <div className="h-full flex flex-col">
              
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
                <div>
                  <h2 className="text-xl font-bold text-mavera-navy">{selectedBooking.clientName}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-xs text-gray-400">{selectedBooking.id}</span>
                    {getStatusBadge(selectedBooking)}
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setSelectedBooking(null);
                  }} 
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 bg-mavera-gold text-white py-3 rounded-xl font-bold hover:bg-mavera-goldHover shadow-lg shadow-mavera-gold/20 transition-all">
                    <Phone size={18} />
                    {t('bookings.callClient')}
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-mavera-navy text-white py-3 rounded-xl font-bold hover:bg-mavera-navyLight transition-colors">
                    <Mail size={18} />
                    {t('bookings.sendEmail')}
                  </button>
                </div>

                {/* Booking Details */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('bookings.bookingDetails')}</h3>
                  <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                        <Calendar size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">{t('bookings.eventDate')}</p>
                        <p className="text-sm font-medium text-mavera-navy">{selectedBooking.eventDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                        <FileText size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">{t('bookings.hall')}</p>
                        <p className="text-sm font-medium text-mavera-navy">{selectedBooking.hall}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                        <User size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">{t('bookings.guests')}</p>
                        <p className="text-sm font-medium text-mavera-navy">{selectedBooking.guests}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                        <DollarSign size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">{t('bookings.totalPrice')}</p>
                        <p className="text-sm font-medium text-mavera-navy">{selectedBooking.finalPrice.toLocaleString()} SAR</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Client Info */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('bookings.clientInfo')}</h3>
                  <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                        <User size={16} />
                      </div>
                      <span className="text-sm font-medium text-mavera-navy">{selectedBooking.clientName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                        <Phone size={16} />
                      </div>
                      <span className="text-sm font-medium text-mavera-navy font-mono" dir="ltr">{selectedBooking.clientPhone}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Details */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('bookings.pricingDetails')}</h3>
                  <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-2 shadow-sm">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t('bookings.packagePrice')}</span>
                      <span className="font-medium text-mavera-navy">{selectedBooking.packagePrice.toLocaleString()} SAR</span>
                    </div>
                    {selectedBooking.discountPercentage > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t('bookings.discount')} ({selectedBooking.discountPercentage}%)</span>
                        <span className="font-medium text-red-600">-{(selectedBooking.packagePrice * selectedBooking.discountPercentage / 100).toLocaleString()} SAR</span>
                      </div>
                    )}
                    <div className="border-t border-gray-100 pt-2 flex justify-between">
                      <span className="font-bold text-mavera-navy">{t('bookings.finalPrice')}</span>
                      <span className="font-bold text-mavera-navy">{selectedBooking.finalPrice.toLocaleString()} SAR</span>
                    </div>
                  </div>
                </div>

                {/* Status Info */}
                {selectedBooking.sentToNafath && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('bookings.statusInfo')}</h3>
                    <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3 shadow-sm">
                      {selectedBooking.sentToNafath && (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-green-600" />
                          <span className="text-sm text-gray-700">{t('bookings.sentToNafath')}</span>
                          {selectedBooking.nafathSentAt && (
                            <span className="text-xs text-gray-400">({selectedBooking.nafathSentAt})</span>
                          )}
                        </div>
                      )}
                      {selectedBooking.clientApproved && (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-green-600" />
                          <span className="text-sm text-gray-700">{t('bookings.clientApproved')}</span>
                          {selectedBooking.clientApprovedAt && (
                            <span className="text-xs text-gray-400">({selectedBooking.clientApprovedAt})</span>
                          )}
                        </div>
                      )}
                      {selectedBooking.sentToNafath && !selectedBooking.clientApproved && (
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-orange-600" />
                          <span className="text-sm text-orange-600">{t('bookings.waitingForApproval')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-xs text-gray-500">
                <span>{t('bookings.createdAt')}: {selectedBooking.createdAt}</span>
                <button 
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setSelectedBooking(null);
                  }}
                  className="text-red-500 hover:underline"
                >
                  {t('bookings.close')}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DraftBookingsPage;



