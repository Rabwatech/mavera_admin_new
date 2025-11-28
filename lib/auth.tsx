
import React, { createContext, useContext, ReactNode } from 'react';
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
  user: UserProfile;
  hasPermission: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ user: UserProfile; children: ReactNode }> = ({ user, children }) => {
  
  const hasPermission = (permission: Permission): boolean => {
    // 1. Gather all roles the user has
    const userRoles = user.roles || [user.role];
    
    // 2. Collect all base permissions from roles
    const rolePermissions = userRoles.flatMap(role => ROLE_PERMISSIONS[role] || []);
    
    // 3. Add custom granular permissions
    const allPermissions = new Set([...rolePermissions, ...(user.customPermissions || [])]);

    return allPermissions.has(permission);
  };

  return (
    <AuthContext.Provider value={{ user, hasPermission }}>
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
