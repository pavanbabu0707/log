import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

export default function Header({ searchQuery, setSearchQuery }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Feed' },
    { path: '/discover', label: 'Discover' },
    { path: '/following', label: 'Following' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] bg-dark-950/85 backdrop-blur-xl border-b border-white/[0.06] z-50">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* Logo and Nav */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-display text-2xl font-semibold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            VŌCE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center gap-4">
          {/* Search - Hidden on small screens */}
          <form onSubmit={handleSearch} className="hidden sm:block relative">
            <input
              type="text"
              placeholder="Search authorities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 lg:w-72 pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder-white/40 outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          </form>

          {/* Sign In Button */}
          <button className="hidden sm:block px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity">
            Sign In
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-dark-950/95 backdrop-blur-xl border-b border-white/[0.06] p-4">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative mb-4">
            <input
              type="text"
              placeholder="Search authorities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder-white/40 outline-none focus:border-primary-500/50 transition-all"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          </form>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Sign In */}
          <button className="w-full mt-4 px-5 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity">
            Sign In
          </button>
        </div>
      )}
    </header>
  );
}
