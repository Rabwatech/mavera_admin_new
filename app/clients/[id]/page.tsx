"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, User, FileText, DollarSign, FileCheck, Clock, MessageSquare, Download, Eye } from 'lucide-react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardHeader, CardContent } from '../../../components/ui/card';
import { BookingStatus } from '../../../types';

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string;
  status: 'Active' | 'Inactive';
}

interface Booking {
  id: string;
  eventDate: string;
  packagePrice: number;
  discountPercentage: number;
  finalPrice: number;
  status: BookingStatus;
  hall: string;
  guests: number;
}

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  reference: string;
  installment: string;
}

interface Contract {
  id: string;
  date: string;
  value: number;
  status: 'Draft' | 'Signed' | 'Pending';
  pdfUrl?: string;
  signedDate?: string;
}

interface ArrangementDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  url: string;
}

interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'system';
  title: string;
  description: string;
  user?: string;
}

const ClientDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { t, direction } = useLanguage();
  const clientId = params.id as string;

  // Mock data - في التطبيق الحقيقي سيتم جلبها من API
  const [client] = useState<Client>({
    id: clientId,
    name: 'Al-Rajhi Family',
    phone: '0501234567',
    email: 'alrajhi@example.com',
    address: 'Riyadh, Saudi Arabia',
    createdAt: '2024-08-15',
    status: 'Active',
  });

  const [bookings] = useState<Booking[]>([
    {
      id: 'B001',
      eventDate: '2025-10-15',
      packagePrice: 150000,
      discountPercentage: 5,
      finalPrice: 142500,
      status: BookingStatus.CONFIRMED,
      hall: 'MAVERA 1',
      guests: 500,
    },
    {
      id: 'B002',
      eventDate: '2024-12-20',
      packagePrice: 80000,
      discountPercentage: 0,
      finalPrice: 80000,
      status: BookingStatus.COMPLETED,
      hall: 'MAVERA 2',
      guests: 300,
    },
  ]);

  const [payments] = useState<Payment[]>([
    {
      id: 'P001',
      date: '2024-09-01',
      amount: 50000,
      method: 'HyperPay',
      status: 'Paid',
      reference: 'HP-9921',
      installment: 'دفعة أولى (35%)',
    },
    {
      id: 'P002',
      date: '2024-10-01',
      amount: 50000,
      method: 'Bank Transfer',
      status: 'Paid',
      reference: 'BT-101',
      installment: 'دفعة ثانية (35%)',
    },
    {
      id: 'P003',
      date: '2024-10-10',
      amount: 42500,
      method: 'Mada',
      status: 'Pending',
      reference: 'MD-202',
      installment: 'دفعة نهائية (30%)',
    },
  ]);

  const [contracts] = useState<Contract[]>([
    {
      id: 'CNT-2024-882',
      date: '2024-09-15',
      value: 142500,
      status: 'Signed',
      pdfUrl: '/contracts/cnt-882.pdf',
      signedDate: '2024-09-15',
    },
  ]);

  const [documents] = useState<ArrangementDocument[]>([
    {
      id: 'DOC-001',
      name: 'قائمة الطعام النهائية.pdf',
      type: 'Menu',
      uploadedAt: '2024-10-05',
      url: '/documents/menu.pdf',
    },
    {
      id: 'DOC-002',
      name: 'ترتيبات الديكور.pdf',
      type: 'Decoration',
      uploadedAt: '2024-10-08',
      url: '/documents/decoration.pdf',
    },
  ]);

  const [timeline] = useState<TimelineEvent[]>([
    {
      id: 'T001',
      date: '2024-10-10',
      time: '10:23 AM',
      type: 'call',
      title: 'مكالمة متابعة',
      description: 'تم الاتصال للتحقق من تفاصيل الحفل النهائية. العميل راضٍ عن الترتيبات.',
      user: 'أحمد محمد',
    },
    {
      id: 'T002',
      date: '2024-10-05',
      time: '2:15 PM',
      type: 'note',
      title: 'ملاحظة',
      description: 'تم رفع قائمة الطعام النهائية. العميل طلب تعديلات بسيطة على الأطباق.',
      user: 'سارة علي',
    },
    {
      id: 'T003',
      date: '2024-09-15',
      time: '11:00 AM',
      type: 'meeting',
      title: 'اجتماع توقيع العقد',
      description: 'تم التوقيع على العقد النهائي. تم استلام الدفعة الأولى.',
      user: 'محمد خالد',
    },
    {
      id: 'T004',
      date: '2024-09-01',
      time: '9:30 AM',
      type: 'system',
      title: 'تم إنشاء الحجز',
      description: 'تم إنشاء حجز جديد للعميل في النظام.',
    },
    {
      id: 'T005',
      date: '2024-08-15',
      time: '3:45 PM',
      type: 'email',
      title: 'استفسار أولي',
      description: 'العميل أرسل استفساراً عبر الموقع الإلكتروني عن تواريخ أكتوبر.',
    },
  ]);

  const getStatusBadge = (status: string, type: 'contract' | 'payment' | 'booking') => {
    let color = 'bg-gray-100 text-gray-500 border-gray-200';
    
    if (type === 'contract') {
      if (status === 'Signed') color = 'bg-green-50 text-green-600 border-green-100';
      if (status === 'Draft') color = 'bg-blue-50 text-blue-600 border-blue-100';
      if (status === 'Pending') color = 'bg-orange-50 text-orange-600 border-orange-100';
    }
    
    if (type === 'payment') {
      if (status === 'Paid') color = 'bg-green-50 text-green-600 border-green-100';
      if (status === 'Pending') color = 'bg-orange-50 text-orange-600 border-orange-100';
      if (status === 'Overdue') color = 'bg-red-50 text-red-600 border-red-100';
    }
    
    if (type === 'booking') {
      if (status === BookingStatus.CONFIRMED || status === BookingStatus.COMPLETED) color = 'bg-green-50 text-green-600 border-green-100';
      if (status === BookingStatus.PENDING_APPROVAL) color = 'bg-orange-50 text-orange-600 border-orange-100';
      if (status === BookingStatus.DRAFT) color = 'bg-blue-50 text-blue-600 border-blue-100';
    }
    
    return (
      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${color}`}>
        {status}
      </span>
    );
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone size={16} className="text-blue-500" />;
      case 'email':
        return <Mail size={16} className="text-purple-500" />;
      case 'meeting':
        return <Calendar size={16} className="text-green-500" />;
      case 'note':
        return <MessageSquare size={16} className="text-orange-500" />;
      default:
        return <Clock size={16} className="text-gray-400" />;
    }
  };

  const totalPaid = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'Pending' || p.status === 'Overdue').reduce((sum, p) => sum + p.amount, 0);
  const totalAmount = bookings.reduce((sum, b) => sum + b.finalPrice, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-mavera-navy">{client.name}</h1>
            <p className="text-gray-500 text-sm">{t('clients.detailSubtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
            client.status === 'Active' 
              ? 'bg-green-50 text-green-600 border border-green-100' 
              : 'bg-gray-100 text-gray-500 border border-gray-200'
          }`}>
            {client.status}
          </span>
        </div>
      </div>

      {/* Client Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-mavera-gold text-white flex items-center justify-center font-bold text-lg">
              {client.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-mavera-navy">{client.name}</h2>
              <p className="text-xs text-gray-400">Client ID: {client.id}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400">{t('clients.phone')}</p>
                <p className="text-sm font-medium text-mavera-navy font-mono" dir="ltr">{client.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400">{t('clients.email')}</p>
                <p className="text-sm font-medium text-mavera-navy">{client.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400">{t('clients.address')}</p>
                <p className="text-sm font-medium text-mavera-navy">{client.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400">{t('clients.memberSince')}</p>
                <p className="text-sm font-medium text-mavera-navy">{client.createdAt}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">{t('clients.totalValue')}</p>
                <p className="text-2xl font-bold text-mavera-navy">{totalAmount.toLocaleString()} SAR</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <DollarSign size={24} className="text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">{t('clients.totalPaid')}</p>
                <p className="text-2xl font-bold text-green-600">{totalPaid.toLocaleString()} SAR</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <FileCheck size={24} className="text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">{t('clients.totalPending')}</p>
                <p className="text-2xl font-bold text-orange-600">{totalPending.toLocaleString()} SAR</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                <Clock size={24} className="text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-mavera-navy flex items-center gap-2">
              <Calendar size={20} />
              {t('clients.bookings')} ({bookings.length})
            </h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border border-gray-100 rounded-xl p-4 hover:border-mavera-gold transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-mavera-navy">#{booking.id}</span>
                      {getStatusBadge(booking.status, 'booking')}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">{t('clients.eventDate')}</p>
                        <p className="font-medium text-mavera-navy">{booking.eventDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">{t('clients.hall')}</p>
                        <p className="font-medium text-mavera-navy">{booking.hall}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">{t('clients.guests')}</p>
                        <p className="font-medium text-mavera-navy">{booking.guests}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">{t('clients.totalPrice')}</p>
                        <p className="font-medium text-mavera-navy">{booking.finalPrice.toLocaleString()} SAR</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payments Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-mavera-navy flex items-center gap-2">
              <DollarSign size={20} />
              {t('clients.paymentHistory')} ({payments.length})
            </h3>
            <button
              onClick={() => router.push(`/clients/${clientId}/payments`)}
              className="text-sm text-mavera-gold hover:text-mavera-goldHover font-bold flex items-center gap-1"
            >
              {t('clients.viewAllPayments')}
              <ArrowLeft size={16} className={direction === 'rtl' ? 'rotate-180' : ''} />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-4 py-3 text-start">{t('clients.date')}</th>
                  <th className="px-4 py-3 text-start">{t('clients.installment')}</th>
                  <th className="px-4 py-3 text-start">{t('clients.amount')}</th>
                  <th className="px-4 py-3 text-start">{t('clients.method')}</th>
                  <th className="px-4 py-3 text-start">{t('clients.reference')}</th>
                  <th className="px-4 py-3 text-start">{t('clients.status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-mavera-navy">{payment.date}</td>
                    <td className="px-4 py-3 text-gray-600">{payment.installment}</td>
                    <td className="px-4 py-3 font-bold text-mavera-navy">{payment.amount.toLocaleString()} SAR</td>
                    <td className="px-4 py-3 text-gray-600">{payment.method}</td>
                    <td className="px-4 py-3 text-gray-400 font-mono text-xs" dir="ltr">{payment.reference}</td>
                    <td className="px-4 py-3">{getStatusBadge(payment.status, 'payment')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Contracts Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-mavera-navy flex items-center gap-2">
              <FileText size={20} />
              {t('clients.contracts')} ({contracts.length})
            </h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contracts.map((contract) => (
              <div key={contract.id} className="border border-gray-100 rounded-xl p-4 hover:border-mavera-gold transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-mavera-navy">{contract.id}</span>
                      {getStatusBadge(contract.status, 'contract')}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">{t('clients.contractDate')}</p>
                        <p className="font-medium text-mavera-navy">{contract.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">{t('clients.contractValue')}</p>
                        <p className="font-medium text-mavera-navy">{contract.value.toLocaleString()} SAR</p>
                      </div>
                      {contract.signedDate && (
                        <div>
                          <p className="text-xs text-gray-400 mb-1">{t('clients.signedDate')}</p>
                          <p className="font-medium text-mavera-navy">{contract.signedDate}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {contract.pdfUrl && (
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-mavera-gold hover:bg-gray-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-mavera-gold hover:bg-gray-50 rounded-lg transition-colors">
                        <Download size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Arrangements Documents Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-mavera-navy flex items-center gap-2">
              <FileCheck size={20} />
              {t('clients.arrangementDocs')} ({documents.length})
            </h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:border-mavera-gold transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <FileText size={18} className="text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-mavera-navy truncate">{doc.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400">{doc.type}</span>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-400">{doc.uploadedAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-mavera-gold hover:bg-gray-50 rounded-lg transition-colors">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-mavera-gold hover:bg-gray-50 rounded-lg transition-colors">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-mavera-navy flex items-center gap-2">
              <Clock size={20} />
              {t('clients.communicationTimeline')}
            </h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`relative border-l-2 border-gray-100 space-y-6 ${direction === 'rtl' ? 'border-r-2 border-l-0 ml-0 mr-6 pr-6' : 'ml-6 pl-6'}`}>
            {timeline.map((event, index) => (
              <div key={event.id} className="relative">
                <div className={`absolute w-3 h-3 rounded-full border-2 border-white ${
                  direction === 'rtl' ? '-right-[31px]' : '-left-[31px]'
                } ${
                  event.type === 'call' ? 'bg-blue-500' :
                  event.type === 'email' ? 'bg-purple-500' :
                  event.type === 'meeting' ? 'bg-green-500' :
                  event.type === 'note' ? 'bg-orange-500' :
                  'bg-gray-400'
                }`}></div>
                <div className="bg-white border border-gray-100 rounded-xl p-4 hover:border-mavera-gold transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getTimelineIcon(event.type)}
                      <span className="text-sm font-bold text-mavera-navy">{event.title}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {event.date} • {event.time}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                  {event.user && (
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <User size={12} />
                      {event.user}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetailPage;

