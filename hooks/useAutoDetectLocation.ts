"use client";

import { useState, useEffect } from 'react';
import { kenyaLocations } from '@/lib/data/kenya-locations';

interface DetectedLocation {
  county: string;
  subCounty: string;
  estate?: string;
  lat: number;
  lng: number;
  accuracy: 'high' | 'medium' | 'low';
}

interface LocationState {
  location: DetectedLocation | null;
  loading: boolean;
  error: string | null;
}

async function reverseGeocode(lat: number, lng: number): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  if (!apiKey) {
    throw new Error('Google Maps API key not configured');
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=en&key=${apiKey}`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    
    if (data.status !== 'OK' || !data.results?.length) {
      throw new Error('Geocoding failed');
    }
    
    return data.results[0];
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    throw error;
  }
}

function extractLocationFromGeocode(geocodeResult: any): { county?: string; subCounty?: string; estate?: string } {
  const components = geocodeResult.address_components || [];
  
  let county = '';
  let subCounty = '';
  let estate = '';
  
  // Extract components
  for (const component of components) {
    const types = component.types;
    
    // County - administrative_area_level_1
    if (types.includes('administrative_area_level_1')) {
      county = component.long_name.replace(' County', '').trim();
    }
    
    // Sub-County - administrative_area_level_2 or locality
    if (types.includes('administrative_area_level_2')) {
      subCounty = component.long_name;
    } else if (!subCounty && types.includes('locality')) {
      subCounty = component.long_name;
    }
    
    // Estate - neighborhood, sublocality_level_1, or sublocality
    if (types.includes('neighborhood')) {
      estate = component.long_name;
    } else if (!estate && types.includes('sublocality_level_1')) {
      estate = component.long_name;
    } else if (!estate && types.includes('sublocality')) {
      estate = component.long_name;
    }
  }
  
  return { county, subCounty, estate };
}

function matchToKenyaLocations(detected: { county?: string; subCounty?: string; estate?: string }): DetectedLocation | null {
  if (!detected.county) return null;
  
  // Find matching county (case-insensitive, fuzzy match)
  const countyMatch = kenyaLocations.find(c => 
    c.name.toLowerCase() === detected.county?.toLowerCase() ||
    detected.county?.toLowerCase().includes(c.name.toLowerCase()) ||
    c.name.toLowerCase().includes(detected.county?.toLowerCase() || '')
  );
  
  if (!countyMatch) return null;
  
  let result: any = {
    county: countyMatch.name,
    subCounty: '',
    estate: undefined,
  };
  
  // Find matching sub-county
  if (detected.subCounty) {
    const subCountyMatch = countyMatch.subCounties.find(sc =>
      sc.name.toLowerCase() === detected.subCounty?.toLowerCase() ||
      detected.subCounty?.toLowerCase().includes(sc.name.toLowerCase()) ||
      sc.name.toLowerCase().includes(detected.subCounty?.toLowerCase() || '')
    );
    
    if (subCountyMatch) {
      result.subCounty = subCountyMatch.name;
      
      // Find matching estate (only for major cities)
      if (detected.estate && subCountyMatch.estates) {
        const estateMatch = subCountyMatch.estates.find(e =>
          e.name.toLowerCase() === detected.estate?.toLowerCase() ||
          detected.estate?.toLowerCase().includes(e.name.toLowerCase()) ||
          e.name.toLowerCase().includes(detected.estate?.toLowerCase() || '')
        );
        
        if (estateMatch) {
          result.estate = estateMatch.name;
        }
      }
    }
  }
  
  // If no sub-county match, use the first one
  if (!result.subCounty && countyMatch.subCounties.length > 0) {
    result.subCounty = countyMatch.subCounties[0].name;
  }
  
  return result.subCounty ? result : null;
}

async function detectLocationFromGPS(): Promise<DetectedLocation | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude, accuracy } = position.coords;
          
          // Reverse geocode to get location details
          const geocodeResult = await reverseGeocode(latitude, longitude);
          const extracted = extractLocationFromGeocode(geocodeResult);
          const matched = matchToKenyaLocations(extracted);
          
          if (matched) {
            resolve({
              ...matched,
              lat: latitude,
              lng: longitude,
              accuracy: accuracy < 100 ? 'high' : accuracy < 1000 ? 'medium' : 'low',
            });
          } else {
            resolve(null);
          }
        } catch (error) {
          console.error('GPS location processing error:', error);
          resolve(null);
        }
      },
      (error) => {
        console.error('GPS error:', error);
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
}

export function useAutoDetectLocation() {
  const [state, setState] = useState<LocationState>({
    location: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    async function detectLocation() {
      // Check if location is already stored
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('user-location');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed.county && parsed.subCounty) {
              setState({
                location: { ...parsed, accuracy: 'medium' },
                loading: false,
                error: null,
              });
              return;
            }
          } catch (e) {
            console.error('Failed to parse stored location', e);
          }
        }
      }

      // Try to detect from GPS
      try {
        const detected = await detectLocationFromGPS();
        
        if (mounted) {
          if (detected) {
            setState({
              location: detected,
              loading: false,
              error: null,
            });
            
            // Save to localStorage
            if (typeof window !== 'undefined') {
              localStorage.setItem('user-location', JSON.stringify({
                county: detected.county,
                subCounty: detected.subCounty,
                estate: detected.estate,
              }));
            }
          } else {
            setState({
              location: null,
              loading: false,
              error: 'Could not detect location. Please select manually.',
            });
          }
        }
      } catch (error) {
        if (mounted) {
          setState({
            location: null,
            loading: false,
            error: 'Location detection failed. Please select manually.',
          });
        }
      }
    }

    detectLocation();

    return () => {
      mounted = false;
    };
  }, []);

  const refreshLocation = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const detected = await detectLocationFromGPS();
      
      if (detected) {
        setState({
          location: detected,
          loading: false,
          error: null,
        });
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('user-location', JSON.stringify({
            county: detected.county,
            subCounty: detected.subCounty,
            estate: detected.estate,
          }));
        }
      } else {
        setState({
          location: null,
          loading: false,
          error: 'Could not detect location. Please select manually.',
        });
      }
    } catch (error) {
      setState({
        location: null,
        loading: false,
        error: 'Location detection failed. Please select manually.',
      });
    }
  };

  return {
    ...state,
    refreshLocation,
  };
}
