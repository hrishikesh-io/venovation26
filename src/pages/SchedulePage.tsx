import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Layers, ArrowRight, Trophy, Sparkles } from 'lucide-react';
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
    <div className="pt-32 pb-24 bg-[#08090E] min-h-screen text-white bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Single Line Heading */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/25 text-red-400 text-xs font-mono font-medium">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>TIMELINE &amp; AGENDA • MARCH 24-25, 2026</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white whitespace-nowrap">
            Event Schedule
          </h1>
          <p className="text-slate-300 text-base sm:text-lg">
            Track all technical sessions, hackathon milestone checkpoints, lab relays, and award ceremonies.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-[#0F1322] p-6 rounded-2xl border border-slate-800 shadow-xl mb-12 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Day Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-amber-400 uppercase font-semibold">Day:</span>
              <div className="flex items-center bg-[#14192D] p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setSelectedDay('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedDay === 'all' ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Both Days
                </button>
                <button
                  onClick={() => setSelectedDay('Day 1')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedDay === 'Day 1' ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Day 1 (March 24)
                </button>
                <button
                  onClick={() => setSelectedDay('Day 2')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedDay === 'Day 2' ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Day 2 (March 25)
                </button>
              </div>
            </div>

            {/* Department Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-amber-400 uppercase font-semibold">Stream:</span>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                aria-label="Filter schedule by Department"
                className="px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-medium text-slate-200 bg-[#14192D] focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
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

        {/* Timeline Events List - With Unified Electric Blue Hover */}
        <div className="space-y-4">
          {filteredSchedule.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden p-6 rounded-2xl bg-[#0F1322] border border-slate-800 transition-all duration-500 ease-out hover:-translate-y-2.5 hover:scale-[1.01] hover:border-transparent hover:shadow-2xl hover:shadow-blue-500/35 cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              {/* Unified Electric Blue Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#0047E0] to-[#002FA7] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none" />

              {/* Left Time Badge */}
              <div className="relative z-10 lg:col-span-3 space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/25 text-amber-400 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 text-xs font-mono font-bold transition-colors">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{item.time}</span>
                </div>
                <div className="text-xs font-mono font-medium text-slate-400 group-hover:text-white/80 transition-colors">
                  {item.day === 'Day 1' ? 'Tuesday, March 24' : 'Wednesday, March 25'}
                </div>
              </div>

              {/* Center Info */}
              <div className="relative z-10 lg:col-span-6 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 group-hover:text-white text-[11px] font-semibold transition-colors">
                    {item.department}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-400 group-hover:text-white text-[11px] font-mono transition-colors">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-white transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 group-hover:text-white/90 leading-relaxed transition-colors">
                  {item.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-white/80 font-medium pt-1 transition-colors">
                  <MapPin className="h-3.5 w-3.5 text-red-400 group-hover:text-white" />
                  <span>{item.venue}</span>
                </div>
              </div>

              {/* Right Action & Prize */}
              <div className="relative z-10 lg:col-span-3 lg:text-right flex flex-row lg:flex-col justify-between items-end gap-3 self-center">
                {item.prize ? (
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] font-mono text-slate-400 group-hover:text-white/80 uppercase">Prize Value</span>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:text-white mt-0.5">
                      <Trophy className="h-3.5 w-3.5 text-amber-400 group-hover:text-white" />
                      <span>{item.prize}</span>
                    </div>
                  </div>
                ) : (
                  <div />
                )}

                {item.deptId !== 'all' ? (
                  <Link to={`/register?dept=${item.deptId}`}>
                    <Button
                      variant="primary"
                      size="sm"
                      className="font-semibold text-xs bg-gradient-to-r from-red-600 to-amber-500 hover:brightness-110 text-white"
                    >
                      Register Now
                    </Button>
                  </Link>
                ) : (
                  <span className="text-xs font-mono text-slate-400 group-hover:text-white/80">Open to All Attendees</span>
                )}
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 h-8 w-8 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-90 transition-opacity duration-300">
                <div className="absolute bottom-[-10px] right-[-10px] h-6 w-6 border-b-2 border-r-2 border-amber-500 group-hover:border-white transition-colors duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
