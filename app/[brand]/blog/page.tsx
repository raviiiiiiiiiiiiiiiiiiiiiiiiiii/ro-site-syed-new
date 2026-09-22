import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Calendar, Clock, ArrowRight, BookOpen, ChevronRight, Phone, ShieldCheck, Wrench, CheckCircle2 } from 'lucide-react';
import { BRAND_PAGES_DATA, BUSINESS_DETAILS } from '@/src/data/content';
import { BLOG_POSTS, BlogPost } from '@/src/data/blogPosts';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';

interface BrandBlogProps {
  params: Promise<{
    brand: string;
  }>;
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
  const brandKeys = Object.keys(BRAND_PAGES_DATA);
  const params: { brand: string }[] = [];
  brandKeys.forEach((key) => {
    params.push({ brand: key });
    const b = BRAND_PAGES_DATA[key];
    if (b?.id && b.id !== key) {
      params.push({ brand: b.id });
    }
  });
  return params;
}

export async function generateMetadata({ params }: BrandBlogProps): Promise<Metadata> {
  const { brand: brandKey } = await params;
  const brand = getBrand(brandKey);
  if (!brand) return {};

  const canonicalUrl = `https://www.roservicecentre24x7.in/${brandKey}/blog`;
  const title = `${brand.name} RO Service & Maintenance Blog | Bangalore Expert Guides`;
  const description = `Practical guides, troubleshooting tips, filter replacement intervals, and maintenance costs specifically for ${brand.name} water purifiers in Bangalore.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'RO Service Centre 24x7 Bangalore',
    },
  };
}

export default async function BrandBlogIndexPage({ params }: BrandBlogProps) {
  const { brand: brandKey } = await params;
  const brand = getBrand(brandKey);

  if (!brand) {
    notFound();
  }

  // Filter posts related to this brand
  const cleanKey = brand.id.toLowerCase().replace(/-service$/, '');
  const brandNameLower = brand.name.toLowerCase();

  const brandPosts = BLOG_POSTS.filter((post) => {
    const postBrandSlug = post.relatedBrandSlug?.toLowerCase().replace(/-service$/, '');
    const postBrandName = post.relatedBrandName?.toLowerCase() || '';
    return (
      postBrandSlug === cleanKey ||
      postBrandName.includes(brandNameLower) ||
      post.title.toLowerCase().includes(brandNameLower)
    );
  });

  // If brand has fewer than 3 posts, backfill with general high-value posts
  const postsToShow: BlogPost[] =
    brandPosts.length >= 2
      ? brandPosts
      : [
          ...brandPosts,
          ...BLOG_POSTS.filter((p) => !brandPosts.some((bp) => bp.slug === p.slug)).slice(
            0,
            3 - brandPosts.length
          ),
        ];

  const brandPrimaryColor = brand.brandThemeColors?.primary || '#0b5cbe';
  const brandDarkBg = brand.brandThemeColors?.darkBg || '#083c7d';

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `https://www.roservicecentre24x7.in/${brandKey}/blog#blog`,
    name: `${brand.name} RO Purifier Service Blog - RO Service Centre 24x7`,
    description: `Expert repair advice, filter maintenance schedules, and troubleshooting for ${brand.name} purifiers in Bangalore.`,
    url: `https://www.roservicecentre24x7.in/${brandKey}/blog`,
    publisher: {
      '@type': 'LocalBusiness',
      name: 'RO Service Centre 24x7',
      telephone: '+918050291180',
      url: 'https://www.roservicecentre24x7.in',
    },
    blogPost: postsToShow.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      url: `https://www.roservicecentre24x7.in/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.modifiedAt,
      image: post.image,
      author: {
        '@type': 'Person',
        name: post.author,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#f8fbfe] text-slate-900 flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <Header />

      <main className="flex-1">
        {/* Brand Blog Hero Section */}
        <section
          style={{ backgroundColor: brandDarkBg }}
          className="text-white py-14 sm:py-20 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-white/70 mb-6 font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <Link
                href={`/${brand.slug.replace(/^\//, '')}`}
                className="hover:text-white transition-colors"
              >
                {brand.name} Service
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-white font-semibold">Blog &amp; Guides</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-xs">
                <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
                {brand.name} Maintenance &amp; Care Hub
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
                {brand.name} RO Purifier Guides &amp; Care
              </h1>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-6">
                Certified technician guides, cartridge replacement schedules, and immediate troubleshooting solutions specifically tailored for {brand.name} water purifiers in Bangalore.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={`/${brand.slug.replace(/^\//, '')}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-xs"
                >
                  <Wrench className="w-4 h-4 text-blue-600" />
                  <span>Book {brand.name} Service (₹299 Visit)</span>
                </Link>

                <a
                  href={`tel:${BUSINESS_DETAILS.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {BUSINESS_DETAILS.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Blog Posts Grid */}
        <section className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Articles &amp; Troubleshooting Guides for {brand.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Practical maintenance insights from Bangalore technicians
                </p>
              </div>

              <Link
                href="/blog"
                className="text-xs sm:text-sm font-bold text-blue-600 hover:underline flex items-center gap-1 shrink-0"
              >
                <span>All Brands Blog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Grid of Posts - strictly NO pill on cards as requested */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postsToShow.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group hover:border-blue-300"
                >
                  {/* Thumbnail Image - NO pill */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative h-52 w-full bg-slate-100 block overflow-hidden"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </Link>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.publishedAt}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readingTime}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-3">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                        {post.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors"
                      >
                        <span>Read Full Guide</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">
                        {brand.name}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Doorstep Emergency Assistance Box */}
            <div className="mt-16 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  Bangalore Certified Technicians
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Experiencing an urgent issue with your {brand.name} RO?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                  Get certified doorstep technicians to your home within 60 to 90 minutes. 100% genuine compatible spares, high-TDS rejection membranes, and 30-day labor warranty.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <a
                  href={`tel:${BUSINESS_DETAILS.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors text-center cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {BUSINESS_DETAILS.phone}</span>
                </a>
                <Link
                  href={`/${brand.slug.replace(/^\//, '')}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors text-center cursor-pointer"
                >
                  <span>Book Doorstep Visit</span>
                </Link>
              </div>
            </div>

            {/* Explore Other Brand Guides */}
            <div className="mt-14 pt-8 border-t border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                Explore Blog Guides for Other Water Purifier Brands:
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {Object.entries(BRAND_PAGES_DATA).map(([key, b]) => {
                  if (b.id === brand.id) return null;
                  return (
                    <Link
                      key={key}
                      href={`/${key}/blog`}
                      className="text-xs font-medium bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-3.5 py-1.5 rounded-lg border border-slate-200 transition-colors"
                    >
                      {b.name} RO Blog &amp; Guides →
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
