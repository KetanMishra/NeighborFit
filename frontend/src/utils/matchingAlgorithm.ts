import { UserPreferences, Neighborhood, NeighborhoodMatch } from '../types';
import { getUserReviewsForNeighborhood } from '../data/userReviews';

export class NeighborhoodMatcher {
  private weights = {
    lifestyle: 0.3,
    housing: 0.25,
    commute: 0.2,
    priorities: 0.25
  };

  calculateMatch(preferences: UserPreferences, neighborhood: Neighborhood): NeighborhoodMatch {
    const lifestyleScore = this.calculateLifestyleScore(preferences.lifestyle, neighborhood);
    const housingScore = this.calculateHousingScore(preferences.housing, neighborhood);
    const commuteScore = this.calculateCommuteScore(preferences.commute, neighborhood);
    const prioritiesScore = this.calculatePrioritiesScore(preferences.priorities, neighborhood);

    const matchScore = Math.round(
      lifestyleScore * this.weights.lifestyle +
      housingScore * this.weights.housing +
      commuteScore * this.weights.commute +
      prioritiesScore * this.weights.priorities
    );

    // Get user experience insights
    const userExperienceInsights = this.generateUserExperienceInsights(preferences, neighborhood);

    return {
      neighborhood,
      matchScore,
      matchBreakdown: {
        lifestyle: Math.round(lifestyleScore),
        housing: Math.round(housingScore),
        commute: Math.round(commuteScore),
        priorities: Math.round(prioritiesScore)
      },
      pros: this.generatePros(preferences, neighborhood),
      cons: this.generateCons(preferences, neighborhood),
      highlights: this.generateHighlights(neighborhood),
      userExperienceInsights
    };
  }

  private generateUserExperienceInsights(preferences: UserPreferences, neighborhood: Neighborhood) {
    const reviews = getUserReviewsForNeighborhood(neighborhood.id);
    
    if (reviews.length === 0) {
      return undefined;
    }

    // Find similar users based on age range and family status
    const userAge = this.getAgeFromRange(preferences.demographics.ageRange);
    const similarUserReviews = reviews.filter(review => {
      const reviewerAge = this.getAgeFromRange(review.userProfile.ageRange);
      return Math.abs(userAge - reviewerAge) <= 10; // Within 10 years
    }).slice(0, 3); // Top 3 similar reviews

    // Extract relevant experiences based on user priorities
    const relevantExperiences = this.extractRelevantExperiences(preferences, reviews);

    // Generate community feedback summary
    const communityFeedback = this.generateCommunityFeedback(reviews);

    return {
      similarUserReviews,
      relevantExperiences,
      communityFeedback
    };
  }

  private getAgeFromRange(ageRange: string): number {
    const ranges: Record<string, number> = {
      '18-25': 22,
      '25-30': 27,
      '25-35': 30,
      '30-35': 32,
      '35-40': 37,
      '40-45': 42,
      '45+': 50
    };
    return ranges[ageRange] || 30;
  }

  private extractRelevantExperiences(preferences: UserPreferences, reviews: any[]): string[] {
    const experiences: string[] = [];
    
    // Based on high priority preferences, extract relevant experiences
    if (preferences.priorities.safety >= 4) {
      const safetyExperiences = reviews
        .filter(r => r.ratings.safety >= 4)
        .map(r => `"${r.review.content.split('.')[0]}." - ${r.userName}`)
        .slice(0, 2);
      experiences.push(...safetyExperiences);
    }

    if (preferences.lifestyle.nightlife >= 4) {
      const nightlifeExperiences = reviews
        .filter(r => r.review.pros.some((pro: string) => pro.toLowerCase().includes('nightlife')))
        .map(r => `"Great nightlife scene here" - ${r.userName}`)
        .slice(0, 1);
      experiences.push(...nightlifeExperiences);
    }

    if (preferences.lifestyle.familyFriendly >= 4) {
      const familyExperiences = reviews
        .filter(r => r.userProfile.familyStatus === 'Family with Kids')
        .map(r => `"${r.review.content.split('.')[0]}." - ${r.userName} (Parent)`)
        .slice(0, 2);
      experiences.push(...familyExperiences);
    }

    return experiences.slice(0, 3);
  }

