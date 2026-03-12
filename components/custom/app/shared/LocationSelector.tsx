"use client";

import { useState, useEffect } from 'react';
import { kenyaLocations, County, SubCounty, Estate } from '@/lib/data/kenya-locations';
import { ChevronDown, MapPin, Loader2 } from 'lucide-react';
import { useAutoDetectLocation } from '@/hooks/useAutoDetectLocation';

interface LocationSelectorProps {
  value?: {
    county: string;
    subCounty: string;
    estate?: string;
  };
  onChange: (location: { county: string; subCounty: string; estate?: string }) => void;
  required?: boolean;
  showEstate?: boolean;
  autoDetect?: boolean;
}

export default function LocationSelector({
  value,
  onChange,
  required = false,
  showEstate = true,
  autoDetect = true,
}: LocationSelectorProps) {
  const { location: detectedLocation, loading: detecting, error: detectError, refreshLocation } = useAutoDetectLocation();
  const [selectedCounty, setSelectedCounty] = useState<string>(value?.county || '');
  const [selectedSubCounty, setSelectedSubCounty] = useState<string>(value?.subCounty || '');
  const [selectedEstate, setSelectedEstate] = useState<string>(value?.estate || '');
  const [isAutoDetected, setIsAutoDetected] = useState(false);

  const [subCounties, setSubCounties] = useState<SubCounty[]>([]);
  const [estates, setEstates] = useState<Estate[]>([]);

  // Major cities that should show estates
  const majorCities = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'];
  const shouldShowEstate = showEstate && majorCities.includes(selectedCounty);

  // Auto-detect location on mount
  useEffect(() => {
    if (autoDetect && detectedLocation && !value?.county) {
      setSelectedCounty(detectedLocation.county);
      setSelectedSubCounty(detectedLocation.subCounty);
      if (detectedLocation.estate) {
        setSelectedEstate(detectedLocation.estate);
      }
      setIsAutoDetected(true);
    }
  }, [detectedLocation, autoDetect, value]);

  useEffect(() => {
    if (selectedCounty) {
      const county = kenyaLocations.find((c) => c.name === selectedCounty);
      setSubCounties(county?.subCounties || []);
      setSelectedSubCounty('');
      setSelectedEstate('');
      setEstates([]);
    } else {
      setSubCounties([]);
      setEstates([]);
    }
  }, [selectedCounty]);

  useEffect(() => {
    if (selectedSubCounty && selectedCounty) {
      const county = kenyaLocations.find((c) => c.name === selectedCounty);
      const subCounty = county?.subCounties.find((sc) => sc.name === selectedSubCounty);
      setEstates(subCounty?.estates || []);
      setSelectedEstate('');
    } else {
      setEstates([]);
    }
  }, [selectedSubCounty, selectedCounty]);

  useEffect(() => {
    if (selectedCounty && selectedSubCounty) {
      onChange({
        county: selectedCounty,
        subCounty: selectedSubCounty,
        estate: shouldShowEstate ? selectedEstate : undefined,
      });
    }
  }, [selectedCounty, selectedSubCounty, selectedEstate, shouldShowEstate]);

  return (
    <div className="space-y-4">
      {/* Auto-detect status */}
      {autoDetect && (
        <div className="flex items-center justify-between">
          {detecting ? (
            <div className="flex items-center gap-2 text-xs text-fg-muted">
              <Loader2 size={14} className="animate-spin" />
              <span>Detecting your location...</span>
            </div>
          ) : isAutoDetected ? (
            <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
              <MapPin size={14} />
              <span>Location detected automatically</span>
            </div>
          ) : detectError ? (
            <div className="flex items-center gap-2 text-xs text-fg-muted">
              <span>{detectError}</span>
            </div>
          ) : null}
          
          {!detecting && (
            <button
              type="button"
              onClick={() => {
                refreshLocation();
                setIsAutoDetected(false);
              }}
              className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
            >
              <MapPin size={12} />
              Detect Location
            </button>
          )}
        </div>
      )}

      {/* County Selector */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-fg uppercase">County</label>
        <div className="relative">
          <select
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)}
            required={required}
            className="w-full bg-surface border border-brand-300 dark:border-brand-700 rounded-[10px] px-4 py-3 text-fg appearance-none focus:outline-none focus:ring-0 focus:border-brand transition-colors cursor-pointer"
          >
            <option value="">Select County</option>
            {kenyaLocations.map((county) => (
              <option key={county.name} value={county.name}>
                {county.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none"
          />
        </div>
      </div>

      {/* Sub-County Selector */}
      {selectedCounty && (
        <div className="space-y-1">
          <label className="text-xs font-bold text-fg uppercase">Sub-County</label>
          <div className="relative">
            <select
              value={selectedSubCounty}
              onChange={(e) => setSelectedSubCounty(e.target.value)}
              required={required}
              className="w-full bg-surface border border-brand-300 dark:border-brand-700 rounded-[10px] px-4 py-3 text-fg appearance-none focus:outline-none focus:ring-0 focus:border-brand transition-colors cursor-pointer"
            >
              <option value="">Select Sub-County</option>
              {subCounties.map((subCounty) => (
                <option key={subCounty.name} value={subCounty.name}>
                  {subCounty.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none"
            />
          </div>
        </div>
      )}

      {/* Estate Selector - Only for major cities */}
      {shouldShowEstate && selectedSubCounty && estates.length > 0 && (
        <div className="space-y-1">
          <label className="text-xs font-bold text-fg uppercase">Estate / Area</label>
          <div className="relative">
            <select
              value={selectedEstate}
              onChange={(e) => setSelectedEstate(e.target.value)}
              required={required}
              className="w-full bg-surface border border-brand-300 dark:border-brand-700 rounded-[10px] px-4 py-3 text-fg appearance-none focus:outline-none focus:ring-0 focus:border-brand transition-colors cursor-pointer"
            >
              <option value="">Select Estate / Area</option>
              {estates.map((estate) => (
                <option key={estate.name} value={estate.name}>
                  {estate.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
