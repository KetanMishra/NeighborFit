import React, { useState } from 'react';
import { NeighborhoodMatch } from '../../types';
import { NeighborhoodCard } from './NeighborhoodCard';
import { NeighborhoodDetail } from './NeighborhoodDetail';
import { CompareView } from './CompareView';
import { Filter, ArrowLeft, BarChart3, Sparkles, Trophy, Target } from 'lucide-react';

interface ResultsViewProps {
  matches: NeighborhoodMatch[];
  onBack: () => void;
  onRetakeAssessment: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  matches,
  onBack,
  onRetakeAssessment
}) => {
  const [selectedMatch, setSelectedMatch] = useState<NeighborhoodMatch | null>(null);
  const [compareList, setCompareList] = useState<NeighborhoodMatch[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [sortBy, setSortBy] = useState<'match' | 'price' | 'safety'>('match');

  const handleCompare = (match: NeighborhoodMatch) => {
    if (compareList.find(m => m.neighborhood.id === match.neighborhood.id)) {
      setCompareList(compareList.filter(m => m.neighborhood.id !== match.neighborhood.id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, match]);
    }
  };

  const sortedMatches = [...matches].sort((a, b) => {
    switch (sortBy) {
      case 'match':
        return b.matchScore - a.matchScore;
      case 'price':
        return a.neighborhood.housing.rentPrice - b.neighborhood.housing.rentPrice;
      case 'safety':
        return b.neighborhood.safety.safetyScore - a.neighborhood.safety.safetyScore;
      default:
        return 0;
    }
  });

  const getAverageScore = () => {
    return Math.round(matches.reduce((sum, match) => sum + match.matchScore, 0) / matches.length);
  };

  const getTopMatch = () => {
    return matches.reduce((prev, current) => (prev.matchScore > current.matchScore) ? prev : current);
  };

  if (showCompare && compareList.length > 0) {
    return (
      <CompareView
        matches={compareList}
        onBack={() => setShowCompare(false)}
        onRemove={(match) => setCompareList(compareList.filter(m => m.neighborhood.id !== match.neighborhood.id))}
      />
    );
  }

  const topMatch = getTopMatch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 pt-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Assessment</span>
          </button>
          
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl p-8 text-white mb-8 relative overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90 dark:from-gray-800/90 dark:via-gray-900/90 dark:to-gray-800/90"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="w-8 h-8 text-yellow-300 animate-bounce-slow" />
                <h1 className="text-4xl font-bold text-white dark:text-white">Your Perfect Matches</h1>
                <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1 text-white dark:text-white">{matches.length}</div>
                  <div className="text-blue-100 dark:text-blue-200">Neighborhoods Found</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1 text-white dark:text-white">{getAverageScore()}%</div>
                  <div className="text-blue-100 dark:text-blue-200">Average Match</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1 text-white dark:text-white">{topMatch.matchScore}%</div>
                  <div className="text-blue-100 dark:text-blue-200">Best Match</div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 dark:bg-white/5 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 dark:bg-white/10 rounded-full animate-bounce-slow"></div>
          </div>
          
          {/* Top Match Highlight */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 border border-green-200 dark:border-green-700 rounded-xl p-6 mb-6 animate-slide-up animation-delay-300 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <Target className="w-6 h-6 text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-200">
                    🎯 Top Recommendation: {topMatch.neighborhood.name}
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    {topMatch.matchScore}% match • Perfect for your lifestyle and budget
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMatch(topMatch)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105"
              >
                View Details
              </button>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              {compareList.length > 0 && (
                <button
                  onClick={() => setShowCompare(true)}
                  className="flex items-center space-x-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-4 py-2 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-all duration-300 hover:scale-105 animate-bounce-in"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Compare ({compareList.length})</span>
                </button>
              )}
            </div>
            
            <button
              onClick={onRetakeAssessment}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Retake Assessment
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6 animate-slide-up animation-delay-400 transition-colors duration-300">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Sort by:</span>
            </div>
            
            <div className="flex space-x-2">
              {[
                { value: 'match', label: 'Best Match', icon: '🎯' },
                { value: 'price', label: 'Price', icon: '💰' },
                { value: 'safety', label: 'Safety', icon: '🛡️' }
              ].map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    sortBy === option.value
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span>{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMatches.map((match, index) => (
            <div
              key={match.neighborhood.id}
              className="animate-slide-up"
              style={{ animationDelay: `${500 + index * 100}ms` }}
            >
              <NeighborhoodCard
                match={match}
                onViewDetails={setSelectedMatch}
                onCompare={handleCompare}
                isComparing={compareList.some(m => m.neighborhood.id === match.neighborhood.id)}
              />
            </div>
          ))}
        </div>

        {/* Compare Notice */}
        {compareList.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 animate-bounce-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <span className="text-green-800 font-medium">
                    {compareList.length} neighborhood{compareList.length > 1 ? 's' : ''} selected for comparison
                  </span>
                  <div className="text-sm text-green-600 mt-1">
                    {compareList.map(m => m.neighborhood.name).join(', ')}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowCompare(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Compare Now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedMatch && (
        <NeighborhoodDetail
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>
  );
};