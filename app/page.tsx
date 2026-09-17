import type { Metadata } from 'next';
import { BrandPageLayout } from '@/src/components/BrandPageLayout';
import { BrandInfo } from '@/src/types';
import { HOMEPAGE_FAQS } from '@/src/data/content';

export const metadata: Metadata = {
  title: 'RO Service 24x7 | Best RO Water Purifier Repair & Service Bangalore | Call 080502 91180',
  description:
    'Fastest 60–90 min doorstep RO water purifier repair, filter replacement, AMC & installation service in Bangalore. Expert technicians for Kent, Aquaguard, Pureit, AO Smith & LG.',
  alternates: {
    canonical: 'https://www.roservice24x7.in',
  },
  openGraph: {
    title: 'RO Service 24x7 | Best RO Water Purifier Repair & Maintenance Bangalore',
    description: 'Fastest 60–90 min doorstep RO water purifier repair, filter replacement & AMC in Bangalore.',
    url: 'https://www.roservice24x7.in',
    type: 'website',
  },
};

export default function HomePage() {
  const genericBrand: BrandInfo = {
    id: 'ro-service-24x7',
    name: 'RO Service 24x7',
    slug: '/',
    logoText: 'RO Service 24x7',
    logoUrl: 'https://i.ibb.co/k6cRgnyt/IMG-20260805-WA0010.jpg',
    subTagline: 'Expert Water Purifier Service',
    tagline: 'Expert Water Purifier Repair & Maintenance',
    description: 'Fastest 60–90 min doorstep RO water purifier repair, filter replacement, AMC & installation service in Bangalore. Expert technicians for all major brands.',
    accentColor: 'blue',
    metaTitle: metadata.title as string,
    metaDescription: metadata.description as string,
    heroMotto: 'Pure Water. Healthy Families. Brighter Tomorrows.',
    commonProblems: [
      'Water purifier not purifying water properly',
      'RO machine leakage, power failure, or tripping issues',
      'Unusual noise or vibrations',
      'Water tasting bad or having an odor',
    ],
    brandFaqs: HOMEPAGE_FAQS,
    brandThemeColors: {
      primary: '#0b5cbe', // A nice solid blue to match the brand
      darkBg: '#094796',
      accent: '#1874e0',
      lightBg: '#f0f5fb',
      border: '#e1e9f2',
    }
  };

  return <BrandPageLayout brand={genericBrand} />;
}
