"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Welcome to Naksha
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
            Your AI-powered campus navigation assistant for Fisk University
          </p>
          <div className="flex gap-4">
            <Link 
              href="/login" 
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                transition-colors duration-300 font-medium shadow-lg hover:shadow-xl"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 
                transition-colors duration-300 font-medium shadow-lg hover:shadow-xl 
                dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Building Recognition",
              description: "Instantly identify campus buildings using AI-powered image recognition",
              icon: "🏛️"
            },
            {
              title: "Smart Navigation",
              description: "Get intelligent directions to your destination across campus",
              icon: "🗺️"
            },
            {
              title: "Campus Information",
              description: "Access detailed information about campus facilities and services",
              icon: "ℹ️"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl 
                shadow-lg hover:shadow-xl transition-shadow duration-300"
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

        {/* Footer */}
        <footer className="text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 Naksha. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">
              Contact Us
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
