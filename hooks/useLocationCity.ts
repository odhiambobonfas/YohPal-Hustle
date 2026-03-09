"use client";

import { useState, useEffect } from "react";

interface LocationState {
  city: string | null;
  loading: boolean;
  error: string | null;
}

type AddressComponent = { long_name: string; short_name: string; types: string[] };

// Finest → coarsest priority when picking a label from Google address components
const GRANULARITY = [
  "neighborhood",
  "sublocality_level_2",
  "sublocality_level_1",
  "sublocality",
  "locality",
  "administrative_area_level_2",
  "administrative_area_level_1",
] as const;

function pick(components: AddressComponent[], ...types: string[]): string | null {
  for (const type of types) {
    const match = components.find((c) => c.types.includes(type));
    if (match) return match.long_name;
  }
  return null;
}

/** Build "Neighbourhood, City, CC" from a component array */
function buildLabel(components: AddressComponent[]): string | null {
  let finest: string | null = null;
  for (const type of GRANULARITY) {
    finest = pick(components, type);
    if (finest) break;
  }
  if (!finest) return null;

  const locality = pick(components, "locality");
  const country  = pick(components, "country");
  const cc = components.find((c) => c.types.includes("country"))?.short_name ?? "";

  // If finest IS the city itself → "Nairobi, KE"
  if (finest === locality) return [finest, cc].filter(Boolean).join(", ");
  // Otherwise → "Kawangware, Nairobi, KE"
  return [finest, locality ?? country, cc].filter(Boolean).join(", ");
}

/** Reverse-geocode lat/lng via Google Maps Geocoding API */
async function reverseGeocode(lat: number, lng: number, key: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=en&key=${key}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    if (data.status !== "OK" || !data.results?.length) return null;

    // Results come back finest → coarsest — iterate and return the first label
    for (const result of data.results as { address_components: AddressComponent[] }[]) {
      const label = buildLabel(result.address_components);
      if (label) return label;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Google Maps Geolocation API — uses WiFi access points + cell towers + IP.
 * NO GPS permission required. Gives street / neighbourhood accuracy when WiFi
 * or cell data is available. Falls back to Google's own IP geolocation (which
 * is more granular than ipapi.co for most African ISPs).
 */
async function googleGeolocate(key: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const res = await fetch(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // considerIp: true → Google uses caller's IP when no WiFi/cell data
        body: JSON.stringify({ considerIp: true }),
        cache: "no-store",
      }
    );
    const data = await res.json();
    if (data.location?.lat != null && data.location?.lng != null) {
      return { lat: data.location.lat, lng: data.location.lng };
    }
    return null;
  } catch {
    return null;
  }
}

/** Last-resort: IP-based city via ipapi.co */
async function ipCity(): Promise<string | null> {
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "default" });
    const data = await res.json();
    const city    = data.city ?? data.region ?? null;
    const country = data.country_code ?? "";
    return city ? `${city}${country ? ", " + country : ""}` : null;
  } catch {
    return null;
  }
}

// Module-level cache — one fetch per session, shared across all hook instances
let _cityCache: string | null | undefined = undefined;
let _cityPromise: Promise<string | null> | null = null;

export function useLocationCity(): LocationState {
  const [state, setState] = useState<LocationState>({
    city: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      if (_cityCache !== undefined) {
        if (!cancelled)
          setState({ city: _cityCache, loading: false, error: _cityCache ? null : "Location unavailable" });
        return;
      }

      if (!_cityPromise) {
        _cityPromise = (async () => {
          const key = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? null;

          // ── Tier 1: GPS (finest — needs browser permission) ───────────────
          if (typeof navigator !== "undefined" && navigator.geolocation && key) {
            const gpsResult = await new Promise<string | null>((res) => {
              navigator.geolocation.getCurrentPosition(
                async ({ coords }) => {
                  const city = await reverseGeocode(coords.latitude, coords.longitude, key);
                  res(city);
                },
                () => res(null),
                { timeout: 10000, maximumAge: 60000, enableHighAccuracy: true }
              );
            });
            if (gpsResult) { _cityCache = gpsResult; return gpsResult; }
          }

          // ── Tier 2: Google Geolocation API (WiFi/cell/IP — no permission) ─
          if (key) {
            const coords = await googleGeolocate(key);
            if (coords) {
              const city = await reverseGeocode(coords.lat, coords.lng, key);
              if (city) { _cityCache = city; return city; }
            }
          }

          // ── Tier 3: ipapi.co IP fallback (city level) ─────────────────────
          const ipResult = await ipCity();
          _cityCache = ipResult;
          return ipResult;
        })();
      }

      const result = await _cityPromise;
      if (!cancelled) {
        setState({ city: result, loading: false, error: result ? null : "Location unavailable" });
      }
    }

    resolve();
    return () => { cancelled = true; };
  }, []);

  return state;
}
