import React from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { NeighborhoodMatch } from '../../types';

interface CompareViewProps {
  matches: NeighborhoodMatch[];
  onBack: () => void;
  onRemove: (match: NeighborhoodMatch) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  matches,
  onBack,
  onRemove
}) => {
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const ComparisonTable = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Neighborhood
              </th>
              {matches.map((match) => (
                <th key={match.neighborhood.id} className="px-6 py-4 text-center min-w-48">
                  <div className="flex items-center justify-center space-x-2">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {match.neighborhood.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {match.neighborhood.city}, {match.neighborhood.state}
                      </div>
                    </div>
                    <button
                      onClick={() => onRemove(match)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Match Score */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Overall Match
              </td>
              {matches.map((match) => (
                <td key={match.neighborhood.id} className="px-6 py-4 whitespace-nowrap text-center">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    match.matchScore >= 80 ? 'bg-green-100 text-green-800' :
                    match.matchScore >= 60 ? 'bg-blue-100 text-blue-800' :
                    match.matchScore >= 40 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {match.matchScore}%
                  </div>
                </td>
              ))}
            </tr>

            {/* Monthly Rent */}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Monthly Rent
              </td>
              {matches.map((match) => (
                <td key={match.neighborhood.id} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {formatCurrency(match.neighborhood.housing.rentPrice)}
                </td>
              ))}
            </tr>

            {/* Safety Score */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Safety Score
              </td>
              {matches.map((match) => (
                <td key={match.neighborhood.id} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {match.neighborhood.safety.safetyScore}/100
                </td>
              ))}
            </tr>

            {/* Walk Score */}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Walk Score
              </td>
              {matches.map((match) => (
                <td key={match.neighborhood.id} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {match.neighborhood.amenities.walkScore}/100
                </td>
              ))}
            </tr>

            {/* Transit Score */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Transit Score
              </td>
              {matches.map((match) => (
                <td key={match.neighborhood.id} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {match.neighborhood.amenities.transitScore}/100
                </td>
              ))}
            </tr>

            {/* Population */}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Population
              </td>
              {matches.map((match) => (
                <td key={match.neighborhood.id} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {(match.neighborhood.demographics.population / 1000).toFixed(0)}K
                </td>
              ))}
            </tr>

            {/* Median Income */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Median Income
              </td>
              {matches.map((match) => (
                <td key={match.neighborhood.id} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {formatCurrency(match.neighborhood.demographics.medianIncome)}
                </td>
              ))}
            </tr>

            {/* Restaurants */}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Restaurants
              </td>
              {matches.map((match) => (
                <td key={match.neighborhood.id} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {match.neighborhood.amenities.restaurants}
                </td>
              ))}
            </tr>

            {/* Parks */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Parks
              </td>
              {matches.map((match) => (
                <td key={match.neighborhood.id} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {match.neighborhood.amenities.parks}
                </td>
              ))}
            </tr>

            {/* Schools */}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Schools
              </td>
              {matches.map((match) => (
                <td key={match.neighborhood.id} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {match.neighborhood.amenities.schools}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Results</span>
          </button>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Neighborhood Comparison
            </h1>
            <p className="text-gray-600">
              Comparing {matches.length} Bangalore neighborhoods side by side
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <ComparisonTable />

        {/* Match Breakdown Charts */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <div key={match.neighborhood.id} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {match.neighborhood.name}
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Lifestyle</span>
                  <span className="text-sm font-medium">{match.matchBreakdown.lifestyle}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${match.matchBreakdown.lifestyle}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Housing</span>
                  <span className="text-sm font-medium">{match.matchBreakdown.housing}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${match.matchBreakdown.housing}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Commute</span>
                  <span className="text-sm font-medium">{match.matchBreakdown.commute}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${match.matchBreakdown.commute}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Priorities</span>
                  <span className="text-sm font-medium">{match.matchBreakdown.priorities}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${match.matchBreakdown.priorities}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};