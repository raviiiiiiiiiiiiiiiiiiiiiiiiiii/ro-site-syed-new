'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import { BUSINESS_DETAILS } from '@/src/data/content';
import { PageRoute } from '@/src/types';
import { getBrandTheme } from '@/src/utils/brandTheme';

interface CallWidgetsProps {
  currentRoute?: PageRoute;
  lastBrandRoute?: PageRoute | null;
  customPhone?: string;
}

export const CallWidgets: React.FC<CallWidgetsProps> = ({
  currentRoute: propCurrentRoute,
  lastBrandRoute,
  customPhone,
}) => {
  const pathname = usePathname() || '/';
  const currentRoute = propCurrentRoute || (pathname as PageRoute);
  const phone = customPhone || BUSINESS_DETAILS.phone;
  const telLink = `tel:${phone}`;
  const theme = getBrandTheme(currentRoute, lastBrandRoute);

  return (
    <>
      {/* Minimal & Aesthetic Floating Call Button */}
      <div 
        id="floating-call-widget" 
        className="fixed bottom-16 sm:bottom-20 lg:bottom-7 right-4 sm:right-6 z-50 select-none"
      >
        <a
          href={telLink}
          aria-label={`Call ${phone}`}
          title={`Call ${phone}`}
          className="group relative flex items-center"
        >
          {/* Minimalist Hover Tooltip */}
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-semibold shadow-md backdrop-blur-sm mr-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap">
            <span>Call {phone}</span>
          </span>

          {/* Minimalist Circular Button */}
          <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center border border-slate-200/80 shadow-[0_6px_20px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] group-hover:shadow-[0_10px_28px_rgba(0,82,204,0.18)] group-hover:border-blue-300/80 group-hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer">
            {/* Gentle Bouncing Call Handset Icon */}
            <div className="flex items-center justify-center animate-soft-bounce">
              <Phone 
                style={{ fill: theme.primary || '#0047ba', color: theme.primary || '#0047ba' }}
                className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
          </div>
        </a>
      </div>

      {/* Full-width Sticky Bottom Call Bar (Mobile Only) */}
      <div
        id="sticky-call-footer"
        style={{ backgroundColor: theme.primary }}
        className="fixed bottom-0 left-0 right-0 z-40 text-white py-3 sm:py-3.5 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.18)] transition-colors border-t border-white/20 lg:hidden"
      >
        <a
          href={telLink}
          className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center text-white focus:outline-none"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 fill-white animate-pulse shrink-0" />
          <span className="text-base sm:text-xl font-black tracking-wide">
            Call Now : <span className="font-mono tracking-wider">{phone}</span>
          </span>
        </a>
      </div>
    </>
  );
};
