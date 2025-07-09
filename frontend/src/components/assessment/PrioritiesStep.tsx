import React from 'react';
import { SliderInput } from '../SliderInput';

interface PrioritiesStepProps {
  preferences: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PrioritiesStep: React.FC<PrioritiesStepProps> = ({
  preferences,
  onUpdate,
  onNext,
  onBack
}) => {
  const handleSliderChange = (key: string, value: number) => {
    onUpdate({
      priorities: {
        ...preferences.priorities,
        [key]: value
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          Your Priorities
        </h2>
        <p className="text-gray-600">
          Rank the importance of these factors in your neighborhood choice
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
        <SliderInput
          label="Safety & Security"
          value={preferences.priorities?.safety || 3}
          onChange={(value) => handleSliderChange('safety', value)}
          description="Low crime rates and general safety"
        />

        <SliderInput
          label="School Quality"
          value={preferences.priorities?.schools || 3}
          onChange={(value) => handleSliderChange('schools', value)}
          description="Access to good schools and educational facilities"
        />

        <SliderInput
          label="Cultural Activities"
          value={preferences.priorities?.culture || 3}
          onChange={(value) => handleSliderChange('culture', value)}
          description="Museums, theaters, arts, and cultural events"
        />

        <SliderInput
          label="Diversity"
          value={preferences.priorities?.diversity || 3}
          onChange={(value) => handleSliderChange('diversity', value)}
          description="Multicultural community and diverse population"
        />

        <SliderInput
          label="Green Space"
          value={preferences.priorities?.greenSpace || 3}
          onChange={(value) => handleSliderChange('greenSpace', value)}
          description="Parks, trees, and natural areas"
        />

        <SliderInput
          label="Public Transit"
          value={preferences.priorities?.publicTransit || 3}
          onChange={(value) => handleSliderChange('publicTransit', value)}
          description="Access to buses, trains, and public transportation"
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Get My Results
        </button>
      </div>
    </div>
  );
};