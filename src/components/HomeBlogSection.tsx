import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { BLOG_POSTS } from '@/src/data/blogPosts';

export const HomeBlogSection: React.FC = () => {
  return (
    <section id="homepage-blog-section" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0066cc] text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              Expert RO Knowledge Base
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#002b66] tracking-tight leading-tight">
              RO Purifier Maintenance &amp; Care Guides
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Practical guides and maintenance tips from senior Bangalore technicians to keep your water clean, tasty, and 100% safe.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0066cc] hover:text-[#0052a3] group cursor-pointer self-start sm:self-auto shrink-0"
          >
            <span>View All Guides &amp; Articles</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group hover:border-blue-300/80"
            >
              {/* Thumbnail Image */}
              <Link href={`/blog/${post.slug}`} className="relative h-48 sm:h-52 w-full bg-slate-100 block overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[11px] font-bold text-[#0066cc] px-3 py-1 rounded-full shadow-2xs">
                  {post.category}
                </div>
              </Link>

              {/* Content Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Meta Bar */}
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
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

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0066cc] transition-colors leading-snug mb-2.5">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-5">
                    {post.description}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066cc] group-hover:text-[#0052a3] transition-colors"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {post.relatedBrandSlug && (
                    <Link
                      href={`/${post.relatedBrandSlug}`}
                      className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 px-2 py-0.5 rounded transition-colors"
                    >
                      {post.relatedBrandName} →
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
