# Testing Guide

## 🧪 Testing Strategy

NeighborFit uses a comprehensive testing approach to ensure reliability and quality.

## 🛠️ Testing Setup

### Prerequisites
```bash
# Install testing dependencies
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event jsdom
```

### Configuration

#### `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
});
```

#### `src/test/setup.ts`
```typescript
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
```

## 🧩 Test Categories

### 1. Unit Tests

#### Component Tests
```typescript
// src/components/__tests__/SliderInput.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SliderInput } from '../SliderInput';

describe('SliderInput', () => {
  test('renders with correct label', () => {
    render(
      <SliderInput
        label="Test Slider"
        value={3}
        onChange={() => {}}
      />
    );
    
    expect(screen.getByText('Test Slider')).toBeInTheDocument();
  });

  test('calls onChange when value changes', () => {
    const handleChange = vi.fn();
    render(
      <SliderInput
        label="Test Slider"
        value={3}
        onChange={handleChange}
      />
    );
    
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '4' } });
    
    expect(handleChange).toHaveBeenCalledWith(4);
  });
});
```

#### Algorithm Tests
```typescript
// src/utils/__tests__/matchingAlgorithm.test.ts
import { NeighborhoodMatcher } from '../matchingAlgorithm';
import { mockPreferences, mockNeighborhood } from '../test/mocks';

describe('NeighborhoodMatcher', () => {
  let matcher: NeighborhoodMatcher;

  beforeEach(() => {
    matcher = new NeighborhoodMatcher();
  });

  test('calculates match score correctly', () => {
    const result = matcher.calculateMatch(mockPreferences, mockNeighborhood);
    
    expect(result.matchScore).toBeGreaterThan(0);
    expect(result.matchScore).toBeLessThanOrEqual(100);
    expect(result.matchBreakdown).toHaveProperty('lifestyle');
    expect(result.matchBreakdown).toHaveProperty('housing');
    expect(result.matchBreakdown).toHaveProperty('commute');
    expect(result.matchBreakdown).toHaveProperty('priorities');
  });

  test('generates pros and cons', () => {
    const result = matcher.calculateMatch(mockPreferences, mockNeighborhood);
    
    expect(Array.isArray(result.pros)).toBe(true);
    expect(Array.isArray(result.cons)).toBe(true);
    expect(result.pros.length).toBeGreaterThan(0);
  });
});
```

### 2. Integration Tests

#### Assessment Flow Test
```typescript
// src/components/__tests__/Assessment.integration.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Assessment } from '../Assessment';

describe('Assessment Integration', () => {
  test('completes full assessment flow', async () => {
    const handleComplete = vi.fn();
    render(<Assessment onComplete={handleComplete} />);
    
    // Start assessment
    fireEvent.click(screen.getByText('Start Your Assessment'));
    
    // Fill lifestyle preferences
    const walkabilitySlider = screen.getByLabelText(/walkability/i);
    fireEvent.change(walkabilitySlider, { target: { value: '4' } });
    
    fireEvent.click(screen.getByText('Continue'));
    
    // Continue through all steps...
    // (Add more steps as needed)
    
    await waitFor(() => {
      expect(handleComplete).toHaveBeenCalled();
    });
  });
});
```

### 3. End-to-End Tests

#### User Journey Test
```typescript
// e2e/user-journey.test.ts
import { test, expect } from '@playwright/test';

