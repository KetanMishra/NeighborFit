import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentStep, 
  totalSteps, 
  className = '' 
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-gray-700 flex items-center space-x-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          <span>Step {currentStep} of {totalSteps}</span>
        </span>
        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
          {Math.round(progress)}% Complete
        </span>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 h-3 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
          </div>
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-between absolute -top-1 w-full">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                index < currentStep
                  ? 'bg-blue-500 border-blue-500 scale-110'
                  : index === currentStep
                  ? 'bg-white border-blue-500 animate-pulse'
                  : 'bg-gray-200 border-gray-300'
              }`}
            >
              {index < currentStep && (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};