"use client";

import React from 'react';
import { DollarSign, FileClock, Activity, ArrowUpRight, Plus, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../../lib/i18n';
import TransactionFeed from '../../../components/TransactionFeed';
import PermissionGuard from '../../../components/PermissionGuard';
import { useRouter } from 'next/navigation';

const FinanceDashboard: React.FC = () => {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Header */}
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-2xl font-bold text-mavera-navy">{t('nav.financeDashboard')}</h1>
            <p className="text-gray-500 text-sm">Financial Pulse & Operations.</p>
         </div>
         <div className="flex gap-3">
            <PermissionGuard permission="finance.sync_erp">
               <button className="bg-white border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:border-mavera-gold hover:text-mavera-navy transition-colors">
                  <RefreshCw size={16} />
                  {t('fin.reconcile')}
               </button>
            </PermissionGuard>
            
            <PermissionGuard permission="finance.create_invoice">
               <button 
                  onClick={() => router.push('/admin/finance/invoices')}
                  className="bg-mavera-gold text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-mavera-gold/20 hover:bg-mavera-goldHover transition-colors"
               >
                  <Plus size={16} />
                  {t('fin.manualInv')}
               </button>
            </PermissionGuard>
         </div>
      </div>

      {/* Hero Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Cash In */}
         <div className="bg-white p-6 rounded-2xl shadow-card border border-transparent hover:border-mavera-gold/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-green-50 text-green-600 rounded-xl group-hover:bg-green-100 transition-colors">
                  <DollarSign size={24} />
               </div>
               <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase">Today</span>
            </div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{t('fin.cashIn')}</p>
            <h3 className="text-3xl font-bold text-mavera-navy">45,200 <span className="text-sm font-normal text-gray-400">SAR</span></h3>
            <div className="flex items-center gap-1 text-xs text-green-600 font-bold mt-2">
               <ArrowUpRight size={12} />
               <span>+12% vs yesterday</span>
            </div>
         </div>

         {/* Pending Invoices */}
         <div className="bg-white p-6 rounded-2xl shadow-card border border-transparent hover:border-orange-100 transition-all group">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-orange-50 text-orange-500 rounded-xl group-hover:bg-orange-100 transition-colors">
                  <FileClock size={24} />
               </div>
               <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase">Active</span>
            </div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{t('fin.pendingInv')}</p>
            <h3 className="text-3xl font-bold text-mavera-navy">128,500 <span className="text-sm font-normal text-gray-400">SAR</span></h3>
            <p className="text-xs text-gray-400 mt-2">15 invoices sent</p>
         </div>

         {/* ERP Sync Status */}
         <div className="bg-mavera-navy text-white p-6 rounded-2xl shadow-luxury relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                     <Activity size={24} className="text-mavera-gold" />
                  </div>
                  <span className="flex items-center gap-1.5 bg-green-500/20 text-green-300 px-2.5 py-1 rounded-lg text-xs font-bold border border-green-500/30">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                     {t('fin.healthy')}
                  </span>
               </div>
               <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{t('fin.erpStatus')}</p>
               <h3 className="text-xl font-bold">Oracle NetSuite</h3>
               <p className="text-xs text-gray-500 mt-2">Last Sync: 2 mins ago</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Action Center */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
              <h3 className="font-bold text-mavera-navy mb-4">Action Center</h3>
              <div className="grid grid-cols-2 gap-4">
                 <PermissionGuard permission="finance.create_invoice">
                    <button className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-mavera-gold hover:bg-amber-50 transition-all text-start group">
                       <div className="w-10 h-10 rounded-lg bg-mavera-gold/10 text-mavera-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Plus size={20} />
                       </div>
                       <div>
                          <h4 className="font-bold text-mavera-navy text-sm">Create Manual Invoice</h4>
                          <p className="text-xs text-gray-500">For offline payments</p>
                       </div>
                    </button>
                 </PermissionGuard>

                 <PermissionGuard permission="finance.sync_erp">
                    <button className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all text-start group">
                       <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <RefreshCw size={20} />
                       </div>
                       <div>
                          <h4 className="font-bold text-mavera-navy text-sm">Reconcile Payments</h4>
                          <p className="text-xs text-gray-500">Sync Gateway vs ERP</p>
                       </div>
                    </button>
                 </PermissionGuard>
              </div>
            </div>

            {/* Analytics Placeholder */}
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <DollarSign size={32} className="text-gray-300" />
               </div>
               <h3 className="text-lg font-bold text-gray-400">Cash Flow Analytics</h3>
               <p className="text-sm text-gray-300">Live chart visualization</p>
            </div>
         </div>

         {/* Transaction Feed */}
         <div className="lg:col-span-1">
            <TransactionFeed />
         </div>
      </div>

    </div>
  );
};

export default FinanceDashboard;