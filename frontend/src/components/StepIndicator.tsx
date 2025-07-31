import React from 'react';
import { useAppContext } from '../context/AppContext';

const StepIndicator: React.FC = () => {
  const { currentStep, totalSteps } = useAppContext();

  return (
    <div className="flex items-center space-x-4">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <React.Fragment key={step}>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step <= currentStep ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            {step}
          </div>
          {step < totalSteps && <div className="flex-1 h-0.5 bg-gray-200"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
