import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Compass, Search } from 'lucide-react';
import AuthorityCard from '../components/AuthorityCard';
import CategoryFilter from '../components/CategoryFilter';
import { authorities } from '../data/mockData';

export default function Discover({ following, onFollow, searchQuery }) {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [localSearch, setLocalSearch] = useState('');

  // Get search from URL params on mount
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setLocalSearch(urlSearch);
    }
  }, [searchParams]);

  // Use either the header search or local search
  const effectiveSearch = searchQuery || localSearch;

  // Filter authorities based on category and search
  const filteredAuthorities = authorities.filter(authority => {
    const matchesCategory = activeCategory === 'All' || authority.category === activeCategory;
    const matchesSearch = effectiveSearch === '' || 
      authority.displayName.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      authority.handle.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      authority.bio.toLowerCase().includes(effectiveSearch.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-[104px] pb-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Compass className="w-8 h-8 text-primary-500" />
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            Discover Voices
          </h1>
        </div>
        <p className="text-white/50 text-base">
          Find and follow verified authorities across all categories
        </p>
      </div>

      {/* Mobile Search */}
      <div className="lg:hidden mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search authorities..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder-white/40 outline-none focus:border-primary-500/50 transition-all"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        </div>
      </div>

      {/* Category Filter */}
      <CategoryFilter 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Results count */}
      {effectiveSearch && (
        <div className="mb-6">
          <p className="text-white/50 text-sm">
            {filteredAuthorities.length} {filteredAuthorities.length === 1 ? 'result' : 'results'} 
            {effectiveSearch && ` for "${effectiveSearch}"`}
          </p>
        </div>
      )}

      {/* Authority Grid */}
      {filteredAuthorities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredAuthorities.map((authority, index) => (
            <AuthorityCard
              key={authority.id}
              authority={authority}
              isFollowing={following.has(authority.id)}
              onFollow={onFollow}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
            <Search className="w-10 h-10 text-white/30" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No authorities found</h2>
          <p className="text-white/40 max-w-sm mx-auto">
            Try adjusting your search or category filter to find more voices.
          </p>
          <button
            onClick={() => { setActiveCategory('All'); setLocalSearch(''); }}
            className="mt-6 px-6 py-2.5 bg-white/10 rounded-full text-sm font-medium text-white hover:bg-white/15 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </main>
  );
}
