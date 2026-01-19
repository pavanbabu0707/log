import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Share2, Bookmark } from 'lucide-react';
import VerifiedBadge from './VerifiedBadge';
import { formatNumber, getAuthorityById } from '../data/mockData';

export default function PostCard({ post, onLike, isLiked, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const authority = getAuthorityById(post.authorityId);

  if (!authority) return null;

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        bg-white/[0.015] hover:bg-white/[0.03] 
        rounded-2xl p-6 sm:p-7
        border border-white/[0.06]
        transition-all duration-300 ease-out
        ${isHovered ? '-translate-y-0.5' : ''}
        animate-fade-slide-in
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <Link 
          to={`/authority/${authority.handle}`}
          className="flex-shrink-0"
        >
          <div className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center text-2xl border-2 border-white/10 hover:border-white/20 transition-colors">
            {authority.avatar}
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mb-2">
            <Link 
              to={`/authority/${authority.handle}`}
              className="font-semibold text-[15px] hover:underline"
            >
              {authority.displayName}
            </Link>
            <VerifiedBadge />
            <span className="text-white/40 text-sm">@{authority.handle}</span>
            <span className="text-white/25 text-sm">·</span>
            <span className="text-white/40 text-sm">{post.timeAgo}</span>
          </div>

          {/* Post Content */}
          <p className="text-base sm:text-[16px] leading-relaxed text-white/90 mb-5 font-serif">
            {post.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-6 flex-wrap">
            {/* Like Button */}
            <button
              onClick={() => onLike(post.id)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-full
                transition-all duration-200
                ${isLiked 
                  ? 'text-accent-red' 
                  : 'text-white/50 hover:text-accent-red hover:bg-accent-red/10'
                }
              `}
            >
              <Heart 
                className="w-[18px] h-[18px]" 
                fill={isLiked ? 'currentColor' : 'none'}
              />
              <span className="text-sm font-medium">
                {formatNumber(post.likes + (isLiked ? 1 : 0))}
              </span>
            </button>

            {/* Views */}
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Eye className="w-4 h-4" />
              <span>{formatNumber(post.views)} views</span>
            </div>

            {/* Share Button */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200 ml-auto">
              <Share2 className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Share</span>
            </button>

            {/* Bookmark Button */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-full text-white/50 hover:text-primary-500 hover:bg-primary-500/10 transition-all duration-200">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
