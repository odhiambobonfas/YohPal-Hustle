"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, Bell, Shield, Globe, Sun, Moon, LogOut, X, Check, MapPin, Loader2 } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "@/services/server/firebase";
import { useTheme } from "@/providers/ThemeProvider";
import { useLanguage, languages } from "@/providers/LanguageProvider";
import { Language } from "@/lib/translations";
import LocationSelector from "@/components/custom/app/shared/LocationSelector";
import { useAutoDetectLocation } from "@/hooks/useAutoDetectLocation";

const SETTINGS_ITEMS = [
  { id: "notifications", label: "Notifications",    icon: Bell,    href: null },
  { id: "privacy",       label: "Privacy & Security",icon: Shield,  href: null },
  { id: "language",      label: "Language & Region", icon: Globe,   href: null },
  { id: "appearance",    label: "Appearance",         icon: Moon,    href: null },
];

export default function SettingsPage() {
  const router = useRouter();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { location: detectedLocation, loading: detectingLocation } = useAutoDetectLocation();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [location, setLocation] = useState<{ county: string; subCounty: string; estate?: string }>(
    () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('user-location');
        return stored ? JSON.parse(stored) : { county: '', subCounty: '', estate: '' };
      }
      return { county: '', subCounty: '', estate: '' };
    }
  );

  // Update location when auto-detected
  useEffect(() => {
    if (detectedLocation && !location.county) {
      setLocation({
        county: detectedLocation.county,
        subCounty: detectedLocation.subCounty,
        estate: detectedLocation.estate,
      });
    }
  }, [detectedLocation]);

  const handleLogout = async () => {
    const auth = getAuth(firebaseApp);
    await signOut(auth);
    if (typeof window !== "undefined") localStorage.removeItem("auth_token");
    router.replace("/login");
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setShowLanguageModal(false);
  };

  const handleLocationSave = () => {
    if (location.county && location.subCounty) {
      localStorage.setItem('user-location', JSON.stringify(location));
      setShowRegionModal(false);
    }
  };

  const getLocationDisplay = () => {
    if (detectingLocation) return 'Detecting...';
    if (!location.county) return 'Not set';
    const parts = [location.estate, location.subCounty, location.county].filter(Boolean);
    return parts.join(', ');
  };

  return (
    <div className="min-h-screen bg-page text-fg pb-24">
      <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-xl bg-surface-alt hover:bg-rim transition">
          <ArrowLeft size={16} className="text-fg" />
        </button>
        <h1 className="text-[17px] font-bold text-fg">Settings</h1>
      </div>

      {/* Settings list */}
      <div className="mx-5 flex flex-col gap-2">
        {SETTINGS_ITEMS.filter((i) => i.id !== "appearance" && i.id !== "language").map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className="flex items-center justify-between bg-surface rounded-2xl px-4 py-3 hover:bg-surface-alt transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center">
                <Icon size={15} className="text-fg-secondary" />
              </div>
              <span className="text-[13px] font-medium text-fg">{label}</span>
            </div>
            <ChevronRight size={14} className="text-fg-muted" />
          </button>
        ))}
        
        {/* Language & Region */}
        <div className="space-y-2">
          <button
            onClick={() => setShowLanguageModal(true)}
            className="w-full flex items-center justify-between bg-surface rounded-2xl px-4 py-3 hover:bg-surface-alt transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center">
                <Globe size={15} className="text-fg-secondary" />
              </div>
              <span className="text-[13px] font-medium text-fg">Language</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-fg-muted">{languages[language]}</span>
              <ChevronRight size={14} className="text-fg-muted" />
            </div>
          </button>
          
          <button
            onClick={() => setShowRegionModal(true)}
            className="w-full flex items-center justify-between bg-surface rounded-2xl px-4 py-3 hover:bg-surface-alt transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center">
                {detectingLocation ? (
                  <Loader2 size={15} className="text-fg-secondary animate-spin" />
                ) : (
                  <Globe size={15} className="text-fg-secondary" />
                )}
              </div>
              <span className="text-[13px] font-medium text-fg">Region</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-fg-muted truncate max-w-[150px]">{getLocationDisplay()}</span>
              <ChevronRight size={14} className="text-fg-muted" />
            </div>
          </button>
        </div>
        {/* Appearance — theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-between bg-surface rounded-2xl px-4 py-3 hover:bg-surface-alt transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center">
              {resolvedTheme === "dark" ? (
                <Sun size={15} className="text-yellow-400" />
              ) : (
                <Moon size={15} className="text-gray-500" />
              )}
            </div>
            <span className="text-[13px] font-medium text-fg">Appearance</span>
          </div>
          <span className="text-xs font-semibold text-fg-muted capitalize">{resolvedTheme}</span>
        </button>
      </div>

      {/* Logout */}
      <div className="mx-5 mt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-brand/5 hover:bg-brand/10 border border-brand/20 text-brand text-[13px] font-semibold rounded-2xl py-3 transition"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
      </div>

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-surface rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-fg">Select Language</h2>
              <button
                onClick={() => setShowLanguageModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-alt transition"
              >
                <X size={18} className="text-fg-muted" />
              </button>
            </div>
            <div className="space-y-2">
              {(Object.keys(languages) as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${
                    language === lang
                      ? 'bg-brand text-white'
                      : 'bg-surface-alt hover:bg-rim text-fg'
                  }`}
                >
                  <span className="font-medium">{languages[lang]}</span>
                  {language === lang && <Check size={18} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Region Modal */}
      {showRegionModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-surface rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-fg">Select Your Region</h2>
              <button
                onClick={() => setShowRegionModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-alt transition"
              >
                <X size={18} className="text-fg-muted" />
              </button>
            </div>
            <LocationSelector
              value={location}
              onChange={setLocation}
              required={false}
              showEstate={true}
              autoDetect={true}
            />
            <button
              onClick={handleLocationSave}
              disabled={!location.county || !location.subCounty}
              className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Location
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
