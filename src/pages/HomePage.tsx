import React, { useEffect, useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { AboutSection } from '../components/home/AboutSection';
import { DepartmentCards } from '../components/home/DepartmentCards';
import { SchedulePreview } from '../components/home/SchedulePreview';
import { VenuePreview } from '../components/home/VenuePreview';
import { CollegeLocation } from '../components/home/CollegeLocation';
import { storageService } from '../lib/storage';
import { Department } from '../types';

export const HomePage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    async function loadData() {
      const depts = await storageService.getDepartments();
      setDepartments(depts);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Section 1: Hero Section with Interactive SPARK Sliding Puzzle on the Right */}
      <HeroSection />

      {/* Section 2: Numbers & Impact */}
      <StatsSection />

      {/* Section 3: Vision & About */}
      <AboutSection />

      {/* Section 4: 4 Department Cards */}
      <DepartmentCards departments={departments} />

      {/* Section 6: 2-Day Timeline Schedule Preview */}
      <SchedulePreview />

      {/* Section 8: Transit & Logistics Preview */}
      <VenuePreview />

      {/* Section 9: College Location (above footer) */}
      <CollegeLocation />
    </div>
  );
};
