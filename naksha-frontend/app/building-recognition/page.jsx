"use client";

import { useRouter } from 'next/navigation';
import { CameraIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function BuildingRecognitionPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Building Recognition
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Choose how you'd like to identify a building
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Camera Option */}
          <button
            onClick={() => router.push('/camera')}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 
              hover:shadow-xl transition-all duration-200 hover:-translate-y-1 text-left"
          >
            <div className="flex items-center justify-center mb-6">
              <CameraIcon className="h-16 w-16 text-blue-500 group-hover:scale-110 transition-transform" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
              Use Camera
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Take a photo of a building in real-time using your device's camera
            </p>
          </button>

          {/* Upload Option */}
          <button
            onClick={() => router.push('/upload')}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 
              hover:shadow-xl transition-all duration-200 hover:-translate-y-1 text-left"
          >
            <div className="flex items-center justify-center mb-6">
              <PhotoIcon className="h-16 w-16 text-green-500 group-hover:scale-110 transition-transform" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
              Upload Image
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Upload an existing photo from your device
            </p>
          </button>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/welcome')}
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
              transition-colors text-sm"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
} 