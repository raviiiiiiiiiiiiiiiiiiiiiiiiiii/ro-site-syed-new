import { MetadataRoute } from 'next';
import { BRAND_PAGES_DATA } from '@/src/data/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.roservice24x7.in';
  const lastModified = new Date('2026-08-06');

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  const brandRoutes: MetadataRoute.Sitemap = Object.entries(BRAND_PAGES_DATA).map(([brandKey, brand]) => ({
    url: brand.id ? `https://${brand.id}.roservice24x7.in` : `${baseUrl}/${brandKey}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...brandRoutes];
}
