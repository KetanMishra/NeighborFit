import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle, Users, TrendingUp, MessageSquare, Filter } from 'lucide-react';
import { UserReview, ExperienceStats } from '../../types';

interface UserExperiencesSectionProps {
  neighborhoodId: string;
  reviews: UserReview[];
  stats: ExperienceStats;
}

export const UserExperiencesSection: React.FC<UserExperiencesSectionProps> = ({
  neighborhoodId,
  reviews,
  stats
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('helpful');

  const filteredReviews = reviews.filter(review => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'verified') return review.verified;
    if (selectedFilter === 'families') return review.userProfile.familyStatus === 'Family with Kids';
    if (selectedFilter === 'professionals') return review.userProfile.profession.includes('Engineer') || review.userProfile.profession.includes('Manager');
    return true;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'helpful':
        return b.helpfulVotes - a.helpfulVotes;
      case 'rating':
        return b.ratings.overall - a.ratings.overall;
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
            ? 'text-yellow-400 fill-current opacity-50' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600 bg-green-100';
    if (rating >= 4) return 'text-blue-600 bg-blue-100';
    if (rating >= 3) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            Community Insights
          </h3>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(stats.averageRating)}`}>
              {stats.averageRating.toFixed(1)} ★
            </span>
            <span className="text-sm text-gray-600">
              {stats.totalReviews} reviews
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.recommendationRate}%</div>
            <div className="text-sm text-gray-600">Would Recommend</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.verifiedResidentPercentage}%</div>
            <div className="text-sm text-gray-600">Verified Residents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.averageStayDuration}</div>
            <div className="text-sm text-gray-600">Avg. Stay Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.totalReviews}</div>
            <div className="text-sm text-gray-600">Total Reviews</div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Rating Distribution</h4>
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center space-x-2">
              <span className="text-sm w-8">{rating}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution] / stats.totalReviews) * 100}%` 
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8">
                {stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Pros and Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 rounded-xl p-6">
          <h4 className="font-semibold text-green-900 mb-3 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Most Loved Features
          </h4>
          <ul className="space-y-2">
            {stats.topPros.slice(0, 5).map((pro, index) => (
              <li key={index} className="flex items-center text-green-800">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                {pro}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 rounded-xl p-6">
          <h4 className="font-semibold text-amber-900 mb-3 flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Common Concerns
          </h4>
          <ul className="space-y-2">
            {stats.topCons.slice(0, 5).map((con, index) => (
              <li key={index} className="flex items-center text-amber-800">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter:</span>
          <div className="flex space-x-2">
            {[
              { value: 'all', label: 'All Reviews' },
              { value: 'verified', label: 'Verified Only' },
              { value: 'families', label: 'Families' },
              { value: 'professionals', label: 'Professionals' }
            ].map(filter => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedFilter === filter.value
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="helpful">Most Helpful</option>
            <option value="recent">Most Recent</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review, index) => (
          <div 
            key={review.id} 
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {review.userName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{review.userName}</span>
                    {review.verified && (
                      <CheckCircle className="w-4 h-4 text-green-500" title="Verified Resident" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {review.userProfile.profession} • {review.userProfile.familyStatus} • Lived here {review.userProfile.duration}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  {renderStars(review.ratings.overall)}
                  <span className="text-sm font-medium text-gray-700 ml-1">
                    {review.ratings.overall.toFixed(1)}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">{review.review.title}</h4>
              <p className="text-gray-700 leading-relaxed">{review.review.content}</p>
            </div>

            {/* Detailed Ratings */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
              {Object.entries(review.ratings).filter(([key]) => key !== 'overall').map(([category, rating]) => (
                <div key={category} className="text-center">
                  <div className="text-xs text-gray-600 capitalize mb-1">
                    {category === 'valueForMoney' ? 'Value' : category}
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Star className={`w-3 h-3 ${rating >= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    <span className="text-xs font-medium">{rating}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="text-sm font-medium text-green-700 mb-2">👍 Loved</h5>
                <ul className="space-y-1">
                  {review.review.pros.slice(0, 3).map((pro, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-medium text-amber-700 mb-2">👎 Challenges</h5>
                <ul className="space-y-1">
                  {review.review.cons.slice(0, 3).map((con, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <span className="w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Best For Tags */}
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Best for:</h5>
              <div className="flex flex-wrap gap-2">
                {review.review.bestFor.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Review Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{review.helpfulVotes}</span>
                </button>
                <span className="text-sm text-gray-500">
                  {review.review.wouldRecommend ? '✅ Recommends' : '❌ Doesn\'t recommend'}
                </span>
              </div>
              <div className="flex space-x-2">
                {review.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {sortedReviews.length < reviews.length && (
        <div className="text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
};