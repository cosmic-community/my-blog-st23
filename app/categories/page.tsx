import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories } from '@/lib/cosmic';
import { getMetafieldValue } from '@/types';

export const metadata: Metadata = {
  title: 'Categories | Grapinz Tech Blog',
  description: 'Browse articles by category: programming, design, VFX, AI, digital marketing, and more.',
};

const categoryIcons: Record<string, string> = {
  programming: '💻',
  design: '🎨',
  technology: '⚡',
  'digital-marketing': '📈',
  'ai-machine-learning': '🤖',
  vfx: '🎬',
  '3d-animation': '🧊',
  adobe: '🖌️',
  default: '📂',
};

function getCategoryIcon(slug: string): string {
  return categoryIcons[slug] || categoryIcons['default'] || '📂';
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
          Explore <span className="gradient-text">Categories</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Discover articles organized by topic. From programming to design, find what interests you.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const name = getMetafieldValue(category.metadata?.name) || category.title;
            const description = getMetafieldValue(category.metadata?.description);
            const icon = getCategoryIcon(category.slug);

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group block"
              >
                <div className="glass-card rounded-2xl p-6 hover-lift transition-all duration-300 h-full">
                  <span className="text-4xl mb-4 block">{icon}</span>
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-accent-blue transition-colors">
                    {name}
                  </h2>
                  {description && (
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{description}</p>
                  )}
                  <div className="mt-4 pt-4 border-t border-dark-500/50">
                    <span className="text-xs font-medium text-accent-blue group-hover:text-accent-cyan transition-colors">
                      Browse Articles →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">🏷️</span>
          <h3 className="text-xl font-bold text-white mb-2">No categories yet</h3>
          <p className="text-slate-400">Categories will appear here once they&apos;re added to Cosmic.</p>
        </div>
      )}
    </div>
  );
}