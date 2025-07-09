import { Neighborhood } from '../types';
import { getUserReviewsForNeighborhood, getExperienceStats } from './userReviews';

export const sampleNeighborhoods: Neighborhood[] = [
  {
    id: 'hsr-layout',
    name: 'HSR Layout',
    city: 'Bangalore',
    state: 'Karnataka',
    coordinates: { lat: 12.9116, lng: 77.6412 },
    demographics: {
      population: 150000,
      medianAge: 32,
      medianIncome: 1200000,
      educationLevel: 'Graduate Degree',
      diversity: 85
    },
    housing: {
      medianPrice: 8500000,
      rentPrice: 35000,
      housingTypes: ['Apartment', 'Villa', 'Independent House'],
      availableUnits: 450
    },
    amenities: {
      walkScore: 78,
      transitScore: 85,
      bikeScore: 70,
      restaurants: 180,
      nightlife: 35,
      shopping: 65,
      parks: 15,
      gyms: 28,
      schools: 25
    },
    safety: {
      crimeRate: 12,
      safetyScore: 88
    },
    quality: {
      airQuality: 65,
      noiseLevel: 70,
      greenSpace: 40
    },
    reviews: getUserReviewsForNeighborhood('hsr-layout'),
    experienceStats: getExperienceStats('hsr-layout')
  },
  {
    id: 'koramangala',
    name: 'Koramangala',
    city: 'Bangalore',
    state: 'Karnataka',
    coordinates: { lat: 12.9352, lng: 77.6245 },
    demographics: {
      population: 120000,
      medianAge: 28,
      medianIncome: 1500000,
      educationLevel: 'Graduate Degree',
      diversity: 90
    },
    housing: {
      medianPrice: 12000000,
      rentPrice: 45000,
      housingTypes: ['Apartment', 'PG', 'Studio'],
      availableUnits: 320
    },
    amenities: {
      walkScore: 92,
      transitScore: 88,
      bikeScore: 85,
      restaurants: 250,
      nightlife: 65,
      shopping: 85,
      parks: 8,
      gyms: 35,
      schools: 18
    },
    safety: {
      crimeRate: 18,
      safetyScore: 82
    },
    quality: {
      airQuality: 60,
      noiseLevel: 85,
      greenSpace: 25
    },
    reviews: getUserReviewsForNeighborhood('koramangala'),
    experienceStats: getExperienceStats('koramangala')
  },
  {
    id: 'indiranagar',
    name: 'Indiranagar',
    city: 'Bangalore',
    state: 'Karnataka',
    coordinates: { lat: 12.9719, lng: 77.6412 },
    demographics: {
      population: 95000,
      medianAge: 35,
      medianIncome: 1800000,
      educationLevel: 'Graduate Degree',
      diversity: 88
    },
    housing: {
      medianPrice: 15000000,
      rentPrice: 55000,
      housingTypes: ['Apartment', 'Independent House', 'Villa'],
      availableUnits: 180
    },
    amenities: {
      walkScore: 95,
      transitScore: 90,
      bikeScore: 88,
      restaurants: 300,
      nightlife: 85,
      shopping: 90,
      parks: 12,
      gyms: 40,
      schools: 22
    },
    safety: {
      crimeRate: 15,
      safetyScore: 85
    },
    quality: {
      airQuality: 58,
      noiseLevel: 88,
      greenSpace: 30
    },
    reviews: getUserReviewsForNeighborhood('indiranagar'),
    experienceStats: getExperienceStats('indiranagar')
  },
  {
    id: 'whitefield',
    name: 'Whitefield',
    city: 'Bangalore',
    state: 'Karnataka',
    coordinates: { lat: 12.9698, lng: 77.7500 },
    demographics: {
      population: 200000,
      medianAge: 30,
      medianIncome: 1100000,
      educationLevel: 'Bachelor\'s Degree',
      diversity: 82
    },
    housing: {
      medianPrice: 7500000,
      rentPrice: 28000,
      housingTypes: ['Apartment', 'Villa', 'Gated Community'],
      availableUnits: 650
    },
    amenities: {
      walkScore: 65,
      transitScore: 70,
      bikeScore: 60,
      restaurants: 120,
      nightlife: 25,
      shopping: 75,
      parks: 25,
      gyms: 22,
      schools: 35
    },
    safety: {
      crimeRate: 8,
      safetyScore: 92
    },
    quality: {
      airQuality: 72,
      noiseLevel: 60,
      greenSpace: 55
    },
    reviews: getUserReviewsForNeighborhood('whitefield'),
    experienceStats: getExperienceStats('whitefield')
  },
  {
    id: 'jp-nagar',
    name: 'JP Nagar',
    city: 'Bangalore',
    state: 'Karnataka',
    coordinates: { lat: 12.9081, lng: 77.5831 },
    demographics: {
      population: 180000,
      medianAge: 38,
      medianIncome: 950000,
      educationLevel: 'Bachelor\'s Degree',
      diversity: 75
    },
    housing: {
      medianPrice: 6500000,
      rentPrice: 22000,
      housingTypes: ['Apartment', 'Independent House', 'Builder Floor'],
      availableUnits: 520
    },
    amenities: {
      walkScore: 82,
      transitScore: 78,
      bikeScore: 75,
      restaurants: 140,
      nightlife: 30,
      shopping: 60,
      parks: 20,
      gyms: 25,
      schools: 40
    },
    safety: {
      crimeRate: 10,
      safetyScore: 90
    },
    quality: {
      airQuality: 68,
      noiseLevel: 65,
      greenSpace: 45
    }
  },
  {
    id: 'electronic-city',
    name: 'Electronic City',
    city: 'Bangalore',
    state: 'Karnataka',
    coordinates: { lat: 12.8456, lng: 77.6603 },
    demographics: {
      population: 250000,
      medianAge: 29,
      medianIncome: 1000000,
      educationLevel: 'Graduate Degree',
      diversity: 88
    },
    housing: {
      medianPrice: 5500000,
      rentPrice: 20000,
      housingTypes: ['Apartment', 'Gated Community', 'PG'],
      availableUnits: 800
    },
    amenities: {
      walkScore: 60,
      transitScore: 65,
      bikeScore: 55,
      restaurants: 95,
      nightlife: 15,
      shopping: 45,
      parks: 18,
      gyms: 18,
      schools: 28
    },
    safety: {
      crimeRate: 6,
      safetyScore: 94
    },
    quality: {
      airQuality: 70,
      noiseLevel: 55,
      greenSpace: 35
    }
  },
  {
    id: 'malleshwaram',
    name: 'Malleshwaram',
    city: 'Bangalore',
    state: 'Karnataka',
    coordinates: { lat: 13.0037, lng: 77.5727 },
    demographics: {
      population: 85000,
      medianAge: 45,
      medianIncome: 1300000,
      educationLevel: 'Graduate Degree',
      diversity: 70
    },
    housing: {
      medianPrice: 9500000,
      rentPrice: 32000,
      housingTypes: ['Independent House', 'Apartment', 'Traditional House'],
      availableUnits: 220
    },
    amenities: {
      walkScore: 88,
      transitScore: 85,
      bikeScore: 80,
      restaurants: 160,
      nightlife: 20,
      shopping: 70,
      parks: 22,
      gyms: 20,
      schools: 45
    },
    safety: {
      crimeRate: 8,
      safetyScore: 92
    },
    quality: {
      airQuality: 65,
      noiseLevel: 70,
      greenSpace: 50
    }
  },
  {
    id: 'btm-layout',
    name: 'BTM Layout',
    city: 'Bangalore',
    state: 'Karnataka',
    coordinates: { lat: 12.9165, lng: 77.6101 },
    demographics: {
      population: 140000,
      medianAge: 31,
      medianIncome: 850000,
      educationLevel: 'Bachelor\'s Degree',
      diversity: 85
    },
    housing: {
      medianPrice: 5800000,
      rentPrice: 18000,
      housingTypes: ['Apartment', 'PG', 'Builder Floor'],
      availableUnits: 480
    },
    amenities: {
      walkScore: 85,
      transitScore: 82,
      bikeScore: 78,
      restaurants: 130,
      nightlife: 40,
      shopping: 55,
      parks: 12,
      gyms: 22,
      schools: 30
    },
    safety: {
      crimeRate: 14,
      safetyScore: 86
    },
    quality: {
      airQuality: 62,
      noiseLevel: 75,
      greenSpace: 35
    }
  }
];

export const fetchNeighborhoodsFromApi = async (): Promise<Neighborhood[]> => {
  const response = await fetch('/api/neighborhoods');
  if (!response.ok) {
    throw new Error('Failed to fetch neighborhoods');
  }
  return response.json();
};