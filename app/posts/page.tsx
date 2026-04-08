import type { Metadata } from 'next';
import { getPosts } from '@/lib/cosmic';
import SearchBar from '@/components/SearchBar';

export const metadata: Metadata = {
  title: 'All Articles | Grapinz Tech Blog',
  description: 'Browse all tech articles on programming, design, VFX, AI, and digital innovation.',
};

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
          All <span className="gradient-text">Articles</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Explore our collection of tech articles covering programming, UI/UX design, VFX, AI, and more.
        </p>
      </div>

      {/* Search + Posts */}
      <SearchBar posts={posts} />
    </div>
  );
}