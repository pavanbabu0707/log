import { Link } from 'react-router-dom';
import { Users, Compass } from 'lucide-react';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import { posts, getAuthorityById } from '../data/mockData';

export default function Following({ likedPosts, onLike, following, onFollow }) {
  // Filter posts to only show from followed authorities
  const followingPosts = posts
    .filter(post => following.has(post.authorityId))
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-[104px] pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        {/* Main Feed */}
        <div>
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-7 h-7 text-primary-500" />
              <h1 className="font-display text-3xl font-semibold tracking-tight">
                Following
              </h1>
            </div>
            <p className="text-white/40 text-sm">
              Latest from authorities you follow
            </p>
          </div>

          {/* Posts or Empty State */}
          {followingPosts.length > 0 ? (
            <div className="space-y-4">
              {followingPosts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={onLike}
                  isLiked={likedPosts.has(post.id)}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                <Compass className="w-10 h-10 text-white/30" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No posts yet</h2>
              <p className="text-white/40 mb-6 max-w-sm mx-auto">
                Follow some authorities to see their posts here. Discover verified voices across all categories.
              </p>
              <Link
                to="/discover"
                className="inline-block px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              >
                Discover Authorities
              </Link>
            </div>
          )}

          {/* Load More - Only show if there are posts */}
          {followingPosts.length > 0 && (
            <div className="mt-8 text-center">
              <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
                Load More
              </button>
            </div>
          )}
        </div>

        {/* Sidebar - Hidden on mobile */}
        <div className="hidden lg:block">
          <Sidebar following={following} onFollow={onFollow} />
        </div>
      </div>
    </main>
  );
}
