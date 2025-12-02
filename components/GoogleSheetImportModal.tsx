"use client";

import React, { useState } from 'react';
import { X, Link as LinkIcon, Download, Check, AlertCircle, Loader } from 'lucide-react';

interface GoogleSheetData {
  name: string;
  phone: string;
  email?: string;
  source?: string;
  notes?: string;
}

interface GoogleSheetImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: GoogleSheetData[]) => void;
}

const GoogleSheetImportModal: React.FC<GoogleSheetImportModalProps> = ({ isOpen, onClose, onImport }) => {
  const [sheetUrl, setSheetUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<GoogleSheetData[]>([]);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'input' | 'preview'>('input');

  if (!isOpen) return null;

  const handleFetchData = async () => {
    setError('');
    setIsLoading(true);
    
    // Simulate API call to fetch Google Sheet data
    setTimeout(() => {
      // Mock data - in production, this would call a backend API
      const mockData: GoogleSheetData[] = [
        { name: 'Omar Al-Rashid', phone: '+966 50 555 1111', email: 'omar@example.com', source: 'Instagram', notes: 'Interested in December dates' },
        { name: 'Sara Mohammed', phone: '+966 55 666 2222', email: 'sara@example.com', source: 'Google', notes: 'Budget: 50K SAR' },
        { name: 'Khalid Ahmed', phone: '+966 54 777 3333', email: 'khalid@example.com', source: 'Referral', notes: 'Looking for Grand Hall' },
      ];
      
      setPreviewData(mockData);
      setStep('preview');
      setIsLoading(false);
    }, 1500);
  };

  const handleImport = () => {
    onImport(previewData);
    setSheetUrl('');
    setPreviewData([]);
    setStep('input');
    onClose();
  };

  const handleCancel = () => {
    setSheetUrl('');
    setPreviewData([]);
    setStep('input');
    setError('');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={handleCancel} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-mavera-navy flex items-center gap-2">
                <LinkIcon size={24} className="text-mavera-gold" />
                Import from Google Sheet
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Paste your Google Sheet URL and review data before importing
              </p>
            </div>
            <button onClick={handleCancel} className="text-gray-400 hover:text-red-500 transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {step === 'input' && (
              <div className="space-y-6">
                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h3 className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2">
                    <AlertCircle size={16} />
                    How to prepare your Google Sheet
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li>Make sure the sheet is publicly accessible (Anyone with link can view)</li>
                    <li>First row should contain headers: Name, Phone, Email, Source, Notes</li>
                    <li>Data should start from row 2</li>
                  </ul>
                </div>

                {/* URL Input */}
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">
                    Google Sheet URL
                  </label>
                  <input
                    type="url"
                    value={sheetUrl}
                    onChange={(e) => setSheetUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none text-sm"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
                    {error}
                  </div>
                )}
              </div>
            )}

            {step === 'preview' && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm text-green-800 font-medium flex items-center gap-2">
                    <Check size={16} />
                    Found {previewData.length} leads. Review and confirm to import.
                  </p>
                </div>

                {/* Preview Table */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Phone</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Source</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {previewData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 font-mono" dir="ltr">{row.phone}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{row.email || '-'}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                              {row.source || 'Unknown'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center gap-3">
            <button
              onClick={handleCancel}
              className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            
            {step === 'input' ? (
              <button
                onClick={handleFetchData}
                disabled={!sheetUrl || isLoading}
                className="px-6 py-2.5 bg-mavera-gold text-white rounded-xl font-bold hover:bg-mavera-goldHover disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Fetching Data...
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    Fetch Data
                  </>
                )}
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setStep('input')}
                  className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleImport}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 flex items-center gap-2 transition-all"
                >
                  <Check size={18} />
                  Import {previewData.length} Leads
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleSheetImportModal;


