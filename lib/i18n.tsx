
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    'nav.incomingLeads': 'العملاء الجدد',
    'nav.salesDashboard': 'لوحة المبيعات',
    'nav.myCalendar': 'تقويمي',
    'nav.salesProposals': 'عروض الأسعار',
    'nav.tours': 'إدارة الجولات',
    'nav.pipeline': 'مراحل البيع',
    'nav.contracts': 'العقود',
    'nav.arrangements': 'الترتيبات',
    'nav.settings': 'الإعدادات',
    'nav.logout': 'تسجيل خروج',
    'nav.mainMenu': 'القائمة الرئيسية',
    'nav.system': 'النظام',
    'nav.adminDashboard': 'مركز القيادة',
    'nav.users': 'إدارة الموظفين',
    'nav.approvals': 'موافقات الخصم',
    'nav.reports': 'التقارير والتحليلات',
    'nav.clients': 'سجل العملاء',
    'nav.finance': 'الإدارة المالية',
    'nav.financeDashboard': 'لوحة المالية',
    'nav.invoices': 'الفواتير والمدفوعات',
    'nav.financeContracts': 'أرشيف العقود',
    'nav.integrations': 'الربط والأنظمة',
    
    // Header
    'header.searchPlaceholder': 'ابحث عن حجوزات، عملاء...',
    'header.viewAs': 'عرض بصلاحية:',
    
    // Dashboard
    'dash.salesTitle': 'المبيعات',
    'dash.salesSubtitle': 'نظرة عامة وروابط سريعة للوحدات',
    'dash.createQuote': 'حجز جديد',
    'dash.monthlyPerformance': 'أداء المبيعات هذا الشهر',
    'dash.targetProgress': 'من الهدف الشهري',
    'dash.closedDeals': 'صفقات مغلقة',
    'dash.scheduledTours': 'جولات مجدولة',
    'dash.activeClients': 'العملاء النشطين',
    'dash.newCustomers': 'عملائي الجدد',
    'dash.total': 'إجمالي',
    'dash.thisMonth': 'هذا الشهر',
    
    // Finance
    'fin.cashIn': 'التحصيل اليومي',
    'fin.pendingInv': 'فواتير معلقة',
    'fin.erpStatus': 'حالة الربط ERP',
    'fin.healthy': 'متصل',
    'fin.error': 'خطأ',
    'fin.recentTrans': 'أحدث العمليات',
    'fin.manualInv': 'فاتورة يدوية',
    'fin.reconcile': 'تسوية المدفوعات',
    'fin.copyLink': 'نسخ الرابط',
    'fin.sync': 'مزامنة ERP',
    'fin.download': 'تحميل PDF',
    'fin.paidVia': 'مدفوع عبر',
    
    // Tours
    'tours.title': 'إدارة الجولات',
    'tours.subtitle': 'جدول الزيارات الميدانية وعرض القاعات',
    'tours.today': 'جولات اليوم',
    'tours.upcoming': 'القادمة',
    'tours.completed': 'المكتملة',
    'tours.noshow': 'لم يحضر',
    'tours.confirm': 'تأكيد الحضور',
    'tours.reschedule': 'إعادة جدولة',
    'tours.complete': 'إكمال الجولة',
    'tours.createQuote': 'إنشاء عرض',

    // Pipeline
    'pipe.title': 'مراحل البيع',
    'pipe.subtitle': 'تتبع الصفقات من الاتصال الأول حتى التوقيع',
    'pipe.new': 'عميل جديد',
    'pipe.tour': 'جولة مجدولة',
    'pipe.proposal': 'تم إرسال العرض',
    'pipe.nafath': 'بانتظار نفاذ',
    'pipe.won': 'تم التوقيع والدفع',

    // Wizard
    'wiz.step1': 'الفعالية والقاعة',
    'wiz.step2': 'الخدمات والتسعير',
    'wiz.step3': 'جدولة الدفعات',
    'wiz.step4': 'العقد والحساب',
    'wiz.next': 'التالي',
    'wiz.prev': 'السابق',
    'wiz.hall': 'القاعة المختارة',
    'wiz.guests': 'عدد الضيوف',
    'wiz.date': 'التاريخ',
    'wiz.createAccount': 'إنشاء الحساب والعقد',

    // Admin Dashboard
    'admin.dashboardTitle': 'مركز القيادة التنفيذي',
    'admin.dashboardSubtitle': 'نظرة شمولية على أداء النظام والعمليات',
    'admin.kpiRevenue': 'الإيرادات (منذ بداية الشهر)',
    'admin.kpiPipeline': 'قيمة الصفقات المحتملة',
    'admin.kpiSatisfaction': 'رضا العملاء (NPS)',
    'admin.recentActivity': 'النشاط الأخير',
    'admin.actionCenter': 'الإجراءات السريعة',
    'admin.inviteUser': 'دعوة موظف جديد',
    'admin.viewReports': 'عرض التقارير',

    // Users
    'users.title': 'إدارة الموظفين',
    'users.subtitle': 'إدارة صلاحيات الوصول وحسابات المستخدمين',
    'users.invite': 'دعوة موظف',

    // Approvals
    'approvals.title': 'موافقات الخصم',
    'approvals.subtitle': 'مراجعة طلبات الخصم التي تتجاوز الحد المسموح',

    // Reports
    'reports.title': 'التقارير والتحليلات',
    'reports.subtitle': 'مؤشرات الأداء المالي والتشغيلي',

    // Clients
    'clients.title': 'سجل العملاء الشامل',
    'clients.subtitle': 'تتبع حالة العقود والدفعات والترتيبات',
    
    // Leads
    'leads.title': 'العملاء الجدد',
    'leads.subtitle': 'إدارة الاستفسارات وجدولة المواعيد',
    'leads.filter': 'تصفية',
    'leads.search': 'بحث سريع...',
    'leads.bookAppt': 'حجز موعد',
    
    // Sales Booking
    'booking.title': 'حجز جديد',
    'booking.subtitle': 'معالج الحجز الرقمي',
    'booking.back': 'إلغاء',
    'booking.pricing': 'التسعير والخصم',
    'booking.basePrice': 'سعر الباقة الأساسي',
    'booking.discount': 'الخصم (%)',
    'booking.approvalReq': 'مطلوب موافقة (>5%)',
    'booking.finalTotal': 'الإجمالي النهائي',
    'booking.analyze': 'تحليل المخاطر (AI)',
    'booking.clientInfo': 'بيانات العميل',
    'booking.firstName': 'الاسم الأول',
    'booking.lastName': 'اسم العائلة',
    'booking.eventDate': 'تاريخ الفعالية',
    'booking.paymentSchedule': 'جدول الدفعات',
    'booking.splitPayment': 'السماح بالدفع المقسم',
    'booking.addInstallment': 'إضافة دفعة',
    'booking.generateContract': 'إنشاء العقد',
    'booking.submitApproval': 'إرسال للموافقة',
    
    // Arrangements
    'arr.title': 'الترتيبات والتنفيذ',
    'arr.subtitle': 'رفع المستندات النهائية لبدء التنفيذ',
    'arr.uploadSuccess': 'تم الرفع بنجاح',
    'arr.clickUpload': 'اضغط لرفع PDF',
  },
  en: {
    // Navigation
    'nav.incomingLeads': 'Incoming Leads',
    'nav.salesDashboard': 'Sales Dashboard',
    'nav.myCalendar': 'My Calendar',
    'nav.salesProposals': 'New Booking',
    'nav.tours': 'Tour Management',
    'nav.pipeline': 'Sales Pipeline',
    'nav.contracts': 'Contracts',
    'nav.arrangements': 'Arrangements',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    'nav.mainMenu': 'Main Menu',
    'nav.system': 'System',
    'nav.adminDashboard': 'Command Center',
    'nav.users': 'Staff Management',
    'nav.approvals': 'Discount Approvals',
    'nav.reports': 'Analytics',
    'nav.clients': 'Client Master List',
    'nav.finance': 'Finance',
    'nav.financeDashboard': 'Finance Dashboard',
    'nav.invoices': 'Invoices & Payments',
    'nav.financeContracts': 'Contracts Audit',
    'nav.integrations': 'Integrations',
    
    // Header
    'header.searchPlaceholder': 'Search bookings, clients...',
    'header.viewAs': 'View As:',
    
    // Dashboard
    'dash.salesTitle': 'Sales',
    'dash.salesSubtitle': 'Overview and quick links',
    'dash.createQuote': 'New Booking',
    'dash.monthlyPerformance': 'Sales Performance This Month',
    'dash.targetProgress': 'of monthly target',
    'dash.closedDeals': 'Closed Deals',
    'dash.scheduledTours': 'Scheduled Tours',
    'dash.activeClients': 'Active Clients',
    'dash.newCustomers': 'My New Customers',
    'dash.total': 'Total',
    'dash.thisMonth': 'This Month',
    
    // Finance
    'fin.cashIn': 'Cash In (Today)',
    'fin.pendingInv': 'Pending Invoices',
    'fin.erpStatus': 'ERP Sync Status',
    'fin.healthy': 'Healthy',
    'fin.error': 'Error',
    'fin.recentTrans': 'Recent Transactions',
    'fin.manualInv': 'Manual Invoice',
    'fin.reconcile': 'Reconcile Payments',
    'fin.copyLink': 'Copy Link',
    'fin.sync': 'Sync to ERP',
    'fin.download': 'Download PDF',
    'fin.paidVia': 'Paid via',

    // Tours
    'tours.title': 'Tour Management',
    'tours.subtitle': 'Site visits schedule and hall viewings',
    'tours.today': "Today's Tours",
    'tours.upcoming': 'Upcoming',
    'tours.completed': 'Completed',
    'tours.noshow': 'No Show',
    'tours.confirm': 'Confirm Arrival',
    'tours.reschedule': 'Reschedule',
    'tours.complete': 'Complete Tour',
    'tours.createQuote': 'Create Booking',

    // Pipeline
    'pipe.title': 'Sales Pipeline',
    'pipe.subtitle': 'Track deals from first contact to signing',
    'pipe.new': 'New Lead',
    'pipe.tour': 'Tour Scheduled',
    'pipe.proposal': 'Proposal Sent',
    'pipe.nafath': 'Pending Nafath',
    'pipe.won': 'Signed & Paid',

    // Wizard
    'wiz.step1': 'Event & Hall',
    'wiz.step2': 'Services & Pricing',
    'wiz.step3': 'Payment Plan',
    'wiz.step4': 'Account & Contract',
    'wiz.next': 'Next Step',
    'wiz.prev': 'Back',
    'wiz.hall': 'Selected Hall',
    'wiz.guests': 'Guest Count',
    'wiz.date': 'Event Date',
    'wiz.createAccount': 'Create Account & Generate Contract',

    // Admin Dashboard
    'admin.dashboardTitle': 'Executive Command Center',
    'admin.dashboardSubtitle': 'Holistic view of system performance and operations',
    'admin.kpiRevenue': 'Revenue (MTD)',
    'admin.kpiPipeline': 'Pipeline Value',
    'admin.kpiSatisfaction': 'Customer Satisfaction (NPS)',
    'admin.recentActivity': 'Recent Activity',
    'admin.actionCenter': 'Action Center',
    'admin.inviteUser': 'Invite New User',
    'admin.viewReports': 'View Reports',

    // Users
    'users.title': 'Staff Management',
    'users.subtitle': 'Manage access rights and user accounts',
    'users.invite': 'Invite Staff',

    // Approvals
    'approvals.title': 'Discount Approvals',
    'approvals.subtitle': 'Review discount requests exceeding thresholds',

    // Reports
    'reports.title': 'Analytics & Reporting',
    'reports.subtitle': 'Financial and operational performance indicators',

    // Clients
    'clients.title': 'Master Client List',
    'clients.subtitle': 'Track contract, payment, and arrangement status globally',

    // Leads
    'leads.title': 'Incoming Leads',
    'leads.subtitle': 'Manage inquiries and schedule appointments',
    'leads.filter': 'Filter',
    'leads.search': 'Quick search...',
    'leads.bookAppt': 'Book Appointment',
    
    // Sales Booking
    'booking.title': 'New Booking Wizard',
    'booking.subtitle': 'Digital Booking Journey',
    'booking.back': 'Cancel',
    'booking.pricing': 'Pricing & Discount',
    'booking.basePrice': 'Base Package Price',
    'booking.discount': 'Discount (%)',
    'booking.approvalReq': 'Approval Required (>5%)',
    'booking.finalTotal': 'Final Total',
    'booking.analyze': 'Analyze Risk (AI)',
    'booking.clientInfo': 'Client Information',
    'booking.firstName': 'First Name',
    'booking.lastName': 'Last Name',
    'booking.eventDate': 'Event Date',
    'booking.paymentSchedule': 'Payment Schedule',
    'booking.splitPayment': 'Allow Split Payment',
    'booking.addInstallment': 'Add Installment',
    'booking.generateContract': 'Generate Contract',
    'booking.submitApproval': 'Submit for Approval',

    // Arrangements
    'arr.title': 'Arrangements & Execution',
    'arr.subtitle': 'Upload finalized documents to trigger execution',
    'arr.uploadSuccess': 'Upload Successful',
    'arr.clickUpload': 'Click to Upload PDF',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const [direction, setDirection] = useState<Direction>('rtl');

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    setDirection(newLang === 'ar' ? 'rtl' : 'ltr');
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
