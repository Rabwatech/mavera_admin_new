
import React from 'react';
import { Database, Server, Activity, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

const SystemHealthBar: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white border-b border-gray-100 px-6 py-2 flex items-center justify-end gap-6 text-xs font-medium text-gray-500">
      <div className="flex items-center gap-2">
        <Database size={14} className="text-green-500" />
        <span>DB: <span className="text-green-600">Healthy</span></span>
      </div>
      <div className="flex items-center gap-2">
        <Server size={14} className="text-green-500" />
        <span>API: <span className="text-green-600">99.9%</span></span>
      </div>
      <div className="flex items-center gap-2">
        <ShieldCheck size={14} className="text-mavera-gold" />
        <span>Security: <span className="text-mavera-navy">Active</span></span>
      </div>
    </div>
  );
};

export default SystemHealthBar;
