"use client";

import { useState, useEffect } from "react";

interface LocationState {
  city: string | null;
  loading: boolean;
  error: string | null;
}

export function useLocationCity(): LocationState {
  const [state, setState] = useState<LocationState>({
    city: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ city: null, loading: false, error: "Geolocation not supported" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const key = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&result_type=locality|administrative_area_level_1&key=${key}`
          );
          const data = await res.json();

          if (data.status === "OK" && data.results.length > 0) {
            // Pick the most specific locality component
            const result = data.results[0];
            const locality = result.address_components.find((c: { types: string[] }) =>
              c.types.includes("locality")
            );
            const admin = result.address_components.find((c: { types: string[] }) =>
              c.types.includes("administrative_area_level_1")
            );
            const country = result.address_components.find((c: { types: string[] }) =>
              c.types.includes("country")
            );

            const cityName = locality?.long_name ?? admin?.long_name ?? null;
            const countryName = country?.short_name ?? "";
            const display = cityName
              ? `${cityName}${countryName ? ", " + countryName : ""}`
              : null;

            setState({ city: display, loading: false, error: null });
          } else {
            setState({ city: null, loading: false, error: "Location unavailable" });
          }
        } catch {
          setState({ city: null, loading: false, error: "Failed to fetch location" });
        }
      },
      (err) => {
        setState({ city: null, loading: false, error: err.message });
      },
      { timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  return state;
}
