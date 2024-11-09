
'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      {/* Left Section - Form */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome Back!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Please enter your details to sign in
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-700/50 dark:text-white focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input 
                    type="password" 
                    placeholder="Enter your password"
                    className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-700/50 dark:text-white focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="h-4 w-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-blue-600 focus:ring-blue-500 transition-colors"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl 
                hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 
                shadow-lg hover:shadow-xl font-medium"
              >
                Sign in
              </button>

              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link 
                    href="/register" 
                    className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                  >
                    Sign up
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-sm"></div>
        <div className="h-full flex items-center justify-center relative">
          <div className="transform hover:scale-105 transition-transform duration-500">
            <Image
              src="/login-illustration.svg"
              alt="Login Illustration"
              width={600}
              height={600}
              className="object-cover drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
