"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { UserProfile, UserRole, Permission } from '../types/auth';

// 1. Define Role -> Permissions Mapping
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: [
    'finance.view', 'finance.manage_invoices', 'finance.create_invoice', 'finance.sync_erp', 'finance.view_contracts', 'finance.manage_integrations',
    'sales.view', 'sales.create_quote', 'leads.view', 'leads.manage'
  ],
  [UserRole.FINANCE_MANAGER]: [
    'finance.view', 'finance.manage_invoices', 'finance.create_invoice', 'finance.sync_erp', 'finance.view_contracts', 'finance.manage_integrations'
  ],
  [UserRole.SALES_AGENT]: [
    'sales.view', 'sales.create_quote', 'leads.view'
  ],
  [UserRole.CALL_CENTER]: [
    'leads.view', 'leads.manage'
  ],
  [UserRole.COORDINATOR]: [
    'finance.view_contracts' // Can view contracts but not finance dashboard
  ]
};

interface AuthContextType {
  user: UserProfile | null;
  login: (user: UserProfile) => void;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('mavera_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('mavera_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem('mavera_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mavera_user');
  };
  
  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    
    // 1. Gather all roles the user has
    const userRoles = user.roles || [user.role];
    
    // 2. Collect all base permissions from roles
    const rolePermissions = userRoles.flatMap(role => ROLE_PERMISSIONS[role] || []);
    
    // 3. Add custom granular permissions
    const allPermissions = new Set([...rolePermissions, ...(user.customPermissions || [])]);

    return allPermissions.has(permission);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-mavera-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const usePermission = (permission: Permission) => {
  const { hasPermission } = useAuth();
  return hasPermission(permission);
};

export { UserRole };
