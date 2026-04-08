// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAuthorBySlug, getPostsByAuthor } from '@/lib/cosmic';
import { getMetafieldValue } from '@/types';
import PostCard from '@/components/PostCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return { title: 'Author Not Found' };
  }

  const name = getMetafieldValue(author.metadata?.name) || author.title;
  return {
    title: `${name} | Grapinz Tech Blog`,
    description: getMetafieldValue(author.metadata?.bio) || `Articles by ${name} on Grapinz Tech Blog`,
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const posts = await getPostsByAuthor(author.id);
  const name = getMetafieldValue(author.metadata?.name) || author.title;
  const role = getMetafieldValue(author.metadata?.role);
  const bio = getMetafieldValue(author.metadata?.bio);
  const avatar = author.metadata?.avatar;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-accent-blue transition-colors">Home</Link>
        <span>/</span>
        <Link href="/authors" className="hover:text-accent-blue transition-colors">Authors</Link>
        <span>/</span>
        <span className="text-slate-300">{name}</span>
      </nav>

      {/* Author Profile */}
      <div className="glass-card rounded-2xl p-8 lg:p-12 mb-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <div className="shrink-0">
            {avatar ? (
              <img
                src={`${avatar.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                alt={name}
                width={150}
                height={150}
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl object-cover ring-4 ring-accent-purple/20"
              />
            ) : (
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl bg-gradient-hero flex items-center justify-center text-white text-5xl font-bold ring-4 ring-accent-purple/20">
                {name.charAt(0)}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">{name}</h1>
            {role && (
              <p className="text-lg font-medium text-accent-purple mb-4">{role}</p>
            )}
            {bio && (
              <p className="text-slate-400 leading-relaxed max-w-2xl">{bio}</p>
            )}
            <div className="mt-4 flex items-center justify-center md:justify-start gap-4">
              <span className="text-sm text-slate-500">
                {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Author's Posts */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8 bg-gradient-accent rounded-full" />
        <h2 className="text-2xl font-bold text-white">Articles by {name}</h2>
      </div>

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
          <p className="text-slate-400 mb-6">This author hasn&apos;t published any articles yet.</p>
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