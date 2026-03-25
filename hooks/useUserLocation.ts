"use client";

import { useState, useEffect } from 'react';

interface UserLocation {
  county: string;
  subCounty: string;
  estate?: string;
}

export function useUserLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user-location');
      if (stored) {
        try {
          setLocation(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse stored location', e);
        }
      }
      setLoading(false);
    }
  }, []);

  const updateLocation = (newLocation: UserLocation) => {
    setLocation(newLocation);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user-location', JSON.stringify(newLocation));
    }
  };

  const clearLocation = () => {
    setLocation(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user-location');
    }
  };

  const getLocationString = (): string => {
    if (!location || !location.county) return '';
    const parts = [location.estate, location.subCounty, location.county].filter(Boolean);
    return parts.join(', ');
  };

  return {
    location,
    loading,
    updateLocation,
    clearLocation,
    getLocationString,
  };
}
