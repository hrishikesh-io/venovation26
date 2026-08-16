import { Department, Program, Registration, StatsOverview } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';
import { generateRegistrationId } from './idGenerator';

const STORAGE_KEYS = {
  DEPARTMENTS: 'venovation_departments_v1',
  PROGRAMS: 'venovation_programs_v1',
  REGISTRATIONS: 'venovation_registrations_v1',
  ADMIN_SESSION: 'venovation_admin_session_v1',
};

// Initial Default Departments
export const DEFAULT_DEPARTMENTS: Department[] = [
  {
    id: 'cse',
    name: 'Computer Science & Engineering',
    code: 'CS',
    description: 'Algorithms, AI/ML, Full-stack software engineering, cybersecurity, and cutting-edge digital disruption.',
    icon: 'Laptop',
    color: '#0052FF',
  },
  {
    id: 'auto',
    name: 'Automobile Engineering',
    code: 'AU',
    description: 'Next-gen mobility, EV powertrain innovations, engine diagnostics, vehicle dynamics, and aerodynamics.',
    icon: 'Car',
    color: '#00D2FF',
  },
  {
    id: 'civil',
    name: 'Civil Engineering',
    code: 'CV',
    description: 'Sustainable smart infrastructure, structural modeling, green construction technology, and CAD simulations.',
    icon: 'Building2',
    color: '#0035AD',
  },
  {
    id: 'ece',
    name: 'Electronics & Communication',
    code: 'EC',
    description: 'Embedded robotics, VLSI, IoT telemetry, circuit architecture, and high-frequency communication systems.',
    icon: 'Cpu',
    color: '#0043D9',
  },
];

