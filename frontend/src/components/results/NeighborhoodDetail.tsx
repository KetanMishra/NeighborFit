import React, { useState } from 'react';
import { X, MapPin, IndianRupee, Users, Shield, TrendingUp, Car, Home, Navigation, ExternalLink, MessageSquare } from 'lucide-react';
import { NeighborhoodMatch } from '../../types';
import { UserExperiencesSection } from './UserExperiencesSection';
import { getUserReviewsForNeighborhood, getExperienceStats } from '../../data/userReviews';

interface NeighborhoodDetailProps {
  match: NeighborhoodMatch;
  onClose: () => void;
}

export const NeighborhoodDetail: React.FC<NeighborhoodDetailProps> = ({
  match,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showMap, setShowMap] = useState(false);
  const { neighborhood, matchScore, matchBreakdown, pros, cons, highlights } = match;

  // Get user reviews and stats
  const userReviews = getUserReviewsForNeighborhood(neighborhood.id);
  const experienceStats = getExperienceStats(neighborhood.id);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const getNeighborhoodImage = (name: string) => {
    const images = {
      'HSR Layout': 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Koramangala': 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Indiranagar': 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Whitefield': 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'JP Nagar': 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Electronic City': 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Malleshwaram': 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'BTM Layout': 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'
    };
    return images[name as keyof typeof images] || 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800';
  };

  const openGoogleMaps = () => {
    const query = encodeURIComponent(`${neighborhood.name}, ${neighborhood.city}, ${neighborhood.state}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue', delay = 0 }: any) => (
    <div className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 animate-slide-up`} style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg bg-${color}-100 transition-transform duration-300 hover:scale-110`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
        <div>
          <div className="font-semibold text-gray-900">{value}</div>
          <div className="text-sm text-gray-600">{title}</div>
          {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
        </div>
      </div>
    </div>
  );

  const ProgressBar = ({ label, value, max = 100, color = 'blue', delay = 0 }: any) => (
    <div className={`space-y-2 animate-slide-up`} style={{ animationDelay: `${delay}ms` }}>
      <div className="flex justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">{value}/{max}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-3 rounded-full bg-gradient-to-r from-${color}-400 to-${color}-600 transition-all duration-1000 ease-out`}
          style={{ 
            width: `${(value / max) * 100}%`,
            transitionDelay: `${delay + 200}ms`
          }}
        />
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'experiences', label: 'Resident Experiences', icon: MessageSquare, count: userReviews.length },
    { id: 'demographics', label: 'Demographics', icon: Users },
    { id: 'amenities', label: 'Amenities', icon: TrendingUp },
    { id: 'location', label: 'Location', icon: MapPin }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden animate-scale-up">
        {/* Hero Header with Image */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={getNeighborhoodImage(neighborhood.name)}
            alt={neighborhood.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-all duration-300 text-white hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Location Button */}
          <button
            onClick={openGoogleMaps}
            className="absolute top-4 left-4 flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg px-3 py-2 transition-all duration-300 text-white hover:scale-105"
          >
            <Navigation className="w-4 h-4" />
            <span className="text-sm font-medium">View on Maps</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          {/* Header Content */}
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-bold mb-2 animate-slide-up">
              {neighborhood.name}
            </h2>
            <div className="flex items-center space-x-4 animate-slide-up animation-delay-200">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{neighborhood.city}, {neighborhood.state}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="font-semibold">{matchScore}% Match</span>
              </div>
              {experienceStats && (
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="font-semibold">{experienceStats.averageRating.toFixed(1)} ★ ({experienceStats.totalReviews} reviews)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex space-x-0 overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm transition-all duration-300 border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/50'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count && (
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Match Score */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 animate-slide-up">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {matchScore}% Match
                  </div>
                  <div className="text-gray-600">
                    Based on your preferences and priorities
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Lifestyle', value: matchBreakdown.lifestyle, color: 'blue' },
                    { label: 'Housing', value: matchBreakdown.housing, color: 'green' },
                    { label: 'Commute', value: matchBreakdown.commute, color: 'purple' },
                    { label: 'Priorities', value: matchBreakdown.priorities, color: 'orange' }
                  ].map((item, index) => (
                    <div key={item.label} className="text-center animate-bounce-in" style={{ animationDelay: `${index * 200}ms` }}>
                      <div className={`text-2xl font-bold text-${item.color}-600 mb-1`}>
                        {item.value}%
                      </div>
                      <div className="text-sm text-gray-600">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  icon={IndianRupee}
                  title="Monthly Rent"
                  value={formatCurrency(neighborhood.housing.rentPrice)}
                  subtitle="Median price"
                  color="green"
                  delay={0}
                />
                <StatCard
                  icon={Shield}
                  title="Safety Score"
                  value={`${neighborhood.safety.safetyScore}/100`}
                  subtitle="Above average"
                  color="blue"
                  delay={100}
                />
                <StatCard
                  icon={TrendingUp}
                  title="Walk Score"
                  value={`${neighborhood.amenities.walkScore}/100`}
                  subtitle="Walkability"
                  color="purple"
                  delay={200}
                />
                <StatCard
                  icon={Users}
                  title="Population"
                  value={`${(neighborhood.demographics.population / 1000).toFixed(0)}K`}
                  subtitle={`Median age: ${neighborhood.demographics.medianAge}`}
                  color="orange"
                  delay={300}
                />
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-6 animate-slide-up animation-delay-400">
                  <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Highlights
                  </h3>
                  <ul className="space-y-3">
                    {pros.map((pro, index) => (
                      <li key={index} className="flex items-start space-x-3 animate-slide-in" style={{ animationDelay: `${500 + index * 100}ms` }}>
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {cons.length > 0 && (
                  <div className="bg-amber-50 rounded-xl p-6 animate-slide-up animation-delay-500">
                    <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                      Considerations
                    </h3>
                    <ul className="space-y-3">
                      {cons.map((con, index) => (
                        <li key={index} className="flex items-start space-x-3 animate-slide-in" style={{ animationDelay: `${600 + index * 100}ms` }}>
                          <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-gray-700">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div className="bg-yellow-50 rounded-xl p-6 animate-slide-up animation-delay-600">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-4">Special Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {highlights.map((highlight, index) => (
                      <span 
                        key={index}
                        className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm animate-bounce-in"
                        style={{ animationDelay: `${700 + index * 100}ms` }}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'experiences' && experienceStats && (
            <UserExperiencesSection
              neighborhoodId={neighborhood.id}
              reviews={userReviews}
              stats={experienceStats}
            />
          )}

          {activeTab === 'demographics' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Population Demographics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-600">Median Income</span>
                      <span className="font-medium">{formatCurrency(neighborhood.demographics.medianIncome)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-600">Education Level</span>
                      <span className="font-medium">{neighborhood.demographics.educationLevel}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-600">Median Age</span>
                      <span className="font-medium">{neighborhood.demographics.medianAge} years</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <ProgressBar
                      label="Diversity Index"
                      value={neighborhood.demographics.diversity}
                      color="green"
                      delay={200}
                    />
                    <ProgressBar
                      label="Population Density"
                      value={Math.min((neighborhood.demographics.population / 2000), 100)}
                      color="blue"
                      delay={400}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'amenities' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities & Scores</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <ProgressBar
                      label="Transit Score"
                      value={neighborhood.amenities.transitScore}
                      color="blue"
                      delay={0}
                    />
                    <ProgressBar
                      label="Bike Score"
                      value={neighborhood.amenities.bikeScore}
                      color="green"
                      delay={200}
                    />
                    <ProgressBar
                      label="Air Quality"
                      value={neighborhood.quality.airQuality}
                      color="purple"
                      delay={400}
                    />
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Restaurants', value: neighborhood.amenities.restaurants },
                      { label: 'Parks', value: neighborhood.amenities.parks },
                      { label: 'Schools', value: neighborhood.amenities.schools },
                      { label: 'Gyms', value: neighborhood.amenities.gyms }
                    ].map((item, index) => (
                      <div key={item.label} className="flex justify-between items-center p-3 bg-white rounded-lg animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'location' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Location Details</h3>
                  <button
                    onClick={openGoogleMaps}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-600">Coordinates</span>
                      <span className="font-medium text-sm">
                        {neighborhood.coordinates.lat.toFixed(4)}, {neighborhood.coordinates.lng.toFixed(4)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-600">City</span>
                      <span className="font-medium">{neighborhood.city}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="text-gray-600">State</span>
                      <span className="font-medium">{neighborhood.state}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Quick Access</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${neighborhood.coordinates.lat},${neighborhood.coordinates.lng}`, '_blank')}
                        className="w-full text-left p-2 hover:bg-gray-50 rounded transition-colors duration-200"
                      >
                        📍 Get Directions
                      </button>
                      <button
                        onClick={() => window.open(`https://www.google.com/maps/search/restaurants+near+${encodeURIComponent(neighborhood.name + ', ' + neighborhood.city)}`, '_blank')}
                        className="w-full text-left p-2 hover:bg-gray-50 rounded transition-colors duration-200"
                      >
                        🍽️ Nearby Restaurants
                      </button>
                      <button
                        onClick={() => window.open(`https://www.google.com/maps/search/metro+stations+near+${encodeURIComponent(neighborhood.name + ', ' + neighborhood.city)}`, '_blank')}
                        className="w-full text-left p-2 hover:bg-gray-50 rounded transition-colors duration-200"
                      >
                        🚇 Metro Stations
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};