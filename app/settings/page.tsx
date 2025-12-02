"use client";

import React, { useState } from 'react';
import { Settings, Building, CreditCard, Bell, Globe, Key, Save } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'company' | 'payment' | 'notification' | 'system' | 'integration'>('company');

  const [companySettings, setCompanySettings] = useState({
    name: 'Mavera Luxury Events',
    nameAr: 'مافيرا للفعاليات الفاخرة',
    logo: '',
    address: 'Riyadh, Saudi Arabia',
    addressAr: 'الرياض، المملكة العربية السعودية',
    taxNumber: '300000000000003',
    phone: '+966 50 123 4567',
    email: 'info@mavera.sa'
  });

  const [paymentSettings, setPaymentSettings] = useState({
    defaultDepositPercentage: 30,
    currency: 'SAR',
    stripeEnabled: false,
    stripeApiKey: '',
    moyasarEnabled: true,
    moyasarApiKey: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    whatsappEnabled: true,
    emailEnabled: true,
    smsEnabled: false
  });

  const [systemSettings, setSystemSettings] = useState({
    dateFormat: 'DD/MM/YYYY',
    timezone: 'Asia/Riyadh'
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    nafathEnabled: true,
    nafathApiKey: '',
    erpEnabled: false,
    erpApiUrl: '',
    erpApiKey: ''
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-mavera-navy mb-2 flex items-center gap-3">
              <Settings size={32} className="text-mavera-gold" />
              System Settings
            </h1>
            <p className="text-gray-500">Configure your system preferences and integrations</p>
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-mavera-gold text-white rounded-xl font-bold hover:bg-mavera-goldHover flex items-center gap-2 transition-all shadow-lg shadow-mavera-gold/20"
          >
            <Save size={18} />
            Save All Changes
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {[
                { id: 'company', label: 'Company Settings', icon: <Building size={20} /> },
                { id: 'payment', label: 'Payment Settings', icon: <CreditCard size={20} /> },
                { id: 'notification', label: 'Notification Settings', icon: <Bell size={20} /> },
                { id: 'system', label: 'System Settings', icon: <Globe size={20} /> },
                { id: 'integration', label: 'Integration Settings', icon: <Key size={20} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left px-6 py-4 flex items-center gap-3 border-b border-gray-100 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-mavera-gold/10 text-mavera-gold border-l-4 border-l-mavera-gold font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              {/* Company Settings */}
              {activeTab === 'company' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-mavera-navy mb-4">Company Information</h2>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-2 block">Company Name (English)</label>
                        <input
                          type="text"
                          value={companySettings.name}
                          onChange={(e) => setCompanySettings({ ...companySettings, name: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-2 block">Company Name (Arabic)</label>
                        <input
                          type="text"
                          value={companySettings.nameAr}
                          onChange={(e) => setCompanySettings({ ...companySettings, nameAr: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none"
                          dir="rtl"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-2 block">Address</label>
                        <input
                          type="text"
                          value={companySettings.address}
                          onChange={(e) => setCompanySettings({ ...companySettings, address: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-2 block">Tax Number</label>
                        <input
                          type="text"
                          value={companySettings.taxNumber}
                          onChange={(e) => setCompanySettings({ ...companySettings, taxNumber: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-2 block">Phone</label>
                        <input
                          type="tel"
                          value={companySettings.phone}
                          onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none font-mono"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-2 block">Email</label>
                        <input
                          type="email"
                          value={companySettings.email}
                          onChange={(e) => setCompanySettings({ ...companySettings, email: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Settings */}
              {activeTab === 'payment' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-mavera-navy mb-4">Payment Configuration</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-2 block">Default Deposit Percentage</label>
                        <input
                          type="number"
                          value={paymentSettings.defaultDepositPercentage}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, defaultDepositPercentage: Number(e.target.value) })}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none"
                          min="0"
                          max="100"
                        />
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="font-bold text-gray-900 mb-4">Payment Gateways</h3>
                        
                        <div className="space-y-4">
                          <div className="p-4 border border-gray-200 rounded-xl">
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-bold text-gray-900">Moyasar</span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={paymentSettings.moyasarEnabled}
                                  onChange={(e) => setPaymentSettings({ ...paymentSettings, moyasarEnabled: e.target.checked })}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mavera-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mavera-gold"></div>
                              </label>
                            </div>
                            <input
                              type="text"
                              placeholder="API Key"
                              value={paymentSettings.moyasarApiKey}
                              onChange={(e) => setPaymentSettings({ ...paymentSettings, moyasarApiKey: e.target.value })}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none font-mono text-sm"
                              disabled={!paymentSettings.moyasarEnabled}
                            />
                          </div>

                          <div className="p-4 border border-gray-200 rounded-xl">
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-bold text-gray-900">Stripe</span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={paymentSettings.stripeEnabled}
                                  onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeEnabled: e.target.checked })}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mavera-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mavera-gold"></div>
                              </label>
                            </div>
                            <input
                              type="text"
                              placeholder="API Key"
                              value={paymentSettings.stripeApiKey}
                              onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeApiKey: e.target.value })}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none font-mono text-sm"
                              disabled={!paymentSettings.stripeEnabled}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notification' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-mavera-navy mb-4">Notification Channels</h2>
                  <div className="space-y-4">
                    {[
                      { key: 'whatsappEnabled', label: 'WhatsApp Notifications', description: 'Send booking and payment notifications via WhatsApp' },
                      { key: 'emailEnabled', label: 'Email Notifications', description: 'Send email notifications to clients and staff' },
                      { key: 'smsEnabled', label: 'SMS Notifications', description: 'Send SMS reminders and updates' }
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div>
                          <h3 className="font-bold text-gray-900">{setting.label}</h3>
                          <p className="text-sm text-gray-500 mt-1">{setting.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                            onChange={(e) => setNotificationSettings({ ...notificationSettings, [setting.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mavera-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mavera-gold"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* System Settings */}
              {activeTab === 'system' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-mavera-navy mb-4">System Configuration</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Date Format</label>
                      <select
                        value={systemSettings.dateFormat}
                        onChange={(e) => setSystemSettings({ ...systemSettings, dateFormat: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Timezone</label>
                      <select
                        value={systemSettings.timezone}
                        onChange={(e) => setSystemSettings({ ...systemSettings, timezone: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none"
                      >
                        <option value="Asia/Riyadh">Asia/Riyadh (GMT+3)</option>
                        <option value="Asia/Dubai">Asia/Dubai (GMT+4)</option>
                        <option value="UTC">UTC (GMT+0)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Integration Settings */}
              {activeTab === 'integration' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-mavera-navy mb-4">External Integrations</h2>
                  
                  <div className="space-y-4">
                    <div className="p-6 border border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900">Nafath (National Authentication)</h3>
                          <p className="text-sm text-gray-500 mt-1">Digital signature and authentication</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={integrationSettings.nafathEnabled}
                            onChange={(e) => setIntegrationSettings({ ...integrationSettings, nafathEnabled: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mavera-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mavera-gold"></div>
                        </label>
                      </div>
                      <input
                        type="text"
                        placeholder="Nafath API Key"
                        value={integrationSettings.nafathApiKey}
                        onChange={(e) => setIntegrationSettings({ ...integrationSettings, nafathApiKey: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none font-mono text-sm"
                        disabled={!integrationSettings.nafathEnabled}
                      />
                    </div>

                    <div className="p-6 border border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900">ERP System</h3>
                          <p className="text-sm text-gray-500 mt-1">Enterprise resource planning integration</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={integrationSettings.erpEnabled}
                            onChange={(e) => setIntegrationSettings({ ...integrationSettings, erpEnabled: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mavera-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mavera-gold"></div>
                        </label>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="url"
                          placeholder="ERP API URL"
                          value={integrationSettings.erpApiUrl}
                          onChange={(e) => setIntegrationSettings({ ...integrationSettings, erpApiUrl: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none text-sm"
                          disabled={!integrationSettings.erpEnabled}
                        />
                        <input
                          type="text"
                          placeholder="ERP API Key"
                          value={integrationSettings.erpApiKey}
                          onChange={(e) => setIntegrationSettings({ ...integrationSettings, erpApiKey: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none font-mono text-sm"
                          disabled={!integrationSettings.erpEnabled}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;