// Initial Default Programs
export const DEFAULT_PROGRAMS: Program[] = [
  {
    id: 'hack-26',
    name: 'CodeStorm: 24-Hour Hackathon',
    department_id: 'cse',
    department_name: 'Computer Science & Engineering',
    category: 'Coding',
    description: 'Build real-world AI, Web3, or Cloud solutions solving high-impact social and industrial challenges.',
    rules: [
      'Teams must consist of 2 to 4 registered college students.',
      'All code must be written during the event and pushed to a fresh GitHub repository.',
      'Jury evaluation based on Innovation (30%), Architecture (30%), Functionality (25%), and Final Pitch (15%).',
      'High-speed Wi-Fi, food, power hubs, and cloud compute vouchers provided.'
    ],
    date: 'Day 1 & Day 2 (March 24-25, 2026)',
    time: '10:00 AM Onwards',
    venue: 'Advanced Computing Lab (Lab 402, 4th Floor)',
    max_participants: 120,
    current_registrations: 42,
    participation_type: 'Team',
    min_team_size: 2,
    max_team_size: 4,
    registration_open: true,
    coordinator_name: 'Prof. Alex Mercer',
    coordinator_phone: '+91 98401 23456',
    prize_pool: '₹35,000 + Internship Opportunities',
    created_at: new Date('2026-01-10').toISOString(),
  },
  {
    id: 'bug-hunter',
    name: 'Zero-Day: Reverse Code Hunt',
    department_id: 'cse',
    department_name: 'Computer Science & Engineering',
    category: 'Technical Event',
    description: 'Spot vulnerabilities, analyze memory leaks, solve algorithmic puzzles, and optimize flawed enterprise codebases under extreme time pressure.',
    rules: [
      'Individual participation only.',
      'Three consecutive elimination rounds: Byte Scramble, Leak Detection, Exploitation.',
      'Standard IDEs (VS Code, CLion, IntelliJ) and local sandbox compilers provided.',
      'Internet access strictly blocked during rounds.'
    ],
    date: 'Day 1 (March 24, 2026)',
    time: '02:00 PM - 04:30 PM',
    venue: 'Software Lab 2, CS Block',
    max_participants: 60,
    current_registrations: 28,
    participation_type: 'Individual',
    min_team_size: 1,
    max_team_size: 1,
    registration_open: true,
    coordinator_name: 'Dr. Sarah Connor',
    coordinator_phone: '+91 98401 23457',
    prize_pool: '₹15,000 + Tech Trophy',
    created_at: new Date('2026-01-11').toISOString(),
  },
  {
    id: 'ai-prompt',
    name: 'Prompt Matrix: Generative AI Challenge',
    department_id: 'cse',
    department_name: 'Computer Science & Engineering',
    category: 'Innovation Challenge',
    description: 'Harness LLMs, multi-agent frameworks, and multimodal AI pipelines to synthesize end-to-end applications within 90 minutes.',
    rules: [
      'Open to solo developers or duos.',
      'API keys for modern vision, LLM, and embedding models provided on spot.',
      'Participants will receive a secret problem brief 5 minutes before kickoff.',
      'Judging focused on zero-shot agility, prompt engineering depth, and UI synthesis.'
    ],
    date: 'Day 2 (March 25, 2026)',
    time: '11:00 AM - 01:00 PM',
    venue: 'Seminar Hall Alpha, Main Block',
    max_participants: 80,
    current_registrations: 35,
    participation_type: 'Individual',
    min_team_size: 1,
    max_team_size: 2,
    registration_open: true,
    coordinator_name: 'Prof. Kevin Flynn',
    coordinator_phone: '+91 98401 23458',
    prize_pool: '₹20,000 + AI Cloud Credits',
    created_at: new Date('2026-01-12').toISOString(),
  },
  {
    id: 'cad-auto',
    name: 'AeroDyn: 3D Vehicle CAD Modeling',
    department_id: 'auto',
    department_name: 'Automobile Engineering',
    category: 'CAD/Design',
    description: 'Design aerodynamic chassis, spoiler geometries, and crash-resilient monocoques using SolidWorks / CATIA.',
    rules: [
      'Individual event.',
      'Parametric modeling workstations with SolidWorks 2024 & CATIA V5 will be provided.',
      'Blueprints and dimensional boundaries will be handed at 10:30 AM.',
      'Evaluated on draft angles, minimum drag coefficient, and assembly mates.'
    ],
    date: 'Day 1 (March 24, 2026)',
    time: '10:30 AM - 01:30 PM',
    venue: 'CAD/CAM Simulation Center, Auto Block',
    max_participants: 50,
    current_registrations: 22,
    participation_type: 'Individual',
    min_team_size: 1,
    max_team_size: 1,
    registration_open: true,
    coordinator_name: 'Prof. Victor Vance',
    coordinator_phone: '+91 98402 34567',
    prize_pool: '₹18,000 + SolidWorks Certification Voucher',
    created_at: new Date('2026-01-13').toISOString(),
  },
  {
    id: 'ev-design',
    name: 'VoltRush: EV Powertrain Challenge',
    department_id: 'auto',
    department_name: 'Automobile Engineering',
    category: 'Innovation Challenge',
    description: 'Prototype high-efficiency Battery Management Systems (BMS), thermal throttling circuits, and regenerative braking setups.',
    rules: [
      'Teams of 2 to 4 members.',
      'Working scaled prototype or comprehensive MATLAB/Simulink digital twin model required.',
      '10 minutes live demonstration + 5 minutes technical cross-examination.',
      'Thermal runaway protection features get bonus evaluation points.'
    ],
    date: 'Day 2 (March 25, 2026)',
    time: '01:30 PM - 04:30 PM',
    venue: 'Automobile Dynamics Workshop Bay 3',
    max_participants: 40,
    current_registrations: 16,
    participation_type: 'Team',
    min_team_size: 2,
    max_team_size: 4,
    registration_open: true,
    coordinator_name: 'Dr. Dominic Toretto',
    coordinator_phone: '+91 98402 34568',
    prize_pool: '₹25,000 + OEM EV Lab Visit Pass',
    created_at: new Date('2026-01-14').toISOString(),
  },
  {
    id: 'pit-stop',
    name: 'TurboTeq: Engine Teardown & Diagnostic Relay',
    department_id: 'auto',
    department_name: 'Automobile Engineering',
    category: 'Technical Event',
    description: 'Time-trial engine teardown, injector timing adjustment, sensor calibration, and rapid troubleshooting on live testbeds.',
    rules: [
      'Teams of 2 to 3 technicians.',
      'Full safety gear (steel-toe boots and goggles) mandatory.',
      'Points for torque accuracy, precision gasket alignment, and zero component damage.',
      'Fastest fault-free engine firing sequence wins.'
    ],
    date: 'Day 1 (March 24, 2026)',
    time: '03:00 PM - 05:30 PM',
    venue: 'Internal Combustion Testing Bay, Workshop A',
    max_participants: 30,
    current_registrations: 19,
    participation_type: 'Team',
    min_team_size: 2,
    max_team_size: 3,
    registration_open: true,
    coordinator_name: 'Er. Marcus Brody',
    coordinator_phone: '+91 98402 34569',
    prize_pool: '₹15,000 + Snap-on Tool Kits',
    created_at: new Date('2026-01-15').toISOString(),
  },
  {
    id: 'bridge-craft',
    name: 'TrussMaster: Bridge Load Stress Analysis',
    department_id: 'civil',
    department_name: 'Civil Engineering',
    category: 'Technical Event',
    description: 'Design and construct ultra-lightweight balsa wood and composite truss bridges, tested to ultimate destruction under hydraulic load cells.',
    rules: [
      'Teams of 2 to 3 members.',
      'All structural materials (standard balsa sticks, cyanoacrylate adhesive) provided.',
      'Bridge span: exactly 450mm with minimum vertical clearance of 100mm.',
      'Winner calculated using efficiency ratio: Max Breaking Load (kg) / Self-Weight (g).'
    ],
    date: 'Day 1 (March 24, 2026)',
    time: '11:00 AM - 03:00 PM',
    venue: 'Structures & Materials Lab, Civil Block',
    max_participants: 60,
    current_registrations: 31,
    participation_type: 'Team',
    min_team_size: 2,
    max_team_size: 3,
    registration_open: true,
    coordinator_name: 'Prof. Elena Rostova',
    coordinator_phone: '+91 98403 45678',
    prize_pool: '₹20,000 + Gold Medallions',
    created_at: new Date('2026-01-16').toISOString(),
  },
  {
    id: 'smart-city',
    name: 'UrbanPulse: Smart City GIS & BIM Summit',
    department_id: 'civil',
    department_name: 'Civil Engineering',
    category: 'Paper Presentation',
    description: 'Present research proposals on resilient urban water management, carbon-neutral concrete composites, and sensor-driven traffic grids.',
    rules: [
      'Individual or pair presentation.',
      'Paper abstract must be submitted beforehand; 8 minutes oral presentation + 3 minutes Q&A.',
      'Originality and technical feasibility are the highest weighted judging parameters.'
    ],
    date: 'Day 2 (March 25, 2026)',
    time: '10:00 AM - 01:00 PM',
    venue: 'Auditorium Block C (Room C-101)',
    max_participants: 50,
    current_registrations: 18,
    participation_type: 'Individual',
    min_team_size: 1,
    max_team_size: 2,
    registration_open: true,
    coordinator_name: 'Dr. Arthur Pendelton',
    coordinator_phone: '+91 98403 45679',
    prize_pool: '₹15,000 + Scopus Publication Support',
    created_at: new Date('2026-01-17').toISOString(),
  },
  {
    id: 'survey-pro',
    name: 'GeoSpatial Pro: Total Station Relay',
    department_id: 'civil',
    department_name: 'Civil Engineering',
    category: 'Technical Event',
    description: 'High-precision topographic mapping, contour levelling, and boundary triangulation under real outdoor field conditions.',
    rules: [
      'Teams of 2 to 3 members.',
      'Digital Leica Total Stations and electronic distance meters provided.',
      'Strict 45-minute field observation window followed by 30-minute CAD plot generation.',
      'Penalties for angular closing error greater than 10 arcseconds.'
    ],
    date: 'Day 1 (March 24, 2026)',
    time: '02:00 PM - 04:30 PM',
    venue: 'College Central Field Grounds',
    max_participants: 40,
    current_registrations: 14,
    participation_type: 'Team',
    min_team_size: 2,
    max_team_size: 3,
    registration_open: true,
    coordinator_name: 'Er. Maya Lin',
    coordinator_phone: '+91 98403 45680',
    prize_pool: '₹12,000 + Surveying Gear Kits',
    created_at: new Date('2026-01-18').toISOString(),
  },
  {
    id: 'circuit-matrix',
    name: 'SiliconClash: High-Speed Circuit Debug Clash',
    department_id: 'ece',
    department_name: 'Electronics & Communication',
    category: 'Circuit Challenge',
    description: 'Debug tricky analog/digital circuits, identify blown ICs, calculate resonant filters, and wire multi-stage amplifiers under the clock.',
    rules: [
      'Individual event.',
      'Rigol 100MHz digital storage oscilloscopes, signal generators, and bench supplies provided.',
      'Three progressive hardware bugs to isolate within 60 minutes.',
      'Safety and clean wiring hygiene carry tiebreaker points.'
    ],
    date: 'Day 1 (March 24, 2026)',
    time: '11:30 AM - 01:30 PM',
    venue: 'Integrated Circuits & VLSI Lab, ECE Block 2nd Floor',
    max_participants: 50,
    current_registrations: 25,
    participation_type: 'Individual',
    min_team_size: 1,
    max_team_size: 1,
    registration_open: true,
    coordinator_name: 'Prof. Nikola Vance',
    coordinator_phone: '+91 98404 56789',
    prize_pool: '₹16,000 + Digital Multimeters',
    created_at: new Date('2026-01-19').toISOString(),
  },
  {
    id: 'iot-summit',
    name: 'RoboPulse: Autonomous Line-Follower & Bot Arena',
    department_id: 'ece',
    department_name: 'Electronics & Communication',
    category: 'Technical Event',
    description: 'Autonomous micro-robots conquering intricate obstacle courses, dynamic color tracks, and RF signal interference mazes.',
    rules: [
      'Teams of 2 to 4 students.',
      'Max chassis size: 25cm x 25cm x 20cm; max supply voltage 12.6V.',
      'Dual trials permitted; best timing lap recorded on digital optical timers.',
      'Penalty of +5 seconds for leaving the line track.'
    ],
    date: 'Day 2 (March 25, 2026)',
    time: '11:00 AM - 02:30 PM',
    venue: 'Indoor Sports Complex Arena Floor',
    max_participants: 70,
    current_registrations: 38,
    participation_type: 'Team',
    min_team_size: 2,
    max_team_size: 4,
    registration_open: true,
    coordinator_name: 'Dr. Hedy Lamarr',
    coordinator_phone: '+91 98404 56790',
    prize_pool: '₹30,000 + Robotic Shields',
    created_at: new Date('2026-01-20').toISOString(),
  },
  {
    id: 'drone-arena',
    name: 'SkyStream: FPV Micro-Drone Precision Nav',
    department_id: 'ece',
    department_name: 'Electronics & Communication',
    category: 'Innovation Challenge',
    description: 'Piloting and autonomous telemetry challenge navigating obstacle rings, lidar beacons, and altitude holding zones.',
    rules: [
      'Open to solo pilots or spotter-pilot pairs.',
      'Drone mass under 250g with propeller guards installed.',
      'Course consists of 6 illuminated LED gates and 2 precision landing pads.',
      'Judged on total course completion time and zero-collision flight score.'
    ],
    date: 'Day 2 (March 25, 2026)',
    time: '02:30 PM - 05:00 PM',
    venue: 'Outdoor Open Quadrangle (Net-Enclosed Zone)',
    max_participants: 40,
    current_registrations: 19,
    participation_type: 'Individual',
    min_team_size: 1,
    max_team_size: 2,
    registration_open: true,
    coordinator_name: 'Prof. Alan Turing',
    coordinator_phone: '+91 98404 56791',
    prize_pool: '₹22,000 + FPV HD Goggles',
    created_at: new Date('2026-01-21').toISOString(),
  },
];

