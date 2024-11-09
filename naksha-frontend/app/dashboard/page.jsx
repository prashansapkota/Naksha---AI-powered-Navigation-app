
'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isCamera, setIsCamera] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setIsCamera(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCamera(false);
    }
  };

  // Capture photo
  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    const imageUrl = canvas.toDataURL('image/jpeg');
    setPreviewUrl(imageUrl);
    stopCamera();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 
      dark:from-gray-900 dark:to-indigo-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Image Processing
            </h1>
            <p className="text-gray-600 mt-2">
              Upload an image or use your camera to get started
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Action Buttons */}
            <div className="flex gap-6">
              <label className="flex-1">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-4 px-6 
                  rounded-xl cursor-pointer hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] 
                  transition-all duration-200 shadow-lg hover:shadow-xl font-medium">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>
              </label>
              
              {!isCamera ? (
                <button
                  onClick={startCamera}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-6 
                    rounded-xl hover:from-emerald-600 hover:to-teal-600 transform hover:scale-[1.02] 
                    transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                >
                  Open Camera
                </button>
              ) : (
                <button
                  onClick={capturePhoto}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 
                    rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] 
                    transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                >
                  Take Photo
                </button>
              )}
            </div>

            {/* Preview Area */}
            <div className="border-3 border-dashed border-gray-200 dark:border-gray-700 
              rounded-2xl p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
              transition-all duration-300 hover:border-blue-400">
              {isCamera ? (
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={stopCamera}
                    className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-sm text-white p-3 
                      rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    ✕
                  </button>
                </div>
              ) : previewUrl ? (
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-auto"
                  />
                  <button
                    onClick={() => {
                      setPreviewUrl(null);
                      setSelectedFile(null);
                    }}
                    className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-sm text-white p-3 
                      rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="mb-4">
                    <Image
                      src="/upload-icon.svg" // Add this icon
                      alt="Upload"
                      width={64}
                      height={64}
                      className="mx-auto opacity-50"
                    />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    No image selected. Please upload an image or use the camera.
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            {(selectedFile || previewUrl) && !isCamera && (
              <button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 
                  rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] 
                  transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
              >
                Process Image
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 