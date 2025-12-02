"use client";

import React, { useState } from 'react';
import { 
  Search, RefreshCw, Download, CheckCircle, Clock, AlertTriangle, 
  PlusCircle, CreditCard, FileText, Check, Link as LinkIcon 
} from 'lucide-react';
import { useLanguage } from '../../../../lib/i18n';
import PaymentLinkModal from '../../../../components/PaymentLinkModal';
import PermissionGuard from '../../../../components/PermissionGuard';

interface Invoice {
  id: string;
  client: string;
  amount: number;
  due: string;
  status: 'Paid' | 'Unpaid' | 'Overdue' | 'Draft';
  method: string;
  erp: string;
  type?: 'STANDARD' | 'AMENDMENT';
  parentInvoiceId?: string;
  paymentDate?: string;
  overdueDays?: number;
}

const InvoicesPage: React.FC = () => {
  const { t, direction } = useLanguage();
  const [activeTab, setActiveTab] = useState('All');
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showAmendmentModal, setShowAmendmentModal] = useState(false);
  const [selectedForAmendment, setSelectedForAmendment] = useState<string | null>(null);

  // Mock Data with enhanced fields
  const invoices: Invoice[] = [
    { 
      id: 'INV-2024-001', 
      client: 'Al-Rajhi Wedding', 
      amount: 50000, 
      due: '2024-10-25', 
      status: 'Paid', 
      method: 'Mada', 
      erp: 'Synced',
      type: 'STANDARD',
      paymentDate: '2024-10-23'
    },
    { 
      id: 'INV-2024-001-A', 
      client: 'Al-Rajhi Wedding', 
      amount: 8000, 
      due: '2024-11-15', 
      status: 'Unpaid', 
      method: 'Pending', 
      erp: 'Pending',
      type: 'AMENDMENT',
      parentInvoiceId: 'INV-2024-001'
    },
    { 
      id: 'INV-2024-002', 
      client: 'Golden Gala', 
      amount: 15000, 
      due: '2024-11-01', 
      status: 'Unpaid', 
      method: 'Pending', 
      erp: 'Pending',
      type: 'STANDARD'
    },
    { 
      id: 'INV-2024-003', 
      client: 'Fahad & Sara', 
      amount: 5000, 
      due: '2024-10-20', 
      status: 'Overdue', 
      method: 'Pending', 
      erp: 'Pending',
      type: 'STANDARD',
      overdueDays: 10
    },
    { 
      id: 'DRAFT-004', 
      client: 'Corp Event #44', 
      amount: 2500, 
      due: '-', 
      status: 'Draft', 
      method: '-', 
      erp: '-',
      type: 'STANDARD'
    }, 
  ];

  const filteredInvoices = activeTab === 'All' ? invoices : invoices.filter(inv => inv.status === activeTab);

  const handleCreateLink = (invoice: any) => {
    setSelectedInvoice(invoice);
  };

  const handleCreateAmendment = (invoiceId: string) => {
    setSelectedForAmendment(invoiceId);
    setShowAmendmentModal(true);
  };

  const handleMarkAsPaid = (invoiceId: string) => {
    if (confirm('Mark this invoice as paid manually?')) {
      alert(`Invoice ${invoiceId} marked as paid manually`);
      // Here you would update the invoice status
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid': return <span className="bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded text-xs font-bold border border-emerald-100 flex items-center gap-1 w-fit"><CheckCircle size={12}/> Paid</span>;
      case 'Unpaid': return <span className="bg-amber-50 text-amber-600 px-2.5 py-0.5 rounded text-xs font-bold border border-amber-100 flex items-center gap-1 w-fit"><Clock size={12}/> Unpaid</span>;
      case 'Overdue': return <span className="bg-rose-50 text-rose-600 px-2.5 py-0.5 rounded text-xs font-bold border border-rose-100 flex items-center gap-1 w-fit"><AlertTriangle size={12}/> Overdue</span>;
      case 'Draft': return <span className="bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded text-xs font-bold border border-gray-200 flex items-center gap-1 w-fit">Draft Add-on</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div>
         <h1 className="text-2xl font-bold text-mavera-navy">{t('nav.invoices')}</h1>
         <p className="text-gray-500 text-sm">Revenue operations and payment gateway links.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
         <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 flex gap-1 w-full sm:w-auto overflow-x-auto">
            {['All', 'Unpaid', 'Paid', 'Overdue', 'Draft'].map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab ? 'bg-mavera-navy text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`}
               >
                 {tab}
               </button>
            ))}
         </div>
         
         <div className="flex gap-2 w-full sm:w-auto">
            <PermissionGuard permission="finance.create_invoice">
               <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm font-bold hover:border-mavera-gold hover:text-mavera-navy transition-colors whitespace-nowrap">
                  <PlusCircle size={16} />
                  Manual Entry
               </button>
            </PermissionGuard>
            <div className="relative flex-1 sm:w-64">
                <input 
                  type="text" 
                  placeholder="Search Invoice #..." 
                  className={`w-full py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-mavera-gold ${direction === 'rtl' ? 'pl-10 pr-4' : 'pl-4 pr-10'}`}
                />
                <Search size={16} className={`absolute top-2.5 text-gray-400 ${direction === 'rtl' ? 'left-3' : 'right-3'}`} />
            </div>
         </div>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[1200px]">
               <thead className="bg-gray-50 text-gray-500 font-medium">
                  <tr>
                     <th className="px-6 py-4 text-start">Invoice #</th>
                     <th className="px-6 py-4 text-start">Client</th>
                     <th className="px-6 py-4 text-start">Type</th>
                     <th className="px-6 py-4 text-start">Amount</th>
                     <th className="px-6 py-4 text-start">Due Date</th>
                     <th className="px-6 py-4 text-start">Payment Method</th>
                     <th className="px-6 py-4 text-start">Payment Date</th>
                     <th className="px-6 py-4 text-start">Status</th>
                     <th className="px-6 py-4 text-start">ERP Sync</th>
                     <th className="px-6 py-4 text-end">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {filteredInvoices.map(inv => (
                     <tr key={inv.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                          <span className="font-mono font-bold text-gray-600">{inv.id}</span>
                          {inv.parentInvoiceId && (
                            <div className="flex items-center gap-1 mt-1">
                              <LinkIcon size={10} className="text-gray-400" />
                              <span className="text-[10px] text-gray-400 font-mono">{inv.parentInvoiceId}</span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 font-bold text-mavera-navy">{inv.client}</td>
                        <td className="px-6 py-4">
                          {inv.type === 'AMENDMENT' ? (
                            <span className="px-2 py-0.5 bg-purple-50 text-purple-600 border border-purple-200 rounded text-xs font-bold">
                              Amendment
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-200 rounded text-xs font-bold">
                              Standard
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 font-mono text-mavera-navy">{inv.amount.toLocaleString()} SAR</td>
                        <td className="px-6 py-4 text-gray-500">{inv.due}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600 font-medium">{inv.method}</span>
                        </td>
                        <td className="px-6 py-4">
                          {inv.paymentDate ? (
                            <span className="text-sm text-gray-600">{new Date(inv.paymentDate).toLocaleDateString()}</span>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                           {getStatusBadge(inv.status)}
                           {inv.overdueDays && inv.status === 'Overdue' && (
                             <span className="text-[10px] text-red-600 block mt-1 font-bold">
                               {inv.overdueDays} days overdue
                             </span>
                           )}
                        </td>
                        <td className="px-6 py-4">
                           {inv.erp === 'Synced' ? (
                              <span className="text-emerald-600 text-xs font-bold flex items-center gap-1"><RefreshCw size={12}/> Synced</span>
                           ) : (
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400 text-xs flex items-center gap-1"><Clock size={12}/> Pending</span>
                                {/* Permission Guard for Manual Sync */}
                                <PermissionGuard permission="finance.sync_erp">
                                   <button className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold hover:bg-blue-100">Sync</button>
                                </PermissionGuard>
                              </div>
                           )}
                        </td>
                        <td className="px-6 py-4 text-end">
                           <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <PermissionGuard permission="finance.manage_invoices">
                                 {inv.status === 'Paid' && inv.type === 'STANDARD' && (
                                   <button
                                     onClick={() => handleCreateAmendment(inv.id)}
                                     className="flex items-center gap-1 px-3 py-1.5 text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-xs font-bold"
                                     title="Create Amendment Invoice"
                                   >
                                     <FileText size={14} /> Amendment
                                   </button>
                                 )}
                                 {(inv.status === 'Unpaid' || inv.status === 'Overdue') && (
                                   <>
                                     <button 
                                        onClick={() => handleCreateLink(inv)}
                                        className="flex items-center gap-1 px-3 py-1.5 text-mavera-gold bg-mavera-gold/10 rounded-lg hover:bg-mavera-gold hover:text-white transition-colors text-xs font-bold" 
                                        title="Generate Payment Link"
                                     >
                                        <CreditCard size={14} /> Link
                                     </button>
                                     <button
                                       onClick={() => handleMarkAsPaid(inv.id)}
                                       className="flex items-center gap-1 px-3 py-1.5 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-xs font-bold"
                                       title="Mark as Paid Manually"
                                     >
                                       <Check size={14} /> Mark Paid
                                     </button>
                                   </>
                                 )}
                              </PermissionGuard>
                              <button className="p-2 text-gray-400 hover:text-mavera-navy bg-gray-50 hover:bg-gray-200 rounded-lg transition-colors" title="Download PDF">
                                 <Download size={16} />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      <PaymentLinkModal 
         isOpen={!!selectedInvoice} 
         onClose={() => setSelectedInvoice(null)} 
         invoice={selectedInvoice} 
      />

      {/* Amendment Invoice Modal */}
      {showAmendmentModal && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => setShowAmendmentModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-xl font-bold text-mavera-navy">Create Amendment Invoice</h2>
                <p className="text-sm text-gray-500 mt-1">Add additional costs to contract {selectedForAmendment}</p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">Description</label>
                  <input
                    type="text"
                    placeholder="e.g., Additional decorations"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">Amount (SAR)</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">Due Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
                  />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={() => setShowAmendmentModal(false)}
                  className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Amendment invoice created!');
                    setShowAmendmentModal(false);
                  }}
                  className="px-6 py-2.5 bg-mavera-gold text-white rounded-xl font-bold hover:bg-mavera-goldHover transition-all"
                >
                  Create Amendment
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InvoicesPage;