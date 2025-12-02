"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Calendar, MapPin, Users, FileText, DollarSign, 
  Download, Edit, CheckCircle, Clock, AlertCircle, ExternalLink,
  CreditCard, History, MessageSquare
} from 'lucide-react';
import { useLanguage } from '../../../lib/i18n';

enum PaymentStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  OVERDUE = 'OVERDUE'
}

interface Payment {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  paymentDate?: string;
  method?: string;
}

interface TimelineEvent {
  id: string;
  type: 'CREATE' | 'UPDATE' | 'PAYMENT' | 'SIGNATURE' | 'APPROVAL';
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

const BookingDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { t, direction } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'contract' | 'arrangements' | 'timeline'>('overview');

  // Mock booking data
  const booking = {
    id: params.id as string,
    clientName: 'Dr. Khalid Al-Rasheed',
    clientPhone: '+966 50 123 4567',
    clientEmail: 'khalid@example.com',
    eventDate: '2026-03-15',
    eventTime: '18:00',
    hall: 'Grand Ballroom',
    guestCount: 350,
    packagePrice: 200000,
    discount: 5,
    finalPrice: 190000,
    status: 'CONFIRMED',
    nafathStatus: 'SIGNED',
    createdAt: '2024-11-20',
    updatedAt: '2024-11-25'
  };

  const payments: Payment[] = [
    { id: 'P1', name: 'Deposit (30%)', amount: 57000, dueDate: '2024-11-20', status: PaymentStatus.PAID, paymentDate: '2024-11-20', method: 'Mada' },
    { id: 'P2', name: 'Second Payment (40%)', amount: 76000, dueDate: '2025-01-15', status: PaymentStatus.PENDING },
    { id: 'P3', name: 'Final Payment (30%)', amount: 57000, dueDate: '2026-03-01', status: PaymentStatus.PENDING },
  ];

  const services = [
    { name: 'Premium Hall Rental', nameAr: 'تأجير قاعة فاخرة', price: 80000 },
    { name: 'Luxury Decoration', nameAr: 'ديكور فاخر', price: 45000 },
    { name: 'Premium Catering', nameAr: 'ضيافة راقية', price: 40000 },
    { name: 'Professional Photography', nameAr: 'تصوير احترافي', price: 25000 },
    { name: 'Live Band Entertainment', nameAr: 'فرقة موسيقية', price: 30000 },
  ];

  const timeline: TimelineEvent[] = [
    { 
      id: 'T1', 
      type: 'PAYMENT', 
      title: 'Payment Received', 
      description: 'Deposit payment of 57,000 SAR received via Mada',
      timestamp: '2024-11-25 14:30',
      user: 'System'
    },
    { 
      id: 'T2', 
      type: 'SIGNATURE', 
      title: 'Contract Signed', 
      description: 'Client signed the contract via Nafath',
      timestamp: '2024-11-22 10:15',
      user: 'Dr. Khalid Al-Rasheed'
    },
    { 
      id: 'T3', 
      type: 'UPDATE', 
      title: 'Booking Updated', 
      description: 'Guest count updated from 300 to 350',
      timestamp: '2024-11-21 16:45',
      user: 'Ahmed (Sales)'
    },
    { 
      id: 'T4', 
      type: 'CREATE', 
      title: 'Booking Created', 
      description: 'Initial booking created for Grand Ballroom',
      timestamp: '2024-11-20 09:00',
      user: 'Ahmed (Sales)'
    },
  ];

