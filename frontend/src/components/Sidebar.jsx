import { Link } from 'react-router-dom';
import { Shield, TrendingUp } from 'lucide-react';
import AuthorityCard from './AuthorityCard';
import { authorities } from '../data/mockData';

export default function Sidebar({ following, onFollow }) {
  // Get suggested authorities (not already following)
  const suggestedAuthorities = authorities
    .filter(a => !following.has(a.id))
    .slice(0, 4);

  // Get some trending authorities
  const trendingAuthorities = [...authorities]
    .sort((a, b) => b.followers - a.followers)
    .slice(0, 3);

  return (
    <aside className="sticky top-[104px] space-y-5">
      {/* Who to Follow */}
      <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <h3 className="font-semibold text-[15px]">Who to Follow</h3>
        </div>
        
        <div className="py-2 px-2">
          {suggestedAuthorities.length > 0 ? (
            suggestedAuthorities.map((authority) => (
              <AuthorityCard
                key={authority.id}
                authority={authority}
                isFollowing={following.has(authority.id)}
                onFollow={onFollow}
                compact
              />
            ))
          ) : (
            <p className="text-white/40 text-sm text-center py-4">
              You're following everyone!
            </p>
          )}
        </div>

        <div className="px-4 pb-4">
          <Link
            to="/discover"
            className="block w-full py-3 text-center text-primary-500 text-sm font-semibold border border-white/10 rounded-xl hover:bg-white/5 transition-colors"
          >
            Show More
          </Link>
        </div>
      </div>

      {/* Trending Voices */}
      <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary-500" />
          <h3 className="font-semibold text-[15px]">Trending Voices</h3>
        </div>
        
        <div className="py-2 px-2">
          {trendingAuthorities.map((authority, index) => (
            <Link
              key={authority.id}
              to={`/authority/${authority.handle}`}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors"
            >
              <span className="text-white/30 text-sm font-medium w-4">{index + 1}</span>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center text-lg border border-white/10">
                {authority.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{authority.displayName}</div>
                <div className="text-white/40 text-xs">{authority.followersFormatted} followers</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Platform Info */}
      <div className="bg-white/[0.02] rounded-2xl p-5 border border-white/[0.06]">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-primary-500" />
          <span className="font-semibold text-sm">Verified Only</span>
        </div>
        <p className="text-xs text-white/50 leading-relaxed">
          All content comes directly from verified authorities. No comments, no noise—just authentic voices you can trust.
        </p>
      </div>

      {/* Footer Links */}
      <div className="px-2">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/30">
          <a href="#" className="hover:text-white/50 transition-colors">About</a>
          <a href="#" className="hover:text-white/50 transition-colors">Terms</a>
          <a href="#" className="hover:text-white/50 transition-colors">Privacy</a>
          <a href="#" className="hover:text-white/50 transition-colors">Help</a>
        </div>
        <p className="text-xs text-white/20 mt-2">© 2026 VŌCE Platform</p>
      </div>
    </aside>
  );
}
