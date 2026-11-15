import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';

export const SchedulePreview: React.FC = () => {
  const scheduleItems = [
    {
      time: '09:00 AM',
      day: 'Day 1 &bull; March 24',
      title: 'Grand Inaugural Ceremony & Keynote Address',
      dept: 'All Streams',
      venue: 'Main Campus Auditorium',
    },
    {
      time: '10:00 AM',
      day: 'Day 1 &bull; March 24',
      title: 'CodeStorm 24-Hour National Hackathon Kickoff',
      dept: 'Computer Science',
      venue: 'Advanced Computing Lab 402',
    },
    {
      time: '11:00 AM',
      day: 'Day 1 &bull; March 24',
      title: 'TrussMaster Bridge Load Stress Testing (Round 1)',
      dept: 'Civil Engineering',
      venue: 'Structures & Materials Lab',
    },
    {
      time: '01:30 PM',
      day: 'Day 2 &bull; March 25',
      title: 'VoltRush: Next-Gen EV Powertrain Arena',
      dept: 'Automobile',
      venue: 'Automobile Dynamics Workshop',
    },
    {
      time: '04:30 PM',
      day: 'Day 2 &bull; March 25',
      title: 'Grand Valedictory, Award Ceremony & Cash Distribution',
      dept: 'All Streams',
      venue: 'Main Campus Open Auditorium',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#08090E] border-t border-slate-800 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Structured with zero overlapping of text and cards */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-800/80">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 text-red-400 text-xs font-mono font-medium border border-red-500/25">
              <Calendar className="h-3.5 w-3.5 text-amber-400" />
              <span>EVENT RUNNING ORDER</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Two Days of Relentless Innovation
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every hour is packed with competitive events, live workshops, design sprints, and technical exhibitions. Plan your itinerary now.
            </p>
          </div>

          <div className="shrink-0 pt-2 lg:pt-0">
            <Link to="/schedule">
              <Button
                variant="primary"
                size="md"
                className="bg-gradient-to-r from-red-600 via-amber-500 to-blue-600 hover:brightness-110 text-white font-bold whitespace-nowrap shadow-lg shadow-red-500/20"
                rightIcon={<ArrowRight className="h-4 w-4 ml-1" />}
              >
                View Complete Schedule
              </Button>
            </Link>
          </div>
        </div>

        {/* Schedule Cards List: Clean full-width stacked list with clear margins */}
        <div className="space-y-4">
          {scheduleItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl bg-[#0F1322] border border-slate-800 p-5 sm:p-6 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.01] hover:border-transparent hover:shadow-2xl hover:shadow-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
            >
              {/* Same Unified Catchy Electric Blue Gradient Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#0047E0] to-[#002FA7] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none" />

              {/* Event Info Details */}
              <div className="relative z-10 space-y-1.5 min-w-0 flex-1">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 group-hover:text-white/80 transition-colors duration-300">
                  <span className="text-amber-400 group-hover:text-white font-bold" dangerouslySetInnerHTML={{ __html: item.day }} />
                  <span>&bull;</span>
                  <span className="text-slate-300 group-hover:text-white font-semibold">{item.dept}</span>
                </div>

                <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-white/80 transition-colors duration-300">
                  <MapPin className="h-3.5 w-3.5 text-red-400 group-hover:text-white shrink-0" />
                  <span className="truncate">{item.venue}</span>
                </div>
              </div>

              {/* Time Pill Badge */}
              <div className="relative z-10 sm:text-right shrink-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#14192D] group-hover:bg-white/20 border border-slate-700 group-hover:border-white/30 text-xs font-mono font-bold text-white shadow-sm transition-all duration-300">
                  <Clock className="h-4 w-4 text-amber-400 group-hover:text-white" />
                  <span>{item.time}</span>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 h-8 w-8 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-90 transition-opacity duration-300">
                <div className="absolute bottom-[-10px] right-[-10px] h-6 w-6 border-b-2 border-r-2 border-amber-500 group-hover:border-white transition-colors duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
