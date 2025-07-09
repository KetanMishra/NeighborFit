import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Assessment } from './components/Assessment';
import { ResultsView } from './components/results/ResultsView';
import { UserPreferences, NeighborhoodMatch } from './types';
import { NeighborhoodMatcher } from './utils/matchingAlgorithm';
import { sampleNeighborhoods } from './data/neighborhoods';
import { useRef } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { SignupModal } from './components/auth/SignupModal';
import { LoginModal } from './components/auth/LoginModal';
import { Sun, Moon } from 'lucide-react';

function SignupPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignupModal
        isOpen={true}
        onClose={() => navigate('/')}
        onSwitchToLogin={() => navigate('/login')}
      />
    </div>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginModal
        isOpen={true}
        onClose={() => navigate('/')}
        onSwitchToSignup={() => navigate('/signup')}
      />
    </div>
  );
}

function SavedAssessmentsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-16">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Saved Assessments</h1>
      <p className="text-gray-600 mb-8">This is where your saved assessments will appear in the future.</p>
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <p className="text-gray-500">No saved assessments yet.</p>
      </div>
    </div>
  );
}

function ProfilePage() {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-16">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Profile</h1>
        <p className="text-gray-600">You must be logged in to view your profile.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-16">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Profile</h1>
      <div className="bg-white rounded-xl shadow-md p-8 text-center w-full max-w-md">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="mb-2 text-lg font-semibold text-gray-800">{user.name}</div>
        <div className="mb-6 text-gray-500">{user.email}</div>
        <div className="text-gray-400 text-sm">Profile features coming soon.</div>
      </div>
    </div>
  );
}

function SettingsPage() {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-16">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Settings</h1>
        <p className="text-gray-600">You must be logged in to view your settings.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-16">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Settings</h1>
      <div className="bg-white rounded-xl shadow-md p-8 text-center w-full max-w-md">
        <div className="mb-6 text-lg font-semibold text-gray-800">Account Settings</div>
        <div className="text-gray-400 text-sm">Settings features coming soon.</div>
      </div>
    </div>
  );
}

function AppContent() {
  const [currentView, setCurrentView] = useState<'assessment' | 'results'>('assessment');
  const [matches, setMatches] = useState<NeighborhoodMatch[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const assessmentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  React.useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    // If redirected from login with showAssessment, scroll to assessment
    if (location.state && location.state.showAssessment && isAuthenticated) {
      setTimeout(() => {
        assessmentRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    // eslint-disable-next-line
  }, [location.state, isAuthenticated]);

  const handleAssessmentComplete = async (preferences: UserPreferences) => {
    setUserPreferences(preferences);
    setLoading(true);
    setError(null);
    try {
      // Use static data instead of API
      const neighborhoods = sampleNeighborhoods;
      const matcher = new NeighborhoodMatcher();
      const neighborhoodMatches = neighborhoods.map(neighborhood =>
        matcher.calculateMatch(preferences, neighborhood)
      );
      neighborhoodMatches.sort((a, b) => b.matchScore - a.matchScore);
      setMatches(neighborhoodMatches);
      setCurrentView('results');
    } catch (err: any) {
      setError(err.message || 'Failed to get neighborhoods');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToAssessment = () => {
    setCurrentView('assessment');
  };

  const handleRetakeAssessment = () => {
    setCurrentView('assessment');
    setMatches([]);
    setUserPreferences(null);
    setError(null);
  };

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      {/* Theme Switcher Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <Moon className="w-5 h-5 text-gray-700" /> : <Sun className="w-5 h-5 text-yellow-400" />}
      </button>
      <main>
        <Routes>
          <Route path="/" element={
            <>
              {/* Authenticated: show assessment as homepage */}
              {isAuthenticated && currentView === 'assessment' && !loading && !error && (
                <div ref={assessmentRef} className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
                  <Assessment onComplete={handleAssessmentComplete} />
                </div>
              )}
              {/* Not authenticated: show landing page */}
              {!isAuthenticated && currentView === 'assessment' && !loading && !error && (
                <section className="relative bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-20 px-4 text-center transition-colors duration-300">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 drop-shadow-lg">Find Your Perfect Neighborhood in Bangalore</h1>
                  <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">Personalized recommendations based on your lifestyle, budget, and priorities. Discover where you truly belong!</p>
                  <button
                    onClick={handleGetStarted}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg transition-all duration-300"
                  >
                    Get Started
                  </button>
                  <div className="mt-16 flex flex-col md:flex-row justify-center gap-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 w-full md:w-72 transition-colors duration-300">
                      <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Smart Matching</h3>
                      <p className="text-gray-600 dark:text-gray-300">Our algorithm matches you with neighborhoods that fit your unique needs.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 w-full md:w-72 transition-colors duration-300">
                      <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">Real Insights</h3>
                      <p className="text-gray-600 dark:text-gray-300">Get data on safety, amenities, commute, and more—plus real resident reviews.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 w-full md:w-72 transition-colors duration-300">
                      <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">Instant & Private</h3>
                      <p className="text-gray-600 dark:text-gray-300">No signup required to explore. Your preferences stay private.</p>
                    </div>
                  </div>
                </section>
              )}
              {loading && <div className="text-center py-8">Loading neighborhoods...</div>}
              {error && <div className="text-center py-8 text-red-600">{error}</div>}
              {!loading && !error && currentView === 'results' ? (
                <ResultsView
                  matches={matches}
                  onBack={handleBackToAssessment}
                  onRetakeAssessment={handleRetakeAssessment}
                />
              ) : null}
            </>
          } />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/saved" element={<SavedAssessmentsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;