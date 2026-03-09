"use client";

/**
 * components/custom/app/dashboard/ViewMap.tsx
 * ─────────────────────────────────────────────────────────
 * Full-screen Google Maps view for a job's location.
 *
 * • Loads the Google Maps JavaScript API dynamically (no npm package needed).
 * • Renders a dark-themed map with a red pin at the job coordinates.
 * • Shows an address overlay card at the bottom.
 * • Falls back to a friendly error state when no coordinates are available.
 * ─────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from "react";
import type { JobLocationData } from "@/types/actions/view-map.types";

// Extend window so TypeScript doesn't complain about the callback and google global
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
    __yohpalMapsReady?: () => void;
  }
}

// ── Dark map style (matches app's #111 / #1a1a1a palette) ─
const DARK_MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#9ca3af" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a1a" }] },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#374151" }],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#2d2d2d" }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#373737" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#3c3c3c" }],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [{ color: "#4e4e4e" }],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  { featureType: "transit", stylers: [{ color: "#2f3948" }] },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#e5dbdb" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#111827" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

// ── Component props ────────────────────────────────────────
interface ViewMapProps {
  /** The job ID (reserved for analytics / deep-link future use) */
  jobId: string;
  /** Display name of the job shown in the address card */
  jobTitle: string;
  /** Location data fetched from Firestore / API */
  location?: JobLocationData | null;
  /** Called when the user presses the back button */
  onClose: () => void;
}

// ── Inline icon helpers ────────────────────────────────────
const BackIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const PinIcon = ({ color = "#ef4444", size = 17 }: { color?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// ── Main component ─────────────────────────────────────────
export default function ViewMap({
  jobId: _jobId,
  jobTitle,
  location,
  onClose,
}: ViewMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lat = location?.latitude;
  const lng = location?.longitude;
  const address = location?.address ?? "Location not specified";

  useEffect(() => {
    if (!lat || !lng) {
      setError("No location coordinates are available for this job.");
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
    if (!apiKey) {
      setError("Map service is not configured. Contact support.");
      return;
    }

    /** Initialise the map once the API is ready */
    const initializeMap = () => {
      if (!mapRef.current || !lat || !lng) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 15,
        disableDefaultUI: true,
        styles: DARK_MAP_STYLES,
      });

      // Red circle marker
      new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title: jobTitle,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 11,
          fillColor: "#ef4444",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2.5,
        },
      });

      setLoaded(true);
    };

    // Google Maps JS API already loaded
    if (window.google?.maps) {
      initializeMap();
      return;
    }

    // Register global callback used by the Maps script URL
    window.__yohpalMapsReady = initializeMap;

    // Re-use script tag if it already exists in <head>
    const existing = document.getElementById("google-maps-js");
    if (existing) {
      existing.addEventListener("load", initializeMap);
      return () => existing.removeEventListener("load", initializeMap);
    }

    // Inject the script tag
    const script = document.createElement("script");
    script.id = "google-maps-js";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=__yohpalMapsReady`;
    script.async = true;
    script.defer = true;
    script.onerror = () =>
      setError("Failed to load Google Maps. Check your internet connection.");
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", initializeMap);
    };
  }, [lat, lng, jobTitle]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#111",
        position: "relative",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 18px",
          borderBottom: "1px solid #1f1f1f",
          position: "relative",
          zIndex: 10,
          background: "#111",
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#e5e5e5",
            cursor: "pointer",
            padding: 0,
            display: "flex",
          }}
        >
          <BackIcon />
        </button>
        <PinIcon color="#ef4444" size={18} />
        <span style={{ fontSize: 16, fontWeight: 700, color: "#f5f5f5" }}>
          Job Location
        </span>
      </div>

      {/* ── Map canvas ── */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {error ? (
          /* Error state */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 14,
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 52 }}>📍</div>
            <p
              style={{
                color: "#9ca3af",
                fontSize: 14,
                lineHeight: 1.7,
                maxWidth: 260,
              }}
            >
              {error}
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: 8,
                padding: "11px 26px",
                borderRadius: 50,
                background: "rgba(239,68,68,0.15)",
                border: "1.5px solid #ef4444",
                color: "#ef4444",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Go Back
            </button>
          </div>
        ) : (
          <>
            {/* The div Google Maps renders into */}
            <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

            {/* Spinner overlay while map tiles load */}
            {!loaded && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#111",
                  zIndex: 5,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    border: "3px solid #2a2a2a",
                    borderTopColor: "#ef4444",
                    borderRadius: "50%",
                    animation: "yp-spin 0.75s linear infinite",
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Address overlay card ── */}
      {!error && (
        <div
          style={{
            background: "#1a1a1a",
            borderTop: "1px solid #2a2a2a",
            padding: "16px 18px 22px",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 13 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 11,
                background: "rgba(239,68,68,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <PinIcon color="#ef4444" size={17} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: "#6b7280",
                  letterSpacing: "0.07em",
                  marginBottom: 5,
                }}
              >
                JOB LOCATION
              </div>
              <div
                style={{ fontSize: 14, fontWeight: 600, color: "#e5e5e5", lineHeight: 1.5 }}
              >
                {address}
              </div>
              {location?.city && (
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 3 }}>
                  {location.city}
                  {location.country ? `, ${location.country}` : ""}
                </div>
              )}
              <div
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  marginTop: 7,
                  fontWeight: 500,
                }}
              >
                {jobTitle}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spinner keyframe */}
      <style>{`@keyframes yp-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
