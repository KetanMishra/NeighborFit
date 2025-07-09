import { UserPreferences, Neighborhood } from '../types';

export const mockPreferences: UserPreferences = {
  commute: {
    maxTime: 45,
    transportModes: ['Namma Metro', 'BMTC Bus'],
    workLocation: 'Koramangala'
  },
  lifestyle: {
    walkability: 4,
    nightlife: 3,
    dining: 4,
    shopping: 3,
    outdoorActivities: 4,
    familyFriendly: 2,
    quietness: 3
  },
  housing: {
    maxBudget: 35000,
    housingType: ['Apartment'],
    minBedrooms: 2
  },
  demographics: {
    ageRange: '25-35',
    incomeRange: '8L-15L',
    education: 'Graduate Degree'
  },
  priorities: {
    safety: 5,
    schools: 3,
    culture: 4,
    diversity: 4,
    greenSpace: 4,
    publicTransit: 5
  }
};

export const mockNeighborhood: Neighborhood = {
  id: 'test-neighborhood',
  name: 'Test Neighborhood',
  city: 'Bangalore',
  state: 'Karnataka',
  coordinates: { lat: 12.9716, lng: 77.5946 },
  demographics: {
    population: 100000,
    medianAge: 32,
    medianIncome: 1200000,
    educationLevel: 'Graduate Degree',
    diversity: 85
  },
  housing: {
    medianPrice: 8000000,
    rentPrice: 30000,
    housingTypes: ['Apartment', 'Villa'],
    availableUnits: 400
  },
  amenities: {
    walkScore: 80,
    transitScore: 85,
    bikeScore: 70,
    restaurants: 150,
    nightlife: 30,
    shopping: 60,
    parks: 15,
    gyms: 25,
    schools: 20
  },
  safety: {
    crimeRate: 10,
    safetyScore: 90
  },
  quality: {
    airQuality: 70,
    noiseLevel: 65,
    greenSpace: 45
  }
};

export const mockNeighborhoods: Neighborhood[] = [
  mockNeighborhood,
  {
    ...mockNeighborhood,
    id: 'test-neighborhood-2',
    name: 'Test Neighborhood 2',
    housing: {
      ...mockNeighborhood.housing,
      rentPrice: 25000
    }
  }
];