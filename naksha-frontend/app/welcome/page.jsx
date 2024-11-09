"use client";

import { useState } from 'react';
import LoginForm from '@/components/LoginForm';

export default function Welcome() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center relative">
      {/* Main Content */}
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 animate-fade-in">
          Welcome to Naksha
        </h1>

        {/* Features List */}
        <div className="mt-12 space-y-2 animate-fade-in-delay-2">
          <p className="text-gray-600 dark:text-gray-400">• AI-Powered Building Recognition</p>
          <p className="text-gray-600 dark:text-gray-400">• Interactive Campus Maps</p>
          <p className="text-gray-600 dark:text-gray-400">• Real-time Navigation</p>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={() => setShowLogin(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
          <button
            className="px-6 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative animate-fade-in">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <LoginForm onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </div>
  );
} 