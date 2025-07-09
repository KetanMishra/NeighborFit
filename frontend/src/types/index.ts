export interface UserPreferences {
  commute: {
    maxTime: number;
    transportModes: string[];
    workLocation?: string;
  };
  lifestyle: {
    walkability: number;
    nightlife: number;
    dining: number;
    shopping: number;
    outdoorActivities: number;
    familyFriendly: number;
    quietness: number;
  };
  housing: {
    maxBudget: number;
    housingType: string[];
    minBedrooms: number;
  };
  demographics: {
    ageRange: string;
    incomeRange: string;
    education: string;
  };
  priorities: {
    safety: number;
    schools: number;
    culture: number;
    diversity: number;
    greenSpace: number;
    publicTransit: number;
  };
}

export interface Neighborhood {
  id: string;
  name: string;
  city: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  demographics: {
    population: number;
    medianAge: number;
    medianIncome: number;
    educationLevel: string;
    diversity: number;
  };
  housing: {
    medianPrice: number;
    rentPrice: number;
    housingTypes: string[];
    availableUnits: number;
  };
  amenities: {
    walkScore: number;
    transitScore: number;
    bikeScore: number;
    restaurants: number;
    nightlife: number;
    shopping: number;
    parks: number;
    gyms: number;
    schools: number;
  };
  safety: {
    crimeRate: number;
    safetyScore: number;
  };
  quality: {
    airQuality: number;
    noiseLevel: number;
    greenSpace: number;
  };
  reviews?: UserReview[];
  experienceStats?: ExperienceStats;
}

export interface UserReview {
  id: string;
  userId: string;
  neighborhoodId: string;
  userName: string;
  userProfile: {
    ageRange: string;
    familyStatus: 'Single' | 'Couple' | 'Family with Kids' | 'Senior';
    profession: string;
    duration: string; // "2 years", "6 months", etc.
  };
  ratings: {
    overall: number;
    safety: number;
    commute: number;
    amenities: number;
    community: number;
    valueForMoney: number;
  };
  review: {
    title: string;
    content: string;
    pros: string[];
    cons: string[];
    bestFor: string[]; // "Young professionals", "Families", etc.
    wouldRecommend: boolean;
  };
  helpfulVotes: number;
  createdAt: string;
  verified: boolean; // Verified resident
  tags: string[]; // "Great for IT professionals", "Family-friendly", etc.
}

export interface ExperienceStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  topPros: string[];
  topCons: string[];
  recommendationRate: number; // Percentage who would recommend
  demographics: {
    youngProfessionals: number;
    families: number;
    seniors: number;
    couples: number;
  };
  averageStayDuration: string;
  verifiedResidentPercentage: number;
}

export interface NeighborhoodMatch {
  neighborhood: Neighborhood;
  matchScore: number;
  matchBreakdown: {
    lifestyle: number;
    housing: number;
    commute: number;
    priorities: number;
  };
  pros: string[];
  cons: string[];
  highlights: string[];
  userExperienceInsights?: {
    similarUserReviews: UserReview[];
    relevantExperiences: string[];
    communityFeedback: string;
  };
}

export interface AssessmentStep {
  id: string;
  title: string;
  description: string;
  component: string;
}