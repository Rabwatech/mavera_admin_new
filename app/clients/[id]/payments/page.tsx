"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, DollarSign, Download, Eye, Send, FileText, CheckCircle2, Clock, AlertCircle, Copy, Receipt } from 'lucide-react';
import { useLanguage } from '../../../../lib/i18n';
import { Card, CardHeader, CardContent } from '../../../../components/ui/card';
import PaymentLinkModal from '../../../../components/PaymentLinkModal';

interface Payment {
  id: string;
  type: 'deposit' | 'installment' | 'addon';
  typeLabel: string;
  dueDate: string;
  paidDate?: string;
  amount: number;
  method?: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  reference?: string;
  receiptUrl?: string;
  paymentLink?: string;
  bookingId: string;
  bookingName: string;
}

const ClientPaymentsPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { t, direction } = useLanguage();
  const clientId = params.id as string;
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isPaymentLinkModalOpen, setIsPaymentLinkModalOpen] = useState(false);

  // Mock data - في التطبيق الحقيقي سيتم جلبها من API
  const [client] = useState({
    id: clientId,
    name: 'Al-Rajhi Family',
    phone: '0501234567',
  });

  const [payments] = useState<Payment[]>([
    {
      id: 'P001',
      type: 'deposit',
      typeLabel: 'عربون',
      dueDate: '2024-09-01',
      paidDate: '2024-09-01',
      amount: 50000,
      method: 'HyperPay',
      status: 'Paid',
      reference: 'HP-9921',
      receiptUrl: '/receipts/p001.pdf',
      bookingId: 'B001',
      bookingName: 'حفل زفاف - MAVERA 1',
    },
    {
      id: 'P002',
      type: 'installment',
      typeLabel: 'دفعة أولى',
      dueDate: '2024-10-01',
      paidDate: '2024-10-01',
      amount: 50000,
      method: 'Bank Transfer',
      status: 'Paid',
      reference: 'BT-101',
      receiptUrl: '/receipts/p002.pdf',
      bookingId: 'B001',
      bookingName: 'حفل زفاف - MAVERA 1',
    },
    {
      id: 'P003',
      type: 'installment',
      typeLabel: 'دفعة ثانية',
      dueDate: '2024-10-10',
      amount: 42500,
      method: 'Mada',
      status: 'Pending',
      reference: 'MD-202',
      paymentLink: 'https://checkout.riyadbank.com/pay/token_abc123',
      bookingId: 'B001',
      bookingName: 'حفل زفاف - MAVERA 1',
    },
    {
      id: 'P004',
      type: 'addon',
      typeLabel: 'إضافة خدمات',
      dueDate: '2024-10-15',
      amount: 15000,
      status: 'Overdue',
      bookingId: 'B001',
      bookingName: 'حفل زفاف - MAVERA 1',
    },
    {
      id: 'P005',
      type: 'installment',
      typeLabel: 'دفعة نهائية',
      dueDate: '2024-11-01',
      amount: 30000,
      status: 'Pending',
      paymentLink: 'https://checkout.riyadbank.com/pay/token_xyz789',
      bookingId: 'B002',
      bookingName: 'حفل تخرج - MAVERA 2',
    },
  ]);

  const getStatusBadge = (status: string) => {
    let color = 'bg-gray-100 text-gray-500 border-gray-200';
    let icon = <Clock size={12} />;
    
    if (status === 'Paid') {
      color = 'bg-green-50 text-green-600 border-green-100';
      icon = <CheckCircle2 size={12} />;
    } else if (status === 'Pending') {
      color = 'bg-orange-50 text-orange-600 border-orange-100';
      icon = <Clock size={12} />;
    } else if (status === 'Overdue') {
      color = 'bg-red-50 text-red-600 border-red-100';
      icon = <AlertCircle size={12} />;
    }
    
    return (
      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border flex items-center gap-1 w-fit ${color}`}>
        {icon}
        {status === 'Paid' ? t('payments.paid') : status === 'Pending' ? t('payments.pending') : t('payments.overdue')}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    let color = 'bg-blue-50 text-blue-600 border-blue-100';
    
    if (type === 'deposit') {
      color = 'bg-purple-50 text-purple-600 border-purple-100';
    } else if (type === 'addon') {
      color = 'bg-amber-50 text-amber-600 border-amber-100';
    }
    
    return (
      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${color}`}>
        {type === 'deposit' ? t('payments.deposit') : type === 'installment' ? t('payments.installment') : t('payments.addon')}
      </span>
    );
  };

  const handleResendPaymentLink = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsPaymentLinkModalOpen(true);
  };

  const handleViewReceipt = (payment: Payment) => {
    if (payment.receiptUrl) {
      window.open(payment.receiptUrl, '_blank');
    } else {
      alert(t('payments.receiptNotAvailable'));
    }
  };

  const handleDownloadReceipt = (payment: Payment) => {
    if (payment.receiptUrl) {
      // في التطبيق الحقيقي، سيتم تحميل الملف من API
      alert(`${t('payments.downloadingReceipt')}: ${payment.id}`);
    } else {
      alert(t('payments.receiptNotAvailable'));
    }
  };

  const handleCopyPaymentLink = (link: string) => {
    navigator.clipboard.writeText(link);
    alert(t('payments.linkCopied'));
  };

  const totalPaid = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === 'Overdue').reduce((sum, p) => sum + p.amount, 0);
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  const paidPayments = payments.filter(p => p.status === 'Paid');
  const pendingPayments = payments.filter(p => p.status === 'Pending');
  const overduePayments = payments.filter(p => p.status === 'Overdue');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-mavera-navy">{t('payments.title')}</h1>
            <p className="text-gray-500 text-sm">{client.name} - {t('payments.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">{t('payments.totalAmount')}</p>
                <p className="text-2xl font-bold text-mavera-navy">{totalAmount.toLocaleString()} SAR</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <DollarSign size={24} className="text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">{t('payments.totalPaid')}</p>
                <p className="text-2xl font-bold text-green-600">{totalPaid.toLocaleString()} SAR</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle2 size={24} className="text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">{t('payments.totalPending')}</p>
                <p className="text-2xl font-bold text-orange-600">{totalPending.toLocaleString()} SAR</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                <Clock size={24} className="text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">{t('payments.totalOverdue')}</p>
                <p className="text-2xl font-bold text-red-600">{totalOverdue.toLocaleString()} SAR</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <AlertCircle size={24} className="text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Payments Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-mavera-navy flex items-center gap-2">
              <DollarSign size={20} />
              {t('payments.allPayments')} ({payments.length})
            </h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[1000px]">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4 text-start">{t('payments.paymentId')}</th>
                  <th className="px-6 py-4 text-start">{t('payments.type')}</th>
                  <th className="px-6 py-4 text-start">{t('payments.booking')}</th>
                  <th className="px-6 py-4 text-start">{t('payments.dueDate')}</th>
                  <th className="px-6 py-4 text-start">{t('payments.amount')}</th>
                  <th className="px-6 py-4 text-start">{t('payments.method')}</th>
                  <th className="px-6 py-4 text-start">{t('payments.status')}</th>
                  <th className="px-6 py-4 text-end">{t('payments.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-gray-400">{payment.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      {getTypeBadge(payment.type)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-mavera-navy text-xs">{payment.bookingName}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{payment.bookingId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-gray-600 font-medium">{payment.dueDate}</span>
                        {payment.paidDate && (
                          <span className="text-xs text-gray-400">{t('payments.paidOn')}: {payment.paidDate}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-mavera-navy">{payment.amount.toLocaleString()} SAR</span>
                    </td>
                    <td className="px-6 py-4">
                      {payment.method ? (
                        <span className="text-gray-600">{payment.method}</span>
                      ) : (
                        <span className="text-gray-400 text-xs">{t('payments.notPaid')}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="px-6 py-4 text-end">
                      <div className="flex items-center justify-end gap-2">
                        {payment.status === 'Paid' && payment.receiptUrl && (
                          <>
                            <button
                              onClick={() => handleViewReceipt(payment)}
                              className="p-2 text-gray-400 hover:text-mavera-gold hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                              title={t('payments.viewReceipt')}
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => handleDownloadReceipt(payment)}
                              className="p-2 text-gray-400 hover:text-mavera-gold hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                              title={t('payments.downloadReceipt')}
                            >
                              <Download size={18} />
                            </button>
                          </>
                        )}
                        {payment.status === 'Paid' && payment.receiptUrl && (
                          <span className="px-2 py-1 text-xs text-green-600 bg-green-50 rounded-lg border border-green-100 flex items-center gap-1">
                            <Receipt size={14} />
                            {t('payments.receiptAvailable')}
                          </span>
                        )}
                        {payment.status !== 'Paid' && payment.paymentLink && (
                          <>
                            <button
                              onClick={() => handleResendPaymentLink(payment)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-mavera-gold text-white rounded-lg text-xs font-bold hover:bg-mavera-goldHover transition-colors opacity-0 group-hover:opacity-100"
                              title={t('payments.resendLink')}
                            >
                              <Send size={14} />
                              {t('payments.resend')}
                            </button>
                            <button
                              onClick={() => handleCopyPaymentLink(payment.paymentLink!)}
                              className="p-2 text-gray-400 hover:text-mavera-gold hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                              title={t('payments.copyLink')}
                            >
                              <Copy size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Link Modal */}
      {selectedPayment && (
        <PaymentLinkModal
          isOpen={isPaymentLinkModalOpen}
          onClose={() => {
            setIsPaymentLinkModalOpen(false);
            setSelectedPayment(null);
          }}
          invoice={{
            id: selectedPayment.id,
            client: client.name,
            amount: selectedPayment.amount,
          }}
        />
      )}
    </div>
  );
};

export default ClientPaymentsPage;

