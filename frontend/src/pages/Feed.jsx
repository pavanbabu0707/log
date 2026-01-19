import { Flame } from 'lucide-react';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import { posts } from '../data/mockData';

export default function Feed({ likedPosts, onLike, following, onFollow }) {
  // Sort posts by engagement (likes + views) for trending
  const trendingPosts = [...posts].sort((a, b) => {
    const scoreA = a.likes + a.views * 0.1;
    const scoreB = b.likes + b.views * 0.1;
    return scoreB - scoreA;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-[104px] pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        {/* Main Feed */}
        <div>
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-7 h-7 text-orange-500" />
              <h1 className="font-display text-3xl font-semibold tracking-tight">
                Trending
              </h1>
            </div>
            <p className="text-white/40 text-sm">
              Top voices from verified authorities
            </p>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {trendingPosts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={onLike}
                isLiked={likedPosts.has(post.id)}
                index={index}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
              Load More
            </button>
          </div>
        </div>

        {/* Sidebar - Hidden on mobile */}
        <div className="hidden lg:block">
          <Sidebar following={following} onFollow={onFollow} />
        </div>
      </div>
    </main>
  );
}
