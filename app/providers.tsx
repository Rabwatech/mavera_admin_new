"use client";

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LanguageProvider, useLanguage } from '../lib/i18n';
import { AuthProvider, useAuth } from '../lib/auth';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Protected Routes that require authentication
const Shell = ({ children }: { children?: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { direction } = useLanguage();

  // Public routes that don't require authentication
  const publicRoutes = ['/login'];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    // Redirect to login if not authenticated and trying to access protected route
    if (!user && !isPublicRoute) {
      router.push('/login');
    }
    // Redirect to dashboard if authenticated and trying to access login
    if (user && pathname === '/login') {
      router.push('/');
    }
  }, [user, pathname, isPublicRoute, router]);

  // Show nothing while redirecting
  if (!user && !isPublicRoute) {
    return null;
  }

  // If on login page, render without layout
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // If no user somehow, show nothing
  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-sans overflow-x-hidden" dir={direction}>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar 
        userRole={user.role} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <Header 
        user={user} 
        onRoleSwitch={() => {}} 
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
  );
};

export function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Shell>
          {children}
        </Shell>
      </AuthProvider>
    </LanguageProvider>
  );
}