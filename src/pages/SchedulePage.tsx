import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Layers, ArrowRight, Trophy } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface ScheduleEvent {
  id: string;
  time: string;
  day: 'Day 1' | 'Day 2';
  title: string;
  department: string;
  deptId: string;
  category: string;
  venue: string;
  description: string;
  prize?: string;
}

export const SchedulePage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<'all' | 'Day 1' | 'Day 2'>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const scheduleData: ScheduleEvent[] = [
    // Day 1
    {
      id: 'd1-inaugural',
      day: 'Day 1',
      time: '09:00 AM - 10:00 AM',
      title: 'Grand Inaugural Ceremony & Keynote Address',
      department: 'General / All Streams',
      deptId: 'all',
      category: 'Ceremony',
      venue: 'Main Campus Grand Auditorium',
      description: 'Welcome address by Chief Guest, unveiling of VENOVATION 26 digital trophies, and student innovator showcase.',
    },
    {
      id: 'd1-hackathon',
      day: 'Day 1',
      time: '10:00 AM (24-Hr Kickoff)',
      title: 'CodeStorm: 24-Hour National Hackathon',
      department: 'Computer Science',
      deptId: 'cse',
      category: 'Coding',
      venue: 'Advanced Computing Lab (Lab 402)',
      description: 'Problem statements unlocked. 100+ developers hack through the night with mentors and tech experts.',
      prize: '₹35,000 + Internship Vouchers',
    },
    {
      id: 'd1-cad',
      day: 'Day 1',
      time: '10:30 AM - 01:30 PM',
      title: 'AeroDyn: 3D Vehicle CAD Modeling',
      department: 'Automobile',
      deptId: 'auto',
      category: 'CAD/Design',
      venue: 'CAD/CAM Simulation Center',
      description: 'Chassis and aerodynamic surfacing design on SolidWorks / CATIA workstations.',
      prize: '₹18,000',
    },
    {
      id: 'd1-bridge',
      day: 'Day 1',
      time: '11:00 AM - 03:00 PM',
      title: 'TrussMaster: Bridge Load Stress Analysis',
      department: 'Civil',
      deptId: 'civil',
      category: 'Technical Event',
      venue: 'Structures & Materials Lab',
      description: 'Hydraulic destruction testing of precision balsa wood bridge structures.',
      prize: '₹20,000',
    },
    {
      id: 'd1-circuit',
      day: 'Day 1',
      time: '11:30 AM - 01:30 PM',
      title: 'SiliconClash: High-Speed Circuit Debug Clash',
      department: 'Electronics',
      deptId: 'ece',
      category: 'Circuit Challenge',
      venue: 'Integrated Circuits & VLSI Lab',
      description: 'Debugging analog & digital boards using high-speed oscilloscopes.',
      prize: '₹16,000',
    },
    {
      id: 'd1-lunch',
      day: 'Day 1',
      time: '01:30 PM - 02:30 PM',
      title: 'Networking Lunch & Project Display Open Hours',
      department: 'General / All Streams',
      deptId: 'all',
      category: 'Networking',
      venue: 'Food Court & Quadrangle Arena',
      description: 'Complimentary student meals, innovation display stalls, and live robotic demonstrations.',
    },
    {
      id: 'd1-bughunt',
      day: 'Day 1',
      time: '02:00 PM - 04:30 PM',
      title: 'Zero-Day: Reverse Code Hunt',
      department: 'Computer Science',
      deptId: 'cse',
      category: 'Technical Event',
      venue: 'Software Lab 2',
      description: 'Isolating security loopholes and fixing flawed algorithms under tight time constraints.',
      prize: '₹15,000',
    },
    {
      id: 'd1-survey',
      day: 'Day 1',
      time: '02:00 PM - 04:30 PM',
      title: 'GeoSpatial Pro: Total Station Relay',
      department: 'Civil',
      deptId: 'civil',
      category: 'Technical Event',
      venue: 'College Central Field Grounds',
      description: 'Outdoor electronic surveying and automated CAD contour triangulation.',
      prize: '₹12,000',
    },
    {
      id: 'd1-pitstop',
      day: 'Day 1',
      time: '03:00 PM - 05:30 PM',
      title: 'TurboTeq: Engine Teardown & Diagnostic Relay',
      department: 'Automobile',
      deptId: 'auto',
      category: 'Technical Event',
      venue: 'Internal Combustion Testing Bay',
      description: 'High-speed diagnostic relay and precision engine rebuild competition.',
      prize: '₹15,000',
    },

    // Day 2
    {
      id: 'd2-hack-eval',
      day: 'Day 2',
      time: '10:00 AM - 12:00 PM',
      title: 'CodeStorm Hackathon: Final Jury Pitch & Demos',
      department: 'Computer Science',
      deptId: 'cse',
      category: 'Coding',
      venue: 'Advanced Computing Lab 402',
      description: 'Top 10 shortlisted squads pitch working prototypes to industry jury.',
    },
    {
      id: 'd2-smartcity',
      day: 'Day 2',
      time: '10:00 AM - 01:00 PM',
      title: 'UrbanPulse: Smart City GIS & BIM Summit',
      department: 'Civil',
      deptId: 'civil',
      category: 'Paper Presentation',
      venue: 'Auditorium Block C',
      description: 'Student researchers present innovative papers on sustainable smart cities.',
      prize: '₹15,000',
    },
    {
      id: 'd2-robopulse',
      day: 'Day 2',
      time: '11:00 AM - 02:30 PM',
      title: 'RoboPulse: Autonomous Line-Follower & Bot Arena',
      department: 'Electronics',
      deptId: 'ece',
      category: 'Technical Event',
      venue: 'Indoor Sports Complex Arena Floor',
      description: 'Autonomous micro-robots racing through dynamic obstacle courses.',
      prize: '₹30,000',
    },
    {
      id: 'd2-prompt',
      day: 'Day 2',
      time: '11:00 AM - 01:00 PM',
      title: 'Prompt Matrix: Generative AI Challenge',
      department: 'Computer Science',
      deptId: 'cse',
      category: 'Innovation Challenge',
      venue: 'Seminar Hall Alpha',
      description: 'Live prompt synthesis and autonomous agent creation using modern LLM APIs.',
      prize: '₹20,000',
    },
    {
      id: 'd2-ev',
      day: 'Day 2',
      time: '01:30 PM - 04:30 PM',
      title: 'VoltRush: EV Powertrain Challenge',
      department: 'Automobile',
      deptId: 'auto',
      category: 'Innovation Challenge',
      venue: 'Automobile Dynamics Workshop',
      description: 'Battery Management Systems and regenerative braking demonstrations.',
      prize: '₹25,000',
    },
    {
      id: 'd2-drone',
      day: 'Day 2',
      time: '02:30 PM - 05:00 PM',
      title: 'SkyStream: FPV Micro-Drone Precision Nav',
      department: 'Electronics',
      deptId: 'ece',
      category: 'Innovation Challenge',
      venue: 'Outdoor Open Quadrangle',
      description: 'Precision high-speed drone piloting through illuminated LED gates.',
      prize: '₹22,000',
    },
    {
      id: 'd2-valedictory',
      day: 'Day 2',
      time: '05:00 PM - 07:00 PM',
      title: 'Grand Valedictory & Cash Prize Distribution Ceremony',
      department: 'General / All Streams',
      deptId: 'all',
      category: 'Ceremony',
      venue: 'Main Campus Grand Open Auditorium',
      description: 'Awarding trophies, medals, prize cheques, and closing musical performance.',
    },
  ];

  const filteredSchedule = scheduleData.filter((item) => {
    if (selectedDay !== 'all' && item.day !== selectedDay) return false;
    if (selectedDept !== 'all' && item.deptId !== selectedDept && item.deptId !== 'all') return false;
    return true;
  });

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-mono font-medium">
            <Calendar className="h-3.5 w-3.5" />
            <span>TIMELINE & AGENDA &bull; MARCH 24-25, 2026</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-slate-950">
            Event Schedule
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Track all technical sessions, hackathon milestone checkpoints, lab relays, and award ceremonies.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-12 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Day Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500 uppercase font-semibold">Day:</span>
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setSelectedDay('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedDay === 'all' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Both Days
                </button>
                <button
                  onClick={() => setSelectedDay('Day 1')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedDay === 'Day 1' ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Day 1 (March 24)
                </button>
                <button
                  onClick={() => setSelectedDay('Day 2')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedDay === 'Day 2' ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Day 2 (March 25)
                </button>
              </div>
            </div>

            {/* Department Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500 uppercase font-semibold">Stream:</span>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                aria-label="Filter schedule by Department"
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                <option value="all">All Departments</option>
                <option value="cse">Computer Science (CSE)</option>
                <option value="auto">Automobile (AU)</option>
                <option value="civil">Civil Engineering (CV)</option>
                <option value="ece">Electronics (ECE)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Timeline Events List */}
        <div className="space-y-4">
          {filteredSchedule.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-brand-400 hover:shadow-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              {/* Left Time Badge */}
              <div className="lg:col-span-3 space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-50 text-brand-700 text-xs font-mono font-bold">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{item.time}</span>
                </div>
                <div className="text-xs font-mono font-medium text-slate-500">
                  {item.day === 'Day 1' ? 'Tuesday, March 24' : 'Wednesday, March 25'}
                </div>
              </div>

              {/* Center Info */}
              <div className="lg:col-span-6 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold">
                    {item.department}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-50 text-brand-600 text-[11px] font-mono">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-950">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium pt-1">
                  <MapPin className="h-3.5 w-3.5 text-brand-500" />
                  <span>{item.venue}</span>
                </div>
              </div>

              {/* Right Action & Prize */}
              <div className="lg:col-span-3 lg:text-right flex flex-row lg:flex-col justify-between items-end gap-3 self-center">
                {item.prize ? (
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Prize Value</span>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600 mt-0.5">
                      <Trophy className="h-3.5 w-3.5 text-amber-500" />
                      <span>{item.prize}</span>
                    </div>
                  </div>
                ) : (
                  <div />
                )}

                {item.deptId !== 'all' ? (
                  <Link to={`/register?dept=${item.deptId}`}>
                    <Button variant="primary" size="sm" className="font-semibold text-xs">
                      Register Now
                    </Button>
                  </Link>
                ) : (
                  <span className="text-xs font-mono text-slate-400">Open to All Attendees</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
