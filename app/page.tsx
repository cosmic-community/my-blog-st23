import Link from 'next/link';
import { getPosts, getCategories } from '@/lib/cosmic';
import PostCard from '@/components/PostCard';
import CategoryBadge from '@/components/CategoryBadge';

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-dark-900 to-accent-purple/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-accent-blue/5 to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-600/50 border border-dark-500/50 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="text-sm text-slate-300">Innovative Technology & Learning Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="text-white">Master the Art of</span>
              <br />
              <span className="gradient-text">Technology</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Explore the latest in programming, UI/UX design, VFX, and digital innovation. 
              Transform your ideas into reality with expert insights and tutorials.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/posts"
                className="px-8 py-4 bg-gradient-hero text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Articles
              </Link>
              <Link
                href="/categories"
                className="px-8 py-4 bg-dark-600/50 text-white font-semibold rounded-xl border border-dark-500/50 hover:border-accent-blue/30 hover:bg-dark-500/50 transition-all duration-300"
              >
                Browse Categories
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Tech Articles', value: `${posts.length}+`, icon: '📝' },
              { label: 'Categories', value: `${categories.length}`, icon: '🏷️' },
              { label: 'Placement Record', value: '99%', icon: '🎯' },
              { label: 'Live Interaction', value: '100%', icon: '💬' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-xl p-4 text-center"
              >
                <span className="text-2xl mb-2 block">{stat.icon}</span>
                <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-hero rounded-full" />
            <h2 className="text-2xl font-bold text-white">Featured Article</h2>
          </div>
          <PostCard post={featuredPost} featured />
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-accent rounded-full" />
              <h2 className="text-2xl font-bold text-white">Latest Articles</h2>
            </div>
            <Link
              href="/posts"
              className="text-sm font-medium text-accent-blue hover:text-accent-cyan transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-hero rounded-full" />
              <h2 className="text-2xl font-bold text-white">Explore Topics</h2>
            </div>
            <Link
              href="/categories"
              className="text-sm font-medium text-accent-blue hover:text-accent-cyan transition-colors"
            >
              All Categories →
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <CategoryBadge key={category.id} category={category} linked size="md" />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass-card rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 via-accent-purple/5 to-accent-pink/5" />
          <div className="relative">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to <span className="gradient-text">Level Up?</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-8">
              Join Grapinz Technology & Institution and master the art of coding, design, and digital innovation.
              24/7 mentor support and real-time project experience await you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/posts"
                className="px-8 py-4 bg-gradient-hero text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Start Reading
              </Link>
              <Link
                href="/authors"
                className="px-8 py-4 text-accent-blue font-semibold rounded-xl border border-accent-blue/30 hover:bg-accent-blue/10 transition-all duration-300"
              >
                Meet Our Authors
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}