"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MapIcon, 
  CameraIcon,
  UserCircleIcon,
  ArrowRightIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

export default function WelcomePage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 
        dark:from-gray-900 dark:to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      {/* Navigation Bar */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <AcademicCapIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Naksha</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  {userData?.name || 'User'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome back, {userData?.firstName || 'User'}! 👋
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Let's help you navigate around campus
          </p>
        </div>

        {/* Quick Start Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl 
            hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="flex items-center mb-4">
              <MapIcon className="h-8 w-8 text-blue-600" />
              <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                Campus Navigation
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Get real-time directions to any building on campus with our interactive map
            </p>
          </div>

          <div 
            onClick={() => router.push('/building-recognition')}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl 
              hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer">
            <div className="flex items-center mb-4">
              <CameraIcon className="h-8 w-8 text-green-600" />
              <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                Building Recognition
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Instantly identify buildings by taking a photo or uploading an image
            </p>
          </div>
        </div>

        {/* Continue to Dashboard Button */}
        <div className="text-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 
              text-white font-medium rounded-lg shadow-lg hover:shadow-xl 
              transition-all duration-300 transform hover:scale-[1.02]"
          >
            Continue to Dashboard
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </button>
        </div>
      </main>
    </div>
  );
} 