// Initial Seed Sample Registrations
export const SEED_REGISTRATIONS: Registration[] = [
  {
    registration_id: 'VEN26-CS-0001',
    full_name: 'Rohan Sharma',
    gender: 'Male',
    date_of_birth: '2004-05-14',
    phone: '9876543210',
    email: 'rohan.sharma@mit.edu',
    address: '142 Skyline Boulevard, Indiranagar',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    pincode: '560038',
    college_name: 'MIT Institute of Technology',
    department: 'Computer Science',
    course: 'B.Tech CSE',
    semester: '6th Semester',
    selected_department_id: 'cse',
    program_id: 'hack-26',
    program_name: 'CodeStorm: 24-Hour Hackathon',
    category: 'Coding',
    participation_type: 'Team',
    team_name: 'NeuralKnights',
    team_leader: 'Rohan Sharma',
    team_members: ['Aarav Patel', 'Priya Menon', 'Devansh Gupta'],
    status: 'Confirmed',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    registration_id: 'VEN26-AU-0002',
    full_name: 'Ananya Deshmukh',
    gender: 'Female',
    date_of_birth: '2003-11-20',
    phone: '9845123456',
    email: 'ananya.deshmukh@coep.ac.in',
    address: '45 Shivajinagar',
    district: 'Pune',
    state: 'Maharashtra',
    pincode: '411005',
    college_name: 'COEP Technological University',
    department: 'Mechanical & Auto',
    course: 'B.Tech Automobile',
    semester: '8th Semester',
    selected_department_id: 'auto',
    program_id: 'ev-design',
    program_name: 'VoltRush: EV Powertrain Challenge',
    category: 'Innovation Challenge',
    participation_type: 'Team',
    team_name: 'ApexMobility',
    team_leader: 'Ananya Deshmukh',
    team_members: ['Karan Singhania', 'Siddharth Rao'],
    status: 'Confirmed',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    registration_id: 'VEN26-CV-0003',
    full_name: 'Karthik Raja',
    gender: 'Male',
    date_of_birth: '2004-02-18',
    phone: '9789012345',
    email: 'karthik.raja@annauniv.edu',
    address: '77 Sardar Patel Road, Guindy',
    district: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600025',
    college_name: 'College of Engineering Guindy, Anna Univ',
    department: 'Civil Engineering',
    course: 'B.E Civil',
    semester: '6th Semester',
    selected_department_id: 'civil',
    program_id: 'bridge-craft',
    program_name: 'TrussMaster: Bridge Load Stress Analysis',
    category: 'Technical Event',
    participation_type: 'Team',
    team_name: 'TitanTruss',
    team_leader: 'Karthik Raja',
    team_members: ['Naveen Kumar', 'Vigneshwaran S'],
    status: 'Confirmed',
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    registration_id: 'VEN26-EC-0004',
    full_name: 'Meera Nambiar',
    gender: 'Female',
    date_of_birth: '2004-09-02',
    phone: '9447123987',
    email: 'meera.n@nitc.ac.in',
    address: '12 Emerald Hills, West Hill',
    district: 'Kozhikode',
    state: 'Kerala',
    pincode: '673005',
    college_name: 'National Institute of Technology Calicut',
    department: 'Electronics & Comm',
    course: 'B.Tech ECE',
    semester: '4th Semester',
    selected_department_id: 'ece',
    program_id: 'circuit-matrix',
    program_name: 'SiliconClash: High-Speed Circuit Debug Clash',
    category: 'Circuit Challenge',
    participation_type: 'Individual',
    status: 'Confirmed',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    registration_id: 'VEN26-CS-0005',
    full_name: 'Tanvi Iyer',
    gender: 'Female',
    date_of_birth: '2003-08-11',
    phone: '9920198273',
    email: 'tanvi.iyer@vjti.ac.in',
    address: '89 Matunga East',
    district: 'Mumbai City',
    state: 'Maharashtra',
    pincode: '400019',
    college_name: 'Veermata Jijabai Technological Institute',
    department: 'Information Technology',
    course: 'B.Tech IT',
    semester: '6th Semester',
    selected_department_id: 'cse',
    program_id: 'bug-hunter',
    program_name: 'Zero-Day: Reverse Code Hunt',
    category: 'Technical Event',
    participation_type: 'Individual',
    status: 'Confirmed',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  }
];

