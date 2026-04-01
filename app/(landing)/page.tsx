"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/providers/ThemeProvider";
import { Sun, Moon, CreditCard, Clock, BarChart3, Compass, UserSearch, MapPin } from "lucide-react";
import appStoreIcon from "@/assets/images/app store icon.svg";
import playStoreIcon from "@/assets/images/playstore icon.png";

// ─── Icon Components ──────────────────────────────────────────────────────────
const MapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);
const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.76a4.85 4.85 0 01-1.02-.07z" />
  </svg>
);
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.843L1.979 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);

// ─── Logo Component ───────────────────────────────────────────────────────────
const Logo = ({ size = "md", withText = true }: { size?: "sm" | "md" | "lg", withText?: boolean }) => {
  let s = 54; // Enlarged from 42
  let fontSize = 24; // Enlarged from 22
  if (size === "sm") { s = 40; fontSize = 20; }
  if (size === "lg") { s = 72; fontSize = 36; }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{
        width: s, height: s, position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", borderRadius: 14
      }}>
         <img src="/images/logo.jpg" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      {withText && (
        <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: fontSize, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
          YohPal <span style={{ color: "#E8380D" }}>Hustle</span>
        </span>
      )}
    </div>
  );
};

// ─── Theme Toggle Component ───────────────────────────────────────────────────
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="landing-page-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
        
        :root {
          --primary: #E8380D;
          --foreground: #111;
          --background: #fff;
          --muted: #666;
          --border: rgba(0,0,0,0.08);
          --card-bg: #fafafa;
        }

        .dark {
          --primary: #E8380D;
          --foreground: #fff;
          --background: #0a0a0a;
          --muted: #aaa;
          --border: rgba(255,255,255,0.1);
          --card-bg: #1a1a1a;
        }

        /* App Downloads */
        .app-download-section {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 28px;
          padding: 80px 5% 0;
        }
        .app-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s;
          border-radius: 12px;
          overflow: hidden;
          width: 200px;
          height: 64px;
          background: transparent;
        }
        .app-button:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.12);
        }
        .dark .app-button:hover {
          box-shadow: 0 15px 30px rgba(0,0,0,0.4);
        }
        .app-button img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--background); color: var(--foreground); transition: background 0.3s, color 0.3s; }
        a { text-decoration: none; color: inherit; }

        .landing-page-container {
            width: 100%;
            overflow-x: hidden;
        }

        /* Navbar */
        .navbar {
          position: sticky; top: 0; z-index: 100;
          background: var(--background); backdrop-filter: blur(12px);
          border-bottom: 2px solid var(--border);
          padding: 0 5%;
          display: flex; align-items: center; justify-content: space-between;
          height: 84px;
        }
        .nav-links { display: flex; align-items: center; gap: 40px; }
        .nav-link {
          font-size: 16px; font-weight: 700; color: var(--foreground);
          transition: color 0.2s;
        }
        .nav-link:hover { color: var(--primary); }
        .btn-nav-cta {
          padding: 12px 28px; border: 2.5px solid var(--primary);
          border-radius: 50px; color: var(--primary); font-size: 16px;
          font-weight: 800; font-family: 'Sora', sans-serif;
          background: transparent; cursor: pointer;
          transition: all 0.2s;
        }
        .btn-nav-cta:hover { background: var(--primary); color: white; }

        .auth-btns { display: flex; align-items: center; gap: 20px; }
        .btn-login { font-weight: 800; font-size: 16px; transition: color 0.2s; }
        .btn-login:hover { color: var(--primary); }
        .btn-get-started {
           padding: 12px 30px; background: var(--primary); color: white;
           border-radius: 50px; font-size: 16px; font-weight: 800;
           transition: all 0.2s;
        }
        .btn-get-started:hover { transform: scale(1.05); box-shadow: 0 6px 20px rgba(232,56,13,0.35); }

        .theme-toggle {
          background: var(--card-bg); border: 1.5px solid var(--border); color: var(--foreground);
          padding: 10px; border-radius: 14px; cursor: pointer; display: flex; align-items: center;
          transition: all 0.2s;
        }
        .theme-toggle:hover { background: var(--border); transform: scale(1.1); }

        /* Hero */
        .hero {
          min-height: calc(100vh - 84px);
          display: flex; align-items: center;
          padding: 40px 5% 80px;
          gap: 60px;
          background: linear-gradient(135deg, rgba(232,56,13,0.04) 0%, rgba(15,188,176,0.03) 100%);
        }
        .hero-left { flex: 1; max-width: 620px; }
        .hero-h1 {
          font-family: 'Sora', sans-serif;
          font-size: clamp(44px, 6vw, 72px);
          font-weight: 800; line-height: 1.05; color: var(--foreground);
          margin-bottom: 32px;
          letter-spacing: -0.03em;
        }
        .c-highlight { color: var(--primary); }
        .c-cyan-text { color: #01B6B1; }
        .c-brown-text { color: #9A7B5C; }

        .hero-desc {
          font-size: 19px; line-height: 1.7; color: var(--muted);
          max-width: 520px; margin-bottom: 48px;
        }
        .hero-btns { display: flex; gap: 20px; flex-wrap: wrap; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 18px 36px; background: var(--primary); color: white;
          border: none; border-radius: 50px; font-size: 17px;
          font-weight: 800; font-family: 'Sora', sans-serif;
          cursor: pointer; transition: all 0.2s;
          box-shadow: 0 12px 35px rgba(232,56,13,0.4);
        }
        .btn-primary:hover { transform: translateY(-4px); box-shadow: 0 18px 45px rgba(232,56,13,0.5); }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 18px 36px; background: white; color: #111;
          border: 2.5px solid #eee; border-radius: 50px; font-size: 17px;
          font-weight: 800; font-family: 'Sora', sans-serif;
          cursor: pointer; transition: all 0.2s;
        }
        .btn-secondary:hover { border-color: #111; transform: translateY(-2px); }

        .hero-right {
          flex: 1.2; display: flex; justify-content: center; align-items: center;
          position: relative;
        }
        .hero-img {
          width: 100%; max-width: 640px; border-radius: 48px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.15);
        }

        /* Stats */
        .stats-bar {
          display: grid; grid-template-columns: repeat(4, 1fr);
          padding: 70px 5%; gap: 40px; border-top: 2px solid var(--border);
        }
        .stat-item { text-align: center; border-right: 2px solid var(--border); }
        .stat-item:last-child { border-right: none; }
        .stat-num {
          font-family: 'Sora', sans-serif;
          font-size: 48px; font-weight: 800; margin-bottom: 10px;
          letter-spacing: -0.02em;
        }
        .stat-label { font-size: 16px; color: var(--muted); font-weight: 700; }

        /* Sections */
        .section { padding: 120px 5%; }
        .section-header { text-align: center; margin-bottom: 80px; }
        .section-title {
          font-family: 'Sora', sans-serif; font-size: 54px;
          font-weight: 800; color: var(--foreground);
          letter-spacing: -0.02em;
        }
        .section-title span { color: var(--primary); }
        .section-sub { font-size: 20px; color: var(--muted); margin-top: 20px; }

        /* Cards */
        .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 36px; }
        .step-card {
            background: var(--card-bg); border-radius: 40px; padding: 56px 44px;
            border: 1.5px solid var(--border); transition: all 0.4s;
        }
        .step-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(0,0,0,0.06); }
        .step-icon-wrap {
            width: 84px; height: 84px; border-radius: 24px;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 36px; font-size: 32px;
        }
        .sw-orange { background: rgba(232,56,13,0.1); color: #E8380D; }
        .sw-cyan { background: rgba(1,182,177,0.1); color: #01B6B1; }
        .sw-yellow { background: rgba(255,191,0,0.1); color: #FFBF00; }
        
        .step-num { font-family: 'Sora', sans-serif; font-size: 24px; font-weight: 800; margin-bottom: 18px; }
        .step-desc { font-size: 17px; color: var(--muted); line-height: 1.8; }

        /* Orange Banner */
        .banner-orange {
            margin: 0 5% 120px; background: var(--primary); border-radius: 56px;
            padding: 90px 70px; color: white;
            box-shadow: 0 30px 60px rgba(232,56,13,0.25);
        }
        .banner-top { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 70px; }
        .banner-title { font-family: 'Sora', sans-serif; font-size: 64px; font-weight: 800; margin-bottom: 14px; letter-spacing: -0.03em; }
        .banner-sub { font-size: 20px; opacity: 0.95; font-weight: 500; }
        .view-all { display: flex; align-items: center; gap: 12px; font-weight: 800; font-size: 18px; cursor: pointer; transition: 0.2s; }
        .view-all:hover { gap: 18px; opacity: 0.8; }
        
        .hustle-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; }
        .hustle-card {
            background: rgba(255,255,255,0.12); border: 1.5px solid rgba(255,255,255,0.18);
            border-radius: 40px; padding: 48px 32px; transition: 0.3s;
        }
        .hustle-card:hover { background: rgba(255,255,255,0.22); transform: translateY(-6px); }
        .h-icon { width: 72px; height: 72px; border-radius: 50%; background: white; color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 32px; margin-bottom: 28px; }
        .h-name { font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 800; margin-bottom: 14px; }
        .h-desc { font-size: 16px; opacity: 0.9; line-height: 1.7; font-weight: 500; }

        /* Why Yohpal */
        .why-side-layout { padding: 100px 5%; display: flex; gap: 100px; align-items: center; }
        .why-imgs-col { flex: 1.1; display: flex; flex-direction: column; gap: 32px; }
        .why-imgs-row { display: grid; grid-template-columns: 1fr 1.3fr; gap: 28px; }
        .why-img-box img { width: 100%; border-radius: 40px; box-shadow: 0 25px 50px rgba(0,0,0,0.1); }
        .live-banner-btn {
            background: var(--primary); color: white; border-radius: 24px; padding: 28px 40px;
            display: flex; align-items: center; gap: 24px;
            font-family: 'Sora', sans-serif; font-weight: 800; font-size: 28px;
            box-shadow: 0 15px 40px rgba(232,56,13,0.3);
            transition: transform 0.2s; cursor: pointer;
        }
        .live-banner-btn:hover { transform: scale(1.02); }
        .live-dot-indicator { background: white; width: 14px; height: 14px; border-radius: 50%; box-shadow: 0 0 15px rgba(255,255,255,0.8); animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.6; } 100% { transform: scale(1); opacity: 1; } }

        .why-text-col { flex: 1; }
        .feat-card { display: flex; gap: 28px; margin-bottom: 48px; }
        .f-icon-circle { width: 68px; height: 68px; border-radius: 18px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 8px 20px rgba(0,0,0,0.05); }
        .ft-1 { background: #FEF2F0; color: #E8380D; }
        .ft-2 { background: #F0FBFA; color: #01B6B1; }
        .ft-3 { background: #FFF9E6; color: #FFBF00; }
        .ft-title { font-family: 'Sora', sans-serif; font-weight: 800; font-size: 22px; margin-bottom: 10px; }
        .ft-desc { font-size: 17px; color: var(--muted); line-height: 1.8; font-weight: 500; }

        /* Footer */
        .footer { background: var(--background); padding: 100px 5% 50px; border-top: 2px solid var(--border); }
        .footer-main { display: grid; grid-template-columns: 2.2fr 1fr 1fr 1fr; gap: 70px; margin-bottom: 90px; }
        .f-brand-text { margin: 28px 0 36px; color: var(--muted); font-size: 17px; max-width: 380px; line-height: 1.8; }
        .social-group { display: flex; gap: 18px; }
        .soc-btn { width: 48px; height: 48px; border-radius: 50%; background: #FDEDEB; color: #E8380D; display: flex; align-items: center; justify-content: center; transition: 0.2s; border: none; cursor: pointer; }
        .soc-btn:hover { background: var(--primary); color: white; transform: rotate(10deg); }
        .f-col-h { font-family: 'Sora', sans-serif; font-weight: 800; font-size: 18px; margin-bottom: 28px; }
        .f-nav-links { display: flex; flex-direction: column; gap: 16px; color: var(--muted); font-size: 16px; font-weight: 600; }
        .f-nav-link:hover { color: var(--primary); cursor: pointer; }
        .f-copyright-bar { display: flex; justify-content: space-between; align-items: center; padding-top: 40px; border-top: 1.5px solid var(--border); color: var(--muted); font-size: 15px; font-weight: 600; }

        @media (max-width: 1024px) {
            .hero { flex-direction: column; text-align: center; }
            .hero-left, .hero-desc { max-width: 100%; text-align: center; margin-left: auto; margin-right: auto; }
            .hero-btns { justify-content: center; }
            .stats-bar { grid-template-columns: repeat(2, 1fr); gap: 20px; }
            .stat-item { border-right: none; }
            .steps-grid { grid-template-columns: 1fr; }
            .banner-orange { padding: 50px 30px; }
            .hustle-grid { grid-template-columns: repeat(2, 1fr); }
            .why-side-layout { flex-direction: column; }
            .footer-main { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
            .nav-links { display: none; }
            .hustle-grid { grid-template-columns: 1fr; }
            .footer-main { grid-template-columns: 1fr; }
            .banner-title { font-size: 44px; }
            .section-title { font-size: 40px; }
        }


      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <Logo size="md" />
        <div className="nav-links">
          <a href="#how" className="nav-link">How it Works</a>
          <a href="#post" className="nav-link">Post a Job</a>
          <button className="btn-nav-cta">Find Hustlers</button>
        </div>
        <div className="auth-btns">
            <ThemeToggle />
            <Link href="/login" className="btn-login">Login</Link>
            <Link href="/register" className="btn-get-started">Get Started</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-h1">
            Real Hustlers, Real Skills.<br />
            <span className="c-highlight">Right</span> <span className="c-brown-text">Around</span> <span className="c-cyan-text">You!</span>
          </h1>
          <p className="hero-desc">
            The ultimate connection for young Africans. Find skilled hustlers in
            your neighborhood for on-site services. From tech support to car
            washes, see them live on the map.
          </p>
          <div className="hero-btns">
            <button className="btn-primary">
              Find Hustlers <MapIcon />
            </button>
            <button className="btn-secondary">
              Become a Hustler
            </button>
          </div>
        </div>

        <div className="hero-right">
             <img 
                src="/images/niarb.png" 
                alt="Nairobi Skyline" 
                className="hero-img"
             />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        {[
          { num: "12K+", label: "Local Hustlers Registered", color: "#E8380D" },
          { num: "15K",  label: "Jobs Created",              color: "#01B6B1" },
          { num: "4.9/5",label: "Avg. Star Rating",          color: "#FFBF00" },
          { num: "100%", label: "Flexibility",               color: "#E8380D" },
        ].map((s) => (
          <div className="stat-item" key={s.label}>
            <div className="stat-num" style={{ color: s.color }}>{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── APP DOWNLOAD LINKS ── */}
      <div className="app-download-section">
        <a href="https://shorturl.at/lW87i" target="_blank" rel="noopener noreferrer" className="app-button" aria-label="Download on the App Store">
          <img src={appStoreIcon.src} alt="App Store" />
        </a>
        <a href="https://shorturl.at/M1Nfv" target="_blank" rel="noopener noreferrer" className="app-button" aria-label="Get it on Google Play">
          <img src={playStoreIcon.src} alt="Play Store" />
        </a>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="section" id="how">
        <div className="section-header">
          <h2 className="section-title">How it <span>Works</span></h2>
          <p className="section-sub">Get what you need done, right where you are, in three simple steps.</p>
        </div>
        <div className="steps-grid">
          {[
            {
              icon: <Compass size={36} />, cls: "sw-orange", num: "1. Browse the Map",
              desc: "See all skilled hustlers currently active in your neighborhood. Find exactly who you need nearby.",
            },
            {
              icon: <UserSearch size={36} />, cls: "sw-cyan", num: "2. Choose Your Hustler",
              desc: "Compare real-time ratings, transparent pricing, and exact proximity. Pick the perfect match for the job.",
            },
            {
              icon: <MapPin size={36} />, cls: "sw-yellow", num: "3. Get the Job Done",
              desc: "Your chosen hustler navigates directly to your location. Track their arrival and pay securely upon completion.",
            },
          ].map((step) => (
            <div className="step-card" key={step.num}>
              <div className={`step-icon-wrap ${step.cls}`}>{step.icon}</div>
              <div className="step-num">{step.num}</div>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LOCAL HUSTLES ── */}
      <div className="banner-orange">
        <div className="banner-top">
          <div>
            <h2 className="banner-title">Local Hustles</h2>
            <p className="banner-sub">Professional services delivered directly to your doorstep by local experts.</p>
          </div>
          <div className="view-all">
            View All Services <ArrowRight />
          </div>
        </div>
        <div className="hustle-grid">
          {[
            { icon: "🏠", name: "Housekeeping & Wellness", desc: "Cleaning, home care, laundry, and general assistance." },
            { icon: "🔨", name: "Contraction & Building", desc: "Masonry, painting, carpentry, plumbing, and electrical." },
            { icon: "🐾", name: "Animal Farming", desc: "Livestock care, feeding animals, and general farm support." },
            { icon: "🛒", name: "Grocery Kiosks", desc: "Stocking shelves, shop assistance and local deliveries." },
          ].map((h) => (
            <div className="hustle-card" key={h.name}>
              <div className="h-icon">{h.icon}</div>
              <div className="h-name">{h.name}</div>
              <p className="h-desc">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY YOHPAL ── */}
      <div className="why-side-layout">
        <div className="why-imgs-col">
            <div className="why-imgs-row">
                <div className="why-img-box">
                    <img src="/images/phone.png" alt="Map App" />
                </div>
                <div className="why-img-box">
                    <img src="/images/hustle.png" alt="Work Process" />
                </div>
            </div>
            <div className="live-banner-btn">
                <div className="live-dot-indicator"></div>
                Live <span style={{ fontWeight: 500, fontSize: 18, opacity: 0.9 }}>Real-time GPS Tracking</span>
            </div>
        </div>

        <div className="why-text-col">
          <h2 className="section-title" style={{ textAlign: "left", marginBottom: 56, fontSize: 48, lineHeight: 1.1 }}>
            Why YohPal <span style={{ color: "var(--primary)" }}>Hustle</span> is the Best Choice
          </h2>
          <div className="feat-stack">
            {[
              { 
                icon: <CreditCard size={32} />, 
                cls: "ft-1", 
                title: "Get Paid Daily", 
                desc: "Users do not have to wait for a monthly salary. After completing a gig or task, they can receive their payment the same day or within a short time." 
              },
              { 
                icon: <Clock size={32} />, 
                cls: "ft-2", 
                title: "Work when you want.", 
                desc: "The user is not forced to follow a fixed work schedule. They choose when they want to accept a job." 
              },
              { 
                icon: <BarChart3 size={32} />, 
                cls: "ft-3", 
                title: "Grow Your Hustle Faster", 
                desc: "The platform helps users build their side hustle or skills quickly by connecting them with more opportunities." 
              },
            ].map((f) => (
              <div className="feat-card" key={f.title}>
                <div className={`f-icon-circle ${f.cls}`}>{f.icon}</div>
                <div>
                  <div className="ft-title">{f.title}</div>
                  <p className="ft-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-main">
          <div>
            <Logo size="md" />
            <p className="f-brand-text">Empowering the next generation of African digital entrepreneurs by connecting them with local service opportunities.</p>
            <div className="social-group">
              {[InstagramIcon, TikTokIcon, XIcon, FacebookIcon].map((Icon, i) => (
                <button 
                  className="soc-btn" 
                  key={i} 
                  style={{ background: "var(--primary)", color: "white" }}
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="f-col-h">Services</div>
            <div className="f-nav-links">
              {["Car Wash", "Tech Support", "Tutoring", "All Services"].map(s => <span key={s} className="f-nav-link">{s}</span>)}
            </div>
          </div>
          <div>
            <div className="f-col-h">Company</div>
            <div className="f-nav-links">
                {["About Us", "Careers", "Contact", "Safety"].map(s => <span key={s} className="f-nav-link">{s}</span>)}
            </div>
          </div>
          <div>
            <div className="f-col-h">Support</div>
            <div className="f-nav-links">
                {["Help Center", "Privacy Policy", "Terms of Service"].map(s => <span key={s} className="f-nav-link">{s}</span>)}
            </div>
          </div>
        </div>
        <div className="f-copyright-bar">
          <span>© 2025 YohPal Hustle. All rights reserved.</span>
          <Logo size="sm" withText={true} />
        </div>
      </footer>


    </div>
  );
}
