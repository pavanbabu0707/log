import { useState } from 'react';
import { Link } from 'react-router-dom';
import VerifiedBadge from './VerifiedBadge';

export default function AuthorityCard({ 
  authority, 
  isFollowing, 
  onFollow, 
  compact = false,
  index = 0 
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Compact version for sidebar
  if (compact) {
    return (
      <Link
        to={`/authority/${authority.handle}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          flex items-center gap-3 p-3 rounded-xl
          transition-all duration-200
          ${isHovered ? 'bg-white/[0.04]' : 'bg-transparent'}
        `}
      >
        {/* Avatar */}
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center text-xl border-2 border-white/10 flex-shrink-0">
          {authority.avatar}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm truncate">{authority.displayName}</span>
            <VerifiedBadge size={14} />
          </div>
          <span className="text-white/40 text-xs">{authority.followersFormatted} followers</span>
        </div>

        {/* Follow Button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onFollow(authority.id); }}
          className={`
            px-3.5 py-1.5 rounded-full text-xs font-semibold
            transition-all duration-200
            ${isFollowing 
              ? 'bg-transparent border border-white/20 text-white hover:border-white/40' 
              : 'bg-white/10 text-white hover:bg-white/15'
            }
          `}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      </Link>
    );
  }

  // Full card version for discover page
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        bg-white/[0.02] rounded-2xl p-6
        border border-white/[0.06]
        transition-all duration-300 ease-out
        ${isHovered ? '-translate-y-1 bg-white/[0.04]' : ''}
        animate-fade-slide-in
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <Link to={`/authority/${authority.handle}`}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center text-3xl border-2 border-white/10 hover:border-white/20 transition-colors">
            {authority.avatar}
          </div>
        </Link>
        
        <div className="flex-1 min-w-0">
          <Link 
            to={`/authority/${authority.handle}`}
            className="flex items-center gap-1.5 mb-1 hover:opacity-80 transition-opacity"
          >
            <span className="font-semibold text-lg">{authority.displayName}</span>
            <VerifiedBadge size={18} />
          </Link>
          <span className="text-white/50 text-sm">@{authority.handle}</span>
        </div>
      </div>

      {/* Bio */}
      <p className="text-white/70 text-sm leading-relaxed mb-5 line-clamp-2">
        {authority.bio}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <span className="text-sm">
            <strong className="text-white">{authority.followersFormatted}</strong>
            <span className="text-white/50 ml-1">followers</span>
          </span>
          <span className="text-sm">
            <strong className="text-white">{authority.postsCount}</strong>
            <span className="text-white/50 ml-1">posts</span>
          </span>
        </div>
        
        <button
          onClick={() => onFollow(authority.id)}
          className={`
            px-5 py-2.5 rounded-full text-sm font-semibold
            transition-all duration-200
            ${isFollowing 
              ? 'bg-transparent border border-white/20 text-white hover:border-white/40 hover:bg-white/5' 
              : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:opacity-90'
            }
          `}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  );
}
