import React from 'react';

interface CommuteStepProps {
  preferences: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const CommuteStep: React.FC<CommuteStepProps> = ({
  preferences,
  onUpdate,
  onNext,
  onBack
}) => {
  const handleInputChange = (key: string, value: any) => {
    onUpdate({
      commute: {
        ...preferences.commute,
        [key]: value
      }
    });
  };

  const handleTransportModeChange = (mode: string, checked: boolean) => {
    const current = preferences.commute?.transportModes || [];
    const updated = checked 
      ? [...current, mode]
      : current.filter((m: string) => m !== mode);
    
    handleInputChange('transportModes', updated);
  };

  const transportModes = [
    'Namma Metro',
    'BMTC Bus',
    'Two Wheeler',
    'Car/Cab',
    'Walking',
    'Cycling',
    'Auto Rickshaw'
  ];

  const workLocations = [
    'Electronic City',
    'Whitefield',
    'Koramangala',
    'HSR Layout',
    'Indiranagar',
    'MG Road',
    'Brigade Road',
    'Bannerghatta Road',
    'Outer Ring Road',
    'Sarjapur Road',
    'Hebbal',
    'Yeshwantpur'
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          Commute Preferences
        </h2>
        <p className="text-gray-600">
          How do you prefer to get around Bangalore?
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Maximum Commute Time (minutes)
          </label>
          <input
            type="number"
            value={preferences.commute?.maxTime || 45}
            onChange={(e) => handleInputChange('maxTime', Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="45"
          />
          <p className="text-xs text-gray-500">
            Average commute in Bangalore is 45-90 minutes
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Preferred Transportation Methods
          </label>
          <div className="space-y-2">
            {transportModes.map((mode) => (
              <label key={mode} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.commute?.transportModes?.includes(mode) || false}
                  onChange={(e) => handleTransportModeChange(mode, e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{mode}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Work Location (Optional)
          </label>
          <select
            value={preferences.commute?.workLocation || ''}
            onChange={(e) => handleInputChange('workLocation', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select work area</option>
            {workLocations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500">
            Help us find neighborhoods with good access to your work area
          </p>
        </div>
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