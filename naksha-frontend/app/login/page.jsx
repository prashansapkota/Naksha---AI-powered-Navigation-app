"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const FISK_CENTER = {
  lat: 36.1676,
  lng: -86.8083
};

const mapContainerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0
};

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={FISK_CENTER}
          zoom={17}
          options={{
            disableDefaultUI: true,
            zoomControl: false,
            mapTypeId: 'satellite',
            tilt: 45,
            heading: 45,
            gestureHandling: 'none'
          }}
        />
      </LoadScript>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-10"></div>

      <div className="relative z-20 max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Naksha</h1>
          <p className="mt-2 text-gray-200">AI-powered campus navigation</p>
        </div>

        <div className="backdrop-blur-md bg-white/10 rounded-xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                placeholder="Email address"
                value={credentials.email}
                onChange={(e) => setCredentials({
                  ...credentials,
                  email: e.target.value
                })}
              />
            </div>

            <div>
              <input
                type="password"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({
                  ...credentials,
                  password: e.target.value
                })}
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-900/10 py-2 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg ${
                loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white transition-colors`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="text-center text-sm">
              <Link href="/signup" className="text-blue-200 hover:text-blue-100">
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 