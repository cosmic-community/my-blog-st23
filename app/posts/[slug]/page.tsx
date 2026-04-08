// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug, getPosts } from '@/lib/cosmic';
import { getMetafieldValue } from '@/types';
import CategoryBadge from '@/components/CategoryBadge';
import PostCard from '@/components/PostCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Grapinz Tech Blog`,
    description: getMetafieldValue(post.metadata?.excerpt) || `Read ${post.title} on Grapinz Tech Blog`,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const content = getMetafieldValue(post.metadata?.content);
  const excerpt = getMetafieldValue(post.metadata?.excerpt);
  const tags = getMetafieldValue(post.metadata?.tags);
  const author = post.metadata?.author;
  const category = post.metadata?.category;
  const featuredImage = post.metadata?.featured_image;
  const publishedDate = post.metadata?.published_date || post.created_at;

  const formattedDate = new Date(publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const tagList = tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [];

  // Fetch related posts
  const allPosts = await getPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article>
      {/* Hero */}
      <header className="relative">
        {featuredImage ? (
          <div className="relative h-64 sm:h-80 lg:h-[480px] overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=1920&h=960&fit=crop&auto=format,compress`}
              alt={post.title}
              width={960}
              height={480}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
          </div>
        ) : (
          <div className="h-48 bg-gradient-hero opacity-20" />
        )}

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 lg:-mt-40 pb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {category && <CategoryBadge category={category} linked size="md" />}
            <span className="text-sm text-slate-400">
              <time dateTime={publishedDate}>{formattedDate}</time>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
            {post.title}
          </h1>

          {excerpt && (
            <p className="text-lg text-slate-300 leading-relaxed mb-6">{excerpt}</p>
          )}

          {author && (
            <Link
              href={`/authors/${author.slug}`}
              className="inline-flex items-center gap-3 group"
            >
              {author.metadata?.avatar ? (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                  alt={getMetafieldValue(author.metadata?.name) || author.title}
                  width={44}
                  height={44}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-accent-purple/30"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-gradient-hero flex items-center justify-center text-white font-bold">
                  {(getMetafieldValue(author.metadata?.name) || author.title).charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-white group-hover:text-accent-blue transition-colors">
                  {getMetafieldValue(author.metadata?.name) || author.title}
                </p>
                {author.metadata?.role && (
                  <p className="text-xs text-slate-500">{getMetafieldValue(author.metadata.role)}</p>
                )}
              </div>
            </Link>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {content && (
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-accent-blue prose-a:no-underline hover:prose-a:text-accent-cyan
              prose-strong:text-white
              prose-code:text-accent-cyan prose-code:bg-dark-600/50 prose-code:px-2 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-dark-700/50 prose-pre:border prose-pre:border-dark-500/50
              prose-blockquote:border-accent-purple prose-blockquote:text-slate-400
              prose-img:rounded-xl
              prose-li:text-slate-300"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        {/* Tags */}
        {tagList.length > 0 && (
          <div className="mt-10 pt-8 border-t border-dark-500/50">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tagList.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm font-medium text-accent-cyan bg-accent-cyan/10 rounded-full border border-accent-cyan/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-10 pt-8 border-t border-dark-500/50">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-blue hover:text-accent-cyan transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Articles
          </Link>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-dark-500/50">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-accent rounded-full" />
            <h2 className="text-2xl font-bold text-white">More Articles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}