"use client";

import React from 'react';
import { CheckCircle, AlertCircle, Server, CreditCard, PenTool, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../../../lib/i18n';
import PermissionGuard from '../../../../components/PermissionGuard';

const FinanceIntegrations: React.FC = () => {
  const { t } = useLanguage();

  const systems = [
    { 
       id: 'erp', 
       name: 'Oracle NetSuite', 
       type: 'ERP / Accounting', 
       status: 'Healthy', 
       lastSync: '2 mins ago', 
       icon: <Server size={24} />,
       color: 'blue'
    },
    { 
       id: 'payment', 
       name: 'Riyad Bank Gateway', 
       type: 'Payment Gateway', 
       status: 'Healthy', 
       lastSync: 'Online', 
       icon: <CreditCard size={24} />,
       color: 'emerald'
    },
    { 
       id: 'nafath', 
       name: 'Nafath', 
       type: 'National IAM', 
       status: 'Service Issues', 
       lastSync: '10 mins ago', 
       icon: <PenTool size={24} />,
       color: 'amber'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
       <div>
         <h1 className="text-2xl font-bold text-mavera-navy">External Integrations Hub</h1>
         <p className="text-gray-500 text-sm">Monitor system health and 3rd party connections.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {systems.map(sys => (
            <div key={sys.id} className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 relative overflow-hidden group">
               <div className={`absolute top-0 right-0 w-24 h-24 bg-${sys.color}-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110`}></div>
               
               <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-${sys.color}-50 text-${sys.color}-600 flex items-center justify-center mb-4`}>
                     {sys.icon}
                  </div>
                  
                  <h3 className="font-bold text-mavera-navy text-lg">{sys.name}</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-6">{sys.type}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                     <div className="flex items-center gap-2">
                        {sys.status === 'Healthy' ? (
                           <CheckCircle size={16} className="text-emerald-500" />
                        ) : (
                           <AlertCircle size={16} className="text-amber-500" />
                        )}
                        <span className={`text-sm font-bold ${sys.status === 'Healthy' ? 'text-emerald-600' : 'text-amber-600'}`}>
                           {sys.status}
                        </span>
                     </div>
                     <span className="text-xs text-gray-400">{sys.lastSync}</span>
                  </div>

                  <PermissionGuard permission="finance.manage_integrations">
                     <button className="w-full mt-4 bg-gray-50 hover:bg-gray-100 text-gray-600 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                        <RefreshCw size={14} />
                        Test Connection
                     </button>
                  </PermissionGuard>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default FinanceIntegrations;