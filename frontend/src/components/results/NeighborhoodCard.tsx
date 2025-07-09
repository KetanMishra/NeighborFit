import React, { useState } from 'react';
import { MapPin, IndianRupee, Star, TrendingUp, Users, Shield, Eye, BarChart3, MessageSquare } from 'lucide-react';
import { NeighborhoodMatch } from '../../types';

interface NeighborhoodCardProps {
  match: NeighborhoodMatch;
  onViewDetails: (match: NeighborhoodMatch) => void;
  onCompare: (match: NeighborhoodMatch) => void;
  isComparing?: boolean;
}

export const NeighborhoodCard: React.FC<NeighborhoodCardProps> = ({
  match,
  onViewDetails,
  onCompare,
  isComparing = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { neighborhood, matchScore, matchBreakdown, pros, cons } = match;

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getMatchText = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Poor Match';
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const getNeighborhoodImage = (name: string) => {
    const images = {
      'HSR Layout': 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Koramangala': 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Indiranagar': 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Whitefield': 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
      'JP Nagar': 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Electronic City': 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Malleshwaram': 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400',
      'BTM Layout': 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400'
    };
    return images[name as keyof typeof images] || 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=400';
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={getNeighborhoodImage(neighborhood.name)}
          alt={neighborhood.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${getMatchColor(matchScore)} transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
          {matchScore}% Match
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold mb-1">
            {neighborhood.name}
          </h3>
          <div className="flex items-center text-white/80">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{neighborhood.city}, {neighborhood.state}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Match Score Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Match</span>
            <span className={`text-sm font-medium ${getMatchColor(matchScore).split(' ')[0]}`}>
              {getMatchText(matchScore)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                matchScore >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                matchScore >= 60 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                matchScore >= 40 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                'bg-gradient-to-r from-red-400 to-red-600'
              }`}
              style={{ 
                width: isHovered ? `${matchScore}%` : '0%',
                transitionDelay: '200ms'
              }}
            />
          </div>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg transition-all duration-300 hover:bg-green-100">
            <IndianRupee className="w-4 h-4 text-green-600" />
            <div>
              <div className="text-sm font-medium text-gray-900">
                {formatCurrency(neighborhood.housing.rentPrice)}
              </div>
              <div className="text-xs text-gray-500">Monthly Rent</div>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg transition-all duration-300 hover:bg-blue-100">
            <Shield className="w-4 h-4 text-blue-600" />
            <div>
              <div className="text-sm font-medium text-gray-900">
                {neighborhood.safety.safetyScore}/100
              </div>
              <div className="text-xs text-gray-500">Safety Score</div>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg transition-all duration-300 hover:bg-purple-100">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <div>
              <div className="text-sm font-medium text-gray-900">
                {neighborhood.amenities.walkScore}/100
              </div>
              <div className="text-xs text-gray-500">Walk Score</div>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg transition-all duration-300 hover:bg-orange-100">
            <Users className="w-4 h-4 text-orange-600" />
            <div>
              <div className="text-sm font-medium text-gray-900">
                {(neighborhood.demographics.population / 1000).toFixed(0)}K
              </div>
              <div className="text-xs text-gray-500">Population</div>
            </div>
          </div>
        </div>

        {/* Community Reviews Preview */}
        {neighborhood.experienceStats && (
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Community Says</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-700">
                  {neighborhood.experienceStats.averageRating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-500">
                  ({neighborhood.experienceStats.totalReviews})
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-600">
              {neighborhood.experienceStats.recommendationRate}% would recommend • 
              {neighborhood.experienceStats.verifiedResidentPercentage}% verified residents
            </div>
          </div>
        )}

        {/* Match Breakdown with Animation */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <BarChart3 className="w-4 h-4 mr-1" />
            Match Breakdown
          </h4>
          <div className="space-y-2">
            {[
              { label: 'Lifestyle', value: matchBreakdown.lifestyle, color: 'bg-blue-500' },
              { label: 'Housing', value: matchBreakdown.housing, color: 'bg-green-500' },
              { label: 'Commute', value: matchBreakdown.commute, color: 'bg-purple-500' },
              { label: 'Priorities', value: matchBreakdown.priorities, color: 'bg-orange-500' }
            ].map((item, index) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-xs text-gray-600 w-16">{item.label}</span>
                <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ease-out ${item.color}`}
                    style={{ 
                      width: isHovered ? `${item.value}%` : '0%',
                      transitionDelay: `${300 + index * 100}ms`
                    }}
                  />
                </div>
                <span className="text-xs font-medium w-8 text-right">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pros and Cons */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          <div>
            <h4 className="text-sm font-medium text-green-700 mb-2">✓ Highlights</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {pros.slice(0, 2).map((pro, index) => (
                <li key={index} className="flex items-center animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          {cons.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-amber-700 mb-2">⚠ Considerations</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                {cons.slice(0, 1).map((con, index) => (
                  <li key={index} className="flex items-center animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <span className="w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetails(match)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-sm flex items-center justify-center space-x-2 group"
          >
            <Eye className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            <span>View Details</span>
          </button>
          <button
            onClick={() => onCompare(match)}
            className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center space-x-1 ${
              isComparing
                ? 'bg-green-100 text-green-700 border border-green-300 scale-105'
                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:scale-105'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{isComparing ? 'Added' : 'Compare'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};