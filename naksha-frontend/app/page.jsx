"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import Image from 'next/image';

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const router = useRouter();

  const handleGuestAccess = () => {
    router.push('/guest-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-16">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Welcome to Naksha
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your AI-powered campus navigation assistant for Fisk University
          </p>
        </div>

        {/* Access Options */}
        <div className="max-w-md mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
          <div className="space-y-4">
            <button
              onClick={() => setShowLogin(true)}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                transition-all duration-300 transform hover:scale-[1.02] font-medium"
            >
              Login
            </button>
            
            <button
              onClick={() => setShowSignup(true)}
              className="w-full py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 
                transition-all duration-300 transform hover:scale-[1.02] font-medium
                border-2 border-blue-600 dark:bg-gray-800 dark:text-blue-400"
            >
              Sign Up
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">or</span>
              </div>
            </div>

            <button
              onClick={handleGuestAccess}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 
                transition-all duration-300 transform hover:scale-[1.02] font-medium
                dark:bg-gray-700 dark:text-gray-300"
            >
              Continue as Guest
            </button>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Building Recognition",
              description: "Instantly identify campus buildings using AI",
              icon: "🏛️"
            },
            {
              title: "Smart Navigation",
              description: "Get optimized routes across campus",
              icon: "🗺️"
            },
            {
              title: "Campus Information",
              description: "Access detailed facility information",
              icon: "ℹ️"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl 
                shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-full max-w-md">
            <button 
              onClick={() => setShowLogin(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              Close ✕
            </button>
            <LoginForm onSuccess={() => setShowLogin(false)} />
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-full max-w-md">
            <button 
              onClick={() => setShowSignup(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              Close ✕
            </button>
            <SignupForm onSuccess={() => setShowSignup(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
