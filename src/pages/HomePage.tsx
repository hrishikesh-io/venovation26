import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { SchedulePreview } from '../components/home/SchedulePreview';
import { VenuePreview } from '../components/home/VenuePreview';
import { CollegeLocation } from '../components/home/CollegeLocation';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#08090E] text-white">
      {/* Section 1: Hero Section with Interactive SPARK Sliding Puzzle on the Right */}
      <HeroSection />

      {/* Vision & About Fest Philosophy */}
      <AboutSection />

      {/* 2-Day Timeline Schedule Running Order */}
      <SchedulePreview />

      {/* Transit & Logistics Preview */}
      <VenuePreview />

      {/* College Location & Map */}
      <CollegeLocation />
    </div>
  );
};
