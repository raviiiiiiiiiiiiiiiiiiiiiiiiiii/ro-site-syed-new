'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Phone, Menu, X, ChevronDown, Calendar, ShieldCheck } from 'lucide-react';
import { BUSINESS_DETAILS, BRAND_PAGES_DATA } from '@/src/data/content';
import { PageRoute } from '@/src/types';
import { getBrandTheme } from '@/src/utils/brandTheme';

interface HeaderProps {
  currentRoute?: PageRoute;
  lastBrandRoute?: PageRoute | null;
  onNavigate?: (route: PageRoute) => void;
  onOpenBookModal?: () => void;
}

const ANNOUNCEMENTS = [
  "Fast Doorstep RO Service Across Bangalore in 60–90 Mins",
  `Immediate Assistance: Call ${BUSINESS_DETAILS.phone}`,
  "100% Genuine Filter & Spare Parts Replacement",
  "30-Day Labor Warranty & Transparent Fixed Pricing",
];

export const Header: React.FC<HeaderProps> = ({
  currentRoute: propCurrentRoute,
  lastBrandRoute: propLastBrandRoute,
  onNavigate,
  onOpenBookModal,
}) => {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const currentRoute = (propCurrentRoute || pathname) as PageRoute;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [policiesDropdownOpen, setPoliciesDropdownOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const brandTheme = getBrandTheme(currentRoute, propLastBrandRoute);

  // Rotate Announcements
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (route: PageRoute) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      router.push(route);
    }
    setMobileMenuOpen(false);
    setPoliciesDropdownOpen(false);
  };

  const handleScrollToForm = () => {
    if (currentRoute === '/') {
      const el = document.getElementById('lead-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (onOpenBookModal) {
        onOpenBookModal();
      }
    } else {
      if (onNavigate) {
        onNavigate('/');
      } else {
        router.push('/');
      }
      setTimeout(() => {
        const el = document.getElementById('lead-form');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }
    setMobileMenuOpen(false);
  };

  // On brand pages, the brand has its own dedicated pixel-perfect header matching the reference designs
  if (currentRoute && (currentRoute.includes('-service') || currentRoute.endsWith('-service'))) {
    return null;
  }

  return (
    <header
      id="main-header"
      className="relative z-40 bg-white border-b border-slate-200/80"
    >
      {/* Top Info Banner with dynamic brand background */}
        <div 
          style={{ backgroundColor: brandTheme.bannerBg }}
          className="text-white text-[11px] sm:text-xs py-1.5 px-4 font-medium tracking-wide transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 mx-auto sm:mx-0 overflow-hidden">
              <ShieldCheck className="w-3.5 h-3.5 text-white/80 shrink-0 hidden sm:inline" />
              <span key={announcementIndex} className="animate-fadeIn truncate text-center">
                {ANNOUNCEMENTS[announcementIndex]}
              </span>
            </div>
            
            <div className="hidden sm:flex items-center gap-4 text-white/90 text-xs">
              <span>Bangalore Doorstep Service</span>
              <span>•</span>
              <a
                href={`tel:${BUSINESS_DETAILS.phone}`}
                className="font-bold text-white hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-white/80" />
                {BUSINESS_DETAILS.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-22">
            
            {/* Brand Logo & Name */}
            <Link
              href="/"
              onClick={() => {
                setMobileMenuOpen(false);
                setPoliciesDropdownOpen(false);
              }}
              className="flex items-center gap-2.5 sm:gap-3.5 text-left focus:outline-none group py-1"
            >
              <div className="h-9 sm:h-11 bg-white px-2 py-1 rounded-xl shrink-0 overflow-hidden border border-slate-200 shadow-2xs flex items-center justify-center group-hover:border-[#0070e0]/40 transition-colors">
                <img
                  src={BUSINESS_DETAILS.logoUrl}
                  alt={BUSINESS_DETAILS.name}
                  width="44"
                  height="44"
                  loading="eager"
                  decoding="async"
                  className="h-full w-auto max-w-[80px] sm:max-w-[95px] object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-['Outfit',sans-serif] font-bold text-xl sm:text-2xl lg:text-[26px] tracking-tight text-[#0070e0] hover:text-[#005ec4] transition-colors leading-tight">
                  {BUSINESS_DETAILS.name}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
                  Doorstep RO Water Purifier Repair
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                style={currentRoute === '/' ? { color: brandTheme.primary } : undefined}
                className={`text-sm font-semibold transition-colors ${
                  currentRoute === '/' ? 'font-bold' : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                Home
              </Link>

              <button
                onClick={() => handleScrollToForm()}
                className="text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors"
              >
                Book Doorstep Visit
              </button>

              {/* Policies Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setPoliciesDropdownOpen(!policiesDropdownOpen)}
                  onMouseEnter={() => setPoliciesDropdownOpen(true)}
                  style={
                    currentRoute.includes('policy') ||
                    currentRoute.includes('terms') ||
                    currentRoute.includes('disclaimer') ||
                    currentRoute.includes('refund') ||
                    currentRoute.includes('cookie')
                      ? { color: brandTheme.primary }
                      : undefined
                  }
                  className={`flex items-center gap-1 text-sm font-semibold transition-colors py-2 ${
                    currentRoute.includes('policy') ||
                    currentRoute.includes('terms') ||
                    currentRoute.includes('disclaimer') ||
                    currentRoute.includes('refund') ||
                    currentRoute.includes('cookie')
                      ? 'font-bold'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  Policies
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${policiesDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {policiesDropdownOpen && (
                  <div
                    onMouseLeave={() => setPoliciesDropdownOpen(false)}
                    className="absolute top-full right-0 w-56 bg-white rounded-xl shadow-xl border border-slate-200/90 py-2 z-50 animate-fadeIn"
                  >
                    <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Company Policies
                    </div>
                    <Link
                      href="/privacy-policy"
                      onClick={() => setPoliciesDropdownOpen(false)}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-950 block"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="/terms-of-service"
                      onClick={() => setPoliciesDropdownOpen(false)}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-950 block"
                    >
                      Terms and Conditions
                    </Link>
                    <Link
                      href="/refund-policy"
                      onClick={() => setPoliciesDropdownOpen(false)}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-950 block"
                    >
                      Cancellation &amp; Refund
                    </Link>
                    <Link
                      href="/disclaimer"
                      onClick={() => setPoliciesDropdownOpen(false)}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-950 block"
                    >
                      Disclaimer
                    </Link>
                    <Link
                      href="/cookie-policy"
                      onClick={() => setPoliciesDropdownOpen(false)}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-950 block"
                    >
                      Cookie Policy
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Right Action Call Button */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${BUSINESS_DETAILS.phone}`}
                style={{
                  background: `linear-gradient(135deg, ${brandTheme.gradientFrom}, ${brandTheme.gradientTo})`,
                }}
                className="px-5 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 fill-white" />
                <span>{BUSINESS_DETAILS.phone}</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={`tel:${BUSINESS_DETAILS.phone}`}
                style={{ backgroundColor: brandTheme.primary }}
                className="p-2.5 rounded-lg text-white shadow-xs"
                aria-label="Call Now"
              >
                <Phone className="w-4 h-4 fill-white" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-800 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" strokeWidth={2.2} /> : <Menu className="w-7 h-7" strokeWidth={2.2} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl space-y-4 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-slate-900 rounded-lg hover:bg-slate-50"
              >
                Home
              </Link>

              <div className="px-3 pt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Legal &amp; Policies
              </div>
              <div className="flex flex-col space-y-1 px-3">
                <Link
                  href="/privacy-policy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-xs text-slate-600 hover:text-slate-950"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-service"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-xs text-slate-600 hover:text-slate-950"
                >
                  Terms and Conditions
                </Link>
                <Link
                  href="/refund-policy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-xs text-slate-600 hover:text-slate-950"
                >
                  Cancellation &amp; Refund Policy
                </Link>
                <Link
                  href="/disclaimer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-xs text-slate-600 hover:text-slate-950"
                >
                  Disclaimer
                </Link>
                <Link
                  href="/cookie-policy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-xs text-slate-600 hover:text-slate-950"
                >
                  Cookie Policy
                </Link>
              </div>

              <button
                onClick={() => handleScrollToForm()}
                className="w-full text-center px-4 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-sm shadow-md"
              >
                Book Doorstep Visit
              </button>
            </div>
          </div>
        )}
      </header>
  );
};
