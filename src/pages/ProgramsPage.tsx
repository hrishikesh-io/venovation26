import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProgramCard } from '../components/programs/ProgramCard';
import { ProgramFilters } from '../components/programs/ProgramFilters';
import { storageService } from '../lib/storage';
import { Department, Program } from '../types';
import { Sparkles, CalendarOff } from 'lucide-react';

export const ProgramsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state initialized from URL query params
  const [selectedDept, setSelectedDept] = useState<string>(searchParams.get('dept') || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('cat') || 'all');
  const [selectedDate, setSelectedDate] = useState<string>(searchParams.get('date') || 'all');
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || '');

  useEffect(() => {
    async function loadData() {
      const [depts, progs] = await Promise.all([
        storageService.getDepartments(),
        storageService.getPrograms(),
      ]);
      setDepartments(depts);
      setPrograms(progs);
      setLoading(false);
    }
    loadData();
  }, []);

  // Sync URL search params
  useEffect(() => {
    const params: Record<string, string> = {};
    if (selectedDept !== 'all') params.dept = selectedDept;
    if (selectedCategory !== 'all') params.cat = selectedCategory;
    if (selectedDate !== 'all') params.date = selectedDate;
    if (searchQuery.trim() !== '') params.q = searchQuery;
    setSearchParams(params, { replace: true });
  }, [selectedDept, selectedCategory, selectedDate, searchQuery, setSearchParams]);

  // Unique categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    programs.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [programs]);

  // Filtered programs
  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      // Dept filter
      if (selectedDept !== 'all' && p.department_id !== selectedDept) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Date filter
      if (selectedDate !== 'all' && !p.date.includes(selectedDate)) {
        return false;
      }
      // Text Search
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchDept = p.department_name.toLowerCase().includes(q);
        const matchVenue = p.venue.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchDept && !matchVenue && !matchCat) {
          return false;
        }
      }
      return true;
    });
  }, [programs, selectedDept, selectedCategory, selectedDate, searchQuery]);

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-mono font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            <span>20+ EVENTS &bull; CASH PRIZES &bull; TROPHIES</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-slate-950">
            Programs & Competitions
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Discover all technical events, hackathons, quizzes, project exhibitions, and design sprints across engineering streams.
          </p>
        </div>

        {/* Filter Controls Component */}
        <div className="mb-10">
          <ProgramFilters
            departments={departments}
            selectedDept={selectedDept}
            onSelectDept={setSelectedDept}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categories={categories}
            totalResults={filteredPrograms.length}
          />
        </div>

        {/* Programs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-72 rounded-2xl bg-slate-200" />
            ))}
          </div>
        ) : filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-w-md mx-auto space-y-3">
            <CalendarOff className="h-12 w-12 text-slate-400 mx-auto" />
            <h3 className="font-display text-lg font-bold text-slate-900">No matching events found</h3>
            <p className="text-sm text-slate-500">
              Try adjusting your search terms or clearing your department and category filters.
            </p>
            <button
              onClick={() => {
                setSelectedDept('all');
                setSelectedCategory('all');
                setSelectedDate('all');
                setSearchQuery('');
              }}
              className="mt-2 text-sm font-semibold text-brand-600 hover:text-brand-700 underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
