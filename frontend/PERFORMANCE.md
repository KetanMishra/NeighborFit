# Performance Optimization Guide

## 📊 Performance Metrics

### Current Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Performance Targets
- **Lighthouse Score**: > 90
- **Bundle Size**: < 500KB (gzipped)
- **Load Time**: < 2s on 3G
- **Memory Usage**: < 50MB

## 🚀 Optimization Strategies

### 1. Bundle Optimization

#### Code Splitting
```typescript
// Lazy load components
const ResultsView = lazy(() => import('./components/results/ResultsView'));
const NeighborhoodDetail = lazy(() => import('./components/results/NeighborhoodDetail'));

// Route-based splitting
const Assessment = lazy(() => import('./components/Assessment'));
```

#### Tree Shaking
```typescript
// Good: Import only what you need
import { MapPin, Home } from 'lucide-react';

// Bad: Import entire library
import * as Icons from 'lucide-react';
```

#### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Check for duplicate dependencies
npx duplicate-package-checker
```

### 2. Image Optimization

#### Responsive Images
```typescript
const getOptimizedImage = (name: string, size: 'small' | 'medium' | 'large') => {
  const sizes = {
    small: 'w=400',
    medium: 'w=800', 
    large: 'w=1200'
  };
  
  return `https://images.pexels.com/photos/${name}?auto=compress&cs=tinysrgb&${sizes[size]}`;
};
```

#### Lazy Loading
```typescript
const LazyImage = ({ src, alt, className }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};
```

### 3. State Management Optimization

#### Memoization
```typescript
// Memoize expensive calculations
const memoizedMatches = useMemo(() => {
  return neighborhoods.map(neighborhood => 
    matcher.calculateMatch(preferences, neighborhood)
  ).sort((a, b) => b.matchScore - a.matchScore);
}, [preferences, neighborhoods]);

// Memoize components
const NeighborhoodCard = memo(({ match, onViewDetails, onCompare }: Props) => {
  // Component implementation
});
```

#### Debounced Updates
```typescript
const useDebouncedValue = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Usage in slider component
const debouncedValue = useDebouncedValue(value, 300);
```

### 4. Rendering Optimization

#### Virtual Scrolling
```typescript
const VirtualizedList = ({ items, itemHeight, containerHeight }: Props) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(startIndex, endIndex);
  
  return (
    <div 
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div
            key={startIndex + index}
            style={{
              position: 'absolute',
              top: (startIndex + index) * itemHeight,
              height: itemHeight,
              width: '100%'
            }}
          >
            <ItemComponent item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
```

#### Intersection Observer
```typescript
const useIntersectionObserver = (
  ref: RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
};
```

### 5. Network Optimization

#### Service Worker
```typescript
// public/sw.js
const CACHE_NAME = 'neighborfit-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```

#### Resource Hints
```html
<!-- Preload critical resources -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

<!-- Prefetch likely next pages -->
<link rel="prefetch" href="/results">

<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://images.pexels.com">
<link rel="preconnect" href="https://maps.googleapis.com">
```

## 📈 Performance Monitoring

### Core Web Vitals
```typescript
// utils/performance.ts
export const measureWebVitals = () => {
  // Largest Contentful Paint
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // First Input Delay
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      console.log('FID:', entry.processingStart - entry.startTime);
    });
  }).observe({ entryTypes: ['first-input'] });

  // Cumulative Layout Shift
  new PerformanceObserver((list) => {
    let clsValue = 0;
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    console.log('CLS:', clsValue);
  }).observe({ entryTypes: ['layout-shift'] });
};
```

### Performance Budget
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react'],
        }
      }
    }
  },
  // Performance budget
  build: {
    chunkSizeWarningLimit: 500, // 500kb warning
  }
});
```

## 🔧 Build Optimization

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    // Compress assets
    compression({
      algorithm: 'gzip',
      threshold: 1024,
    }),
    // Analyze bundle
    bundleAnalyzer({
      analyzerMode: 'static',
      openAnalyzer: false,
    })
  ],
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('components/results')) {
            return 'results';
          }
          if (id.includes('components/assessment')) {
            return 'assessment';
          }
        },
      },
    },
  },
});
```

### CSS Optimization
```css
/* Use CSS containment */
.neighborhood-card {
  contain: layout style paint;
}

/* Optimize animations */
.slide-up {
  will-change: transform;
  transform: translateZ(0); /* Force GPU acceleration */
}

/* Use efficient selectors */
.card-title { /* Good: class selector */
  font-weight: 600;
}

/* Avoid expensive selectors */
div > div > div { /* Bad: descendant selectors */
  color: red;
}
```

## 📱 Mobile Optimization

### Touch Optimization
```css
/* Improve touch targets */
.button {
  min-height: 44px;
  min-width: 44px;
  touch-action: manipulation;
}

/* Optimize scrolling */
.scroll-container {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}
```

### Viewport Optimization
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

## 🧪 Performance Testing

### Lighthouse CI
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci && npm run build
      - run: npx @lhci/cli@0.12.x autorun
```

### Performance Tests
```typescript
// tests/performance.test.ts
describe('Performance Tests', () => {
  test('bundle size should be under 500KB', async () => {
    const stats = await getBundleStats();
    expect(stats.totalSize).toBeLessThan(500 * 1024);
  });

  test('initial render should be under 100ms', async () => {
    const start = performance.now();
    render(<App />);
    const end = performance.now();
    expect(end - start).toBeLessThan(100);
  });
});
```

## 📊 Monitoring Tools

### Development
- **Vite Bundle Analyzer**: Bundle size analysis
- **React DevTools Profiler**: Component performance
- **Chrome DevTools**: Performance auditing
- **Lighthouse**: Core Web Vitals

### Production
- **Google Analytics**: User experience metrics
- **Sentry**: Error tracking and performance
- **LogRocket**: Session replay and performance
- **New Relic**: Application performance monitoring

## 🎯 Performance Checklist

### Pre-deployment
- [ ] Bundle size < 500KB gzipped
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] Images optimized
- [ ] Fonts preloaded
- [ ] Critical CSS inlined

### Post-deployment
- [ ] Monitor Core Web Vitals
- [ ] Track bundle size changes
- [ ] Monitor error rates
- [ ] Analyze user behavior
- [ ] Regular performance audits

## 📊 User Research Impact on Performance

### Research-Driven Optimizations
- **Mobile-First**: 85% of users research on mobile (from [survey](https://forms.gle/vypFdC62y374Wx4WA))
- **Fast Loading**: Users abandon after 3s (from [results](https://docs.google.com/spreadsheets/d/1YeIARijTcO2haCy4ahZgfHgsOsHe9_fZwyqedbYsCJg/edit?usp=sharing))
- **Smooth Interactions**: 82% prefer visual data presentation
- **Quick Decisions**: Average 5.2 weeks research time needs reduction

### Performance Metrics Alignment
- **Decision Time Reduction**: Target 60% faster (performance = user satisfaction)
- **Completion Rate**: 89% complete assessment (fast loading crucial)
- **Return Usage**: 60% return (performance affects retention)

## 📞 Support

For performance-related questions:
- Performance documentation
- [GitHub performance issues](https://github.com/KetanMishra/NeighborFit/issues)
- Email: performance@neighborfit.com