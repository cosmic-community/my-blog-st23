'use client';

import { useState, useMemo } from 'react';
import type { Post } from '@/types';
import PostCard from '@/components/PostCard';

interface SearchBarProps {
  posts: Post[];
}

export default function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;
    const q = query.toLowerCase();
    return posts.filter((post) => {
      const title = post.title?.toLowerCase() || '';
      const excerpt = (typeof post.metadata?.excerpt === 'string' ? post.metadata.excerpt : '').toLowerCase();
      const tags = (typeof post.metadata?.tags === 'string' ? post.metadata.tags : '').toLowerCase();
      return title.includes(q) || excerpt.includes(q) || tags.includes(q);
    });
  }, [query, posts]);

  return (
    <div>
      {/* Search Input */}
      <div className="relative mb-8">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search articles by title, tags, or keywords..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-dark-700/50 border border-dark-500/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-accent-blue/50 focus:ring-2 focus:ring-accent-blue/20 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results count */}
      {query && (
        <p className="text-sm text-slate-400 mb-6">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
          {query && <span> for &quot;{query}&quot;</span>}
        </p>
      )}

      {/* Results Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">🔍</span>
          <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
          <p className="text-slate-400">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
}