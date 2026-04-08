import type { Metadata } from 'next';
import { getAuthors } from '@/lib/cosmic';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: 'Authors | Grapinz Tech Blog',
  description: 'Meet the talented authors behind Grapinz Tech Blog.',
};

export default async function AuthorsPage() {
  const authors = await getAuthors();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
          Meet Our <span className="gradient-text">Authors</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          The talented writers and industry experts behind our tech content.
        </p>
      </div>

      {authors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">👤</span>
          <h3 className="text-xl font-bold text-white mb-2">No authors yet</h3>
          <p className="text-slate-400">Authors will appear here once they&apos;re added to Cosmic.</p>
        </div>
      )}
    </div>
  );
}