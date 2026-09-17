import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BRAND_PAGES_DATA, BUSINESS_DETAILS } from '@/src/data/content';
import { BrandPageLayout } from '@/src/components/BrandPageLayout';

interface PageProps {
  params: Promise<{ brand: string }>;
}

function getBrand(key: string) {
  if (!key) return undefined;
  if (BRAND_PAGES_DATA[key]) return BRAND_PAGES_DATA[key];
  if (BRAND_PAGES_DATA[`${key}-service`]) return BRAND_PAGES_DATA[`${key}-service`];
  return Object.values(BRAND_PAGES_DATA).find(
    (b) =>
      b.id === key ||
      b.id === key.replace(/-service$/, '') ||
      b.slug === `/${key}` ||
      b.slug === `/${key}-service` ||
      b.name.toLowerCase() === key.toLowerCase()
  );
}

export async function generateStaticParams() {
  const params: { brand: string }[] = [];
  Object.keys(BRAND_PAGES_DATA).forEach((brandKey) => {
    params.push({ brand: brandKey });
    const b = BRAND_PAGES_DATA[brandKey];
    if (b?.id && b.id !== brandKey) {
      params.push({ brand: b.id });
    }
  });
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand: brandKey } = await params;
  const brand = getBrand(brandKey);
  if (!brand) return {};

  const subdomain = brand.id;
  const canonicalUrl = subdomain
    ? `https://${subdomain}.roservice24x7.in`
    : `https://www.roservice24x7.in/${brandKey}`;

  return {
    title: brand.metaTitle,
    description: brand.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: brand.metaTitle,
      description: brand.metaDescription,
      url: canonicalUrl,
      type: 'website',
      images: brand.heroImage ? [{ url: brand.heroImage }] : [],
    },
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { brand: brandKey } = await params;
  const brand = getBrand(brandKey);

  if (!brand) {
    notFound();
  }

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${brand.name} Water Purifier Repair & Service Bangalore`,
      serviceType: 'Water Purifier Repair, Maintenance & Filter Replacement',
      provider: {
        '@type': 'LocalBusiness',
        name: BUSINESS_DETAILS.name,
        telephone: `+91${BUSINESS_DETAILS.phone}`,
      },
      areaServed: {
        '@type': 'City',
        name: 'Bangalore',
      },
      description: brand.metaDescription,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: brand.brandFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BrandPageLayout brand={brand} />
    </>
  );
}