  private generateCommunityFeedback(reviews: any[]): string {
    if (reviews.length === 0) return "No community feedback available yet.";

    const avgRating = reviews.reduce((sum, r) => sum + r.ratings.overall, 0) / reviews.length;
    const recommendationRate = (reviews.filter(r => r.review.wouldRecommend).length / reviews.length) * 100;
    
    const topPros = this.getTopMentions(reviews.flatMap((r: any) => r.review.pros));
    const topCons = this.getTopMentions(reviews.flatMap((r: any) => r.review.cons));

    return `Community rates this area ${avgRating.toFixed(1)}/5 stars with ${recommendationRate.toFixed(0)}% recommending it. Most loved: ${topPros[0]}. Main concern: ${topCons[0]}.`;
  }

  private getTopMentions(items: string[]): string[] {
    const counts: Record<string, number> = {};
    items.forEach(item => {
      const key = item.toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    });
    
    return Object.entries(counts)
      .sort(([,a], [,b]) => b - a)
      .map(([item]) => item)
      .slice(0, 3);
  }

  private calculateLifestyleScore(lifestyle: any, neighborhood: Neighborhood): number {
    const scores = [];
    
    // Walkability
    scores.push(this.normalizeScore(neighborhood.amenities.walkScore, lifestyle.walkability));
    
    // Nightlife
    const nightlifeScore = Math.min(neighborhood.amenities.nightlife * 2, 100);
    scores.push(this.normalizeScore(nightlifeScore, lifestyle.nightlife));
    
    // Dining
    const diningScore = Math.min(neighborhood.amenities.restaurants / 3, 100);
    scores.push(this.normalizeScore(diningScore, lifestyle.dining));
    
    // Shopping
    const shoppingScore = Math.min(neighborhood.amenities.shopping * 1.2, 100);
    scores.push(this.normalizeScore(shoppingScore, lifestyle.shopping));
    
    // Outdoor Activities
    const outdoorScore = neighborhood.quality.greenSpace + (neighborhood.amenities.parks * 2);
    scores.push(this.normalizeScore(Math.min(outdoorScore, 100), lifestyle.outdoorActivities));
    
    // Family Friendly
    const familyScore = (neighborhood.amenities.schools * 2) + (neighborhood.amenities.parks * 1.5);
    scores.push(this.normalizeScore(Math.min(familyScore, 100), lifestyle.familyFriendly));
    
    // Quietness (inverse of noise level)
    const quietnessScore = 100 - neighborhood.quality.noiseLevel;
    scores.push(this.normalizeScore(quietnessScore, lifestyle.quietness));

    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }

  private calculateHousingScore(housing: any, neighborhood: Neighborhood): number {
    const scores = [];
    
    // Budget compatibility
    const budgetScore = housing.maxBudget >= neighborhood.housing.rentPrice ? 100 : 
                       Math.max(0, 100 - ((neighborhood.housing.rentPrice - housing.maxBudget) / housing.maxBudget) * 100);
    scores.push(budgetScore);
    
    // Housing type availability
    const hasPreferredType = housing.housingType.some((type: string) => 
      neighborhood.housing.housingTypes.includes(type)
    );
    scores.push(hasPreferredType ? 100 : 30);
    
    // Availability
    const availabilityScore = Math.min(neighborhood.housing.availableUnits / 5, 100);
    scores.push(availabilityScore);

    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }

  private calculateCommuteScore(commute: any, neighborhood: Neighborhood): number {
    // Bangalore-specific commute scoring
    const transitScore = neighborhood.amenities.transitScore;
    const walkScore = neighborhood.amenities.walkScore;
    
    // Weight based on transport preferences
    let score = 0;
    let totalWeight = 0;
    
    if (commute.transportModes.includes('Namma Metro')) {
      score += transitScore * 0.7;
      totalWeight += 0.7;
    }
    if (commute.transportModes.includes('BMTC Bus')) {
      score += transitScore * 0.5;
      totalWeight += 0.5;
    }
    if (commute.transportModes.includes('Walking')) {
      score += walkScore * 0.3;
      totalWeight += 0.3;
    }
    if (commute.transportModes.includes('Cycling')) {
      score += neighborhood.amenities.bikeScore * 0.4;
      totalWeight += 0.4;
    }
    if (commute.transportModes.includes('Two Wheeler') || commute.transportModes.includes('Car/Cab')) {
      score += 75; // Assume decent road access in Bangalore
      totalWeight += 0.6;
    }
    if (commute.transportModes.includes('Auto Rickshaw')) {
      score += 80; // Good auto availability in most areas
      totalWeight += 0.4;
    }
    
    return totalWeight > 0 ? Math.min(score / totalWeight, 100) : 70;
  }

