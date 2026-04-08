import Link from 'next/link';
import type { Author } from '@/types';
import { getMetafieldValue } from '@/types';

interface AuthorCardProps {
  author: Author;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const name = getMetafieldValue(author.metadata?.name) || author.title;
  const role = getMetafieldValue(author.metadata?.role);
  const bio = getMetafieldValue(author.metadata?.bio);
  const avatar = author.metadata?.avatar;

  return (
    <Link href={`/authors/${author.slug}`} className="group block h-full">
      <article className="glass-card rounded-2xl overflow-hidden hover-lift transition-all duration-300 h-full p-6 text-center">
        <div className="mb-4">
          {avatar ? (
            <img
              src={`${avatar.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-accent-purple/20 group-hover:ring-accent-purple/40 transition-all"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-hero flex items-center justify-center mx-auto text-white text-3xl font-bold ring-4 ring-accent-purple/20 group-hover:ring-accent-purple/40 transition-all">
              {name.charAt(0)}
            </div>
          )}
        </div>

        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent-blue transition-colors">
          {name}
        </h3>

        {role && (
          <p className="text-sm text-accent-purple font-medium mb-3">{role}</p>
        )}

        {bio && (
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{bio}</p>
        )}

        <div className="mt-4 pt-4 border-t border-dark-500/50">
          <span className="text-xs text-accent-blue font-medium group-hover:text-accent-cyan transition-colors">
            View Profile →
          </span>
        </div>
      </article>
    </Link>
  );
}