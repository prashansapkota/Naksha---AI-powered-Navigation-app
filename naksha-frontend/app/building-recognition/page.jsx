"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CameraIcon, ArrowUpTrayIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function BuildingRecognitionPage() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('camera'); // 'camera' or 'upload'

  // Handle camera capture
  const handleCapture = async (event) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);

      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
      setCapturedImage(URL.createObjectURL(blob));

      // Stop camera stream
      stream.getTracks().forEach(track => track.stop());

      // Process the image
      await processImage(blob);
    } catch (err) {
      setError('Failed to access camera');
      console.error(err);
    }
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size should be less than 5MB');
        return;
      }
      setCapturedImage(URL.createObjectURL(file));
      await processImage(file);
    }
  };

  // Process image with AI
  const processImage = async (imageFile) => {
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch('/api/analyze-building', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const result = await response.json();
      
      // Store result and redirect to results page
      localStorage.setItem('buildingAnalysis', JSON.stringify(result));
      router.push('/building-details');
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push('/welcome')}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Welcome
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Building Recognition
            </h1>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Method Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-8">
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('camera')}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2
                ${activeTab === 'camera' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
            >
              <CameraIcon className="h-6 w-6" />
              <span>Take Photo</span>
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2
                ${activeTab === 'upload' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
            >
              <ArrowUpTrayIcon className="h-6 w-6" />
              <span>Upload Image</span>
            </button>
          </div>

          {/* Camera View / Upload Area */}
          <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-6">
            {activeTab === 'camera' ? (
              <div className="relative h-full">
                <video
                  id="camera-preview"
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                ></video>
                <button
                  onClick={handleCapture}
                  disabled={isProcessing}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2
                    bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <CameraIcon className="h-8 w-8 text-blue-600" />
                </button>
              </div>
            ) : (
              <label className="h-full flex flex-col items-center justify-center cursor-pointer">
                <ArrowUpTrayIcon className="h-12 w-12 text-gray-400 mb-4" />
                <span className="text-gray-500">Click to upload an image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isProcessing}
                />
              </label>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Processing Status */}
          {isProcessing && (
            <div className="text-center text-gray-600 dark:text-gray-400">
              <div className="loading-ring mb-2">
                <div></div><div></div><div></div><div></div>
              </div>
              Analyzing image...
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 dark:text-blue-300 mb-4">
            Tips for Best Results
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-400">
            <li>• Ensure the building is clearly visible in the frame</li>
            <li>• Avoid taking photos in low light conditions</li>
            <li>• Try to capture the main entrance or distinctive features</li>
            <li>• Keep the camera steady when taking photos</li>
          </ul>
        </div>
      </main>
    </div>
  );
} 