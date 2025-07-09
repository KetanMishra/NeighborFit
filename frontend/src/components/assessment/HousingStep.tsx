import React from 'react';

interface HousingStepProps {
  preferences: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const HousingStep: React.FC<HousingStepProps> = ({
  preferences,
  onUpdate,
  onNext,
  onBack
}) => {
  const handleInputChange = (key: string, value: any) => {
    onUpdate({
      housing: {
        ...preferences.housing,
        [key]: value
      }
    });
  };

  const handleHousingTypeChange = (type: string, checked: boolean) => {
    const current = preferences.housing?.housingType || [];
    const updated = checked 
      ? [...current, type]
      : current.filter((t: string) => t !== type);
    
    handleInputChange('housingType', updated);
  };

  const housingTypes = [
    'Apartment',
    'Independent House',
    'Villa',
    'Gated Community',
    'PG',
    'Studio',
    'Builder Floor'
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          Housing Preferences
        </h2>
        <p className="text-gray-600">
          Tell us about your housing needs and budget in Bangalore
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Maximum Monthly Budget (₹)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
            <input
              type="number"
              value={preferences.housing?.maxBudget || 25000}
              onChange={(e) => handleInputChange('maxBudget', Number(e.target.value))}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="35000"
            />
          </div>
          <p className="text-xs text-gray-500">
            Average rent in Bangalore ranges from ₹15,000 to ₹60,000+ per month
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Preferred Housing Types
          </label>
          <div className="grid grid-cols-2 gap-3">
            {housingTypes.map((type) => (
              <label key={type} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.housing?.housingType?.includes(type) || false}
                  onChange={(e) => handleHousingTypeChange(type, e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Minimum Bedrooms
          </label>
          <select
            value={preferences.housing?.minBedrooms || 1}
            onChange={(e) => handleInputChange('minBedrooms', Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={0}>Studio/1RK</option>
            <option value={1}>1 BHK</option>
            <option value={2}>2 BHK</option>
            <option value={3}>3 BHK</option>
            <option value={4}>4+ BHK</option>
          </select>
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