  const getPaymentStatusBadge = (status: PaymentStatus) => {
    const styles = {
      [PaymentStatus.PAID]: 'bg-green-50 text-green-600 border-green-200',
      [PaymentStatus.PENDING]: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      [PaymentStatus.OVERDUE]: 'bg-red-50 text-red-600 border-red-200'
    };
    
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-bold border ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const getTimelineIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'CREATE': return <Calendar size={16} className="text-blue-500" />;
      case 'UPDATE': return <Edit size={16} className="text-orange-500" />;
      case 'PAYMENT': return <DollarSign size={16} className="text-green-500" />;
      case 'SIGNATURE': return <CheckCircle size={16} className="text-purple-500" />;
      case 'APPROVAL': return <CheckCircle size={16} className="text-mavera-gold" />;
      default: return <Clock size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 mb-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-mavera-navy mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Bookings</span>
        </button>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-mavera-navy mb-2">
              Booking #{booking.id}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {new Date(booking.eventDate).toLocaleDateString()} at {booking.eventTime}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {booking.hall}
              </span>
              <span className="flex items-center gap-1">
                <Users size={16} />
                {booking.guestCount} guests
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 flex items-center gap-2 transition-colors">
              <Download size={18} />
              Download PDF
            </button>
            <button className="px-4 py-2 bg-mavera-gold text-white rounded-xl font-bold hover:bg-mavera-goldHover flex items-center gap-2 transition-all">
              <Edit size={18} />
              Edit Booking
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex gap-1 p-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: <FileText size={16} /> },
              { id: 'payments', label: 'Payments', icon: <DollarSign size={16} /> },
              { id: 'contract', label: 'Contract', icon: <FileText size={16} /> },
              { id: 'arrangements', label: 'Arrangements', icon: <CheckCircle size={16} /> },
              { id: 'timeline', label: 'Timeline', icon: <History size={16} /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-mavera-navy text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Services */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-mavera-navy mb-4">Selected Services</h2>
                  <div className="space-y-3">
                    {services.map((service, idx) => (
                      <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-gray-900">{service.name}</p>
                          <p className="text-sm text-gray-500">{service.nameAr}</p>
                        </div>
                        <span className="font-bold text-mavera-navy">
                          {service.price.toLocaleString()} SAR
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-mavera-navy mb-4">Pricing Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Package Price</span>
                      <span className="font-medium">{booking.packagePrice.toLocaleString()} SAR</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Discount ({booking.discount}%)</span>
                      <span className="font-medium text-red-600">
                        -{(booking.packagePrice * booking.discount / 100).toLocaleString()} SAR
                      </span>
                    </div>
                    <div className="pt-3 border-t border-gray-200 flex justify-between">
                      <span className="font-bold text-lg text-mavera-navy">Final Total</span>
                      <span className="font-bold text-xl text-mavera-gold">
                        {booking.finalPrice.toLocaleString()} SAR
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-mavera-navy mb-4">Payment Schedule</h2>
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div key={payment.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900">{payment.name}</h3>
                          <p className="text-sm text-gray-500">Due: {new Date(payment.dueDate).toLocaleDateString()}</p>
                          {payment.paymentDate && (
                            <p className="text-sm text-green-600 mt-1">
                              Paid on {new Date(payment.paymentDate).toLocaleDateString()} via {payment.method}
                            </p>
                          )}
                        </div>
                        {getPaymentStatusBadge(payment.status)}
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-xl font-bold text-mavera-navy">
                          {payment.amount.toLocaleString()} SAR
                        </span>
                        {payment.status === PaymentStatus.PENDING && (
                          <button className="px-4 py-2 bg-mavera-gold text-white rounded-lg text-sm font-medium hover:bg-mavera-goldHover transition-all">
                            Send Payment Link
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contract Tab */}
            {activeTab === 'contract' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-mavera-navy">Contract Document</h2>
                  <span className="px-3 py-1 bg-green-50 text-green-600 border border-green-200 rounded-md text-sm font-bold flex items-center gap-1">
                    <CheckCircle size={14} />
                    Signed via Nafath
                  </span>
                </div>
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                  <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Contract PDF Preview</p>
                  <button className="px-6 py-3 bg-mavera-navy text-white rounded-xl font-bold hover:bg-mavera-navyLight flex items-center gap-2 mx-auto transition-all">
                    <Download size={18} />
                    Download Contract PDF
                  </button>
                </div>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-800">
                    <strong>Signed by:</strong> {booking.clientName} via Nafath on {new Date(booking.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            {/* Arrangements Tab */}
            {activeTab === 'arrangements' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-mavera-navy mb-4">Arrangement Details</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                  <p className="text-sm text-yellow-800 flex items-center gap-2">
                    <Clock size={16} />
                    Arrangements document pending. Coordinator will upload details soon.
                  </p>
                </div>
                <button className="w-full px-6 py-3 bg-mavera-gold text-white rounded-xl font-bold hover:bg-mavera-goldHover flex items-center justify-center gap-2 transition-all">
                  <ExternalLink size={18} />
                  Go to Arrangements Page
                </button>
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-mavera-navy mb-6">Activity Timeline</h2>
                <div className="relative border-l-2 border-gray-200 ml-3 pl-6 space-y-6">
                  {timeline.map((event) => (
                    <div key={event.id} className="relative">
                      <div className="absolute w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center -left-[42px]">
                        {getTimelineIcon(event.type)}
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-gray-900">{event.title}</h3>
                          <span className="text-xs text-gray-500">{event.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                        <p className="text-xs text-gray-500">by {event.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-mavera-navy mb-4">Client Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Name</p>
                  <p className="font-medium text-gray-900">{booking.clientName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone</p>
                  <p className="font-medium text-gray-900 font-mono" dir="ltr">{booking.clientPhone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="font-medium text-gray-900">{booking.clientEmail}</p>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 flex items-center justify-center gap-2 transition-all">
                  <MessageSquare size={16} />
                  Contact Client
                </button>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-mavera-navy mb-4">Status</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Booking Status</span>
                  <span className="px-3 py-1 bg-green-50 text-green-600 border border-green-200 rounded-md text-xs font-bold">
                    {booking.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Nafath Status</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-600 border border-purple-200 rounded-md text-xs font-bold">
                    {booking.nafathStatus}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Created</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(booking.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-mavera-navy mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-left">
                  Send Reminder
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-left">
                  Generate Invoice
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-left">
                  View in Calendar
                </button>
                <button className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors text-left">
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;


