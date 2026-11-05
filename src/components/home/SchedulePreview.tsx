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
    <section className="py-20 sm:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-mono font-medium">
              <Calendar className="h-3.5 w-3.5 text-brand-500" />
              <span>EVENT RUNNING ORDER</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950">
              Two Days of Relentless Innovation.
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Every hour is packed with competitive events, live workshops, design sprints, and technical exhibitions. Plan your itinerary now.
            </p>

            <div className="pt-2">
              <Link to="/schedule">
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="h-4 w-4 ml-1" />}
                >
                  View Complete Schedule
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {scheduleItems.map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl bg-[#F8FAFC] border border-slate-200/90 p-4 sm:p-5 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.01] hover:border-transparent hover:shadow-xl hover:shadow-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
              >
                {/* Same Unified Catchy Electric Blue Gradient Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#0047E0] to-[#002FA7] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none" />

                <div className="relative z-10 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 group-hover:text-white/80 transition-colors duration-300">
                    <span className="text-brand-600 group-hover:text-white font-bold" dangerouslySetInnerHTML={{ __html: item.day }} />
                    <span>&bull;</span>
                    <span className="text-slate-700 group-hover:text-white font-semibold">{item.dept}</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-slate-900 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 group-hover:text-white/80 transition-colors duration-300">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 group-hover:text-white/80" />
                    <span>{item.venue}</span>
                  </div>
                </div>

                <div className="relative z-10 sm:text-right shrink-0">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white group-hover:bg-white/20 border border-slate-200 group-hover:border-white/30 text-xs font-mono font-bold text-slate-900 group-hover:text-white shadow-sm transition-all duration-300">
                    <Clock className="h-3.5 w-3.5 text-brand-500 group-hover:text-white" />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
