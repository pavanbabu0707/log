import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, LinkIcon, MapPin } from 'lucide-react';
import PostCard from '../components/PostCard';
import VerifiedBadge from '../components/VerifiedBadge';
import { getAuthorityByHandle, getPostsByAuthority, formatNumber } from '../data/mockData';

export default function AuthorityProfile({ likedPosts, onLike, following, onFollow }) {
  const { handle } = useParams();
  const authority = getAuthorityByHandle(handle);
  const authorityPosts = authority ? getPostsByAuthority(authority.id) : [];
  const isFollowing = authority ? following.has(authority.id) : false;

  if (!authority) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-[104px] pb-12">
        <div className="text-center py-20">
          <h1 className="text-2xl font-semibold mb-4">Authority not found</h1>
          <p className="text-white/50 mb-6">The profile you're looking for doesn't exist.</p>
          <Link
            to="/discover"
            className="inline-block px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Discover Authorities
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-[88px] pb-12">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Feed</span>
      </Link>

      {/* Profile Header */}
      <div className="relative mb-8">
        {/* Cover Gradient */}
        <div 
          className={`h-32 sm:h-40 rounded-2xl bg-gradient-to-r ${authority.coverColor} mb-4`}
        />
        
        {/* Avatar */}
        <div className="absolute left-6 -bottom-10">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center text-5xl sm:text-6xl border-4 border-dark-950">
            {authority.avatar}
          </div>
        </div>

        {/* Follow Button */}
        <div className="absolute right-4 bottom-4">
          <button
            onClick={() => onFollow(authority.id)}
            className={`
              px-6 py-2.5 rounded-full text-sm font-semibold
              transition-all duration-200
              ${isFollowing 
                ? 'bg-white/10 border border-white/20 text-white hover:bg-white/15' 
                : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:opacity-90'
              }
            `}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pl-2 sm:pl-4 mb-8">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="font-display text-2xl sm:text-3xl font-semibold">
            {authority.displayName}
          </h1>
          <VerifiedBadge size={24} />
        </div>
        
        <p className="text-white/50 text-base mb-4">@{authority.handle}</p>
        
        <p className="text-white/80 text-base leading-relaxed mb-5 max-w-xl">
          {authority.bio}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-white/50">
          <div className="flex items-center gap-1.5">
            <span className="text-white/30">{authority.category}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Joined {new Date(authority.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-5">
          <div>
            <span className="font-semibold text-white">{authority.followersFormatted}</span>
            <span className="text-white/50 ml-1.5">Followers</span>
          </div>
          <div>
            <span className="font-semibold text-white">{authority.postsCount}</span>
            <span className="text-white/50 ml-1.5">Posts</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mb-8" />

      {/* Posts Section */}
      <div>
        <h2 className="font-semibold text-lg mb-6">Posts</h2>
        
        {authorityPosts.length > 0 ? (
          <div className="space-y-4">
            {authorityPosts.map((post, index) => (
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
          <div className="text-center py-12 text-white/40">
            <p>No posts yet</p>
          </div>
        )}
      </div>
    </main>
  );
}
