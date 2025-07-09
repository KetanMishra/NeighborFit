import React from 'react';
import { MapPin, Home, Heart, Sparkles, Target, Award } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
      <div className="space-y-4">
        <div className="flex justify-center space-x-4 mb-6">
          <div className="p-3 bg-blue-100 rounded-full animate-bounce-slow">
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
          <div className="p-3 bg-green-100 rounded-full animate-bounce-slow animation-delay-200">
            <Home className="w-8 h-8 text-green-600" />
          </div>
          <div className="p-3 bg-purple-100 rounded-full animate-bounce-slow animation-delay-400">
            <Heart className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="relative">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-slide-up">
            Welcome to NeighborFit
          </h1>
          <div className="absolute -top-2 -right-4 animate-pulse">
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
        </div>
        
        <p className="text-xl text-gray-600 mb-8 animate-slide-up animation-delay-300">
          Discover the perfect Bangalore neighborhood that matches your lifestyle, priorities, and budget
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 space-y-6 animate-slide-up animation-delay-500 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Target className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-900">
            How it works
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-3 group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              1
            </div>
            <h3 className="font-semibold text-gray-900">Assessment</h3>
            <p className="text-sm text-gray-600">
              Share your lifestyle preferences, housing needs, and personal priorities
            </p>
          </div>
          
          <div className="space-y-3 group hover:transform hover:scale-105 transition-all duration-300 animation-delay-200">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              2
            </div>
            <h3 className="font-semibold text-gray-900">Analysis</h3>
            <p className="text-sm text-gray-600">
              Our system analyzes neighborhoods based on your unique criteria
            </p>
          </div>
          
          <div className="space-y-3 group hover:transform hover:scale-105 transition-all duration-300 animation-delay-400">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              3
            </div>
            <h3 className="font-semibold text-gray-900">Results</h3>
            <p className="text-sm text-gray-600">
              Get personalized neighborhood recommendations with detailed insights
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 animate-slide-up animation-delay-700">
        <div className="flex items-center justify-center space-x-4 text-gray-500 text-sm">
          <div className="flex items-center space-x-1">
            <Award className="w-4 h-4" />
            <span>Takes 5-7 minutes</span>
          </div>
          <span>•</span>
          <span>Private & Secure</span>
          <span>•</span>
          <span>Instant Results</span>
        </div>
        
        <button
          onClick={onNext}
          className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden"
        >
          <span className="relative z-10">Start Your Assessment</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  );
};