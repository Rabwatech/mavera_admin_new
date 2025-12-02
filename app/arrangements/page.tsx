"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FileText, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../lib/i18n';

const Arrangements: React.FC = () => {
  const router = useRouter();
  const { t, direction } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto min-h-[80vh] flex flex-col gap-8 p-8">
      
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-mavera-navy">{t('arr.title')}</h1>
        <p className="text-gray-500">{t('arr.subtitle')}</p>
      </div>
      
      {/* Redirect Card */}
      <div className="bg-gradient-to-br from-mavera-gold/10 to-mavera-navy/10 rounded-2xl border-2 border-mavera-gold/30 p-12 text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <FileText size={40} className="text-mavera-gold" />
        </div>
        <h2 className="text-2xl font-bold text-mavera-navy mb-4">Enhanced Arrangements Management</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          We've upgraded the arrangements page with powerful new features including vendor tracking, 
          client approval via Nafath, and detailed arrangement forms.
        </p>
        <button
          onClick={() => router.push('/arrangements/enhanced')}
          className="px-8 py-4 bg-mavera-gold text-white rounded-xl font-bold hover:bg-mavera-goldHover flex items-center gap-3 mx-auto transition-all shadow-lg shadow-mavera-gold/20"
        >
          Go to Enhanced Arrangements
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Features Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <FileText size={24} className="text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Detailed Forms</h3>
          <p className="text-sm text-gray-600">Complete arrangement forms with all event details</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <FileText size={24} className="text-green-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Vendor Tracking</h3>
          <p className="text-sm text-gray-600">Track and manage all assigned vendors</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <FileText size={24} className="text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Client Approval</h3>
          <p className="text-sm text-gray-600">Get client approval via Nafath integration</p>
        </div>
      </div>
    </div>
  );
};

export default Arrangements;