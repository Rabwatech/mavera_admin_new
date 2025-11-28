
export enum UserRole {
  CALL_CENTER = 'CALL_CENTER',
  SALES_AGENT = 'SALES_AGENT',
  FINANCE_MANAGER = 'FINANCE_MANAGER',
  SUPER_ADMIN = 'SUPER_ADMIN',
  COORDINATOR = 'COORDINATOR'
}

export type Permission = 
  | 'finance.view'
  | 'finance.manage_invoices'
  | 'finance.create_invoice'
  | 'finance.sync_erp'
  | 'finance.view_contracts'
  | 'finance.manage_integrations'
  | 'sales.view'
  | 'sales.create_quote'
  | 'leads.view'
  | 'leads.manage';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole; // Primary role for display
  roles?: UserRole[]; // Support for multiple roles
  customPermissions?: Permission[]; // Granular overrides
  avatar: string;
}

export const MOCK_USERS: Record<string, UserProfile> = {
  SALES: {
    id: 'u1',
    name: 'Omar Hassan',
    role: UserRole.SALES_AGENT,
    roles: [UserRole.SALES_AGENT],
    avatar: 'OH'
  },
  CALL_CENTER: {
    id: 'u2',
    name: 'Sara Ali',
    role: UserRole.CALL_CENTER,
    roles: [UserRole.CALL_CENTER],
    avatar: 'SA'
  },
  ADMIN: {
    id: 'u3',
    name: 'Admin User',
    role: UserRole.SUPER_ADMIN,
    roles: [UserRole.SUPER_ADMIN],
    avatar: 'AD'
  },
  FINANCE: {
    id: 'u4',
    name: 'Khaled Finance',
    role: UserRole.FINANCE_MANAGER,
    roles: [UserRole.FINANCE_MANAGER],
    // Example: Can manage invoices but specifically CANNOT sync to ERP if we wanted to restrict
    avatar: 'KF'
  },
  COORDINATOR: {
    id: 'u5',
    name: 'Sarah Coordinator',
    role: UserRole.COORDINATOR,
    roles: [UserRole.COORDINATOR],
    avatar: 'SC'
  }
};
