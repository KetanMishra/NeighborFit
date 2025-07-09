import React from 'react';
import { SliderInput } from '../SliderInput';

interface LifestyleStepProps {
  preferences: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const LifestyleStep: React.FC<LifestyleStepProps> = ({
  preferences,
  onUpdate,
  onNext,
  onBack
}) => {
  const handleSliderChange = (key: string, value: number) => {
    onUpdate({
      lifestyle: {
        ...preferences.lifestyle,
        [key]: value
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          Lifestyle Preferences
        </h2>
        <p className="text-gray-600">
          Help us understand what matters most to you in your daily life
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
        <SliderInput
          label="Walkability"
          value={preferences.lifestyle?.walkability || 3}
          onChange={(value) => handleSliderChange('walkability', value)}
          description="How important is it to walk to daily needs?"
        />

        <SliderInput
          label="Nightlife & Entertainment"
          value={preferences.lifestyle?.nightlife || 3}
          onChange={(value) => handleSliderChange('nightlife', value)}
          description="Access to bars, clubs, and evening entertainment"
        />

        <SliderInput
          label="Dining Options"
          value={preferences.lifestyle?.dining || 3}
          onChange={(value) => handleSliderChange('dining', value)}
          description="Variety of restaurants and food choices"
        />

        <SliderInput
          label="Shopping Access"
          value={preferences.lifestyle?.shopping || 3}
          onChange={(value) => handleSliderChange('shopping', value)}
          description="Proximity to retail stores and shopping centers"
        />

        <SliderInput
          label="Outdoor Activities"
          value={preferences.lifestyle?.outdoorActivities || 3}
          onChange={(value) => handleSliderChange('outdoorActivities', value)}
          description="Parks, trails, and outdoor recreation opportunities"
        />

        <SliderInput
          label="Family-Friendly Environment"
          value={preferences.lifestyle?.familyFriendly || 3}
          onChange={(value) => handleSliderChange('familyFriendly', value)}
          description="Kid-friendly amenities and family activities"
        />

        <SliderInput
          label="Quiet Environment"
          value={preferences.lifestyle?.quietness || 3}
          onChange={(value) => handleSliderChange('quietness', value)}
          description="Low noise levels and peaceful atmosphere"
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
          Continue
        </button>
      </div>
    </div>
  );
};