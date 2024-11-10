"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  MapIcon, 
  CameraIcon,
  UserCircleIcon,
  ArrowRightIcon,
  AcademicCapIcon,
  BellIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function WelcomePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user/profile');
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/login');
      }
    };

    fetchUser();
  }, []);

  // Get first name from full name
  const firstName = user?.name?.split(' ')[0] || '';

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST'
      });
      if (res.ok) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Naksha</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600">
                <BellIcon className="h-6 w-6 mr-2" />
                <span className="text-sm">Notifications</span>
              </button>
              <div className="flex items-center">
                <UserCircleIcon className="h-6 w-6 text-gray-400" />
                <span className="ml-2 text-gray-600">{user?.name || 'Loading...'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                <ArrowLeftOnRectangleIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Naksha, {firstName}!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            What would you like to explore today?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Campus Map Card */}
          <Link 
            href="/map"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 
              hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <MapIcon className="h-8 w-8 text-blue-500" />
              <ArrowRightIcon className="h-5 w-5 text-gray-400 transform group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Campus Map
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Interactive map of Fisk University campus
            </p>
          </Link>

          {/* Building Recognition Card */}
          <Link 
            href="/building-recognition"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 
              hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <CameraIcon className="h-8 w-8 text-green-500" />
              <ArrowRightIcon className="h-5 w-5 text-gray-400 transform group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Building Recognition
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Identify campus buildings using AI
            </p>
          </Link>

          {/* Academic Info Card */}
          <Link 
            href="/academic"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 
              hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <AcademicCapIcon className="h-8 w-8 text-purple-500" />
              <ArrowRightIcon className="h-5 w-5 text-gray-400 transform group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Academic Info
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Find classes and academic resources
            </p>
          </Link>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-400">
                Your recent campus navigation activities will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 