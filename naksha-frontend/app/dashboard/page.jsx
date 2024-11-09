"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  MapIcon, 
  CameraIcon, 
  UserCircleIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const router = useRouter();
  const [recentScans, setRecentScans] = useState([
    { id: 1, building: "Jubilee Hall", timestamp: "2 hours ago", confidence: "98%" },
    { id: 2, building: "Cravath Hall", timestamp: "Yesterday", confidence: "95%" },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Naksha
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 
                  dark:hover:text-red-400 transition-colors duration-200"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Campus Map */}
          <Link href="/map" 
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg 
              hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MapIcon className="h-12 w-12 text-blue-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Campus Map
                  </h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Interactive map with real-time navigation and points of interest
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Building Recognition */}
          <Link href="/camera" 
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg 
              hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CameraIcon className="h-12 w-12 text-green-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Building Recognition
                  </h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    AI-powered building identification and information
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentScans.map((scan) => (
                <div key={scan.id} 
                  className="flex items-center justify-between p-4 bg-gray-50 
                    dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {scan.building}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {scan.timestamp}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full 
                    text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 
                    dark:text-green-200">
                    {scan.confidence}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
            Quick Tips
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
            <li>• Use Building Recognition to identify campus buildings instantly</li>
            <li>• Access the Campus Map for optimized navigation routes</li>
            <li>• View your scan history in Recent Activity</li>
          </ul>
        </div>
      </main>
    </div>
  );
} 