  private calculatePrioritiesScore(priorities: any, neighborhood: Neighborhood): number {
    const scores = [];
    
    scores.push(this.normalizeScore(neighborhood.safety.safetyScore, priorities.safety));
    scores.push(this.normalizeScore(neighborhood.amenities.schools * 2.5, priorities.schools));
    scores.push(this.normalizeScore(neighborhood.amenities.restaurants / 3, priorities.culture));
    scores.push(this.normalizeScore(neighborhood.demographics.diversity, priorities.diversity));
    scores.push(this.normalizeScore(neighborhood.quality.greenSpace, priorities.greenSpace));
    scores.push(this.normalizeScore(neighborhood.amenities.transitScore, priorities.publicTransit));

    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }

  private normalizeScore(actual: number, preference: number): number {
    // Convert preference (1-5) to weight and apply to actual score
    const weight = preference / 5;
    return actual * weight;
  }

  private generatePros(preferences: UserPreferences, neighborhood: Neighborhood): string[] {
    const pros = [];
    
    if (neighborhood.amenities.walkScore > 80) pros.push('Excellent walkability');
    if (neighborhood.safety.safetyScore > 85) pros.push('Very safe area');
    if (neighborhood.amenities.transitScore > 80) pros.push('Great Metro/bus connectivity');
    if (neighborhood.quality.greenSpace > 45) pros.push('Good green spaces and parks');
    if (neighborhood.amenities.restaurants > 150) pros.push('Diverse dining options');
    if (neighborhood.demographics.diversity > 80) pros.push('Culturally diverse community');
    if (neighborhood.amenities.nightlife > 40) pros.push('Vibrant nightlife scene');
    if (neighborhood.housing.rentPrice < 25000) pros.push('Affordable housing options');
    if (neighborhood.amenities.schools > 30) pros.push('Good educational facilities');
    
    return pros.slice(0, 4);
  }

  private generateCons(preferences: UserPreferences, neighborhood: Neighborhood): string[] {
    const cons = [];
    
    if (neighborhood.housing.rentPrice > preferences.housing.maxBudget * 1.3) {
      cons.push('Significantly above budget');
    }
    if (neighborhood.quality.noiseLevel > 75) cons.push('Can be quite noisy');
    if (neighborhood.amenities.walkScore < 60) cons.push('Limited walkability');
    if (neighborhood.safety.crimeRate > 20) cons.push('Higher crime rate');
    if (neighborhood.quality.airQuality < 65) cons.push('Air quality concerns');
    if (neighborhood.amenities.transitScore < 60) cons.push('Limited public transport');
    if (neighborhood.amenities.parks < 10) cons.push('Few parks and green spaces');
    
    return cons.slice(0, 3);
  }

  private generateHighlights(neighborhood: Neighborhood): string[] {
    const highlights = [];
    
    if (neighborhood.demographics.medianIncome > 1200000) {
      highlights.push('High-income locality');
    }
    if (neighborhood.amenities.gyms > 25) {
      highlights.push('Plenty of fitness centers');
    }
    if (neighborhood.amenities.parks > 20) {
      highlights.push('Park-rich neighborhood');
    }
    if (neighborhood.demographics.educationLevel.includes('Graduate')) {
      highlights.push('Highly educated residents');
    }
    if (neighborhood.name === 'HSR Layout') {
      highlights.push('IT hub proximity');
    }
    if (neighborhood.name === 'Koramangala') {
      highlights.push('Startup ecosystem');
    }
    
    return highlights.slice(0, 2);
  }
}