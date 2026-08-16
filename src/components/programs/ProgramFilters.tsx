import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Department } from '../../types';

interface ProgramFiltersProps {
  departments: Department[];
  selectedDept: string;
  onSelectDept: (deptId: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: string[];
  totalResults: number;
}

export const ProgramFilters: React.FC<ProgramFiltersProps> = ({
  departments,
  selectedDept,
  onSelectDept,
  selectedCategory,
  onSelectCategory,
  selectedDate,
  onSelectDate,
  searchQuery,
  onSearchChange,
  categories,
  totalResults,
}) => {
  const hasActiveFilters = selectedDept !== 'all' || selectedCategory !== 'all' || selectedDate !== 'all' || searchQuery.trim() !== '';

  const resetFilters = () => {
    onSelectDept('all');
    onSelectCategory('all');
    onSelectDate('all');
    onSearchChange('');
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      {/* Top Search Bar & Date Filter */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search Input */}
        <div className="md:col-span-8 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search programs by name, topic, or keyword..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm text-slate-900 placeholder:text-slate-400 transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Date Filter Dropdown */}
        <div className="md:col-span-4 flex items-center gap-2">
          <select
            value={selectedDate}
            onChange={(e) => onSelectDate(e.target.value)}
            aria-label="Filter by Event Date"
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
          >
            <option value="all">📅 All Dates (Day 1 & Day 2)</option>
            <option value="Day 1">March 24 (Day 1 Events)</option>
            <option value="Day 2">March 25 (Day 2 Events)</option>
          </select>
        </div>
      </div>

      {/* Department Filter Tabs */}
      <div>
        <div className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
          Filter By Engineering Stream:
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onSelectDept('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              selectedDept === 'all'
                ? 'bg-slate-950 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Departments
          </button>
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => onSelectDept(dept.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedDept === dept.id
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {dept.name.split(' ')[0]} ({dept.code})
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills & Reset Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-400 mr-1 flex items-center gap-1 font-mono">
            <Filter className="h-3.5 w-3.5" /> Category:
          </span>
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
              selectedCategory === 'all'
                ? 'bg-brand-50 text-brand-700 border border-brand-200 font-semibold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                selectedCategory === cat
                  ? 'bg-brand-50 text-brand-700 border border-brand-200 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-500 font-mono">
            Found <strong className="text-slate-900">{totalResults}</strong> events
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-brand-600 hover:text-brand-700 font-medium hover:underline flex items-center gap-1"
            >
              <X className="h-3.5 w-3.5" /> Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
