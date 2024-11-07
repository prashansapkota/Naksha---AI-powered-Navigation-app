"use client";

import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import SearchBox from '@/components/SearchBox';

const FISK_CENTER = {
  lat: 36.1676,
  lng: -86.8083
};

const FISK_BUILDINGS = {
  'library': { lat: 36.1674, lng: -86.8087, name: 'John Hope and Aurelia E. Franklin Library' },
  'administration': { lat: 36.1680, lng: -86.8085, name: 'Cravath Hall' },
  'jubilee': { lat: 36.1676, lng: -86.8083, name: 'Jubilee Hall' },
  // Add more buildings with their coordinates and keywords
};

const mapContainerStyle = {
  width: '100%',
  height: '70vh'
};

export default function MapPage() {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          setError("Unable to get your location. Please enable location services.");
        }
      );
    }
  }, []);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const findBuildingByKeyword = (keyword) => {
    const searchTerm = keyword.toLowerCase();
    return Object.entries(FISK_BUILDINGS).find(([key, building]) => 
      key.includes(searchTerm) || building.name.toLowerCase().includes(searchTerm)
    );
  };

  const calculateDirections = useCallback(async (destination) => {
    if (!userLocation) {
      setError("Please enable location services to get directions");
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    try {
      const result = await directionsService.route({
        origin: userLocation,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING,
        optimizeWaypoints: true
      });

      setDirections(result);
      setError(null);
    } catch (err) {
      setError("Error calculating directions. Please try again.");
    }
  }, [userLocation]);

  const handlePlaceSelect = async (location, searchText) => {
    setSelectedLocation(location);
    setSearchKeyword(searchText);

    // Check if the search matches any predefined buildings
    const buildingMatch = findBuildingByKeyword(searchText);
    if (buildingMatch) {
      const [_, building] = buildingMatch;
      setSelectedLocation(building);
      await calculateDirections(building);
    } else {
      await calculateDirections(location);
    }

    if (map) {
      map.panTo(location);
      map.setZoom(18);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <SearchBox 
            onPlaceSelect={handlePlaceSelect}
            placeholder="Search for buildings (e.g., library, administration)"
          />
          
          {error && (
            <div className="mt-2 text-red-500 text-sm">
              {error}
            </div>
          )}

          {directions && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Walking Directions:</h3>
              <div className="space-y-2">
                {directions.routes[0].legs[0].steps.map((step, index) => (
                  <div key={index} className="text-sm">
                    <span dangerouslySetInnerHTML={{ __html: step.instructions }} />
                    <span className="text-gray-500 ml-2">
                      ({step.distance.text})
                    </span>
                  </div>
                ))}
                <div className="text-sm font-medium text-blue-600">
                  Total Distance: {directions.routes[0].legs[0].distance.text}
                  <span className="mx-2">•</span>
                  Estimated Time: {directions.routes[0].legs[0].duration.text}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            libraries={["places"]}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={userLocation || FISK_CENTER}
              zoom={17}
              onLoad={onLoad}
              options={{
                mapTypeId: 'satellite',
                mapTypeControl: true,
                zoomControl: true,
                streetViewControl: true,
              }}
            >
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={{
                    url: '/user-location.png',
                    scaledSize: new google.maps.Size(30, 30)
                  }}
                  title="You are here"
                />
              )}

              {selectedLocation && !directions && (
                <Marker
                  position={selectedLocation}
                  animation={google.maps.Animation.DROP}
                />
              )}

              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    suppressMarkers: false,
                    polylineOptions: {
                      strokeColor: "#2563eb",
                      strokeWeight: 5,
                    },
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}