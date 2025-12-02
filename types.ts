export enum BookingStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  CONFIRMED = 'CONFIRMED',
  READY_FOR_EXECUTION = 'READY_FOR_EXECUTION',
  COMPLETED = 'COMPLETED'
}

export enum LeadPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export enum NafathSignatureStatus {
  PENDING_SIGNATURE = 'PENDING_SIGNATURE',
  SIGNED = 'SIGNED',
  REJECTED = 'REJECTED'
}

export enum QuotationStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  VIEWED = 'VIEWED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export enum VendorCategory {
  FLOWERS = 'FLOWERS',
  LIGHTING = 'LIGHTING',
  STAGE = 'STAGE',
  SOUND = 'SOUND',
  CATERING = 'CATERING'
}

export enum VendorStatus {
  CONFIRMED = 'CONFIRMED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED'
}

export enum ArrangementApprovalStatus {
  DRAFT = 'DRAFT',
  PENDING_CLIENT_APPROVAL = 'PENDING_CLIENT_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum PaymentMethod {
  CARD = 'CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH = 'CASH',
  MADA = 'MADA',
  APPLE_PAY = 'APPLE_PAY'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED'
}

export enum ActivityAction {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum ActivityResource {
  BOOKING = 'BOOKING',
  INVOICE = 'INVOICE',
  PAYMENT = 'PAYMENT',
  CONTRACT = 'CONTRACT',
  ARRANGEMENT = 'ARRANGEMENT',
  VENDOR = 'VENDOR',
  DISCOUNT_CODE = 'DISCOUNT_CODE'
}

export interface PaymentInstallment {
  id: string;
  name: string;
  dueDate: string;
  percentage: number;
  amount: number;
  status?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  paymentDate?: string;
  transactionId?: string;
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  eventDate: string;
  packagePrice: number;
  discountPercentage: number;
  finalPrice: number;
  status: BookingStatus;
  installments: PaymentInstallment[];
  hasSplitPayment: boolean;
  contractPdfUrl?: string;
  coordinatorNotes?: string;
  nafathSignatureStatus?: NafathSignatureStatus;
  hall?: string;
  guestCount?: number;
  services?: Service[];
  quotationId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: 'Instagram' | 'Google' | 'Referral' | 'Walk-in' | 'Other';
  status: 'New' | 'Contacted' | 'Booked' | 'Lost';
  priority?: LeadPriority;
  date: string;
  notes?: string;
  reminderDate?: string;
  assignedTo?: string;
}

export interface FollowUpReminder {
  id: string;
  leadId: string;
  reminderDate: string;
  note: string;
  completed: boolean;
  createdAt: string;
  createdBy: string;
}

export interface Quotation {
  id: string;
  bookingId: string;
  clientName: string;
  clientEmail: string;
  eventDate: string;
  hall: string;
  guestCount: number;
  services: Service[];
  totalPrice: number;
  discount: number;
  finalPrice: number;
  status: QuotationStatus;
  pdfUrl?: string;
  sentDate?: string;
  viewedDate?: string;
  respondedDate?: string;
  createdAt: string;
  createdBy: string;
}

export interface Service {
  id: string;
  name: string;
  nameAr: string;
  description?: string;
  descriptionAr?: string;
  basePrice: number;
  category: string;
  isCustom: boolean;
  isActive: boolean;
}

export interface Invoice {
  id: string;
  bookingId: string;
  clientName: string;
  type: 'STANDARD' | 'AMENDMENT';
  parentInvoiceId?: string;
  amount: number;
  paidAmount: number;
  status: PaymentStatus;
  dueDate: string;
  paymentMethod?: PaymentMethod;
  lastPaymentDate?: string;
  overdueDays?: number;
  createdAt: string;
}

export interface DiscountCode {
  id: string;
  code: string;
  percentage: number;
  expiryDate: string;
  maxUses: number;
  currentUses: number;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  nameAr: string;
  category: VendorCategory;
  contactPerson: string;
  phone: string;
  email: string;
  address?: string;
  priceList?: string;
  rating: number;
  totalJobs: number;
  isActive: boolean;
  notes?: string;
}

export interface VendorAssignment {
  id: string;
  bookingId: string;
  vendorId: string;
  vendorName: string;
  category: VendorCategory;
  status: VendorStatus;
  assignedDate: string;
  confirmedDate?: string;
  notes?: string;
}

export interface ArrangementDetails {
  id: string;
  bookingId: string;
  hallType?: string;
  decoration?: string;
  stageType?: string;
  lighting?: string;
  catering?: string;
  specialRequests?: string;
  clientNotes?: string;
  approvalStatus: ArrangementApprovalStatus;
  pdfUrl?: string;
  sentForApprovalDate?: string;
  approvedDate?: string;
  vendors: VendorAssignment[];
}

export interface Notification {
  id: string;
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  type: 'PAYMENT' | 'CONTRACT' | 'BOOKING' | 'APPROVAL' | 'VENDOR' | 'SYSTEM';
  isRead: boolean;
  userId: string;
  resourceType?: ActivityResource;
  resourceId?: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: ActivityAction;
  resource: ActivityResource;
  resourceId: string;
  resourceName: string;
  details?: string;
  timestamp: string;
  ipAddress?: string;
}

export interface SystemSettings {
  companyName: string;
  companyNameAr: string;
  logo?: string;
  address: string;
  addressAr: string;
  taxNumber: string;
  phone: string;
  email: string;
  defaultDepositPercentage: number;
  currency: string;
  dateFormat: string;
  timezone: string;
  paymentGateways: {
    stripe?: { apiKey: string; enabled: boolean };
    moyasar?: { apiKey: string; enabled: boolean };
  };
  nafathConfig?: {
    apiKey: string;
    enabled: boolean;
  };
  erpConfig?: {
    apiUrl: string;
    apiKey: string;
    enabled: boolean;
  };
  notificationSettings: {
    whatsappEnabled: boolean;
    emailEnabled: boolean;
    smsEnabled: boolean;
  };
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