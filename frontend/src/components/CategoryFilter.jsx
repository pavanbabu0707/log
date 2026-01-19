import { categories } from '../data/mockData';

export default function CategoryFilter({ activeCategory, setActiveCategory }) {
  return (
    <div className="flex gap-2 flex-wrap mb-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`
            px-5 py-2.5 rounded-full text-sm font-medium
            transition-all duration-200
            ${activeCategory === cat
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
              : 'bg-white/[0.04] text-white/70 border border-white/10 hover:bg-white/[0.08] hover:text-white'
            }
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
