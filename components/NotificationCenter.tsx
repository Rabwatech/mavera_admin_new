"use client";

import React, { useState } from 'react';
import { Bell, X, DollarSign, FileText, Calendar, CheckCircle, AlertCircle, Users } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  type: 'PAYMENT' | 'CONTRACT' | 'BOOKING' | 'APPROVAL' | 'VENDOR' | 'SYSTEM';
  isRead: boolean;
  timestamp: string;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'N001',
      title: 'New Payment Received',
      titleAr: 'دفعة جديدة مستلمة',
      message: 'Payment of 57,000 SAR received for booking B001',
      messageAr: 'دفعة بقيمة 57,000 ريال مستلمة للحجز B001',
      type: 'PAYMENT',
      isRead: false,
      timestamp: '2024-11-30T10:30:00'
    },
    {
      id: 'N002',
      title: 'Contract Signed',
      titleAr: 'عقد موقع',
      message: 'Dr. Khalid signed the contract via Nafath',
      messageAr: 'د. خالد وقع العقد عبر نفاذ',
      type: 'CONTRACT',
      isRead: false,
      timestamp: '2024-11-30T09:15:00'
    },
    {
      id: 'N003',
      title: 'New Booking Created',
      titleAr: 'حجز جديد',
      message: 'Ahmed created a new booking for Golden Gala',
      messageAr: 'أحمد أنشأ حجز جديد لحفل Golden Gala',
      type: 'BOOKING',
      isRead: false,
      timestamp: '2024-11-29T16:45:00'
    },
    {
      id: 'N004',
      title: 'Discount Approval Required',
      titleAr: 'مطلوب موافقة خصم',
      message: 'Sara requested 15% discount approval for booking B005',
      messageAr: 'سارة طلبت موافقة على خصم 15% للحجز B005',
      type: 'APPROVAL',
      isRead: true,
      timestamp: '2024-11-29T14:20:00'
    },
    {
      id: 'N005',
      title: 'Vendor Confirmed',
      titleAr: 'مورد تم تأكيده',
      message: 'Royal Flowers confirmed availability for event on 2026-02-15',
      messageAr: 'الزهور الملكية أكدت التوفر للحدث في 2026-02-15',
      type: 'VENDOR',
      isRead: true,
      timestamp: '2024-11-28T11:30:00'
    }
  ]);

  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'PAYMENT': return <DollarSign size={20} className="text-green-600" />;
      case 'CONTRACT': return <FileText size={20} className="text-purple-600" />;
      case 'BOOKING': return <Calendar size={20} className="text-blue-600" />;
      case 'APPROVAL': return <AlertCircle size={20} className="text-orange-600" />;
      case 'VENDOR': return <Users size={20} className="text-mavera-gold" />;
      case 'SYSTEM': return <CheckCircle size={20} className="text-gray-600" />;
      default: return <Bell size={20} className="text-gray-400" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed top-16 right-4 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 max-h-[calc(100vh-100px)] flex flex-col border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-mavera-gold/10 rounded-lg">
              <Bell size={20} className="text-mavera-gold" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-mavera-navy">Notifications</h2>
              {unreadCount > 0 && (
                <p className="text-xs text-gray-500">{unreadCount} unread</p>
              )}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Actions */}
        {unreadCount > 0 && (
          <div className="px-6 py-3 border-b border-gray-100 bg-gray-50">
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm text-mavera-gold hover:text-mavera-goldHover font-medium transition-colors"
            >
              Mark all as read
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.isRead ? 'bg-blue-50/30' : ''
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg border border-gray-200 shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className={`font-bold text-sm ${!notification.isRead ? 'text-mavera-navy' : 'text-gray-900'}`}>
                          {language === 'en' ? notification.title : notification.titleAr}
                        </h3>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-mavera-gold rounded-full shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {language === 'en' ? notification.message : notification.messageAr}
                      </p>
                      <p className="text-xs text-gray-400">{getTimeAgo(notification.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Bell size={48} className="mb-4 opacity-20" />
              <p className="text-sm">No notifications</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationCenter;


