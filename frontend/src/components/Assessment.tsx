import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { ProgressBar } from './ProgressBar';
import { WelcomeStep } from './assessment/WelcomeStep';
import { LifestyleStep } from './assessment/LifestyleStep';
import { HousingStep } from './assessment/HousingStep';
import { CommuteStep } from './assessment/CommuteStep';
import { PrioritiesStep } from './assessment/PrioritiesStep';

interface AssessmentProps {
  onComplete: (preferences: UserPreferences) => void;
}

const initialPreferences: UserPreferences = {
  commute: {
    maxTime: 45,
    transportModes: ['Namma Metro'],
    workLocation: ''
  },
  lifestyle: {
    walkability: 3,
    nightlife: 3,
    dining: 3,
    shopping: 3,
    outdoorActivities: 3,
    familyFriendly: 3,
    quietness: 3
  },
  housing: {
    maxBudget: 25000,
    housingType: ['Apartment'],
    minBedrooms: 1
  },
  demographics: {
    ageRange: '25-35',
    incomeRange: '8L-15L',
    education: 'Bachelor\'s'
  },
  priorities: {
    safety: 3,
    schools: 3,
    culture: 3,
    diversity: 3,
    greenSpace: 3,
    publicTransit: 3
  }
};

export const Assessment: React.FC<AssessmentProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(preferences);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUpdate = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={handleNext} />;
      case 1:
        return (
          <LifestyleStep
            preferences={preferences}
            onUpdate={handleUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <HousingStep
            preferences={preferences}
            onUpdate={handleUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <CommuteStep
            preferences={preferences}
            onUpdate={handleUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <PrioritiesStep
            preferences={preferences}
            onUpdate={handleUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 pt-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-8 bg-white dark:bg-gray-900 dark:text-white rounded-xl shadow-md transition-colors duration-300">
        {currentStep > 0 && (
          <div className="mb-8">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>
        )}
        
        {renderStep()}
      </div>
    </div>
  );
};