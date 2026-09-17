import { NextRequest, NextResponse } from 'next/server';

const SUBDOMAIN_MAP: Record<string, string> = {
  kent: '/kent-service',
  aquaguard: '/aquaguard-service',
  pureit: '/pureit-service',
  aosmith: '/aosmith-service',
  lg: '/lg-service',
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // Extract host from headers (handles Vercel Edge proxies & local dev)
  const host = (req.headers.get('x-forwarded-host') || req.headers.get('host') || '').toLowerCase();
  const hostname = host.split(':')[0].trim();
  const parts = hostname.split('.');

  // Subdomain detection: e.g. kent.roservicehelpline.in (3 parts) or kent.localhost (2 parts in local dev)
  const isLocalhost = hostname.includes('localhost');
  const hasSubdomain = isLocalhost ? parts.length >= 2 : parts.length >= 3;

  if (hasSubdomain) {
    const subdomain = parts[0];
    if (subdomain !== 'www' && SUBDOMAIN_MAP[subdomain]) {
      const targetPath = SUBDOMAIN_MAP[subdomain];

      // Rewrite root "/" on subdomain to the corresponding brand route
      if (url.pathname === '/' || url.pathname === '') {
        url.pathname = targetPath;
        return NextResponse.rewrite(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static, _next/image
     * - favicon.ico, robots.txt, sitemap.xml, llms.txt
     * - files with static extensions (.png, .jpg, .svg, .webp, .mp4)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|.*\\..*).*)',
  ],
};
