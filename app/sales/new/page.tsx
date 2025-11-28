"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Calendar, Users, Building2, FileSignature } from 'lucide-react';
import { PaymentInstallment } from '../../../types';
import { analyzeQuoteRisk } from '../../../services/geminiService';
import PaymentPlanBuilder from '../../../components/PaymentPlanBuilder';
import BookingWizardSteps from '../../../components/BookingWizardSteps';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../../lib/i18n';

const SalesBooking: React.FC = () => {
  const router = useRouter();
  const { t, direction } = useLanguage();
  
  // Wizard State
  const [step, setStep] = useState(1);
  
  // Step 1: Event Data
  const [eventDate, setEventDate] = useState('');
  const [hall, setHall] = useState('');
  const [guests, setGuests] = useState(0);

  // Step 2: Pricing
  const [totalPackagePrice, setTotalPackagePrice] = useState<number>(50000);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(50000);

  // Step 3: Payment
  const [installments, setInstallments] = useState<PaymentInstallment[]>([
    { id: '1', name: 'Deposit', dueDate: '', percentage: 30, amount: 0 }
  ]);
  const [hasSplitPayment, setHasSplitPayment] = useState(false);

  // AI State
  const [aiAnalysis, setAiAnalysis] = useState<{ loading: boolean; result: any | null }>({ loading: false, result: null });

  useEffect(() => {
    const calculatedFinal = totalPackagePrice - (totalPackagePrice * (discountPercent / 100));
    setFinalPrice(calculatedFinal);
  }, [totalPackagePrice, discountPercent]);

  useEffect(() => {
    setInstallments(prev => prev.map(inst => ({
      ...inst,
      amount: Math.round(finalPrice * (inst.percentage / 100))
    })));
  }, [finalPrice]);

  const needsApproval = discountPercent > 5;
  const isPercentageValid = installments.reduce((sum, item) => sum + item.percentage, 0) === 100;

  const handleAnalyzeRisk = async () => {
    if (finalPrice <= 0) return;
    setAiAnalysis({ loading: true, result: null });
    const result = await analyzeQuoteRisk(finalPrice, discountPercent, installments);
    setAiAnalysis({ loading: false, result });
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-32 animate-fade-in">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => router.push('/sales-dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-mavera-navy transition-colors text-sm">
          {direction === 'rtl' ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {t('booking.back')}
        </button>
        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-gray-500 text-sm font-medium shadow-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-mavera-gold animate-pulse"></span>
          WIZARD MODE
        </div>
      </div>

      <div className="mb-12">
        <BookingWizardSteps currentStep={step} />
      </div>

      <div className="min-h-[400px]">
        {/* STEP 1: EVENT & HALL */}
        {step === 1 && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-in">
              <div className="space-y-6">
                 <h2 className="text-2xl font-bold text-mavera-navy">{t('wiz.step1')}</h2>
                 
                 <div className="space-y-4">
                    <div>
                       <label className="block text-sm font-bold text-gray-500 mb-2">{t('wiz.date')}</label>
                       <div className="relative">
                          <input 
                             type="date" 
                             value={eventDate}
                             onChange={(e) => setEventDate(e.target.value)}
                             className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-mavera-gold transition-colors"
                          />
                          <Calendar className={`absolute top-3.5 text-gray-400 ${direction === 'rtl' ? 'left-4' : 'right-4'}`} size={18} />
                       </div>
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-gray-500 mb-2">{t('wiz.guests')}</label>
                       <div className="relative">
                          <input 
                             type="number" 
                             value={guests || ''}
                             onChange={(e) => setGuests(Number(e.target.value))}
                             className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-mavera-gold transition-colors"
                             placeholder="0"
                          />
                          <Users className={`absolute top-3.5 text-gray-400 ${direction === 'rtl' ? 'left-4' : 'right-4'}`} size={18} />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <label className="block text-sm font-bold text-gray-500 mb-2">{t('wiz.hall')}</label>
                 <div className="grid grid-cols-1 gap-4">
                    {['Mavera Hall A', 'Mavera Hall B', 'Grand Garden'].map((h) => (
                       <div 
                          key={h}
                          onClick={() => setHall(h)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${hall === h ? 'border-mavera-gold bg-amber-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                       >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${hall === h ? 'bg-mavera-gold text-white' : 'bg-gray-100 text-gray-400'}`}>
                             <Building2 size={20} />
                          </div>
                          <div>
                             <h4 className={`font-bold ${hall === h ? 'text-mavera-navy' : 'text-gray-600'}`}>{h}</h4>
                             <p className="text-xs text-gray-400">Capacity: 500 Guests</p>
                          </div>
                          {hall === h && <CheckCircle2 size={20} className="text-mavera-gold ms-auto" />}
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        )}

        {/* STEP 2: PRICING */}
        {step === 2 && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-in">
              <div className="space-y-6">
                 <h2 className="text-2xl font-bold text-mavera-navy">{t('wiz.step2')}</h2>
                 
                 <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100">
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">{t('booking.basePrice')} (SAR)</label>
                    <div className="relative mb-6">
                       <input 
                         type="number" 
                         value={totalPackagePrice}
                         onChange={(e) => setTotalPackagePrice(Number(e.target.value))}
                         className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono text-xl font-bold text-mavera-navy outline-none focus:ring-2 focus:ring-mavera-gold/20" 
                       />
                       <span className={`absolute top-3.5 text-gray-400 text-sm font-medium ${direction === 'rtl' ? 'left-4' : 'right-4'}`}>SAR</span>
                    </div>

                    <div className="flex justify-between items-center mb-2">
                       <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">{t('booking.discount')}</label>
                       {needsApproval && (
                         <span className="text-[10px] text-red-600 font-bold bg-red-50 px-2 py-1 rounded border border-red-100 animate-pulse">
                           {t('booking.approvalReq')}
                         </span>
                       )}
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative w-32">
                           <input 
                             type="number" 
                             value={discountPercent}
                             onChange={(e) => setDiscountPercent(Number(e.target.value))}
                             className={`w-full bg-white border-2 rounded-xl px-4 py-2 font-mono text-lg font-bold outline-none text-center ${needsApproval ? 'border-red-200 text-red-600' : 'border-gray-100 text-mavera-navy'}`} 
                             max="100"
                           />
                           <span className={`absolute top-3 text-gray-400 text-sm ${direction === 'rtl' ? 'left-3' : 'right-3'}`}>%</span>
                        </div>
                        <input 
                           type="range" 
                           min="0" 
                           max="20" 
                           value={discountPercent} 
                           onChange={(e) => setDiscountPercent(Number(e.target.value))}
                           className="flex-1 accent-mavera-gold h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div className="bg-mavera-navy p-4 rounded-xl text-white">
                      <div className="flex justify-between items-center">
                         <span className="text-gray-300 text-sm font-medium">{t('booking.finalTotal')}</span>
                         <span className="text-2xl font-bold text-mavera-gold">{finalPrice.toLocaleString()} <span className="text-sm text-white">SAR</span></span>
                      </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider">Additional Services</h3>
                 {['Coffee Service', 'VIP Dinner', 'Valet Parking', 'Lighting Package'].map(svc => (
                    <label key={svc} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
                       <input type="checkbox" className="w-5 h-5 accent-mavera-gold rounded" />
                       <span className="font-medium text-mavera-navy">{svc}</span>
                       <span className="ms-auto text-xs text-gray-400 font-mono">+1,500 SAR</span>
                    </label>
                 ))}
              </div>
           </div>
        )}

        {/* STEP 3: PAYMENT */}
        {step === 3 && (
           <div className="animate-slide-in">
              <PaymentPlanBuilder 
                 installments={installments}
                 totalAmount={finalPrice}
                 onUpdate={setInstallments}
                 hasSplitPayment={hasSplitPayment}
                 onToggleSplitPayment={setHasSplitPayment}
              />
           </div>
        )}

        {/* STEP 4: CONTRACT */}
        {step === 4 && (
           <div className="max-w-3xl mx-auto text-center space-y-8 animate-slide-in">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <FileSignature size={32} />
              </div>
              <h2 className="text-3xl font-bold text-mavera-navy">Ready to Generate Contract</h2>
              <p className="text-gray-500">Review the summary below before sending to Nafath.</p>

              <div className="bg-white p-8 rounded-2xl shadow-luxury text-start grid grid-cols-2 gap-y-6 gap-x-12">
                 <div>
                    <span className="text-xs text-gray-400 uppercase font-bold">Client</span>
                    <p className="font-bold text-mavera-navy text-lg">Ahmed Al-Fahad</p>
                 </div>
                 <div>
                    <span className="text-xs text-gray-400 uppercase font-bold">Event</span>
                    <p className="font-bold text-mavera-navy text-lg">{hall} • {eventDate}</p>
                 </div>
                 <div>
                    <span className="text-xs text-gray-400 uppercase font-bold">Total Value</span>
                    <p className="font-bold text-mavera-gold text-2xl">{finalPrice.toLocaleString()} SAR</p>
                 </div>
                 <div>
                    <span className="text-xs text-gray-400 uppercase font-bold">Payment Plan</span>
                    <p className="font-bold text-gray-700">{installments.length} Installments</p>
                 </div>
              </div>

              <div className="flex justify-center">
                 <button className="bg-mavera-gold hover:bg-mavera-goldHover text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-mavera-gold/30 flex items-center gap-3 transition-all transform hover:scale-105">
                    <CheckCircle2 size={24} />
                    {t('wiz.createAccount')}
                 </button>
              </div>
           </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className={`max-w-6xl mx-auto flex justify-between items-center ${direction === 'rtl' ? 'md:pr-64' : 'md:pl-64'}`}>
           <button 
             onClick={prevStep} 
             disabled={step === 1}
             className="px-6 py-2 text-gray-500 font-bold hover:bg-gray-50 rounded-lg disabled:opacity-30 transition-colors"
           >
             {t('wiz.prev')}
           </button>
           
           {step < 4 && (
             <button 
               onClick={nextStep}
               className="bg-mavera-navy hover:bg-mavera-navyLight text-white px-8 py-2.5 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2"
             >
               <span>{t('wiz.next')}</span>
               {direction === 'rtl' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
             </button>
           )}
        </div>
      </div>

    </div>
  );
};

export default SalesBooking;