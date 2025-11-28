import React from 'react';
import { Plus, Trash2, AlertTriangle, Coins } from 'lucide-react';
import { PaymentInstallment } from '../types';
import { useLanguage } from '../lib/i18n';

interface PaymentPlanBuilderProps {
  installments: PaymentInstallment[];
  totalAmount: number;
  onUpdate: (installments: PaymentInstallment[]) => void;
  hasSplitPayment: boolean;
  onToggleSplitPayment: (value: boolean) => void;
}

const PaymentPlanBuilder: React.FC<PaymentPlanBuilderProps> = ({
  installments,
  totalAmount,
  onUpdate,
  hasSplitPayment,
  onToggleSplitPayment
}) => {
  const { t, direction } = useLanguage();
  const totalPercentage = installments.reduce((sum, item) => sum + item.percentage, 0);
  const isPercentageValid = totalPercentage === 100;

  const handleUpdateInstallment = (id: string, field: keyof PaymentInstallment, value: any) => {
    const updated = installments.map(inst => {
      if (inst.id !== id) return inst;
      
      if (field === 'percentage') {
        const newPct = Number(value);
        return { 
          ...inst, 
          percentage: newPct, 
          amount: Math.round(totalAmount * (newPct / 100)) 
        };
      }
      return { ...inst, [field]: value };
    });
    onUpdate(updated);
  };

  const handleAddInstallment = () => {
    const remainingPct = 100 - totalPercentage;
    const newInstallment: PaymentInstallment = {
      id: Date.now().toString(),
      name: `Installment ${installments.length + 1}`,
      dueDate: '',
      percentage: remainingPct > 0 ? remainingPct : 0,
      amount: Math.round(totalAmount * ((remainingPct > 0 ? remainingPct : 0) / 100))
    };
    onUpdate([...installments, newInstallment]);
  };

  const handleRemoveInstallment = (id: string) => {
    onUpdate(installments.filter(i => i.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-card border border-transparent h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-50 pb-4 gap-4">
        <div className="flex items-center gap-2">
           <div className="p-2 bg-mavera-gold/10 rounded-lg text-mavera-gold">
              <Coins size={20} />
           </div>
           <h2 className="text-lg font-bold text-mavera-navy">{t('booking.paymentSchedule')}</h2>
        </div>
        
        <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
           <label className="text-xs text-gray-600 font-medium cursor-pointer" onClick={() => onToggleSplitPayment(!hasSplitPayment)}>{t('booking.splitPayment')}</label>
           <button 
             onClick={() => onToggleSplitPayment(!hasSplitPayment)}
             className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 ${hasSplitPayment ? 'bg-mavera-gold' : 'bg-gray-300'}`}
           >
             <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${hasSplitPayment ? (direction === 'rtl' ? '-translate-x-[20px]' : 'translate-x-[20px]') : 'translate-x-0'}`}></div>
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto rounded-xl border border-gray-100 mb-4">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="py-3 px-4 text-start font-medium w-1/3">Milestone</th>
              <th className="py-3 px-4 text-start font-medium">Due Date</th>
              <th className="py-3 px-4 text-start font-medium w-24">%</th>
              <th className="py-3 px-4 text-start font-medium w-32">Amount (SAR)</th>
              <th className="py-3 px-4 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {installments.map((item) => (
              <tr key={item.id} className="group hover:bg-gray-50 transition-colors">
                <td className="p-3">
                  <input 
                    type="text" 
                    value={item.name}
                    onChange={(e) => handleUpdateInstallment(item.id, 'name', e.target.value)}
                    className="w-full bg-transparent font-medium text-gray-700 outline-none focus:text-mavera-navy border-b border-transparent focus:border-mavera-gold/50 transition-colors"
                    placeholder="e.g. Deposit"
                  />
                </td>
                <td className="p-3">
                  <input 
                    type="date" 
                    value={item.dueDate}
                    onChange={(e) => handleUpdateInstallment(item.id, 'dueDate', e.target.value)}
                    className="w-full bg-transparent text-gray-600 outline-none focus:text-mavera-navy"
                  />
                </td>
                <td className="p-3">
                  <div className="relative">
                    <input 
                      type="number" 
                      value={item.percentage}
                      onChange={(e) => handleUpdateInstallment(item.id, 'percentage', e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-center font-bold text-mavera-navy focus:border-mavera-gold outline-none"
                    />
                  </div>
                </td>
                <td className="p-3">
                  <span className="font-mono text-gray-700 font-medium block text-end">
                    {item.amount.toLocaleString()}
                  </span>
                </td>
                <td className="p-3 text-center">
                   {installments.length > 1 && (
                      <button 
                        onClick={() => handleRemoveInstallment(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                   )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Controls */}
      <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-xl border border-gray-100">
         <button 
           onClick={handleAddInstallment}
           disabled={totalPercentage >= 100}
           className="flex items-center gap-2 text-mavera-navy text-sm font-bold hover:text-mavera-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
         >
           <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center">
             <Plus size={14} />
           </div>
           <span>{t('booking.addInstallment')}</span>
         </button>

         <div className="flex items-center gap-4">
            <div className={`text-lg font-bold ${isPercentageValid ? 'text-green-600' : 'text-mavera-navy'}`}>
               Total: <span className={!isPercentageValid ? 'text-red-500' : ''}>{totalPercentage}%</span>
            </div>
            {!isPercentageValid && (
              <div className="hidden sm:flex items-center gap-1 text-xs text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 animate-pulse">
                <AlertTriangle size={14} />
                <span>Must equal 100%</span>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default PaymentPlanBuilder;