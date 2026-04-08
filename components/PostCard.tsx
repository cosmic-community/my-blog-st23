import Link from 'next/link';
import type { Post } from '@/types';
import { getMetafieldValue } from '@/types';
import CategoryBadge from '@/components/CategoryBadge';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image;
  const author = post.metadata?.author;
  const category = post.metadata?.category;
  const excerpt = getMetafieldValue(post.metadata?.excerpt);
  const tags = getMetafieldValue(post.metadata?.tags);
  const publishedDate = post.metadata?.published_date || post.created_at;

  const formattedDate = new Date(publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const tagList = tags
    ? tags.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  if (featured) {
    return (
      <Link href={`/posts/${post.slug}`} className="group block">
        <article className="glass-card rounded-2xl overflow-hidden hover-lift transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative aspect-video lg:aspect-auto lg:min-h-[400px] overflow-hidden">
              {featuredImage ? (
                <img
                  src={`${featuredImage.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-hero opacity-30 flex items-center justify-center">
                  <span className="text-6xl">📝</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
              {category && (
                <div className="absolute top-4 left-4">
                  <CategoryBadge category={category} />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                <span className="bg-gradient-hero text-transparent bg-clip-text font-semibold uppercase tracking-wider">
                  Featured
                </span>
                <span>•</span>
                <time dateTime={publishedDate}>{formattedDate}</time>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-accent-blue transition-colors line-clamp-2">
                {post.title}
              </h2>

              {excerpt && (
                <p className="text-slate-400 leading-relaxed mb-4 line-clamp-3">{excerpt}</p>
              )}

              {tagList.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tagList.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium text-accent-cyan bg-accent-cyan/10 rounded-full border border-accent-cyan/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {author && (
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-dark-500/50">
                  {author.metadata?.avatar ? (
                    <img
                      src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                      alt={getMetafieldValue(author.metadata?.name) || author.title}
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-accent-purple/30"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-accent flex items-center justify-center text-white text-sm font-bold">
                      {(getMetafieldValue(author.metadata?.name) || author.title).charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-white">
                      {getMetafieldValue(author.metadata?.name) || author.title}
                    </p>
                    {author.metadata?.role && (
                      <p className="text-xs text-slate-500">{getMetafieldValue(author.metadata.role)}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/posts/${post.slug}`} className="group block h-full">
      <article className="glass-card rounded-2xl overflow-hidden hover-lift transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          {featuredImage ? (
            <img
              src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={post.title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-card flex items-center justify-center">
              <span className="text-4xl">📝</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent" />
          {category && (
            <div className="absolute top-3 left-3">
              <CategoryBadge category={category} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <time dateTime={publishedDate}>{formattedDate}</time>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-blue transition-colors line-clamp-2">
            {post.title}
          </h3>

          {excerpt && (
            <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2 flex-1">{excerpt}</p>
          )}

          {tagList.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tagList.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs text-accent-cyan bg-accent-cyan/10 rounded-full border border-accent-cyan/20"
                >
                  {tag}
                </span>
              ))}
              {tagList.length > 2 && (
                <span className="px-2 py-0.5 text-xs text-slate-500">+{tagList.length - 2}</span>
              )}
            </div>
          )}

          {author && (
            <div className="flex items-center gap-2.5 mt-auto pt-3 border-t border-dark-500/50">
              {author.metadata?.avatar ? (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={getMetafieldValue(author.metadata?.name) || author.title}
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-accent-purple/20"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-gradient-accent flex items-center justify-center text-white text-xs font-bold">
                  {(getMetafieldValue(author.metadata?.name) || author.title).charAt(0)}
                </div>
              )}
              <span className="text-xs font-medium text-slate-300">
                {getMetafieldValue(author.metadata?.name) || author.title}
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}