import React, { useEffect, useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { AboutSection } from '../components/home/AboutSection';
import { DepartmentCards } from '../components/home/DepartmentCards';
import { FeaturedPrograms } from '../components/home/FeaturedPrograms';
import { SchedulePreview } from '../components/home/SchedulePreview';
import { VenuePreview } from '../components/home/VenuePreview';
import { SlidingPuzzle } from '../components/home/SlidingPuzzle';
import { CollegeLocation } from '../components/home/CollegeLocation';
import { storageService } from '../lib/storage';
import { Department, Program } from '../types';

export const HomePage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    async function loadData() {
      const [depts, progs] = await Promise.all([
        storageService.getDepartments(),
        storageService.getPrograms(),
      ]);
      setDepartments(depts);
      setPrograms(progs);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <DepartmentCards departments={departments} />
      <FeaturedPrograms programs={programs} />
      <SchedulePreview />
      {/* ── SPARK Sliding Puzzle ── */}
      <SlidingPuzzle />
      <VenuePreview />
      {/* ── College Location (above footer) ── */}
      <CollegeLocation />
    </div>
  );
};
