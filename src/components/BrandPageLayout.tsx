'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Phone,
  MapPin,
  Check,
  ShieldCheck,
  Star,
  Clock,
  Wrench,
  Droplets,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  User,
  Play,
  ArrowRight,
  X,
  Sparkles,
  ThumbsUp,
  Send,
  Heart,
  Activity,
  Layers,
  Filter,
  Shield,
  Zap,
  Menu,
  CheckCircle,
  Truck,
  IndianRupee,
  Settings,
  HelpCircle,
  Share2,
  Leaf,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Lock,
} from 'lucide-react';
import { BrandInfo } from '@/src/types';
import { BUSINESS_DETAILS, BANGALORE_LOCALITIES } from '@/src/data/content';

interface BrandPageLayoutProps {
  brand: BrandInfo;
}

export function BrandPageLayout({ brand }: BrandPageLayoutProps) {
  // Navigation & Mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Video Modal
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Search Bar state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Booking Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Pincode Availability Checker State
  const [checkPincode, setCheckPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{
    checked: boolean;
    available: boolean;
    message: string;
  }>({ checked: false, available: false, message: '' });

  // FAQ Accordion Active Items
  const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({ 0: true, 1: true });
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  // Mobile Footer Accordions
  const [mobileFooterOpen, setMobileFooterOpen] = useState<{ [key: string]: boolean }>({});

  // Newsletter email state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Form scroll ref
  const bookingFormRef = useRef<HTMLDivElement>(null);

  const scrollToBookingForm = () => {
    if (bookingFormRef.current) {
      bookingFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Brand Theme Variables (preserving existing brand colors)
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderHidden(true);
      } else {
        setIsHeaderHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const primaryColor = brand.brandThemeColors?.primary || brand.accentColor || '#007A53'; // AO Smith emerald or respective brand color
  const darkBgColor = brand.brandThemeColors?.darkBg || '#064e3b';
  const accentHighlight = brand.brandThemeColors?.accent || '#10b981';
  const lightBgColor = brand.brandThemeColors?.lightBg || '#f0fdf4';
  const borderColor = brand.brandThemeColors?.border || '#a7f3d0';

  const displayPhone = BUSINESS_DETAILS.phone;

  // Hero Image resolution: prioritize brand.heroBgImage, then fallback to brand-specific requested Cloudinary URLs or showcaseImage
  const heroImageToDisplay = brand.heroBgImage || (
    brand.id === 'kent'
      ? 'https://res.cloudinary.com/dieq3fjuv/image/upload/v1789666091/file_00000000087882078f47eb6ab54f5d99_aeo7v5.png'
      : brand.id === 'ao-smith'
      ? 'https://res.cloudinary.com/dieq3fjuv/image/upload/v1789666091/file_00000000921882309edc5ef9e9e59e59_oi7mpt.png'
      : brand.id === 'aquaguard'
      ? 'https://res.cloudinary.com/dieq3fjuv/image/upload/v1789666091/file_00000000b97c8211b0ff0be33d753076_wncmpj.png'
      : brand.id === 'pureit'
      ? 'https://res.cloudinary.com/dieq3fjuv/image/upload/v1789666101/file_00000000c8308206b3080195508f65f9_kdu2po.png'
      : brand.heroImage || brand.showcaseImage
  );

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleMobileFooter = (column: string) => {
    setMobileFooterOpen((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  // Handle Form Submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!serviceType) {
      setFormError('Please select a service type.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  // Handle Pincode Check
  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = checkPincode.trim();
    if (!cleanPin || cleanPin.length !== 6 || !/^\d+$/.test(cleanPin)) {
      setPincodeResult({
        checked: true,
        available: false,
        message: 'Please enter a valid 6-digit Indian postal pincode.',
      });
      return;
    }
    // All valid pincodes are available
    setPincodeResult({
      checked: true,
      available: true,
      message: `Service is Available! Our certified ${brand.name} technician can reach your doorstep within 60 to 90 minutes.`,
    });
  };

  const servicesList = [
    {
      title: 'Repair & Service',
      description: `Quick and reliable repair for all ${brand.name} RO water purifiers.`,
      image: 'https://res.cloudinary.com/dieq3fjuv/image/upload/v1789669453/IMG-20260917-WA0015_ptidj8.jpg',
      icon: Wrench,
    },
    {
      title: 'Filter Replacement',
      description: 'Replace sediment, carbon filters and RO membranes for better purification.',
      image: 'https://res.cloudinary.com/dieq3fjuv/image/upload/v1789669453/IMG-20260917-WA0017_qm0y3k.jpg',
      icon: Filter,
    },
    {
      title: 'AMC Plans',
      description: 'Affordable maintenance plans for uninterrupted performance.',
      image: 'https://res.cloudinary.com/dieq3fjuv/image/upload/v1789669453/IMG-20260917-WA0016_y94ufa.jpg',
      icon: ShieldCheck,
    },
    {
      title: 'Water Quality Check',
      description: 'Get your water tested and ensure your purifier is working efficiently.',
      image: 'https://res.cloudinary.com/dieq3fjuv/image/upload/v1789669453/IMG-20260917-WA0018_m8dnkp.jpg',
      icon: Droplets,
    },
  ];

  // 4 Why Choose Points - matching reference
  const whyChoosePoints = [
    {
      title: 'Experienced Technicians',
      description: 'Professional water purifier service engineers.',
      icon: User,
    },
    {
      title: 'Genuine Compatible Parts',
      description: 'Quality-tested filters and components.',
      icon: Settings,
    },
    {
      title: 'Fast Doorstep Service',
      description: 'Same day or next day service in your area.',
      icon: Truck,
    },
    {
      title: 'Transparent Pricing',
      description: 'Affordable service charges with no hidden costs.',
      icon: IndianRupee,
    },
  ];

  // 4 Primary Reference FAQs matching screenshot exactly
  const primaryFaqs = [
    {
      question: `Why is my ${brand.name} water purifier not dispensing water?`,
      answer: `Possible reasons include clogged filters, low inlet pressure, membrane issues, or electrical faults. Our trained technician performs complete diagnostics at your doorstep to restore normal flow.`,
    },
    {
      question: `How often should ${brand.name} RO filters be replaced?`,
      answer: `Filter replacement depends on water quality and usage. Regular maintenance helps maintain purification efficiency; sediment and carbon filters typically need replacement every 6-12 months.`,
    },
    {
      question: `Do you provide ${brand.name} AMC service?`,
      answer: `Yes, annual maintenance plans help maintain purifier performance through scheduled servicing and component checks, protecting you against unexpected breakdowns.`,
    },
    {
      question: `Do technicians provide doorstep service?`,
      answer: `Yes, we provide doorstep service for ${brand.name} water purifiers within serviceable areas across Bangalore with fast response times.`,
    },
    ...(brand.brandFaqs || []),
  ];

  const displayedFaqs = showAllFaqs ? primaryFaqs : primaryFaqs.slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-slate-900 selection:text-white">
      
      {/* ========================================================
          1. STICKY HEADER
             - Logo (left)
             - Nav links (center): Home, Services, AMC Plans, Filters & Parts, Why [Brand], Support
             - Search icon + phone number w/ icon (right)
             - Primary CTA button (rounded pill, right-most)
             - Mobile: collapse nav into hamburger menu, keep logo + CTA visible
      ======================================================== */}
      <header className={`sticky top-0 z-50 bg-white border-b border-slate-200 shadow-2xs transition-transform duration-300 ${isHeaderHidden ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo (left) - Exact brand logo image */}
            <div className="flex items-center gap-3">
              <Link href={brand.slug} className="flex items-center gap-2 group">
                {brand.logoUrl ? (
                  <div className="h-10 sm:h-12 flex items-center justify-center">
                    <img
                      src={brand.logoUrl}
                      alt={`${brand.name} Logo`}
                      className="h-full w-auto max-w-[140px] sm:max-w-[170px] object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <span
                      style={{ color: primaryColor }}
                      className="font-black text-2xl sm:text-3xl tracking-tight leading-none uppercase"
                    >
                      {brand.name}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 tracking-wider">
                      {brand.subTagline || 'Innovation has a name.'}
                    </span>
                  </div>
                )}
              </Link>
            </div>

            {/* Nav links (center - desktop): Home, Our Services, AMC Plans, Filters & Parts, Why Brand, Support */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs sm:text-sm font-semibold text-slate-600">
              <Link href={brand.slug} className="text-slate-950 font-bold hover:text-slate-900 transition-colors">
                Home
              </Link>
              <a href="#services" className="hover:text-slate-950 transition-colors">
                Our Services
              </a>
              <a href="#services" className="hover:text-slate-950 transition-colors">
                AMC Plans
              </a>
              <a href="#parts" className="hover:text-slate-950 transition-colors">
                Filters &amp; Parts
              </a>
              <a href="#why-choose-us" className="hover:text-slate-950 transition-colors">
                Why {brand.name.toUpperCase()}
              </a>
              <a href="#support-faqs" className="hover:text-slate-950 transition-colors">
                Support
              </a>
            </nav>

            {/* Right: Divider + Phone number w/ icon + Primary CTA button */}
            <div className="flex items-center gap-3 sm:gap-4">
              
              {/* Divider */}
              <div className="hidden sm:block h-6 w-px bg-slate-200" />

              {/* Phone number w/ icon (desktop) */}
              <div className="hidden sm:flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0"
                >
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <a
                    href={`tel:${displayPhone}`}
                    className="text-xs sm:text-sm font-bold text-slate-950 hover:text-blue-700 leading-none"
                  >
                    {displayPhone}
                  </a>
                  <span className="text-[10px] text-slate-500 font-medium mt-0.5">
                    Mon - Sun | 8AM - 8PM
                  </span>
                </div>
              </div>

              {/* Primary CTA button (rounded pill, right-most) */}
              <button
                onClick={scrollToBookingForm}
                className="bg-[#0b5cbe] hover:bg-[#094fa5] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-lg sm:rounded-full shadow-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Book a Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Mobile hamburger menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
                className="lg:hidden p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Quick Search Drawer */}
        {searchOpen && (
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-3">
            <div className="max-w-xl mx-auto flex items-center gap-2">
              <input
                type="text"
                placeholder={`Search ${brand.name} RO services, filter change, AMC...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-full px-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
              <button
                onClick={scrollToBookingForm}
                style={{ backgroundColor: primaryColor }}
                className="text-white text-xs font-bold px-4 py-2 rounded-full cursor-pointer"
              >
                Find
              </button>
            </div>
          </div>
        )}

      </header>

      {/* Fullscreen Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-white flex flex-col pt-4 px-6 pb-6 overflow-y-auto animate-fadeIn">
          <div className="flex justify-end mb-8">
            <button 
              onClick={() => setMobileMenuOpen(false)} 
              className="p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-4 text-xl font-extrabold text-slate-800">
            <Link href={brand.slug} onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100 text-slate-900">Home</Link>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Services</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">AMC Plans</a>
            <a href="#parts" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Filters &amp; Parts</a>
            <a href="#why-choose-us" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Why {brand.name}</a>
            <a href="#support-faqs" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Support</a>
          </nav>

          <div className="mt-auto pt-8 flex flex-col items-start gap-4">
            <div className="w-full pt-4 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Helpline</span>
              <a href={`tel:${displayPhone}`} className="text-lg font-black text-[#0b5cbe]">
                {displayPhone}
              </a>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToBookingForm();
              }}
              className="w-full bg-[#0b5cbe] hover:bg-[#094fa5] text-white text-base font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Book a Service
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          2. HERO SECTION + DOCKED BOOKING FORM
             Matches IMG-20260917-WA0019.jpg exactly:
             - Upper Hero:
               * Left: Eyebrow, bold H1 ("KENT RO Service at Your Doorstep"), Tagline, Description, 4 Feature Badges row, 2 CTA buttons ("Book a Service →" and "Watch How It Works")
               * Center: Kent Grand+ RO water purifier with glass tumbler dispensing water + floating badge "Mineral RO™ Technology with UV + UF + TDS Control"
               * Right: 4 Vertical Trust Badges ("Safer Water", "Healthier Families", "Trusted by Millions", "A Cleaner Greener Tomorrow") + Blue cursive script "Pure Water Pure Happiness"
             - Lower Hero (The Booking Card):
               * Custom banner background image
               * Header: "Book {BRAND} Service Now"
               * 2-Row Form: Full Name, Mobile Number, Enter Your Pincode, Select Service Type, Book Service Now →
               * Microcopy: "🔒 Your information is safe with us."
      ======================================================== */}
      {/* ========================================================
          3. HERO BANNER SECTION (16:9 Aspect Ratio)
             - Fitted 16:9 banner with brand background image
             - Reduced white overlay opacity for vivid image visibility
             - Left: Clean title, motto, description, 4 badges & CTAs
             - Right: Open space for background purifier & graphics
      ======================================================== */}
      <section className="relative w-full aspect-[5/3] sm:aspect-auto min-h-0 sm:min-h-[440px] max-h-none sm:max-h-[580px] lg:max-h-[640px] flex items-start sm:items-center overflow-hidden border-b border-slate-200/80 bg-white">
        {/* HERO BACKGROUND IMAGE: 16:9 background banner */}
        {heroImageToDisplay && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-[right_top] sm:bg-[center_top] bg-no-repeat"
              style={{ backgroundImage: `url(${heroImageToDisplay})` }}
            />
            {/* Reduced white overlay opacity as requested */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent sm:from-white/35 sm:via-white/15 pointer-events-none" />
          </div>
        )}

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Title, Subheading, Description, Badges & CTAs */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-2 sm:space-y-3.5 text-left">
              
              {/* Eyebrow Label */}
              <div className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-slate-600">
                INDIA&apos;S MOST TRUSTED RO BRAND
              </div>

              {/* Large Bold H1 */}
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0c2b5e] leading-tight sm:leading-[1.15]">
                <span className="block">{brand.name.toUpperCase()} RO</span>
                <span className="block">Service at Your Doorstep</span>
              </h1>

              {/* Subheading / Tagline */}
              <p className="hidden sm:block text-xs sm:text-sm font-bold text-slate-800 tracking-tight">
                Pure Water. Healthy Families. Brighter Tomorrows.
              </p>

              {/* Short description paragraph */}
              <p className="hidden sm:block text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-md">
                Get expert {brand.name.toUpperCase()} water purifier service, repair, filter replacement, installation and AMC support from certified technicians. Genuine spare parts, fast and reliable service across your city.
              </p>

              {/* Row of 4 small icon+text feature badges */}
              <div className="hidden sm:grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-0.5 max-w-lg">
                {[
                  { label: 'Same Day Service', icon: Zap },
                  { label: 'Certified Technicians', icon: ShieldCheck },
                  { label: `Genuine ${brand.name.toUpperCase()} Parts`, icon: Settings },
                  { label: 'Doorstep Support', icon: Clock },
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 bg-white/90 border border-slate-200/90 rounded-md px-2 py-1 shadow-2xs"
                    >
                      <div className="w-4 h-4 rounded-full border border-blue-200 bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                        <IconComp className="w-2.5 h-2.5" />
                      </div>
                      <span className="text-[10px] sm:text-[10.5px] font-semibold text-slate-800 leading-tight">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
                <button
                  onClick={scrollToBookingForm}
                  className="bg-[#0066cc] hover:bg-[#0055b3] text-white text-[10px] sm:text-sm font-bold px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer"
                >
                  <span>Book a Service</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>

              {/* 4.5 Star Rating & 10,000+ Happy Customers Social Proof */}
              <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 pt-1.5">
                <div className="flex items-center gap-1 sm:gap-1.5 bg-white/90 backdrop-blur-2xs border border-slate-200/90 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 shadow-2xs">
                  <div className="flex items-center">
                    {[1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <div className="relative w-2.5 h-2.5 sm:w-3.5 sm:h-3.5">
                      <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-slate-300 fill-slate-200" />
                      <div className="absolute inset-0 overflow-hidden w-1/2">
                        <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs font-extrabold text-slate-900">4.5</span>
                </div>

                <span className="text-[9px] sm:text-xs font-semibold text-slate-800 bg-white/70 sm:bg-transparent rounded-md px-1.5 sm:px-0 py-0.5">
                  <span className="font-bold text-slate-950">10,000+</span> happy customers
                </span>
              </div>
            </div>

            {/* Right Column: Open space so background image remains unobstructed */}
            <div className="hidden lg:block lg:col-span-6 xl:col-span-7 pointer-events-none" />

          </div>
        </div>
      </section>

      {/* ========================================================
          LOWER HERO: THE BOOKING FORM CARD WITH BACKGROUND IMAGE
      ======================================================== */}
      <section className="bg-slate-50 py-8 sm:py-12 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={bookingFormRef}
            id="booking-section"
            className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-white relative shadow-2xl overflow-hidden border border-blue-900/50 bg-[#0c3975] bg-cover bg-center sm:bg-[center_right] bg-no-repeat"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dieq3fjuv/image/upload/v1789668617/file_00000000aa70820b93ba0ee61bc6377c_prruge.png')`,
            }}
          >
            {/* Soft gradient overlay to ensure text contrast while letting background graphic shine through */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c2b5e]/90 via-[#0c2b5e]/60 to-transparent sm:from-[#0c2b5e]/80 sm:via-[#0c2b5e]/30 sm:to-transparent pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Form Column */}
              <div className="lg:col-span-8 xl:col-span-7 space-y-4">
                
                {/* Header inside Card */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Book {brand.name.toUpperCase()} Service Now
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-100/90 mt-1">
                    Get professional {brand.name.toUpperCase()} RO repair, installation, maintenance and filter replacement at your doorstep.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 text-center space-y-2">
                    <CheckCircle className="w-9 h-9 text-emerald-400 mx-auto" />
                    <h3 className="text-base font-bold text-white">Service Request Received!</h3>
                    <p className="text-xs text-blue-100 max-w-md mx-auto">
                      Thank you, <strong className="text-white">{fullName}</strong>. A certified {brand.name.toUpperCase()} technician will contact you on <strong className="text-white">{phone}</strong> shortly.
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFullName('');
                        setPhone('');
                        setPincode('');
                      }}
                      className="text-xs text-emerald-300 underline font-semibold mt-1 cursor-pointer"
                    >
                      Book another service
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-3">
                    {formError && (
                      <div className="bg-rose-900/80 border border-rose-400 text-rose-100 text-xs px-3 py-2 rounded-lg">
                        {formError}
                      </div>
                    )}

                    {/* Row 1: 3 Fields (Full Name, Mobile Number, Enter Your Pincode) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      
                      {/* Full Name */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-white text-slate-900 placeholder-slate-400 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>

                      {/* Mobile Number */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="Mobile Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-white text-slate-900 placeholder-slate-400 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>

                      {/* Enter Your Pincode */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="text"
                          maxLength={6}
                          placeholder="Enter Your Pincode"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-white text-slate-900 placeholder-slate-400 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>

                    </div>

                    {/* Row 2: 2 Fields (Select Service Type ~60%, Submit Button ~40%) */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                      
                      {/* Select Service Type */}
                      <div className="relative sm:col-span-7">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Wrench className="w-3.5 h-3.5" />
                        </div>
                        <select
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
                          className={`w-full pl-9 pr-8 py-2.5 bg-white text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer ${
                            serviceType === '' ? 'text-slate-400' : 'text-slate-900'
                          }`}
                        >
                          <option value="" disabled>Select Service Type</option>
                          <option value="RO Repair & Service" className="text-slate-900">RO Repair &amp; Service</option>
                          <option value="Filter Replacement" className="text-slate-900">Filter Replacement</option>
                          <option value="AMC Maintenance Plan" className="text-slate-900">AMC Maintenance Plan</option>
                          <option value="Water Quality Check" className="text-slate-900">Water Quality Check</option>
                          <option value="Installation / Relocation" className="text-slate-900">Installation / Relocation</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                          <ChevronDown className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Book Service Now → Button */}
                      <div className="sm:col-span-5">
                        <button
                          type="submit"
                          className="w-full bg-[#0070e0] hover:bg-[#0060c5] text-white font-bold text-xs py-2.5 px-5 rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                        >
                          <span>Book Service Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                    {/* Security Microcopy centered below */}
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-blue-200/90 pt-1">
                      <Lock className="w-3 h-3 text-blue-200" />
                      <span>Your information is safe with us.</span>
                    </div>

                  </form>
                )}

              </div>

              {/* Right Column: Kept open so the background image artwork is unobstructed */}
              <div className="hidden lg:block lg:col-span-4 xl:col-span-5 pointer-events-none" />

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          4. OUR SERVICES SECTION (Exact layout matching IMG-20260917-WA0022.jpg)
             - Left Column: Eyebrow ("OUR SERVICES"), Title ("Complete {Brand} Water Purifier Care"),
               description, and "View All Services →" link
             - 4 Service Cards:
               * 1: Repair & Service (Wrench) + "Quick and reliable repair for all {Brand} RO water purifiers."
               * 2: Filter Replacement (Filter) + "Replace sediment, carbon filters and RO membranes for better purification."
               * 3: AMC Plans (ShieldCheck) + "Affordable maintenance plans for uninterrupted performance."
               * 4: Water Quality Check (Droplets) + "Get your water tested and ensure your purifier is working efficiently."
             - Each card has top image, inline icon + title, description, and "Know More →" link
      ======================================================== */}
      <section id="services" className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="xl:flex xl:gap-5.5 items-stretch">
            
            {/* Left Column: Heading & Intro matching screenshot */}
            <div className="xl:w-1/5 xl:shrink-0 mb-8 xl:mb-0 flex flex-col justify-between py-1 lg:py-2 pr-0 xl:pr-2">
              <div>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  OUR SERVICES
                </span>
                <h2 className="text-2xl sm:text-3xl xl:text-[26px] font-extrabold text-[#002b66] tracking-tight leading-[1.2]">
                  Complete {brand.name}
                  <span className="block mt-1 font-extrabold">Water Purifier Care</span>
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-600 mt-3 leading-relaxed">
                  From expert repairs to genuine filter replacements, we keep your {brand.name} purifier performing at its best.
                </p>
              </div>

              <div className="pt-4 sm:pt-6">
                <button
                  onClick={scrollToBookingForm}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0066cc] hover:text-[#0052a3] group cursor-pointer"
                >
                  <span className="underline underline-offset-4 decoration-[#0066cc] group-hover:decoration-[#0052a3]">
                    View All Services
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* 4 Service Cards matching screenshot */}
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:w-4/5">
              {servicesList.map((service, idx) => {
                const IconComp = service.icon;
                return (
                  <div
                    key={idx}
                    className="w-[85vw] sm:w-auto shrink-0 snap-start bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                  >
                  {/* Card Image */}
                  <div className="h-40 sm:h-44 overflow-hidden bg-slate-100 relative">
                    <img
                      src={service.image}
                      alt={`${service.title} - ${brand.name} RO Water Purifier`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Icon + Title inline */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="text-[#0066cc] shrink-0">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                          {service.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Know More link */}
                    <div className="pt-4 mt-auto">
                      <button
                        onClick={scrollToBookingForm}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#0066cc] hover:text-[#0052a3] hover:underline cursor-pointer group/btn"
                      >
                        <span>Know More</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          5. PRODUCTS/PARTS SECTION (Image Banner)
      ======================================================== */}
      <section id="parts" className="w-full bg-white">
        <img
          src="https://res.cloudinary.com/dieq3fjuv/image/upload/v1789672646/file_0000000075fc8208a4db72abe1abf045_bakaut.png"
          alt={`${brand.name} Compatible Filters`}
          className="w-full h-auto object-cover block"
        />
      </section>

      {/* ========================================================
          6. "WHY CHOOSE US" & BANNER SECTION
      ======================================================== */}
      <section id="why-choose-us" className="pt-16 pb-12 sm:pt-24 sm:pb-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-10 gap-6">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">
                WHY CHOOSE {brand.name.toUpperCase()} SERVICE?
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002b66] tracking-tight">
                A Name You Can Trust
              </h2>
            </div>
            
            <div className="text-left sm:text-right">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">
                TRUSTED BY MILLIONS
              </span>
              {brand.logoUrl ? (
                <img src={brand.logoUrl} alt={brand.name} className="h-8 sm:h-10 object-contain sm:ml-auto" />
              ) : (
                <div className="text-2xl sm:text-3xl font-black text-[#002b66] leading-none">
                  {brand.name}
                </div>
              )}
            </div>
          </div>

          {/* Mobile-only summary text (replacing the hidden grid) */}
          <p className="block sm:hidden text-[13px] text-slate-600 mb-6 leading-relaxed">
            Get expert {brand.name} water purifier service and repair from certified professionals. We guarantee genuine spare parts, transparent pricing, and fast doorstep support to ensure your family's drinking water remains safe.
          </p>

          {/* 4-column icon+title+description inline grid */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
            {whyChoosePoints.map((point, idx) => {
              const IconComp = point.icon;
              return (
                <div key={idx} className="flex items-start gap-4">
                  <div className="text-[#0052a3] shrink-0 pt-0.5">
                    <IconComp className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 mb-1 leading-snug">
                      {point.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Healthy Water Banner Image */}
          <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <img 
              src="https://res.cloudinary.com/dieq3fjuv/image/upload/v1789673944/file_00000000fa948211b1730f89d0bddb9f_ux9naz.png"
              alt="Healthy Water For Every Family"
              className="w-full h-auto object-cover"
            />
          </div>

        </div>
      </section>



      {/* ========================================================
          8. FAQ SECTION
             - Heading + "View All FAQs" link top-right
             - 2-column accordion grid (expandable +/- items)
             - Mobile: single column accordion
      ======================================================== */}
      <section id="support-faqs" className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span
                style={{ color: primaryColor }}
                className="text-xs font-bold uppercase tracking-wider block mb-1"
              >
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Your Questions, Our Answers
              </h2>
            </div>

            <button
              onClick={() => setShowAllFaqs(!showAllFaqs)}
              style={{ color: primaryColor }}
              className="text-xs sm:text-sm font-bold hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>{showAllFaqs ? 'Show Fewer FAQs' : 'View All FAQs'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2-column accordion grid (expandable +/- items) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedFaqs.map((faq, idx) => {
              const isOpen = !!openFaqs[idx];
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                    <span className="text-base font-mono text-slate-400 shrink-0 select-none">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          9. LOCATION/AVAILABILITY SECTION
             - Left: heading + description + pincode input with "Check Availability" button
             - Right: map graphic with location pins + list of city names below
             - Mobile: stack vertically, map below form
      ======================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 lg:p-12">
            <div className="max-w-2xl mx-auto items-center">
              
              {/* Heading + description + pincode input with "Check Availability" button */}
              <div className="space-y-5 text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {brand.name} Water Purifier Service Near You
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Looking for {brand.name} RO service, filter replacement, AMC maintenance, membrane replacement or water purifier repair near you?
                </p>

                <form onSubmit={handlePincodeCheck} className="flex flex-col sm:flex-row items-center gap-2.5 pt-2 max-w-lg mx-auto">
                  <div className="relative w-full sm:flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter Your Pincode"
                      value={checkPincode}
                      onChange={(e) => setCheckPincode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ backgroundColor: primaryColor }}
                    className="w-full sm:w-auto text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-xs hover:opacity-95 transition-all whitespace-nowrap cursor-pointer"
                  >
                    Check Availability →
                  </button>
                </form>

                {pincodeResult.checked && (
                  <div
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-start gap-2 ${
                      pincodeResult.available
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-amber-50 border-amber-200 text-amber-800'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                    <span>{pincodeResult.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          10. BOTTOM BANNER (Replaced with Custom Image)
      ======================================================== */}
      {brand.id === 'kent' ? (
        <section className="w-full bg-white">
          <img 
            src="https://res.cloudinary.com/dieq3fjuv/image/upload/v1789674504/IMG-20260918-WA0002_whpvlb.jpg"
            alt="Brand Banner"
            className="w-full h-auto object-cover block"
          />
        </section>
      ) : (
        <section className="w-full bg-white">
          <img 
            src="https://res.cloudinary.com/dieq3fjuv/image/upload/v1789674504/IMG-20260918-WA0002_whpvlb.jpg"
            alt="Brand Banner"
            className="w-full h-auto object-cover block"
          />
        </section>
      )}

      {/* ========================================================
          11. MAIN FOOTER (Clean White Background)
              - 6 Columns:
                1. Brand Logo Card
                2. Our Services
                3. Company
                4. Support
                5. Follow Us (Social Media Icons)
                6. Subscribe for Updates (Email Input + Circular Arrow Button)
              - Bottom Bar:
                - Left: © 2024 KENT RO Systems Ltd. All rights reserved.
                - Right: Pure Water. Healthy Families. Brighter Tomorrows.
      ======================================================== */}
      <footer className="bg-white pt-12 pb-8 text-slate-700 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main 6-Column Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-start mb-12">
            
            {/* Col 1: Brand Logo Card */}
            <div className="col-span-2 sm:col-span-1 flex items-start">
              {brand.logoUrl ? (
                <div className="bg-white border border-slate-200/90 shadow-2xs rounded-lg overflow-hidden flex items-center justify-center p-2.5">
                  <img
                    src={brand.logoUrl}
                    alt={`${brand.name} Logo`}
                    className="h-10 sm:h-11 w-auto max-w-[130px] object-contain"
                  />
                </div>
              ) : (
                <div className="w-full py-1">
                  <span style={{ color: primaryColor }} className="font-black text-lg tracking-tight block uppercase leading-none">
                    {brand.name}
                  </span>
                  <span className="text-[8px] font-bold text-slate-500 tracking-wider block uppercase mt-0.5">
                    {brand.subTagline || 'Water Purifiers'}
                  </span>
                </div>
              )}
            </div>

            {/* Col 2: Our Services */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">
                Our Services
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <button onClick={scrollToBookingForm} className="hover:text-slate-950 transition-colors cursor-pointer text-left">
                    Repair &amp; Service
                  </button>
                </li>
                <li>
                  <button onClick={scrollToBookingForm} className="hover:text-slate-950 transition-colors cursor-pointer text-left">
                    AMC Plans
                  </button>
                </li>
                <li>
                  <button onClick={scrollToBookingForm} className="hover:text-slate-950 transition-colors cursor-pointer text-left">
                    Filter Replacement
                  </button>
                </li>
                <li>
                  <button onClick={scrollToBookingForm} className="hover:text-slate-950 transition-colors cursor-pointer text-left">
                    Water Quality Check
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">
                Company
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <Link href="/" className="hover:text-slate-950 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-slate-950 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-slate-950 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="hover:text-slate-950 transition-colors">
                    Media
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Support */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">
                Support
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <a href="#support-faqs" className="hover:text-slate-950 transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <button onClick={scrollToBookingForm} className="hover:text-slate-950 transition-colors cursor-pointer text-left">
                    Track Service
                  </button>
                </li>
                <li>
                  <a href={`tel:${displayPhone}`} className="hover:text-slate-950 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <button onClick={scrollToBookingForm} className="hover:text-slate-950 transition-colors cursor-pointer text-left">
                    Locate Service Center
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 5: Follow Us */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">
                Follow Us
              </h3>
              <div className="flex items-center gap-3.5 text-slate-800 pt-0.5">
                <a 
                  href="#" 
                  aria-label="Facebook"
                  className="hover:text-[#1877F2] transition-colors"
                >
                  <Facebook className="w-[18px] h-[18px] fill-current" />
                </a>
                <a 
                  href="#" 
                  aria-label="Instagram"
                  className="hover:text-[#E4405F] transition-colors"
                >
                  <Instagram className="w-[18px] h-[18px]" />
                </a>
                <a 
                  href="#" 
                  aria-label="YouTube"
                  className="hover:text-[#FF0000] transition-colors"
                >
                  <Youtube className="w-[18px] h-[18px]" />
                </a>
                <a 
                  href="#" 
                  aria-label="LinkedIn"
                  className="hover:text-[#0A66C2] transition-colors"
                >
                  <Linkedin className="w-[18px] h-[18px] fill-current" />
                </a>
              </div>
            </div>

            {/* Col 6: Subscribe for Updates */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">
                Subscribe for Updates
              </h3>
              {newsletterSubmitted ? (
                <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  ✓ Subscribed for updates
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail.trim()) setNewsletterSubmitted(true);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs placeholder:text-slate-400 text-slate-800 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                  <button
                    type="submit"
                    aria-label="Submit newsletter subscription"
                    className="w-9 h-9 rounded-full bg-[#0d3b84] hover:bg-[#092b63] text-white flex items-center justify-center shrink-0 shadow-xs cursor-pointer transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Bottom Bar: Divider + Copyright (Left) + Motto (Right) */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
            <div>
              © 2024 {brand.name.toLowerCase().includes('kent') || brand.slug.includes('kent') ? 'KENT' : brand.name.toUpperCase()} RO Systems Ltd. All rights reserved.
            </div>
            <div className="text-slate-600 font-normal">
              {brand.heroMotto || 'Pure Water. Healthy Families. Brighter Tomorrows.'}
            </div>
          </div>

        </div>
      </footer>

      {/* ========================================================
          VIDEO MODAL (Watch How It Works)
      ======================================================== */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-900 bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div
                style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
              >
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  How {brand.name} Service Works
                </h3>
                <p className="text-xs text-slate-500">
                  Doorstep Technician Service in 4 Simple Steps
                </p>
              </div>
            </div>

            <div className="space-y-3 py-2 text-xs sm:text-sm text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <span style={{ backgroundColor: primaryColor }} className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <strong className="text-slate-900 block">Book Service Online / Call</strong>
                  <span className="text-slate-500">Share your details and purifier problem.</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <span style={{ backgroundColor: primaryColor }} className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <strong className="text-slate-900 block">Technician Assigned in Minutes</strong>
                  <span className="text-slate-500">Doorstep visit arranged with genuine spares.</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <span style={{ backgroundColor: primaryColor }} className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <strong className="text-slate-900 block">Comprehensive Multi-Point Inspection</strong>
                  <span className="text-slate-500">TDS check, pressure testing, and filter replacement.</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <span style={{ backgroundColor: primaryColor }} className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0">
                  4
                </span>
                <div>
                  <strong className="text-slate-900 block">Post-Service Warranty</strong>
                  <span className="text-slate-500">Enjoy clean drinking water with 30-day service warranty.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setVideoModalOpen(false);
                scrollToBookingForm();
              }}
              style={{ backgroundColor: primaryColor }}
              className="w-full text-white font-bold py-3 rounded-xl text-sm shadow-xs cursor-pointer"
            >
              Book {brand.name} Service Now
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
