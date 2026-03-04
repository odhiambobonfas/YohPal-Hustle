"use client";

import { useState, useEffect } from "react";

interface LocationState {
  city: string | null;
  loading: boolean;
  error: string | null;
}

/** Reverse-geocode lat/lng via Google Maps API → "City, CC" */
async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=locality|administrative_area_level_1&key=${key}`
    );
    const data = await res.json();
    if (data.status !== "OK" || !data.results?.length) return null;

    const components = data.results[0].address_components;
    const locality = components.find((c: { types: string[] }) => c.types.includes("locality"));
    const admin = components.find((c: { types: string[] }) =>
      c.types.includes("administrative_area_level_1")
    );
    const country = components.find((c: { types: string[] }) => c.types.includes("country"));

    const cityName = locality?.long_name ?? admin?.long_name ?? null;
    const countryCode = country?.short_name ?? "";
    return cityName ? `${cityName}${countryCode ? ", " + countryCode : ""}` : null;
  } catch {
    return null;
  }
}

/** IP-based fallback — no permission needed, works instantly */
async function ipCity(): Promise<string | null> {
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    const data = await res.json();
    const city = data.city ?? data.region ?? null;
    const country = data.country_code ?? "";
    return city ? `${city}${country ? ", " + country : ""}` : null;
  } catch {
    return null;
  }
}

export function useLocationCity(): LocationState {
  const [state, setState] = useState<LocationState>({
    city: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      // 1. Try GPS + Google Maps reverse geocode
      if (navigator.geolocation) {
        const gpsResult = await new Promise<string | null>((resolve) => {
          navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
              const city = await reverseGeocode(coords.latitude, coords.longitude);
              resolve(city);
            },
            () => resolve(null),
            { timeout: 8000, maximumAge: 300000 }
          );
        });

        if (!cancelled && gpsResult) {
          setState({ city: gpsResult, loading: false, error: null });
          return;
        }
      }

      // 2. Fallback: IP-based location (no permission required)
      const ipResult = await ipCity();
      if (!cancelled) {
        setState({
          city: ipResult,
          loading: false,
          error: ipResult ? null : "Location unavailable",
        });
      }
    }

    resolve();
    return () => { cancelled = true; };
  }, []);

  return state;
}
