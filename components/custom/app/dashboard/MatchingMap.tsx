"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Extend window so TypeScript doesn't complain
declare global {
  interface Window {
    google: any;
    __yohpalMatchMapsReady?: () => void;
  }
}

const DARK_MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#9ca3af" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a1a" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#374151" }] },
  { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2d2d2d" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#373737" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3c3c3c" }] },
  { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#4e4e4e" }] },
  { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { featureType: "transit", stylers: [{ color: "#2f3948" }] },
  { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#e5dbdb" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#111827" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
  { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] },
];

export interface HustlerMarker {
  id: string;
  lat: number;
  lng: number;
  name: string;
  distance: string;
}

interface MatchingMapProps {
  jobId: string;
  jobLat: number;
  jobLng: number;
  jobTitle: string;
}

const BackIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export default function MatchingMap({ jobId, jobLat, jobLng, jobTitle }: MatchingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // For visual demo, let's generate 3 mocked hustler markers near the job location
  const [hustlers] = useState<HustlerMarker[]>(() => {
    return [
      { id: "1", lat: jobLat + 0.005, lng: jobLng + 0.002, name: "Available Hustler", distance: "0.5km" },
      { id: "2", lat: jobLat - 0.003, lng: jobLng + 0.004, name: "Matching Profile", distance: "0.8km" },
      { id: "3", lat: jobLat + 0.001, lng: jobLng - 0.006, name: "Top Rated Hustler", distance: "1.2km" },
    ];
  });

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
    if (!apiKey) {
      setError("Map service is not configured.");
      return;
    }

    const initializeMap = () => {
      if (!mapRef.current) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: jobLat, lng: jobLng },
        zoom: 14,
        disableDefaultUI: true,
        styles: DARK_MAP_STYLES,
      });

      // Main Job Marker
      new window.google.maps.Marker({
        position: { lat: jobLat, lng: jobLng },
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

      // Hustler Markers
      hustlers.forEach(h => {
        new window.google.maps.Marker({
          position: { lat: h.lat, lng: h.lng },
          map,
          title: h.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#22c55e",
            fillOpacity: 0.9,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });
      });

      setLoaded(true);
    };

    if (window.google?.maps) {
      initializeMap();
      return;
    }
    
    window.__yohpalMatchMapsReady = initializeMap;

    const existing = document.getElementById("google-maps-js");
    if (existing) {
      existing.addEventListener("load", initializeMap);
      return () => existing.removeEventListener("load", initializeMap);
    }

    const script = document.createElement("script");
    script.id = "google-maps-js";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=__yohpalMatchMapsReady`;
    script.async = true;
    script.defer = true;
    script.onerror = () => setError("Failed to load Google Maps");
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", initializeMap);
    };
  }, [jobLat, jobLng, jobTitle, hustlers]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#111" }}>
      <div style={{
          display: "flex", alignItems: "center", gap: 12, padding: "16px 18px",
          borderBottom: "1px solid #1f1f1f", position: "relative", zIndex: 10, background: "#111"
        }}>
        <button onClick={() => router.push('/dashboard')} style={{ background: "none", border: "none", color: "#e5e5e5", cursor: "pointer", padding: 0 }}>
          <BackIcon />
        </button>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#f5f5f5" }}>
          Matching Hustlers
        </span>
      </div>

      <div style={{ flex: 1, position: "relative" }}>
        {error ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "#9ca3af" }}>
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
            {!loaded && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#111" }}>
                <div style={{ width: 34, height: 34, border: "3px solid #2a2a2a", borderTopColor: "#ef4444", borderRadius: "50%", animation: "yp-spin 0.75s linear infinite" }} />
              </div>
            )}
          </>
        )}
      </div>
      
      <div style={{ background: "#1a1a1a", borderTop: "1px solid #2a2a2a", padding: "16px 18px 26px" }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#e5e5e5", marginBottom: 4 }}>Job Posted Successfully</h3>
        <p style={{ fontSize: 12, color: "#9ca3af" }}>We found {hustlers.length} matching hustlers nearby. They have been notified and will apply shortly.</p>
        <button
          onClick={() => router.push('/dashboard')}
          style={{ width: "100%", marginTop: 14, padding: "12px", borderRadius: "10px", background: "linear-gradient(135deg,#ef4444,#b91c1c)", color: "white", fontWeight: "bold", border: "none", cursor: "pointer" }}
        >
          Return to Dashboard
        </button>
      </div>
      <style>{`@keyframes yp-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
