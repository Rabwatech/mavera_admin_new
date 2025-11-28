export enum BookingStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  CONFIRMED = 'CONFIRMED',
  READY_FOR_EXECUTION = 'READY_FOR_EXECUTION',
  COMPLETED = 'COMPLETED'
}

export interface PaymentInstallment {
  id: string;
  name: string;
  dueDate: string;
  percentage: number;
  amount: number;
}

export interface Booking {
  id: string;
  clientName: string;
  eventDate: string;
  packagePrice: number;
  discountPercentage: number;
  finalPrice: number;
  status: BookingStatus;
  installments: PaymentInstallment[];
  hasSplitPayment: boolean;
  contractPdfUrl?: string;
  coordinatorNotes?: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  SALES = 'SALES',
  COORDINATOR = 'COORDINATOR'
}

export interface KPIStats {
  monthlyRevenue: number;
  pendingApprovals: number;
  upcomingEvents: number;
  conversionRate: number;
}