"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Legend, Cell } from 'recharts';
import { Download, Calendar } from 'lucide-react';
import { useLanguage } from '../../lib/i18n';

const ReportsPage: React.FC = () => {
  const { t } = useLanguage();

  // Mock Data
  const salesData = [
    { name: 'Jan', revenue: 400000, target: 450000 },
    { name: 'Feb', revenue: 300000, target: 450000 },
    { name: 'Mar', revenue: 550000, target: 450000 },
    { name: 'Apr', revenue: 480000, target: 500000 },
    { name: 'May', revenue: 600000, target: 500000 },
    { name: 'Jun', revenue: 845000, target: 500000 },
  ];

  const sourceData = [
    { name: 'Instagram', value: 45, color: '#E1306C' },
    { name: 'Google Search', value: 25, color: '#4285F4' },
    { name: 'Referral', value: 20, color: '#0F9D58' },
    { name: 'Walk-in', value: 10, color: '#F4B400' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
         <div>
            <h1 className="text-2xl font-bold text-mavera-navy">{t('reports.title')}</h1>
            <p className="text-gray-500 text-sm">{t('reports.subtitle')}</p>
         </div>
         <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-gray-600 hover:text-mavera-navy hover:border-mavera-gold transition-colors text-sm font-medium">
               <Calendar size={16} /> Last 6 Months
            </button>
            <button className="flex items-center gap-2 bg-mavera-navy text-white px-4 py-2 rounded-xl hover:bg-mavera-navyLight transition-colors text-sm font-medium shadow-lg">
               <Download size={16} /> Export PDF
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Revenue Trend Chart */}
         <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100">
            <h3 className="font-bold text-mavera-navy mb-6">Revenue Trend</h3>
            <div className="h-80 w-full text-xs">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                     <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                           <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} tickFormatter={(val) => `${val/1000}k`} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} 
                        itemStyle={{ color: '#1A2940', fontWeight: 'bold' }}
                     />
                     <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Lead Sources Pie Chart */}
         <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100">
            <h3 className="font-bold text-mavera-navy mb-6">Lead Sources</h3>
            <div className="h-80 w-full flex items-center justify-center">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={5}
                        dataKey="value"
                     >
                        {sourceData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Pie>
                     <Tooltip contentStyle={{ borderRadius: '12px' }} />
                     <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>
      
      {/* Operational Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
            { label: 'Conversion Rate', val: '18%', sub: '+2% vs last month', color: 'green' },
            { label: 'Avg Deal Size', val: '72k SAR', sub: '-5% vs last month', color: 'red' },
            { label: 'Total Events', val: '145', sub: 'Year to date', color: 'blue' },
            { label: 'Pending Collections', val: '230k', sub: 'Due within 30 days', color: 'orange' },
         ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
               <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-2">{stat.label}</p>
               <h4 className="text-2xl font-bold text-mavera-navy">{stat.val}</h4>
               <p className={`text-xs mt-1 font-medium ${stat.color === 'green' ? 'text-green-600' : stat.color === 'red' ? 'text-red-500' : 'text-gray-400'}`}>
                  {stat.sub}
               </p>
            </div>
         ))}
      </div>
    </div>
  );
};

export default ReportsPage;