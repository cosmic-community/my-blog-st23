// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCategoryBySlug, getPostsByCategory } from '@/lib/cosmic';
import { getMetafieldValue } from '@/types';
import PostCard from '@/components/PostCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  const name = getMetafieldValue(category.metadata?.name) || category.title;
  return {
    title: `${name} | Grapinz Tech Blog`,
    description: getMetafieldValue(category.metadata?.description) || `Browse ${name} articles on Grapinz Tech Blog`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.id);
  const name = getMetafieldValue(category.metadata?.name) || category.title;
  const description = getMetafieldValue(category.metadata?.description);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-accent-blue transition-colors">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-accent-blue transition-colors">Categories</Link>
        <span>/</span>
        <span className="text-slate-300">{name}</span>
      </nav>

      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">{name}</h1>
        {description && (
          <p className="text-lg text-slate-400 max-w-2xl">{description}</p>
        )}
        <p className="text-sm text-slate-500 mt-2">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'}
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">📭</span>
          <h3 className="text-xl font-bold text-white mb-2">No articles yet</h3>
          <p className="text-slate-400 mb-6">There are no articles in this category yet.</p>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-blue hover:text-accent-cyan transition-colors"
          >
            Browse All Articles →
          </Link>
        </div>
      )}
    </div>
  );
}