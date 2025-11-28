"use client";

import React from 'react';
import { LayoutDashboard, Users, Calendar, FileText, Settings, Award, PhoneIncoming, LogOut, X, Activity, FileCheck, BarChart3, Map, Trello, Receipt, ScrollText, Link as LinkIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { UserRole } from '../types/auth';
import { useLanguage } from '../lib/i18n';

interface SidebarProps {
  userRole: UserRole;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, isOpen, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { t, direction } = useLanguage();

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path);
  };

  const allNavItems = [
    // Super Admin & Exec
    {
       label: t('nav.adminDashboard'),
       icon: <LayoutDashboard size={20} />,
       path: '/',
       roles: [UserRole.SUPER_ADMIN]
    },
    {
       label: t('nav.users'),
       icon: <Users size={20} />,
       path: '/users',
       roles: [UserRole.SUPER_ADMIN]
    },
    {
       label: t('nav.approvals'),
       icon: <FileCheck size={20} />,
       path: '/approvals',
       roles: [UserRole.SUPER_ADMIN]
    },
    {
       label: t('nav.reports'),
       icon: <BarChart3 size={20} />,
       path: '/reports',
       roles: [UserRole.SUPER_ADMIN]
    },
    {
       label: t('nav.clients'),
       icon: <Activity size={20} />,
       path: '/clients',
       roles: [UserRole.SUPER_ADMIN]
    },
    
    // Finance Module
    {
      label: t('nav.financeDashboard'),
      icon: <LayoutDashboard size={20} />,
      path: '/admin/finance',
      roles: [UserRole.FINANCE_MANAGER, UserRole.SUPER_ADMIN]
    },
    {
      label: t('nav.invoices'),
      icon: <Receipt size={20} />,
      path: '/admin/finance/invoices',
      roles: [UserRole.FINANCE_MANAGER, UserRole.SUPER_ADMIN]
    },
    {
      label: t('nav.financeContracts'),
      icon: <ScrollText size={20} />,
      path: '/admin/finance/contracts',
      roles: [UserRole.FINANCE_MANAGER, UserRole.SUPER_ADMIN]
    },
    {
      label: t('nav.integrations'),
      icon: <LinkIcon size={20} />,
      path: '/admin/finance/integrations',
      roles: [UserRole.FINANCE_MANAGER, UserRole.SUPER_ADMIN]
    },

    // Call Center
    { 
      label: t('nav.incomingLeads'), 
      icon: <PhoneIncoming size={20} />, 
      path: '/leads',
      roles: [UserRole.CALL_CENTER, UserRole.SUPER_ADMIN]
    },
    // Sales
    { 
      label: t('nav.salesDashboard'), 
      icon: <LayoutDashboard size={20} />, 
      path: '/sales-dashboard',
      roles: [UserRole.SALES_AGENT, UserRole.SUPER_ADMIN]
    },
    { 
      label: t('nav.tours'), 
      icon: <Map size={20} />, 
      path: '/sales/tours',
      roles: [UserRole.SALES_AGENT, UserRole.SUPER_ADMIN]
    },
    { 
      label: t('nav.pipeline'), 
      icon: <Trello size={20} />, 
      path: '/sales/pipeline',
      roles: [UserRole.SALES_AGENT, UserRole.SUPER_ADMIN]
    },
    // Shared
    { 
      label: t('nav.myCalendar'), 
      icon: <Calendar size={20} />, 
      path: '/calendar',
      roles: [UserRole.CALL_CENTER, UserRole.SALES_AGENT, UserRole.SUPER_ADMIN]
    },
    { 
      label: t('nav.salesProposals'), 
      icon: <FileText size={20} />, 
      path: '/sales/new',
      roles: [UserRole.SALES_AGENT, UserRole.SUPER_ADMIN]
    },
    // Coordination
    { 
      label: t('nav.arrangements'), 
      icon: <Award size={20} />, 
      path: '/arrangements',
      roles: [UserRole.SUPER_ADMIN, UserRole.COORDINATOR]
    },
  ];

  const allowedNavItems = allNavItems.filter(item => item.roles.includes(userRole));

  return (
    <aside 
      className={`fixed top-0 bottom-0 h-full w-64 bg-white text-gray-600 z-50 flex flex-col font-sans shadow-[0_0_15px_rgba(0,0,0,0.05)] transition-transform duration-300 ease-in-out md:translate-x-0 ${
        direction === 'rtl' 
          ? 'right-0 border-l border-gray-100 ' + (isOpen ? 'translate-x-0' : 'translate-x-full') 
          : 'left-0 border-r border-gray-100 ' + (isOpen ? 'translate-x-0' : '-translate-x-full')
      }`}
    >
      {/* Brand */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-mavera-gold rounded-lg flex items-center justify-center shadow-lg shadow-mavera-gold/20 text-white shrink-0">
               <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-mavera-navy tracking-wide">MAVERA</span>
              <span className="text-[10px] text-mavera-gold uppercase tracking-widest font-bold">Control Panel</span>
            </div>
         </div>
         <button onClick={onClose} className="md:hidden text-gray-400 hover:text-red-500">
           <X size={24} />
         </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-8 px-4">
        <p className="px-4 text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">{t('nav.mainMenu')}</p>
        <ul className="space-y-1">
          {allowedNavItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => {
                  router.push(item.path);
                  onClose();
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group font-medium ${
                  isActive(item.path)
                    ? 'bg-amber-50 text-mavera-gold shadow-sm'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-mavera-navy'
                }`}
              >
                <span className={isActive(item.path) ? 'text-mavera-gold' : 'text-gray-400 group-hover:text-mavera-navy transition-colors'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {isActive(item.path) && (
                  <div className="ms-auto w-1.5 h-1.5 rounded-full bg-mavera-gold"></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-6 bg-gray-50 border-t border-gray-100">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-mavera-navy shadow-sm shrink-0">
               ID
            </div>
            <div className="flex flex-col min-w-0">
               <span className="text-sm font-bold text-mavera-navy truncate">{userRole.replace('_', ' ')}</span>
               <span className="text-[10px] text-gray-500 uppercase tracking-wide bg-white px-2 py-0.5 rounded border border-gray-100 inline-block mt-1 w-fit">
                 Online
               </span>
            </div>
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;