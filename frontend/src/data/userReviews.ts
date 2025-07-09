import { UserReview, ExperienceStats } from '../types';

export const sampleUserReviews: UserReview[] = [
  // HSR Layout Reviews
  {
    id: 'review-hsr-1',
    userId: 'user-1',
    neighborhoodId: 'hsr-layout',
    userName: 'Priyanshu Sharma',
    userProfile: {
      ageRange: '25-30',
      familyStatus: 'Single',
      profession: 'Software Engineer',
      duration: '2.5 years'
    },
    ratings: {
      overall: 4.5,
      safety: 5,
      commute: 4,
      amenities: 4.5,
      community: 4,
      valueForMoney: 4
    },
    review: {
      title: 'Perfect for young IT professionals!',
      content: 'HSR Layout has been my home for over 2 years now. The area is incredibly safe, especially for working professionals. The metro connectivity is excellent - I can reach Electronic City in 30 minutes. Plenty of cafes, restaurants, and shopping options. The only downside is the increasing traffic during peak hours.',
      pros: [
        'Excellent metro connectivity',
        'Very safe area',
        'Great food scene',
        'Close to IT hubs',
        'Good shopping options'
      ],
      cons: [
        'Traffic congestion during peak hours',
        'Rent prices increasing rapidly',
        'Limited parking in some areas'
      ],
      bestFor: ['Young professionals', 'IT employees', 'Working singles'],
      wouldRecommend: true
    },
    helpfulVotes: 23,
    createdAt: '2024-03-15',
    verified: true,
    tags: ['IT-friendly', 'Safe', 'Metro access']
  },
  {
    id: 'review-hsr-2',
    userId: 'user-2',
    neighborhoodId: 'hsr-layout',
    userName: 'Abhinav Kumar',
    userProfile: {
      ageRange: '30-35',
      familyStatus: 'Family with Kids',
      profession: 'Product Manager',
      duration: '3 years'
    },
    ratings: {
      overall: 4,
      safety: 5,
      commute: 3.5,
      amenities: 4.5,
      community: 4.5,
      valueForMoney: 3.5
    },
    review: {
      title: 'Great for families but getting expensive',
      content: 'We moved here when our daughter was born. HSR is fantastic for families - good schools, parks, and a very family-friendly community. The 27th Main area is perfect for evening walks with kids. However, the cost of living has increased significantly in the past year.',
      pros: [
        'Excellent schools nearby',
        'Family-friendly environment',
        'Good parks and playgrounds',
        'Strong community feel',
        'Quality healthcare facilities'
      ],
      cons: [
        'Rising cost of living',
        'Traffic during school hours',
        'Limited affordable housing options'
      ],
      bestFor: ['Families with children', 'Working parents'],
      wouldRecommend: true
    },
    helpfulVotes: 18,
    createdAt: '2024-02-28',
    verified: true,
    tags: ['Family-friendly', 'Good schools', 'Community']
  },
  {
    id: 'review-hsr-3',
    userId: 'user-3',
    neighborhoodId: 'hsr-layout',
    userName: 'Anita Desai',
    userProfile: {
      ageRange: '35-40',
      familyStatus: 'Family with Kids',
      profession: 'Marketing Manager',
      duration: '4 years'
    },
    ratings: {
      overall: 4.5,
      safety: 5,
      commute: 4,
      amenities: 4,
      community: 5,
      valueForMoney: 4
    },
    review: {
      title: 'Wonderful community for working mothers',
      content: 'As a working mother, HSR Layout has been a blessing. The community is very supportive, and there are excellent daycare options. The area is extremely safe for children, and the schools are top-notch. My kids love the parks here, especially the one near BDA Complex.',
      pros: [
        'Excellent safety for children',
        'Great schools and daycares',
        'Supportive parent community',
        'Beautiful parks',
        'Good healthcare facilities'
      ],
      cons: [
        'Expensive housing',
        'Traffic during drop-off times',
        'Limited parking near schools'
      ],
      bestFor: ['Working mothers', 'Families with young children'],
      wouldRecommend: true
    },
    helpfulVotes: 31,
    createdAt: '2024-01-10',
    verified: true,
    tags: ['Working mothers', 'Child-safe', 'Community']
  },

  // Koramangala Reviews
  {
    id: 'review-krmgl-1',
    userId: 'user-4',
    neighborhoodId: 'koramangala',
    userName: 'Rishant Gupta',
    userProfile: {
      ageRange: '25-30',
      familyStatus: 'Single',
      profession: 'Startup Founder',
      duration: '1.5 years'
    },
    ratings: {
      overall: 4.5,
      safety: 4,
      commute: 5,
      amenities: 5,
      community: 4.5,
      valueForMoney: 3
    },
    review: {
      title: 'Startup ecosystem paradise but expensive',
      content: 'Koramangala is the heart of Bangalore\'s startup scene. Living here means you\'re always connected to the entrepreneurial community. Amazing restaurants, pubs, and networking opportunities. The downside? It\'s quite expensive and can get very noisy, especially on weekends.',
      pros: [
        'Vibrant startup ecosystem',
        'Excellent nightlife',
        'Best restaurants in Bangalore',
        'Great networking opportunities',
        'Central location'
      ],
      cons: [
        'Very expensive',
        'Noisy, especially weekends',
        'Traffic congestion',
        'Limited parking'
      ],
      bestFor: ['Entrepreneurs', 'Young professionals', 'Nightlife enthusiasts'],
      wouldRecommend: true
    },
    helpfulVotes: 31,
    createdAt: '2024-04-10',
    verified: true,
    tags: ['Startup hub', 'Nightlife', 'Expensive', 'Central']
  },
  {
    id: 'review-krmgl-2',
    userId: 'user-5',
    neighborhoodId: 'koramangala',
    userName: 'Ketan Mishra',
    userProfile: {
      ageRange: '25-30',
      familyStatus: 'Couple',
      profession: 'Software Developer',
      duration: '2 years'
    },
    ratings: {
      overall: 4,
      safety: 4,
      commute: 4.5,
      amenities: 5,
      community: 4,
      valueForMoney: 3
    },
    review: {
      title: 'Great for young couples but budget carefully',
      content: 'My wife and I love the energy of Koramangala. There\'s always something happening - new restaurants, events, meetups. The food scene is incredible, and we can walk to most places. However, we spend way more than we planned on dining out and entertainment.',
      pros: [
        'Amazing food scene',
        'Walkable to most amenities',
        'Vibrant social life',
        'Great for couples',
        'Excellent connectivity'
      ],
      cons: [
        'High cost of living',
        'Temptation to overspend',
        'Noisy at night',
        'Parking issues'
      ],
      bestFor: ['Young couples', 'Food enthusiasts', 'Social butterflies'],
      wouldRecommend: true
    },
    helpfulVotes: 19,
    createdAt: '2024-03-22',
    verified: true,
    tags: ['Couples', 'Food scene', 'Social life']
  },
  {
    id: 'review-krmgl-3',
    userId: 'user-6',
    neighborhoodId: 'koramangala',
    userName: 'Shivangi Agarwal',
    userProfile: {
      ageRange: '25-30',
      familyStatus: 'Single',
      profession: 'Digital Marketing Manager',
      duration: '1 year'
    },
    ratings: {
      overall: 4.5,
      safety: 4.5,
      commute: 4,
      amenities: 5,
      community: 4,
      valueForMoney: 3.5
    },
    review: {
      title: 'Perfect for independent women professionals',
      content: 'As a single woman, I feel very safe in Koramangala. The area is well-lit, there are always people around, and the community is very welcoming. I love the independence of being able to walk to cafes, gyms, and work spaces. The only challenge is finding affordable housing.',
      pros: [
        'Very safe for women',
        'Great work-life balance',
        'Excellent cafes and co-working spaces',
        'Active social scene',
        'Good public transport'
      ],
      cons: [
        'Expensive rent',
        'Limited affordable housing',
        'Can be overwhelming initially',
        'Traffic during peak hours'
      ],
      bestFor: ['Independent women', 'Remote workers', 'Creative professionals'],
      wouldRecommend: true
    },
    helpfulVotes: 27,
    createdAt: '2024-02-14',
    verified: true,
    tags: ['Women-safe', 'Independent living', 'Creative hub']
  },

  // Indiranagar Reviews
  {
    id: 'review-indr-1',
    userId: 'user-7',
    neighborhoodId: 'indiranagar',
    userName: 'Badal Singh',
    userProfile: {
      ageRange: '35-40',
      familyStatus: 'Couple',
      profession: 'Creative Director',
      duration: '5 years'
    },
    ratings: {
      overall: 4.5,
      safety: 4,
      commute: 4.5,
      amenities: 5,
      community: 5,
      valueForMoney: 3
    },
    review: {
      title: 'Cultural heart of Bangalore - worth the premium',
      content: 'Indiranagar has this unique charm that you won\'t find anywhere else in Bangalore. The tree-lined streets, independent cafes, art galleries, and the overall cultural vibe make it special. Yes, it\'s expensive, but the quality of life and community here is unmatched.',
      pros: [
        'Rich cultural scene',
        'Beautiful tree-lined streets',
        'Excellent restaurants and cafes',
        'Strong community bonds',
        'Great walkability',
        'Metro connectivity'
      ],
      cons: [
        'Very expensive',
        'Parking is a nightmare',
        'Can get crowded on weekends',
        'Old infrastructure in some areas'
      ],
      bestFor: ['Creative professionals', 'Culture enthusiasts', 'Established professionals'],
      wouldRecommend: true
    },
    helpfulVotes: 27,
    createdAt: '2024-03-05',
    verified: true,
    tags: ['Cultural hub', 'Expensive', 'Walkable', 'Community']
  },
  {
    id: 'review-indr-2',
    userId: 'user-8',
    neighborhoodId: 'indiranagar',
    userName: 'Priyansh Jain',
    userProfile: {
      ageRange: '30-35',
      familyStatus: 'Family with Kids',
      profession: 'Architect',
      duration: '3 years'
    },
    ratings: {
      overall: 4,
      safety: 4.5,
      commute: 4,
      amenities: 4.5,
      community: 4.5,
      valueForMoney: 3
    },
    review: {
      title: 'Great for families who value culture and community',
      content: 'We moved to Indiranagar for the community feel and cultural richness. Our kids love the parks, especially Cubbon Park nearby. The schools are good, and there\'s a strong sense of neighborhood. The main challenge is the cost and finding parking.',
      pros: [
        'Strong neighborhood community',
        'Good schools nearby',
        'Cultural activities for kids',
        'Beautiful green spaces',
        'Safe for children'
      ],
      cons: [
        'High cost of living',
        'Parking challenges',
        'Traffic congestion',
        'Limited affordable options'
      ],
      bestFor: ['Families valuing culture', 'Established professionals', 'Art lovers'],
      wouldRecommend: true
    },
    helpfulVotes: 22,
    createdAt: '2024-01-28',
    verified: true,
    tags: ['Family culture', 'Community', 'Arts']
  },

  // Whitefield Reviews
  {
    id: 'review-wf-1',
    userId: 'user-9',
    neighborhoodId: 'whitefield',
    userName: 'Prince Kumar',
    userProfile: {
      ageRange: '30-35',
      familyStatus: 'Couple',
      profession: 'IT Consultant',
      duration: '4 years'
    },
    ratings: {
      overall: 4,
      safety: 5,
      commute: 3,
      amenities: 4,
      community: 4,
      valueForMoney: 4.5
    },
    review: {
      title: 'Peaceful suburban life with good value',
      content: 'Whitefield offers a perfect balance of city amenities and suburban peace. It\'s much more affordable than central Bangalore while still having good infrastructure. The IT parks nearby make it convenient for tech workers. The main challenge is commuting to other parts of the city.',
      pros: [
        'Affordable housing',
        'Very safe and peaceful',
        'Good IT infrastructure',
        'Less crowded than central areas',
        'Better air quality'
      ],
      cons: [
        'Far from city center',
        'Limited public transport',
        'Fewer entertainment options',
        'Commute to other areas is difficult'
      ],
      bestFor: ['IT professionals', 'Families seeking peace', 'Budget-conscious'],
      wouldRecommend: true
    },
    helpfulVotes: 15,
    createdAt: '2024-01-20',
    verified: true,
    tags: ['Affordable', 'IT hub', 'Peaceful', 'Suburban']
  },
  {
    id: 'review-wf-2',
    userId: 'user-10',
    neighborhoodId: 'whitefield',
    userName: 'Sachin Reddy',
    userProfile: {
      ageRange: '25-30',
      familyStatus: 'Single',
      profession: 'Software Engineer',
      duration: '2 years'
    },
    ratings: {
      overall: 4.5,
      safety: 5,
      commute: 4,
      amenities: 3.5,
      community: 4,
      valueForMoney: 5
    },
    review: {
      title: 'Best value for money in Bangalore',
      content: 'As someone who works in Whitefield, living here has been a game-changer. I save so much on rent compared to central areas, and my commute is just 15 minutes. The area is developing rapidly with new malls and restaurants. Perfect for saving money while building career.',
      pros: [
        'Excellent value for money',
        'Short commute to IT companies',
        'Rapidly developing infrastructure',
        'Very safe area',
        'Good for savings'
      ],
      cons: [
        'Limited nightlife options',
        'Far from friends in central Bangalore',
        'Fewer cultural activities',
        'Dependent on cabs for city trips'
      ],
      bestFor: ['IT professionals', 'Budget-conscious individuals', 'Career starters'],
      wouldRecommend: true
    },
    helpfulVotes: 20,
    createdAt: '2024-04-02',
    verified: true,
    tags: ['Value for money', 'IT professionals', 'Savings']
  },
  {
    id: 'review-wf-3',
    userId: 'user-11',
    neighborhoodId: 'whitefield',
    userName: 'Abhishek Sharma',
    userProfile: {
      ageRange: '30-35',
      familyStatus: 'Family with Kids',
      profession: 'Technical Lead',
      duration: '3.5 years'
    },
    ratings: {
      overall: 4.5,
      safety: 5,
      commute: 4,
      amenities: 4,
      community: 4.5,
      valueForMoney: 4.5
    },
    review: {
      title: 'Perfect for IT families with children',
      content: 'We moved to Whitefield when our son started school. The international schools here are excellent, and the gated communities are very family-friendly. Kids have plenty of space to play, and the air quality is much better than central Bangalore. Great choice for IT families.',
      pros: [
        'Excellent international schools',
        'Family-friendly gated communities',
        'Better air quality',
        'Safe for children',
        'Good recreational facilities'
      ],
      cons: [
        'Limited cultural activities',
        'Distance from extended family in city',
        'Fewer dining options',
        'Weekend traffic to city'
      ],
      bestFor: ['IT families', 'Parents with school-age children', 'Health-conscious families'],
      wouldRecommend: true
    },
    helpfulVotes: 25,
    createdAt: '2024-02-18',
    verified: true,
    tags: ['IT families', 'Schools', 'Gated communities']
  },

  // JP Nagar Reviews
  {
    id: 'review-jp-1',
    userId: 'user-12',
    neighborhoodId: 'jp-nagar',
    userName: 'Ravi Patel',
    userProfile: {
      ageRange: '35-40',
      familyStatus: 'Family with Kids',
      profession: 'Bank Manager',
      duration: '6 years'
    },
    ratings: {
      overall: 4,
      safety: 4.5,
      commute: 3.5,
      amenities: 4,
      community: 4.5,
      valueForMoney: 4.5
    },
    review: {
      title: 'Established family neighborhood with great value',
      content: 'JP Nagar is a well-established area that\'s perfect for middle-class families. Good schools, hospitals, and a strong sense of community. The area has been our home for 6 years, and we\'ve seen it develop beautifully while maintaining its family-friendly character.',
      pros: [
        'Well-established infrastructure',
        'Good schools and hospitals',
        'Strong family community',
        'Reasonable housing costs',
        'Good connectivity to other areas'
      ],
      cons: [
        'Traffic during peak hours',
        'Limited modern amenities',
        'Fewer entertainment options',
        'Aging infrastructure in some parts'
      ],
      bestFor: ['Middle-class families', 'Established professionals', 'Long-term residents'],
      wouldRecommend: true
    },
    helpfulVotes: 16,
    createdAt: '2024-03-12',
    verified: true,
    tags: ['Family neighborhood', 'Established', 'Value for money']
  },
  {
    id: 'review-jp-2',
    userId: 'user-13',
    neighborhoodId: 'jp-nagar',
    userName: 'Meera Krishnan',
    userProfile: {
      ageRange: '40-45',
      familyStatus: 'Family with Kids',
      profession: 'Teacher',
      duration: '8 years'
    },
    ratings: {
      overall: 4.5,
      safety: 5,
      commute: 4,
      amenities: 4,
      community: 5,
      valueForMoney: 4
    },
    review: {
      title: 'Wonderful community for raising children',
      content: 'As an educator and mother, I can confidently say JP Nagar is one of the best places to raise children in Bangalore. The community is very supportive, schools are excellent, and children can play safely in the parks. The traditional values combined with modern amenities make it special.',
      pros: [
        'Excellent schools',
        'Very safe for children',
        'Strong community support',
        'Good parks and playgrounds',
        'Traditional family values'
      ],
      cons: [
        'Limited job opportunities locally',
        'Fewer modern entertainment options',
        'Traffic during school hours',
        'Some areas need infrastructure upgrade'
      ],
      bestFor: ['Families with children', 'Educators', 'Traditional families'],
      wouldRecommend: true
    },
    helpfulVotes: 21,
    createdAt: '2024-01-05',
    verified: true,
    tags: ['Child-friendly', 'Education', 'Community values']
  },

  // Electronic City Reviews
  {
    id: 'review-ec-1',
    userId: 'user-14',
    neighborhoodId: 'electronic-city',
    userName: 'Arjun Nair',
    userProfile: {
      ageRange: '25-30',
      familyStatus: 'Single',
      profession: 'Software Engineer',
      duration: '1.5 years'
    },
    ratings: {
      overall: 4,
      safety: 4.5,
      commute: 5,
      amenities: 3.5,
      community: 3.5,
      valueForMoney: 4.5
    },
    review: {
      title: 'Great for IT professionals working in Electronic City',
      content: 'If you work in Electronic City, living here is a no-brainer. My commute is just 10 minutes, and I save a lot on transportation. The area is developing fast with new restaurants and shopping options. It\'s not as happening as central Bangalore, but perfect for a focused work life.',
      pros: [
        'Extremely short commute',
        'Affordable housing',
        'Rapidly developing',
        'Good IT infrastructure',
        'Safe and clean'
      ],
      cons: [
        'Limited entertainment options',
        'Far from city center',
        'Fewer social opportunities',
        'Limited public transport'
      ],
      bestFor: ['IT professionals in Electronic City', 'Career-focused individuals', 'Budget-conscious'],
      wouldRecommend: true
    },
    helpfulVotes: 14,
    createdAt: '2024-04-05',
    verified: true,
    tags: ['IT hub', 'Short commute', 'Developing']
  },
  {
    id: 'review-ec-2',
    userId: 'user-15',
    neighborhoodId: 'electronic-city',
    userName: 'Deepika Rao',
    userProfile: {
      ageRange: '30-35',
      familyStatus: 'Couple',
      profession: 'Data Scientist',
      duration: '2 years'
    },
    ratings: {
      overall: 4,
      safety: 5,
      commute: 4.5,
      amenities: 3.5,
      community: 4,
      valueForMoney: 4.5
    },
    review: {
      title: 'Peaceful and affordable for young couples',
      content: 'My husband and I chose Electronic City for the affordability and peace. We both work in tech, and the short commute gives us more time together. The area is very safe, and we\'re saving a lot compared to our friends in central Bangalore. Planning to buy a house here soon.',
      pros: [
        'Very affordable',
        'Excellent safety',
        'Short commute for IT couples',
        'Peaceful environment',
        'Good for savings and investment'
      ],
      cons: [
        'Limited social scene',
        'Fewer dining options',
        'Distance from family/friends in city',
        'Limited weekend activities'
      ],
      bestFor: ['IT couples', 'First-time home buyers', 'Savings-focused individuals'],
      wouldRecommend: true
    },
    helpfulVotes: 18,
    createdAt: '2024-02-22',
    verified: true,
    tags: ['IT couples', 'Affordable', 'Investment']
  },

  // Malleshwaram Reviews
  {
    id: 'review-mlsw-1',
    userId: 'user-16',
    neighborhoodId: 'malleshwaram',
    userName: 'Suresh Iyer',
    userProfile: {
      ageRange: '45+',
      familyStatus: 'Family with Kids',
      profession: 'Government Officer',
      duration: '12 years'
    },
    ratings: {
      overall: 4.5,
      safety: 5,
      commute: 4,
      amenities: 4,
      community: 5,
      valueForMoney: 4
    },
    review: {
      title: 'Traditional Bangalore at its best',
      content: 'Malleshwaram represents the old-world charm of Bangalore. We\'ve been here for over a decade, and the sense of community is unmatched. Great temples, traditional shops, excellent South Indian food, and a very safe environment for families. Perfect for those who value culture and tradition.',
      pros: [
        'Strong traditional community',
        'Excellent South Indian food',
        'Very safe for families',
        'Good schools and colleges',
        'Rich cultural heritage'
      ],
      cons: [
        'Limited modern amenities',
        'Fewer job opportunities for youth',
        'Traffic in narrow roads',
        'Limited nightlife'
      ],
      bestFor: ['Traditional families', 'Senior citizens', 'Culture enthusiasts'],
      wouldRecommend: true
    },
    helpfulVotes: 19,
    createdAt: '2024-03-01',
    verified: true,
    tags: ['Traditional', 'Cultural', 'Family values']
  },
  {
    id: 'review-mlsw-2',
    userId: 'user-17',
    neighborhoodId: 'malleshwaram',
    userName: 'Lakshmi Venkatesh',
    userProfile: {
      ageRange: '35-40',
      familyStatus: 'Family with Kids',
      profession: 'Classical Music Teacher',
      duration: '7 years'
    },
    ratings: {
      overall: 4.5,
      safety: 5,
      commute: 3.5,
      amenities: 4,
      community: 5,
      valueForMoney: 4
    },
    review: {
      title: 'Perfect for preserving cultural values',
      content: 'As a classical music teacher, Malleshwaram provides the perfect environment for my profession and family. The area has a rich cultural heritage, and many families here value arts and education. My children are growing up with strong cultural roots while getting modern education.',
      pros: [
        'Rich cultural environment',
        'Excellent for arts and music',
        'Strong educational values',
        'Safe for children',
        'Traditional community support'
      ],
      cons: [
        'Limited modern entertainment',
        'Traffic in old roads',
        'Fewer career opportunities for youth',
        'Limited parking'
      ],
      bestFor: ['Artists and musicians', 'Cultural families', 'Traditional educators'],
      wouldRecommend: true
    },
    helpfulVotes: 23,
    createdAt: '2024-01-15',
    verified: true,
    tags: ['Arts', 'Culture', 'Education']
  },

  // BTM Layout Reviews
  {
    id: 'review-btm-1',
    userId: 'user-18',
    neighborhoodId: 'btm-layout',
    userName: 'Rohit Agarwal',
    userProfile: {
      ageRange: '25-30',
      familyStatus: 'Single',
      profession: 'Marketing Executive',
      duration: '2 years'
    },
    ratings: {
      overall: 4,
      safety: 4,
      commute: 4,
      amenities: 4,
      community: 4,
      valueForMoney: 4.5
    },
    review: {
      title: 'Good balance of affordability and connectivity',
      content: 'BTM Layout offers a great balance for young professionals. It\'s more affordable than premium areas but still well-connected to the city. Good food options, decent nightlife, and a mix of working professionals. Perfect for someone starting their career in Bangalore.',
      pros: [
        'Affordable housing options',
        'Good connectivity',
        'Decent food scene',
        'Mix of young professionals',
        'Reasonable commute to most areas'
      ],
      cons: [
        'Can get crowded',
        'Traffic during peak hours',
        'Limited premium amenities',
        'Noise from main roads'
      ],
      bestFor: ['Young professionals', 'Career starters', 'Budget-conscious individuals'],
      wouldRecommend: true
    },
    helpfulVotes: 12,
    createdAt: '2024-04-01',
    verified: true,
    tags: ['Affordable', 'Young professionals', 'Connectivity']
  },
  {
    id: 'review-btm-2',
    userId: 'user-19',
    neighborhoodId: 'btm-layout',
    userName: 'Priya Nambiar',
    userProfile: {
      ageRange: '30-35',
      familyStatus: 'Couple',
      profession: 'HR Manager',
      duration: '3 years'
    },
    ratings: {
      overall: 4,
      safety: 4,
      commute: 4,
      amenities: 4,
      community: 4,
      valueForMoney: 4
    },
    review: {
      title: 'Practical choice for working couples',
      content: 'My husband and I chose BTM for its practical advantages. Good connectivity to both our offices, reasonable rent, and all necessary amenities nearby. It\'s not the most glamorous area, but it serves our needs well. Good stepping stone before moving to a premium area.',
      pros: [
        'Good connectivity to multiple areas',
        'Practical for working couples',
        'All amenities available',
        'Reasonable cost of living',
        'Good public transport'
      ],
      cons: [
        'Not very upscale',
        'Traffic congestion',
        'Limited premium dining',
        'Can be noisy'
      ],
      bestFor: ['Working couples', 'Practical individuals', 'Transit residents'],
      wouldRecommend: true
    },
    helpfulVotes: 15,
    createdAt: '2024-02-10',
    verified: true,
    tags: ['Working couples', 'Practical', 'Transit']
  }
];

