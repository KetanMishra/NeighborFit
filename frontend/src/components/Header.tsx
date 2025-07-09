import React, { useState } from 'react';
import { MapPin, LogIn, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UserMenu } from './auth/UserMenu';
import { LoginModal } from './auth/LoginModal';
import { SignupModal } from './auth/SignupModal';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  let navigate: ((path: string) => void) | null = null;
  try {
    // Try to use useNavigate if react-router-dom is available
    navigate = require('react-router-dom').useNavigate();
  } catch {}
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  // Smooth scroll to section by id
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">NeighborFit</h1>
                <p className="text-xs text-gray-500">Find Your Perfect Neighborhood</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => {
                  if (navigate) {
                    navigate('/');
                  } else {
                    window.location.href = '/';
                  }
                }}
                className="relative text-gray-600 font-medium transition-all duration-300 hover:text-blue-700 focus:text-blue-700 px-2 py-1 outline-none group"
              >
                <span>Home</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full group-focus:w-full"></span>
              </button>
              <button
                onClick={() => setShowContactModal(true)}
                className="relative text-gray-600 font-medium transition-all duration-300 hover:text-green-700 focus:text-green-700 px-2 py-1 outline-none group"
              >
                <span>Contact</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-green-600 to-blue-600 transition-all duration-300 group-hover:w-full group-focus:w-full"></span>
              </button>
              <button
                onClick={() => setShowAboutModal(true)}
                className="relative text-gray-600 font-medium transition-all duration-300 hover:text-green-700 focus:text-green-700 px-2 py-1 outline-none group"
              >
                <span>About</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-green-600 to-blue-600 transition-all duration-300 group-hover:w-full group-focus:w-full"></span>
              </button>
            </nav>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setShowSignupModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign Up</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={handleSwitchToSignup}
      />
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-scale-up">
            <button
              onClick={() => setShowAboutModal(false)}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Close About"
            >
              {/* Use an X icon for close */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
              <Info className="w-6 h-6 mr-2 text-blue-600" /> About NeighborFit
            </h2>
            <p className="text-gray-700 mb-2">
              NeighborFit helps you discover the best neighborhoods in Bangalore based on your lifestyle, priorities, and budget. Our smart assessment and matching algorithm provide personalized recommendations and detailed insights for your next move.
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Personalized neighborhood matching</li>
              <li>Comprehensive data on safety, amenities, and more</li>
              <li>Community reviews and real resident experiences</li>
              <li>Instant, private, and secure results</li>
            </ul>
            <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} NeighborFit. All rights reserved.</p>
          </div>
        </div>
      )}
      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-scale-up">
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Close Contact"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              For any questions, feedback, or support, please email us at <a href="mailto:support@neighborfit.com" className="text-blue-600 underline">support@neighborfit.com</a>.
            </p>
            <p className="text-xs text-gray-400">We typically respond within 24 hours.</p>
          </div>
        </div>
      )}
    </>
  );
};