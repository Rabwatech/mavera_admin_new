"use client";

import React from 'react';
import { TrendingUp, Users, ArrowUpRight, Activity, FileText, Settings, UserPlus } from 'lucide-react';
import SystemHealthBar from '../../components/SystemHealthBar';
import { useLanguage } from '../../lib/i18n';
import { useRouter } from 'next/navigation';

const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const activities = [
    { user: 'Ahmed (Sales)', action: 'Created a new quote for Al-Fahad Wedding', time: '10 mins ago', type: 'sales' },
    { user: 'Sarah (Coord)', action: 'Uploaded floor plan for Event #2049', time: '32 mins ago', type: 'ops' },
    { user: 'System', action: 'Daily backup completed successfully', time: '2 hours ago', type: 'system' },
    { user: 'Fatima (Finance)', action: 'Approved discount request #9921', time: '3 hours ago', type: 'finance' },
  ];

  return (
    <div className="flex flex-col h-full animate-fade-in pb-10 space-y-6">
      <SystemHealthBar />

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-mavera-navy">{t('admin.dashboardTitle')}</h1>
        <p className="text-gray-500 text-sm">{t('admin.dashboardSubtitle')}</p>
      </div>

      {/* Hero KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Revenue Card - Navy */}
        <div className="bg-mavera-navy text-white rounded-2xl p-6 shadow-luxury relative overflow-hidden group">
          <div className={`absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110`}></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <TrendingUp size={20} className="text-mavera-gold" />
              </div>
              <span className="text-xs font-medium bg-green-500/20 text-green-300 px-2 py-0.5 rounded flex items-center gap-1">
                <ArrowUpRight size={12} /> +15%
              </span>
            </div>
            <p className="text-gray-400 text-xs uppercase tracking-wider font-medium mb-1">{t('admin.kpiRevenue')}</p>
            <h3 className="text-3xl font-bold">845,000 <span className="text-sm font-normal text-gray-400">SAR</span></h3>
          </div>
        </div>

        {/* Pipeline Card - Gold */}
        <div className="bg-gradient-to-br from-mavera-gold to-amber-500 text-white rounded-2xl p-6 shadow-luxury relative overflow-hidden group">
           <div className={`absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-5 -mb-5 transition-transform group-hover:scale-110`}></div>
           <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Activity size={20} className="text-white" />
              </div>
            </div>
            <p className="text-white/80 text-xs uppercase tracking-wider font-medium mb-1">{t('admin.kpiPipeline')}</p>
            <h3 className="text-3xl font-bold">1.2M <span className="text-sm font-normal text-white/70">SAR</span></h3>
            <p className="text-xs text-white/80 mt-2">12 Active Deals</p>
          </div>
        </div>

        {/* NPS Card - White */}
        <div className="bg-white text-mavera-navy rounded-2xl p-6 shadow-card border border-gray-100 group hover:border-blue-100 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Users size={20} />
              </div>
              <span className="text-xs font-bold text-gray-400">NPS Score</span>
            </div>
            <p className="text-gray-400 text-xs uppercase tracking-wider font-medium mb-1">{t('admin.kpiSatisfaction')}</p>
            <h3 className="text-3xl font-bold">9.2 <span className="text-sm font-normal text-gray-400">/ 10</span></h3>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
               <div className="bg-blue-500 h-full w-[92%] rounded-full"></div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-card border border-gray-100 p-6">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-mavera-navy">{t('admin.recentActivity')}</h3>
              <button className="text-xs text-mavera-gold font-bold hover:underline">View All</button>
           </div>
           <div className="space-y-6">
              {activities.map((act, idx) => (
                 <div key={idx} className="flex gap-4 items-start group">
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                       act.type === 'sales' ? 'bg-mavera-gold' : 
                       act.type === 'finance' ? 'bg-green-500' :
                       act.type === 'system' ? 'bg-gray-400' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1 pb-6 border-b border-gray-50 group-last:border-0 group-last:pb-0">
                       <p className="text-sm text-mavera-navy font-medium"><span className="font-bold">{act.user}</span> {act.action}</p>
                       <p className="text-xs text-gray-400 mt-1">{act.time}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Action Center */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
           <h3 className="font-bold text-mavera-navy mb-6">{t('admin.actionCenter')}</h3>
           <div className="grid grid-cols-1 gap-3">
              <button onClick={() => router.push('/users')} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all text-start group">
                 <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UserPlus size={18} />
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-700 text-sm">{t('admin.inviteUser')}</h4>
                    <p className="text-xs text-gray-400">Add new staff member</p>
                 </div>
              </button>
              
              <button onClick={() => router.push('/reports')} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all text-start group">
                 <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText size={18} />
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-700 text-sm">{t('admin.viewReports')}</h4>
                    <p className="text-xs text-gray-400">Export monthly data</p>
                 </div>
              </button>

              <button className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all text-start group">
                 <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Settings size={18} />
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-700 text-sm">{t('nav.settings')}</h4>
                    <p className="text-xs text-gray-400">System configuration</p>
                 </div>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;