export const experienceStats: Record<string, ExperienceStats> = {
  'hsr-layout': {
    totalReviews: 67,
    averageRating: 4.3,
    ratingDistribution: {
      5: 25,
      4: 28,
      3: 10,
      2: 3,
      1: 1
    },
    topPros: [
      'Excellent metro connectivity',
      'Very safe area',
      'Great food scene',
      'Family-friendly environment',
      'Good schools nearby',
      'Quality healthcare facilities'
    ],
    topCons: [
      'Traffic congestion during peak hours',
      'Rising rent prices',
      'Limited parking',
      'Crowded on weekends',
      'Expensive housing'
    ],
    recommendationRate: 91,
    demographics: {
      youngProfessionals: 45,
      families: 40,
      seniors: 8,
      couples: 7
    },
    averageStayDuration: '3.1 years',
    verifiedResidentPercentage: 82
  },
  'koramangala': {
    totalReviews: 78,
    averageRating: 4.2,
    ratingDistribution: {
      5: 28,
      4: 32,
      3: 14,
      2: 4,
      1: 0
    },
    topPros: [
      'Vibrant startup ecosystem',
      'Excellent nightlife',
      'Best restaurants in Bangalore',
      'Central location',
      'Great networking opportunities',
      'Safe for women'
    ],
    topCons: [
      'Very expensive',
      'Noisy, especially weekends',
      'Traffic congestion',
      'Limited parking',
      'High cost of living'
    ],
    recommendationRate: 85,
    demographics: {
      youngProfessionals: 60,
      families: 15,
      seniors: 5,
      couples: 20
    },
    averageStayDuration: '2.3 years',
    verifiedResidentPercentage: 75
  },
  'indiranagar': {
    totalReviews: 58,
    averageRating: 4.3,
    ratingDistribution: {
      5: 22,
      4: 26,
      3: 8,
      2: 2,
      1: 0
    },
    topPros: [
      'Rich cultural scene',
      'Beautiful tree-lined streets',
      'Excellent restaurants and cafes',
      'Great walkability',
      'Strong community bonds',
      'Metro connectivity'
    ],
    topCons: [
      'Very expensive',
      'Parking nightmare',
      'Crowded on weekends',
      'Old infrastructure in some areas',
      'High cost of living'
    ],
    recommendationRate: 88,
    demographics: {
      youngProfessionals: 35,
      families: 30,
      seniors: 15,
      couples: 20
    },
    averageStayDuration: '3.8 years',
    verifiedResidentPercentage: 79
  },
  'whitefield': {
    totalReviews: 45,
    averageRating: 4.2,
    ratingDistribution: {
      5: 18,
      4: 20,
      3: 6,
      2: 1,
      1: 0
    },
    topPros: [
      'Affordable housing',
      'Very safe and peaceful',
      'Good IT infrastructure',
      'Better air quality',
      'Excellent value for money',
      'Family-friendly gated communities'
    ],
    topCons: [
      'Far from city center',
      'Limited public transport',
      'Fewer entertainment options',
      'Commute challenges',
      'Limited cultural activities'
    ],
    recommendationRate: 87,
    demographics: {
      youngProfessionals: 50,
      families: 35,
      seniors: 8,
      couples: 7
    },
    averageStayDuration: '3.4 years',
    verifiedResidentPercentage: 84
  },
  'jp-nagar': {
    totalReviews: 42,
    averageRating: 4.1,
    ratingDistribution: {
      5: 15,
      4: 20,
      3: 6,
      2: 1,
      1: 0
    },
    topPros: [
      'Well-established infrastructure',
      'Good schools and hospitals',
      'Strong family community',
      'Reasonable housing costs',
      'Safe for children',
      'Traditional family values'
    ],
    topCons: [
      'Traffic during peak hours',
      'Limited modern amenities',
      'Fewer entertainment options',
      'Aging infrastructure in some parts',
      'Limited job opportunities locally'
    ],
    recommendationRate: 83,
    demographics: {
      youngProfessionals: 25,
      families: 55,
      seniors: 15,
      couples: 5
    },
    averageStayDuration: '4.2 years',
    verifiedResidentPercentage: 88
  },
  'electronic-city': {
    totalReviews: 38,
    averageRating: 4.0,
    ratingDistribution: {
      5: 12,
      4: 18,
      3: 7,
      2: 1,
      1: 0
    },
    topPros: [
      'Extremely short commute for IT',
      'Affordable housing',
      'Rapidly developing',
      'Very safe and clean',
      'Good for savings',
      'Peaceful environment'
    ],
    topCons: [
      'Limited entertainment options',
      'Far from city center',
      'Fewer social opportunities',
      'Limited public transport',
      'Distance from family/friends'
    ],
    recommendationRate: 82,
    demographics: {
      youngProfessionals: 65,
      families: 20,
      seniors: 5,
      couples: 10
    },
    averageStayDuration: '2.8 years',
    verifiedResidentPercentage: 81
  },
  'malleshwaram': {
    totalReviews: 35,
    averageRating: 4.4,
    ratingDistribution: {
      5: 16,
      4: 15,
      3: 4,
      2: 0,
      1: 0
    },
    topPros: [
      'Strong traditional community',
      'Excellent South Indian food',
      'Very safe for families',
      'Rich cultural heritage',
      'Good schools and colleges',
      'Traditional family values'
    ],
    topCons: [
      'Limited modern amenities',
      'Traffic in narrow roads',
      'Fewer job opportunities for youth',
      'Limited nightlife',
      'Limited parking'
    ],
    recommendationRate: 89,
    demographics: {
      youngProfessionals: 20,
      families: 50,
      seniors: 25,
      couples: 5
    },
    averageStayDuration: '5.1 years',
    verifiedResidentPercentage: 92
  },
  'btm-layout': {
    totalReviews: 33,
    averageRating: 3.9,
    ratingDistribution: {
      5: 10,
      4: 16,
      3: 6,
      2: 1,
      1: 0
    },
    topPros: [
      'Affordable housing options',
      'Good connectivity',
      'Practical for working couples',
      'All amenities available',
      'Reasonable cost of living',
      'Good public transport'
    ],
    topCons: [
      'Can get crowded',
      'Traffic during peak hours',
      'Limited premium amenities',
      'Noise from main roads',
      'Not very upscale'
    ],
    recommendationRate: 79,
    demographics: {
      youngProfessionals: 55,
      families: 25,
      seniors: 8,
      couples: 12
    },
    averageStayDuration: '2.6 years',
    verifiedResidentPercentage: 76
  }
};

export const getUserReviewsForNeighborhood = (neighborhoodId: string): UserReview[] => {
  return sampleUserReviews.filter(review => review.neighborhoodId === neighborhoodId);
};

export const getExperienceStats = (neighborhoodId: string): ExperienceStats | undefined => {
  return experienceStats[neighborhoodId];
};