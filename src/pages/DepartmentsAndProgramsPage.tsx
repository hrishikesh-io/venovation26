import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Laptop,
  Car,
  Building2,
  Cpu,
  Sparkles,
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  ArrowRight,
  UserCheck,
  X,
  Layers,
  CalendarOff,
  Flame,
  ArrowDownCircle,
  RotateCcw,
} from 'lucide-react';
import { Department, Program } from '../types';
import { storageService } from '../lib/storage';

export const DepartmentsAndProgramsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial state: Only load dept from query if explicitly present in URL (e.g. from direct links)
  // Otherwise empty string so ONLY departments show upon entering the page!
  const [selectedDept, setSelectedDept] = useState<string>(searchParams.get('dept') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('cat') || 'all');
  const [selectedDate, setSelectedDate] = useState<string>(searchParams.get('date') || 'all');
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || '');

  useEffect(() => {
    async function fetchData() {
      const [depts, progs] = await Promise.all([
        storageService.getDepartments(),
        storageService.getPrograms(),
      ]);
      setDepartments(depts);
      setPrograms(progs);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Sync URL search params
  useEffect(() => {
    const params: Record<string, string> = {};
    if (selectedDept) params.dept = selectedDept;
    if (selectedCategory !== 'all') params.cat = selectedCategory;
    if (selectedDate !== 'all') params.date = selectedDate;
    if (searchQuery.trim() !== '') params.q = searchQuery;
    setSearchParams(params, { replace: true });
  }, [selectedDept, selectedCategory, selectedDate, searchQuery, setSearchParams]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car':
        return <Car className="h-7 w-7 text-amber-400 group-hover:text-white transition-colors" />;
      case 'Building2':
        return <Building2 className="h-7 w-7 text-red-400 group-hover:text-white transition-colors" />;
      case 'Laptop':
        return <Laptop className="h-7 w-7 text-blue-400 group-hover:text-white transition-colors" />;
      case 'Cpu':
      default:
        return <Cpu className="h-7 w-7 text-emerald-400 group-hover:text-white transition-colors" />;
    }
  };

  // Currently selected department object
  const activeDepartment = useMemo(() => {
    if (!selectedDept) return null;
    return departments.find((d) => d.id === selectedDept) || null;
  }, [departments, selectedDept]);

  // Unique categories list for selected department (or all)
  const categories = useMemo(() => {
    const set = new Set<string>();
    const deptPrograms = selectedDept
      ? programs.filter((p) => p.department_id === selectedDept)
      : programs;

    deptPrograms.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [programs, selectedDept]);

  // Filtered programs of the selected department
  const filteredPrograms = useMemo(() => {
    if (!selectedDept) return [];

    return programs.filter((p) => {
      // Must match selected department
      if (p.department_id !== selectedDept) {
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

  const handleSelectDepartment = (deptId: string) => {
    if (selectedDept === deptId) {
      // Toggle off if clicked again
      setSelectedDept('');
    } else {
      setSelectedDept(deptId);
      setSelectedCategory('all');
      setSelectedDate('all');
      setSearchQuery('');
      // Smoothly scroll down to programs section
      setTimeout(() => {
        const el = document.getElementById('programs-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedDate('all');
    setSearchQuery('');
  };

  return (
    <div className="pt-32 pb-24 bg-[#08090E] min-h-screen text-white bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* ============================================================== */}
        {/* 1. Header Section - Single Line Heading                        */}
        {/* ============================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-medium">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span>ACADEMIC DISCIPLINES &amp; COMPETITIONS</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white whitespace-nowrap">
            Departments &amp; Programs
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto">
            {selectedDept
              ? `Currently viewing events for ${activeDepartment?.name || 'selected stream'}. Click another stream or clear selection to switch.`
              : 'Select a department below to explore its flagship hackathons, CAD challenges, live arenas, and cash prize competitions.'}
          </p>
        </div>

        {/* ============================================================== */}
        {/* 2. Department Showcase Cards - Always Visible At Top           */}
        {/* ============================================================== */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-semibold block">
                ACADEMIC STREAMS
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                {selectedDept ? 'Select or Switch Stream' : 'Choose a Department to View Events'}
              </h2>
            </div>

            {selectedDept && (
              <button
                onClick={() => setSelectedDept('')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-[#0F1322] border border-slate-700 text-slate-300 hover:text-white hover:border-amber-400 transition"
              >
                <X className="h-3.5 w-3.5 text-amber-400" />
                <span>Clear Selection</span>
              </button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-64 rounded-3xl bg-[#0F1322] border border-slate-800" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept, index) => {
                const deptCount = programs.filter((p) => p.department_id === dept.id).length;
                const isSelected = selectedDept === dept.id;

                return (
                  <div
                    key={dept.id}
                    onClick={() => handleSelectDepartment(dept.id)}
                    className={`group relative overflow-hidden rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 ease-out hover:-translate-y-2.5 hover:scale-[1.02] hover:border-transparent hover:shadow-2xl hover:shadow-blue-500/35 cursor-pointer ${
                      isSelected
                        ? 'bg-[#14192D] border-2 border-amber-400 shadow-xl shadow-amber-500/25 ring-2 ring-amber-400/20'
                        : 'bg-[#0F1322] border border-slate-800'
                    }`}
                  >
                    {/* Unified Electric Blue Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#0047E0] to-[#002FA7] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none" />

                    {/* Tech grid texture on hover */}
                    <div className="absolute inset-0 bg-tech-grid opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10 space-y-4">
                      {/* Top Bar: Icon + Stream Code */}
                      <div className="flex items-center justify-between">
                        <div className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center transition-all duration-500 ease-out group-hover:bg-white/20 group-hover:border-white/30 group-hover:rotate-6 group-hover:scale-110 shadow-md">
                          {getIcon(dept.icon)}
                        </div>

                        <span className="font-mono text-[11px] font-bold text-amber-400 group-hover:text-white/90 transition-colors uppercase tracking-wider">
                          STREAM 0{index + 1}
                        </span>
                      </div>

                      {/* Department Name & Code */}
                      <div>
                        <h3 className="font-display text-xl font-bold text-white group-hover:text-white transition-colors duration-300">
                          {dept.name}
                        </h3>
                        <span className="text-xs font-mono text-slate-400 group-hover:text-white/80 transition-colors">
                          Code: {dept.code}
                        </span>
                      </div>

                      <p className="text-slate-300 group-hover:text-white/85 text-xs sm:text-sm line-clamp-3 leading-relaxed transition-colors duration-300">
                        {dept.description}
                      </p>
                    </div>

                    {/* Bottom Status / Selection Button */}
                    <div className="relative z-10 pt-4 mt-4 border-t border-slate-800/80 group-hover:border-white/20 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-400 group-hover:text-white transition-colors">
                        <Flame className="h-3.5 w-3.5 text-amber-400 group-hover:text-white" />
                        <span>{deptCount} Events</span>
                      </span>

                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                            : 'bg-white/10 text-slate-200 group-hover:bg-white/25 group-hover:text-white'
                        }`}
                      >
                        {isSelected ? '✓ Viewing Events' : 'View Events →'}
                      </span>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute bottom-0 right-0 h-8 w-8 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-90 transition-opacity duration-300">
                      <div className="absolute bottom-[-10px] right-[-10px] h-6 w-6 border-b-2 border-r-2 border-amber-500 group-hover:border-white transition-colors duration-300"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* 3. Empty State Callout when NO Department is selected yet      */}
        {/* ============================================================== */}
        {!selectedDept && !loading && (
          <div className="text-center py-16 px-6 rounded-3xl bg-[#0F1322] border border-slate-800 space-y-4 max-w-2xl mx-auto shadow-xl">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-amber-500/15 border border-amber-500/25 text-amber-400 mx-auto shadow-md">
              <ArrowDownCircle className="h-7 w-7 animate-bounce" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white whitespace-nowrap">
              Select a Department Above
            </h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              Click on any engineering stream card above to reveal its flagship hackathons, circuit relays, technical competitions, and registration details.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => handleSelectDepartment(dept.id)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-[#14192D] text-slate-300 border border-slate-700 hover:border-amber-400 hover:text-white transition"
                >
                  {dept.name.split(' ')[0]} ({dept.code})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 4. Programs Section (ONLY SHOWN AFTER SELECTING A DEPARTMENT) */}
        {/* ============================================================== */}
        {selectedDept && activeDepartment && (
          <div id="programs-section" className="space-y-8 animate-in fade-in duration-300">
            {/* Active Department Spotlight Banner */}
            <div className="rounded-3xl bg-[#0F1322] border border-slate-800 p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-mono font-semibold">
                    {activeDepartment.code} STREAM
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {filteredPrograms.length} Flagship Events
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white whitespace-nowrap">
                  {activeDepartment.name} Programs
                </h2>

                <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                  {activeDepartment.description}
                </p>
              </div>

              <div className="relative z-10 shrink-0 flex items-center gap-3">
                <button
                  onClick={() => setSelectedDept('')}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-[#14192D] text-slate-300 border border-slate-700 hover:text-white hover:border-amber-400 transition"
                >
                  ← Switch Stream
                </button>
              </div>
            </div>

            {/* Search & Category Filter Toolbar */}
            <div className="rounded-2xl bg-[#0F1322] border border-slate-800 p-5 shadow-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Search input */}
                <div className="md:col-span-8 relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder={`Search ${activeDepartment.code} events by name, keyword, or venue...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm text-white placeholder:text-slate-500 transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Date Filter Dropdown */}
                <div className="md:col-span-4">
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    aria-label="Filter by Event Date"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-700 text-sm font-medium text-slate-200 bg-[#14192D] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition cursor-pointer"
                  >
                    <option value="all">All Dates (Day 1 &amp; Day 2)</option>
                    <option value="Day 1">March 24 (Day 1 Events)</option>
                    <option value="Day 2">March 25 (Day 2 Events)</option>
                  </select>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-slate-400 mr-1 flex items-center gap-1 font-mono">
                    <Filter className="h-3.5 w-3.5 text-amber-400" /> Category:
                  </span>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1 rounded-lg font-medium transition ${
                      selectedCategory === 'all'
                        ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white font-semibold shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-lg font-medium transition ${
                        selectedCategory === cat
                          ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white font-semibold shadow-sm'
                          : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 font-mono">
                  <span className="text-slate-400">
                    Showing <strong className="text-white">{filteredPrograms.length}</strong> events
                  </span>
                  {(selectedCategory !== 'all' || selectedDate !== 'all' || searchQuery.trim() !== '') && (
                    <button
                      onClick={resetFilters}
                      className="text-amber-400 hover:text-amber-300 font-semibold underline flex items-center gap-1 transition"
                    >
                      <RotateCcw className="h-3 w-3" /> Reset filters
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Programs Cards Grid with Unified Electric Blue Hover */}
            {filteredPrograms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrograms.map((program) => {
                  const isTeam = program.participation_type === 'Team';
                  const isFull = (program.current_registrations || 0) >= program.max_participants;

                  return (
                    <div
                      key={program.id}
                      className="group relative overflow-hidden rounded-3xl bg-[#0F1322] border border-slate-800 p-6 flex flex-col justify-between transition-all duration-500 ease-out hover:-translate-y-2.5 hover:scale-[1.02] hover:border-transparent hover:shadow-2xl hover:shadow-blue-500/35 cursor-pointer space-y-4"
                    >
                      {/* Unified Electric Blue Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#0047E0] to-[#002FA7] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none" />

                      {/* Tech grid texture on hover */}
                      <div className="absolute inset-0 bg-tech-grid opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none" />

                      {/* Top Meta & Badges */}
                      <div className="relative z-10 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 text-[11px] font-mono font-medium transition-colors">
                            {program.category}
                          </span>

                          <span className="text-[11px] font-mono text-slate-400 group-hover:text-white/80 uppercase tracking-wider transition-colors">
                            {program.department_name.split(' ')[0]}
                          </span>
                        </div>

                        <Link to={`/programs/${program.id}`}>
                          <h3 className="font-display text-xl font-bold text-white group-hover:text-white transition-colors duration-300 line-clamp-2">
                            {program.name}
                          </h3>
                        </Link>

                        <p className="text-xs sm:text-sm text-slate-300 group-hover:text-white/85 line-clamp-2 leading-relaxed transition-colors duration-300">
                          {program.description}
                        </p>
                      </div>

                      {/* Mid Meta Block */}
                      <div className="relative z-10 p-3.5 rounded-2xl bg-[#14192D] border border-slate-800/80 group-hover:bg-black/20 group-hover:border-white/20 text-xs text-slate-300 group-hover:text-white/90 space-y-2 transition-colors duration-300">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-1.5 truncate">
                            <Calendar className="h-3.5 w-3.5 text-blue-400 group-hover:text-white shrink-0" />
                            <span className="truncate">{program.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5 truncate">
                            <Clock className="h-3.5 w-3.5 text-blue-400 group-hover:text-white shrink-0" />
                            <span className="truncate">{program.time}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 truncate">
                          <MapPin className="h-3.5 w-3.5 text-red-400 group-hover:text-white shrink-0" />
                          <span className="truncate">{program.venue}</span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-slate-800 group-hover:border-white/20">
                          <div className="flex items-center gap-1 text-slate-400 group-hover:text-white">
                            {isTeam ? (
                              <Users className="h-3.5 w-3.5 text-amber-400 group-hover:text-white" />
                            ) : (
                              <UserCheck className="h-3.5 w-3.5 text-amber-400 group-hover:text-white" />
                            )}
                            <span>
                              {isTeam ? `Team (${program.min_team_size}-${program.max_team_size})` : 'Individual'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 font-semibold text-amber-400 group-hover:text-white">
                            <Trophy className="h-3.5 w-3.5 text-amber-400 group-hover:text-white" />
                            <span className="truncate max-w-[130px]">{program.prize_pool.split('+')[0]}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Footer */}
                      <div className="relative z-10 pt-2 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 text-xs">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              program.registration_open && !isFull ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
                            }`}
                          />
                          <span className="font-mono text-[11px] text-slate-400 group-hover:text-white/80">
                            {program.registration_open && !isFull ? 'Seats Open' : 'Full'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link to={`/programs/${program.id}`}>
                            <button className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 group-hover:bg-white/25 transition">
                              Details
                            </button>
                          </Link>

                          <Link to={`/register?dept=${program.department_id}&prog=${program.id}`}>
                            <button
                              disabled={!program.registration_open || isFull}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition ${
                                program.registration_open && !isFull
                                ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md hover:brightness-110'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                              }`}
                            >
                              <span>Register</span>
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          </Link>
                        </div>
                      </div>

                      {/* Corner accent */}
                      <div className="absolute bottom-0 right-0 h-8 w-8 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-90 transition-opacity duration-300">
                        <div className="absolute bottom-[-10px] right-[-10px] h-6 w-6 border-b-2 border-r-2 border-amber-500 group-hover:border-white transition-colors duration-300"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#0F1322] rounded-3xl border border-slate-800 p-8 max-w-md mx-auto space-y-4">
                <CalendarOff className="h-12 w-12 text-slate-500 mx-auto" />
                <h3 className="font-display text-lg font-bold text-white">No matching events in this department</h3>
                <p className="text-sm text-slate-400">
                  Try adjusting your search terms or clearing your category and date filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md hover:brightness-110 transition"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
