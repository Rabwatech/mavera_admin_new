
import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

interface BookingWizardStepsProps {
  currentStep: number;
}

const BookingWizardSteps: React.FC<BookingWizardStepsProps> = ({ currentStep }) => {
  const { t } = useLanguage();

  const steps = [
    { id: 1, label: t('wiz.step1') },
    { id: 2, label: t('wiz.step2') },
    { id: 3, label: t('wiz.step3') },
    { id: 4, label: t('wiz.step4') },
  ];

  return (
    <div className="w-full">
      <div className="relative flex justify-between">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-mavera-gold -z-10 transform -translate-y-1/2 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 bg-[#F9FAFB] px-2">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCompleted ? 'bg-mavera-gold text-white scale-110' : 
                  isActive ? 'bg-mavera-navy text-white ring-4 ring-blue-100 scale-110' : 
                  'bg-white border-2 border-gray-200 text-gray-400'
                }`}
              >
                {isCompleted ? <Check size={16} /> : step.id}
              </div>
              <span className={`text-xs font-medium whitespace-nowrap transition-colors ${isActive ? 'text-mavera-navy font-bold' : 'text-gray-400'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingWizardSteps;
