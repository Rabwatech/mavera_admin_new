"use client";

import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from '../lib/i18n';
import { AuthProvider } from '../lib/auth';
import { UserRole, MOCK_USERS } from '../types/auth';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Inner Shell handles the Layout UI (Sidebar/Header) that relies on Context
const Shell = ({ children }: { children?: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(MOCK_USERS.SALES);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { direction } = useLanguage();

  const handleRoleSwitch = (newRole: UserRole) => {
    const mockUser = Object.values(MOCK_USERS).find(u => u.role === newRole) || MOCK_USERS.ADMIN;
    setCurrentUser(mockUser);
  };

  return (
    <AuthProvider user={currentUser}>
      <div className="flex min-h-screen bg-[#F9FAFB] font-sans overflow-x-hidden" dir={direction}>
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <Sidebar 
          userRole={currentUser.role} 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <Header 
          user={currentUser} 
          onRoleSwitch={handleRoleSwitch} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main 
          className={`flex-1 mt-16 p-4 md:p-8 transition-all duration-300 ${
            direction === 'rtl' ? 'md:mr-64' : 'md:ml-64'
          }`}
        >
          {children}
        </main>
      </div>
    </AuthProvider>
  );
};

export function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Shell>
        {children}
      </Shell>
    </LanguageProvider>
  );
}