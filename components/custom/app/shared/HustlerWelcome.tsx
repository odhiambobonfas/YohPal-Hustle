"use client";

import { ArrowRight } from "lucide-react";

interface HustlerWelcomeProps {
  onCompleteVerification?: () => void;
}

const HustlerWelcome: React.FC<HustlerWelcomeProps> = ({ onCompleteVerification }) => {
  return (
    <div className="min-h-screen bg-page text-fg flex flex-col items-center justify-between px-6 py-12 max-w-lg mx-auto w-full">
      {/* Illustration Area */}
      <div className="w-full max-w-sm rounded-3xl overflow-hidden bg-surface mt-8 shadow-xl">
        <svg
          viewBox="0 0 400 280"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <ellipse cx="200" cy="140" rx="160" ry="110" fill="#e8f5f0" />
          <g transform="translate(60, 60)">
            <rect x="25" y="80" width="30" height="60" rx="5" fill="#7ecac3" />
            <circle cx="40" cy="65" r="20" fill="#f4c5a0" />
            <ellipse cx="40" cy="50" rx="20" ry="10" fill="#2c2c2c" />
            <rect x="20" y="138" width="14" height="40" rx="4" fill="#e05a3a" />
            <rect x="38" y="138" width="14" height="40" rx="4" fill="#e05a3a" />
            <rect x="55" y="88" width="40" height="12" rx="6" fill="#7ecac3" />
            <rect x="90" y="72" width="36" height="8" rx="4" fill="#ccc" />
            <rect x="93" y="55" width="8" height="18" rx="2" fill="#e05a3a" />
            <rect x="104" y="60" width="8" height="13" rx="2" fill="#333" />
            <rect x="115" y="58" width="8" height="15" rx="2" fill="#e05a3a" />
          </g>
          <g transform="translate(230, 60)">
            <rect x="20" y="80" width="30" height="60" rx="5" fill="#e05a3a" />
            <circle cx="35" cy="65" r="20" fill="#f4c5a0" />
            <ellipse cx="35" cy="48" rx="14" ry="10" fill="#2c2c2c" />
            <circle cx="35" cy="40" r="7" fill="#2c2c2c" />
            <rect x="16" y="138" width="14" height="40" rx="4" fill="#1a1a2e" />
            <rect x="34" y="138" width="14" height="40" rx="4" fill="#1a1a2e" />
            <rect x="-20" y="78" width="42" height="12" rx="6" fill="#e05a3a" />
            <rect x="-28" y="52" width="44" height="36" rx="4" fill="#d4a96a" />
            <rect x="-26" y="54" width="40" height="6" rx="2" fill="#b8864e" />
            <rect x="-16" y="38" width="10" height="16" rx="2" fill="#333" />
            <rect x="-3" y="36" width="10" height="18" rx="2" fill="#555" />
            <rect x="10" y="40" width="8" height="14" rx="2" fill="#333" />
          </g>
          <circle cx="50" cy="80" r="12" fill="none" stroke="#b2ddd8" strokeWidth="2" />
          <circle cx="350" cy="60" r="10" fill="none" stroke="#b2ddd8" strokeWidth="2" />
          <circle cx="320" cy="220" r="8" fill="none" stroke="#b2ddd8" strokeWidth="2" />
        </svg>
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center text-center mt-10 gap-3 flex-1 justify-center">
        <h1 className="text-3xl font-bold tracking-tight text-fg">Welcome to Hustler mode.</h1>
        <p className="text-fg-muted text-base max-w-xs">
          Start your journey to flexible work today.
        </p>
      </div>

      {/* CTA Button */}
      <div className="w-full max-w-xs mt-8">
        <button
          onClick={onCompleteVerification}
          className="w-full flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark active:scale-95 transition-all text-white font-semibold text-base py-4 rounded-full shadow-lg shadow-brand/40"
        >
          Complete Verification
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Page indicator dots */}
      <div className="flex gap-2 mt-6">
        <span className="w-2 h-2 rounded-full bg-brand" />
        <span className="w-2 h-2 rounded-full bg-rim" />
        <span className="w-2 h-2 rounded-full bg-rim" />
      </div>
    </div>
  );
};

export default HustlerWelcome;