// Helper functions for Local Storage & Supabase
export const storageService = {
  // 1. Get Departments
  async getDepartments(): Promise<Department[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('departments').select('*').order('name');
        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('Supabase getDepartments error, falling back to local:', err);
      }
    }

    const localData = localStorage.getItem(STORAGE_KEYS.DEPARTMENTS);
    if (localData) {
      try {
        return JSON.parse(localData);
      } catch (e) {
        console.error('Error parsing local departments:', e);
      }
    }
    localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(DEFAULT_DEPARTMENTS));
    return DEFAULT_DEPARTMENTS;
  },

  // 2. Save Departments
  async saveDepartments(departments: Department[]): Promise<void> {
    localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(departments));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('departments').upsert(departments);
      } catch (err) {
        console.warn('Supabase saveDepartments error:', err);
      }
    }
  },

  // 3. Get Programs
  async getPrograms(): Promise<Program[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('programs').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('Supabase getPrograms error, falling back to local:', err);
      }
    }

    const localData = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
    if (localData) {
      try {
        return JSON.parse(localData);
      } catch (e) {
        console.error('Error parsing local programs:', e);
      }
    }
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(DEFAULT_PROGRAMS));
    return DEFAULT_PROGRAMS;
  },

  // 4. Save Programs
  async savePrograms(programs: Program[]): Promise<void> {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('programs').upsert(programs);
      } catch (err) {
        console.warn('Supabase savePrograms error:', err);
      }
    }
  },

  // 5. Get Program By ID
  async getProgramById(id: string): Promise<Program | undefined> {
    const programs = await this.getPrograms();
    return programs.find(p => p.id === id);
  },

  // 6. Get Registrations
  async getRegistrations(): Promise<Registration[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('registrations').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('Supabase getRegistrations error, falling back to local:', err);
      }
    }

    const localData = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
    if (localData) {
      try {
        return JSON.parse(localData);
      } catch (e) {
        console.error('Error parsing local registrations:', e);
      }
    }
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(SEED_REGISTRATIONS));
    return SEED_REGISTRATIONS;
  },

  // 7. Create Registration
  async createRegistration(regData: Omit<Registration, 'registration_id' | 'created_at' | 'status'>): Promise<{ success: boolean; registration?: Registration; message?: string }> {
    const registrations = await this.getRegistrations();
    const departments = await this.getDepartments();
    const programs = await this.getPrograms();

    // 1. Duplicate check: email + program_id
    const isDuplicate = registrations.some(
      r => r.email.toLowerCase().trim() === regData.email.toLowerCase().trim() && r.program_id === regData.program_id
    );

    if (isDuplicate) {
      return {
        success: false,
        message: 'This email is already registered for this event. Please select another program or contact support.'
      };
    }

    // 2. Capacity Check
    const targetProgram = programs.find(p => p.id === regData.program_id);
    if (targetProgram) {
      const existingCountForProgram = registrations.filter(r => r.program_id === regData.program_id).length;
      if (existingCountForProgram >= targetProgram.max_participants) {
        return {
          success: false,
          message: 'Registration for this event is currently full. Please explore other exciting competitions.'
        };
      }
      if (!targetProgram.registration_open) {
        return {
          success: false,
          message: 'Registrations for this event have been temporarily closed by the coordinators.'
        };
      }
    }

    // 3. Generate ID
    const selectedDept = departments.find(d => d.id === regData.selected_department_id);
    const deptCode = selectedDept ? selectedDept.code : 'GEN';
    const newRegId = generateRegistrationId(deptCode, registrations.length);

    const newRegistration: Registration = {
      ...regData,
      registration_id: newRegId,
      status: 'Confirmed',
      created_at: new Date().toISOString(),
    };

    // Save locally
    const updatedList = [newRegistration, ...registrations];
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(updatedList));

    // Update program participant counter
    if (targetProgram) {
      targetProgram.current_registrations = (targetProgram.current_registrations || 0) + 1;
      await this.savePrograms(programs);
    }

    // Save to Supabase if connected
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('registrations').insert([newRegistration]);
        if (error) {
          console.warn('Supabase insert registration error:', error);
        }
      } catch (err) {
        console.warn('Supabase insert registration exception:', err);
      }
    }

    // Direct Google Sheets Webhook Sync if configured
    const googleSheetsWebhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
    if (googleSheetsWebhookUrl) {
      try {
        fetch(googleSheetsWebhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRegistration),
        }).catch(err => console.warn('Google Sheets sync background error:', err));
      } catch (err) {
        console.warn('Google Sheets fetch exception:', err);
      }
    }

    return {
      success: true,
      registration: newRegistration,
      message: 'Registration successfully confirmed!'
    };
  },

  // 8. Delete Registration
  async deleteRegistration(registrationId: string): Promise<boolean> {
    const registrations = await this.getRegistrations();
    const updated = registrations.filter(r => r.registration_id !== registrationId);
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('registrations').delete().eq('registration_id', registrationId);
      } catch (err) {
        console.warn('Supabase delete error:', err);
      }
    }
    return true;
  },

  // 9. Update Registration Status
  async updateRegistrationStatus(registrationId: string, status: Registration['status']): Promise<boolean> {
    const registrations = await this.getRegistrations();
    const updated = registrations.map(r => r.registration_id === registrationId ? { ...r, status } : r);
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('registrations').update({ status }).eq('registration_id', registrationId);
      } catch (err) {
        console.warn('Supabase update status error:', err);
      }
    }
    return true;
  },

  // 10. Get Analytics / Stats Overview
  async getStats(): Promise<StatsOverview> {
    const [registrations, programs] = await Promise.all([
      this.getRegistrations(),
      this.getPrograms()
    ]);

    const todayStr = new Date().toISOString().split('T')[0];
    const todayRegs = registrations.filter(r => r.created_at.startsWith(todayStr));

    const collegesSet = new Set(registrations.map(r => r.college_name.trim().toLowerCase()));

    return {
      totalRegistrations: registrations.length,
      automobileRegistrations: registrations.filter(r => r.selected_department_id === 'auto').length,
      civilRegistrations: registrations.filter(r => r.selected_department_id === 'civil').length,
      computerScienceRegistrations: registrations.filter(r => r.selected_department_id === 'cse').length,
      electronicsRegistrations: registrations.filter(r => r.selected_department_id === 'ece').length,
      totalPrograms: programs.length,
      todayRegistrations: todayRegs.length,
      totalColleges: collegesSet.size,
    };
  }
};
