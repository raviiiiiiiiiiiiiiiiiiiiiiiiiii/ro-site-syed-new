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
      {/* Floating "Click To Call" Widget on Bottom Right */}
      <div 
        id="floating-call-widget" 
        className="fixed bottom-14 sm:bottom-16 right-3 sm:right-5 z-40 select-none"
      >
        <a
          href={telLink}
          aria-label={`Click to call ${phone}`}
          style={{ backgroundColor: theme.primary }}
          className="group flex items-center text-white pl-1.5 pr-2.5 sm:pr-3 py-1 sm:py-1.5 rounded-xl shadow-lg border border-white/80 transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          {/* Circular Phone Icon Button */}
          <div 
            style={{
              background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full text-white flex items-center justify-center shadow-xs mr-1.5 sm:mr-2 shrink-0 group-hover:rotate-12 transition-transform duration-300"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white drop-shadow-xs" />
          </div>

          {/* Text Labels Stack */}
          <div className="flex flex-col items-start justify-center">
            <span className="text-[9px] sm:text-[10px] font-black tracking-wider uppercase text-white/95 leading-tight">
              Click To Call
            </span>
            <div 
              style={{ color: '#0f172a' }}
              className="mt-0.5 bg-white font-black font-mono text-[10px] sm:text-[11px] px-1.5 py-0.2 rounded shadow-xs leading-tight tracking-tight"
            >
              {phone}
            </div>
          </div>
        </a>
      </div>

      {/* Full-width Sticky Bottom Call Bar */}
      <div
        id="sticky-call-footer"
        style={{ backgroundColor: theme.primary }}
        className="fixed bottom-0 left-0 right-0 z-40 text-white py-3 sm:py-3.5 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.18)] transition-colors border-t border-white/20"
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
