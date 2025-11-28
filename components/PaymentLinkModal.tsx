
import React, { useState, useEffect } from 'react';
import { X, Copy, CheckCircle, Smartphone, Loader2 } from 'lucide-react';

interface PaymentLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: any;
}

const PaymentLinkModal: React.FC<PaymentLinkModalProps> = ({ isOpen, onClose, invoice }) => {
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState('');

  useEffect(() => {
    if (isOpen && invoice) {
      setLoading(true);
      // Simulate API Call to Payment Gateway
      const timer = setTimeout(() => {
        setLink(`https://checkout.riyadbank.com/pay/token_${Math.random().toString(36).substr(2, 9)}`);
        setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, invoice]);

  if (!isOpen || !invoice) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert('Payment link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
       <div className="absolute inset-0 bg-mavera-navy/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
       
       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
             <h3 className="font-bold text-mavera-navy">Payment Link</h3>
             <button onClick={onClose} className="p-1 text-gray-400 hover:text-red-500"><X size={20} /></button>
          </div>
          
          <div className="p-8 text-center min-h-[300px] flex flex-col justify-center">
             {loading ? (
               <div className="flex flex-col items-center gap-4">
                  <Loader2 size={48} className="text-mavera-gold animate-spin" />
                  <p className="text-gray-500 font-medium">Contacting Riyad Bank Gateway...</p>
               </div>
             ) : (
               <div className="animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-mavera-navy mb-1">{invoice.client}</h4>
                  <p className="text-gray-500 text-sm mb-6">Amount Due: <span className="font-bold text-mavera-navy">{invoice.amount.toLocaleString()} SAR</span></p>

                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-3 mb-6">
                      <code className="flex-1 text-xs text-gray-600 font-mono truncate">{link}</code>
                      <button onClick={handleCopy} className="p-2 text-mavera-gold hover:bg-white rounded-lg transition-colors shadow-sm">
                        <Copy size={16} />
                      </button>
                  </div>

                  <div className="flex gap-3">
                      <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all">
                        <Smartphone size={18} />
                        Send via WhatsApp
                      </button>
                  </div>
               </div>
             )}
          </div>
       </div>
    </div>
  );
};

export default PaymentLinkModal;
