
import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

const TransactionFeed: React.FC = () => {
  const { t } = useLanguage();

  const transactions = [
    { id: 1, client: 'Al-Rajhi Family', amount: 50000, method: 'HyperPay', status: 'Success', time: '10 mins ago', ref: 'HP-9921' },
    { id: 2, client: 'Golden Gala', amount: 15000, method: 'Mada', status: 'Success', time: '1 hour ago', ref: 'HP-9920' },
    { id: 3, client: 'Fahad Wedding', amount: 5000, method: 'Visa', status: 'Success', time: '3 hours ago', ref: 'HP-9919' },
    { id: 4, client: 'Corp Event #44', amount: 25000, method: 'Bank Transfer', status: 'Pending', time: '5 hours ago', ref: 'BT-101' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 h-full">
      <h3 className="font-bold text-mavera-navy mb-6 flex justify-between items-center">
         {t('fin.recentTrans')}
         <button className="text-xs text-mavera-gold hover:underline">View All</button>
      </h3>
      <div className="space-y-6">
         {transactions.map((tx) => (
            <div key={tx.id} className="flex items-start justify-between group">
               <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.status === 'Success' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                     {tx.status === 'Success' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div>
                     <p className="text-sm font-bold text-mavera-navy">{tx.client}</p>
                     <p className="text-xs text-gray-400 mt-0.5">{tx.method} • {tx.time}</p>
                  </div>
               </div>
               <div className="text-end">
                  <p className="text-sm font-bold text-mavera-navy">{tx.amount.toLocaleString()} SAR</p>
                  <p className="text-[10px] text-gray-400 font-mono">{tx.ref}</p>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default TransactionFeed;