test('complete user journey', async ({ page }) => {
  await page.goto('/');
  
  // Start assessment
  await page.click('text=Start Your Assessment');
  
  // Fill out assessment
  await page.fill('[data-testid="walkability-slider"]', '4');
  await page.click('text=Continue');
  
  // Complete housing step
  await page.fill('[data-testid="budget-input"]', '30000');
  await page.click('text=Continue');
  
  // Complete commute step
  await page.check('text=Namma Metro');
  await page.click('text=Continue');
  
  // Complete priorities step
  await page.fill('[data-testid="safety-slider"]', '5');
  await page.click('text=Get My Results');
  
  // Verify results
  await expect(page.locator('[data-testid="results-container"]')).toBeVisible();
  await expect(page.locator('[data-testid="neighborhood-card"]')).toHaveCount.greaterThan(0);
});
```

### 4. Authentication & Navigation Tests

#### Authentication
- Attempt to log in with an email that has not been signed up: login should fail.
- Sign up with a new email and password, then log in: login should succeed.
- Attempt to sign up with an existing email: sign up should fail with an error.

#### Navigation
- Click 'How it Works' in the header: page should smoothly scroll to the How it Works section.
- Click 'Neighborhoods' in the header: page should smoothly scroll to the neighborhoods/results section.
- Click 'About' in the header: About modal should open with project info and close when clicking the close button.

## 🎯 Test Data

### Mock Data
```typescript
// src/test/mocks.ts
export const mockPreferences: UserPreferences = {
  commute: {
    maxTime: 45,
    transportModes: ['Namma Metro'],
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
  // ... rest of the neighborhood data
};
```

## 📊 Coverage Reports

### Generate Coverage
```bash
# Run tests with coverage
npm run test:coverage

# View coverage report
open coverage/index.html
```

### Coverage Targets
- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## 🔄 Continuous Integration

### GitHub Actions
```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run test:coverage
      - run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## 🐛 Testing Best Practices

### 1. Test Structure
- **Arrange**: Set up test data
- **Act**: Execute the function
- **Assert**: Verify the results

### 2. Test Naming
```typescript
// Good
test('should calculate correct match score for high-preference user')

// Bad
test('test match calculation')
```

### 3. Test Independence
- Each test should be independent
- Use `beforeEach` for setup
- Clean up after tests

### 4. Mock External Dependencies
```typescript
// Mock Google Maps API
vi.mock('google-maps-api', () => ({
  load: vi.fn().mockResolvedValue({
    maps: {
      Map: vi.fn(),
      Marker: vi.fn()
    }
  })
}));
```

## 🚀 Running Tests

### Development
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test SliderInput

# Run tests with coverage
npm run test:coverage
```

### CI/CD
```bash
# Run all tests (no watch mode)
npm run test:ci

# Run E2E tests
npm run test:e2e

# Run performance tests
npm run test:performance
```

## 📈 Performance Testing

### Load Testing
```typescript
// src/test/performance.test.ts
import { performance } from 'perf_hooks';

describe('Performance Tests', () => {
  test('matching algorithm performance', () => {
    const start = performance.now();
    
    // Run matching algorithm 1000 times
    for (let i = 0; i < 1000; i++) {
      matcher.calculateMatch(mockPreferences, mockNeighborhood);
    }
    
    const end = performance.now();
    const duration = end - start;
    
    // Should complete 1000 calculations in under 1 second
    expect(duration).toBeLessThan(1000);
  });
});
```

## 🔍 Debugging Tests

### Debug Configuration
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
      "args": ["run", "--reporter=verbose"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## 📊 User Research Integration in Testing

### Research-Driven Test Cases
Based on our [user research survey](https://forms.gle/vypFdC62y374Wx4WA) and [results analysis](https://docs.google.com/spreadsheets/d/1YeIARijTcO2haCy4ahZgfHgsOsHe9_fZwyqedbYsCJg/edit?usp=sharing):

#### User Behavior Tests
```typescript
// Test based on research finding: 89% complete assessment
test('assessment completion rate should be high', () => {
  // Test that users can complete assessment easily
});

// Test based on research finding: 85% use mobile
test('mobile experience should be optimized', () => {
  // Test mobile responsiveness and touch interactions
});

// Test based on research finding: 91% want personalized matching
test('matching algorithm should provide personalized results', () => {
  // Test that different preferences yield different results
});
```

#### Performance Tests Based on User Expectations
```typescript
// Test based on research finding: Users abandon after 3s
test('initial load should be under 3 seconds', () => {
  // Performance test for loading time
});

// Test based on research finding: 60% reduction in decision time target
test('assessment should complete in under 10 minutes', () => {
  // Test assessment flow timing
});
```

## 📞 Support

For testing-related questions:
- Check existing test examples
- Review testing documentation
- Ask in [GitHub discussions](https://github.com/KetanMishra/NeighborFit/discussions)
- Contact: testing@neighborfit.com