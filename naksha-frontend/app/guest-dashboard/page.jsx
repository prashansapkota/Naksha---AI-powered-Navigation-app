"use client";

import { useRouter } from 'next/navigation';
import { MapIcon, CameraIcon, UserIcon, BellIcon } from '@heroicons/react/24/outline';

export default function GuestDashboard() {
  const router = useRouter();

  const handleLoginPrompt = () => {
    router.push('/?login=true');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Guest Banner */}
      <div className="bg-blue-600 text-white py-2 px-4 text-center">
        <p className="text-sm">
          You're browsing as a guest. 
          <button 
            onClick={handleLoginPrompt}
            className="underline ml-2 hover:text-blue-200"
          >
            Create an account to save your preferences
          </button>
        </p>
      </div>

      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Naksha</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={handleLoginPrompt} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600">
                <BellIcon className="h-6 w-6 mr-2" />
                <span className="text-sm">Enable Notifications</span>
              </button>
              <div className="flex items-center">
                <UserIcon className="h-6 w-6 text-gray-400" />
                <span className="ml-2 text-gray-600">Guest User</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Map Feature */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <MapIcon className="h-8 w-8 text-blue-500" />
              <h2 className="ml-3 text-xl font-medium">Campus Map</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              View an interactive map of the campus and explore key locations
            </p>
            <button
              onClick={() => router.push('/map')}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Open Map
            </button>
          </div>

          {/* Building Recognition */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <CameraIcon className="h-8 w-8 text-green-500" />
              <h2 className="ml-3 text-xl font-medium">Building Recognition</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Use AI to identify buildings and get instant information
            </p>
            <button
              onClick={() => router.push('/building-recognition')}
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Start Scanning
            </button>
          </div>
        </div>

        {/* Recent Activity Preview */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Popular Destinations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Jubilee Hall", type: "Historic Building", distance: "2 min walk" },
              { name: "Library", type: "Academic Building", distance: "5 min walk" },
              { name: "Student Center", type: "Services", distance: "3 min walk" },
              { name: "Cravath Hall", type: "Administrative", distance: "4 min walk" }
            ].map((place, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{place.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{place.type}</p>
                </div>
                <span className="text-sm text-blue-600 dark:text-blue-400">{place.distance}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Create Account Benefits */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 dark:text-blue-300 mb-4">
            Why Create an Account?
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-400">
            <li>• Save your favorite locations and routes</li>
            <li>• Get personalized navigation recommendations</li>
            <li>• Receive updates about campus events and changes</li>
            <li>• Contribute to improving campus navigation data</li>
          </ul>
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => router.push('/?signup=true')}
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Account
            </button>
            <button
              onClick={() => router.push('/?login=true')}
              className="flex-1 py-2 bg-white text-blue-600 border-2 border-blue-600 
                rounded-lg hover:bg-blue-50 dark:bg-gray-800 dark:border-blue-500 dark:text-blue-500"
            >
              Sign In
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 