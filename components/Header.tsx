"use client";

import React, { useState } from 'react';
import { Search, Bell, Menu, Languages, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { UserRole, UserProfile } from '../types/auth';
import { useLanguage } from '../lib/i18n';
import { useAuth } from '../lib/auth';
import NotificationCenter from './NotificationCenter';

interface HeaderProps {
  user: UserProfile;
  onRoleSwitch: (role: UserRole) => void;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onRoleSwitch, onToggleSidebar }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const { t, toggleLanguage, language, direction } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount] = useState(3);

  const handleLogout = () => {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
      logout();
      router.push('/login');
    }
  };

  const getBreadcrumb = () => {
    if (pathname?.startsWith('/clients/') && pathname !== '/clients') {
      return t('clients.detailSubtitle');
    }
    switch (pathname) {
      case '/': return t('dash.salesTitle');
      case '/sales-dashboard': return t('nav.salesDashboard');
      case '/leads': return t('nav.incomingLeads');
      case '/sales/new': return t('nav.salesProposals');
      case '/bookings/drafts': return t('nav.draftBookings');
      case '/arrangements': return t('nav.arrangements');
      case '/clients': return t('nav.clients');
      case '/admin/finance': return 'Finance Dashboard';
      case '/admin/finance/invoices': return 'Invoices';
      default: return 'Control Panel';
    }
  };

  return (
    <header 
      className={`fixed top-0 h-16 bg-white z-40 px-4 md:px-8 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.03)] border-b border-gray-100 transition-all duration-300 ${
        direction === 'rtl' ? 'left-0 right-0 md:right-64' : 'right-0 left-0 md:left-64'
      }`}
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-2">
           <div className="bg-mavera-gold/10 p-1.5 rounded-lg text-mavera-gold hidden sm:block">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
           </div>
           <span className="text-gray-300 text-xl font-thin mx-2 hidden sm:inline">|</span>
           <span className="text-gray-500 text-sm font-medium tracking-wide truncate max-w-[150px] sm:max-w-none">{getBreadcrumb()}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Notification Bell */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 text-gray-500 hover:text-mavera-navy rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-1 text-gray-500 hover:text-mavera-navy p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
           <Languages size={20} />
           <span className="text-xs font-bold uppercase hidden sm:inline">{language === 'ar' ? 'English' : 'عربي'}</span>
        </button>

        <div className={`flex items-center gap-3 pl-0 md:pl-6 ${direction === 'rtl' ? 'md:border-r' : 'md:border-l'} border-gray-100`}>
          <div className={`text-${direction === 'rtl' ? 'left' : 'right'} hidden md:block`}>
            <p className="text-sm font-bold text-mavera-navy leading-none">{user.name}</p>
            <p className="text-[11px] text-gray-400 mt-1">{user.role.replace('_', ' ')}</p>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-mavera-gold text-white flex items-center justify-center font-bold shadow-lg shadow-mavera-gold/20 ring-2 ring-white text-sm md:text-base">
            {user.avatar}
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="تسجيل الخروج"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Notification Center */}
      <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </header>
  );
};

export default Header;