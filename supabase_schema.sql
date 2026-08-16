-- ==============================================================================
-- VENOVATION 26 SUPABASE DATABASE SCHEMA
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. DEPARTMENTS TABLE
create table if not exists public.departments (
    id text primary key,
    name text not null,
    code text not null unique,
    description text not null,
    icon text not null default 'Cpu',
    color text not null default '#0052FF',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PROGRAMS / EVENTS TABLE
create table if not exists public.programs (
    id text primary key,
    name text not null,
    department_id text not null references public.departments(id) on delete cascade,
    department_name text not null,
    category text not null,
    description text not null,
    rules text[] default '{}',
    date text not null,
    time text not null,
    venue text not null,
    max_participants integer not null default 50,
    current_registrations integer not null default 0,
    participation_type text not null default 'Individual', -- 'Individual' or 'Team'
    min_team_size integer default 1,
    max_team_size integer default 4,
    registration_open boolean not null default true,
    coordinator_name text default 'Department Coordinator',
    coordinator_phone text default '+91 98765 43210',
    prize_pool text default 'Prizes Worth ₹15,000 + Certificates',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. REGISTRATIONS TABLE
create table if not exists public.registrations (
    id uuid default uuid_generate_v4() primary key,
    registration_id text not null unique,
    full_name text not null,
    gender text not null,
    date_of_birth text,
    phone text not null,
    email text not null,
    address text not null,
    district text,
    state text,
    pincode text not null,
    college_name text not null,
    department text not null,
    course text,
    semester text,
    selected_department_id text not null,
    program_id text not null references public.programs(id) on delete cascade,
    program_name text not null,
    category text not null,
    participation_type text not null,
    team_name text,
    team_leader text,
    team_members text[] default '{}',
    status text not null default 'Confirmed',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    
    -- Prevent duplicate registration for the same program with same email/phone
    constraint unique_student_program unique (email, program_id)
);

-- 4. ROW LEVEL SECURITY (RLS)
alter table public.departments enable row level security;
alter table public.programs enable row level security;
alter table public.registrations enable row level security;

-- Public can read departments & programs
create policy "Allow public read departments" on public.departments
    for select using (true);

create policy "Allow public read programs" on public.programs
    for select using (true);

-- Public can insert registrations
create policy "Allow public insert registrations" on public.registrations
    for insert with check (true);

-- Authenticated admins have full access
create policy "Allow admins manage departments" on public.departments
    for all using (auth.role() = 'authenticated');

create policy "Allow admins manage programs" on public.programs
    for all using (auth.role() = 'authenticated');

create policy "Allow admins manage registrations" on public.registrations
    for all using (auth.role() = 'authenticated');

-- 5. INITIAL SEED DATA
insert into public.departments (id, name, code, description, icon, color) values
('cse', 'Computer Science & Engineering', 'CS', 'Algorithms, AI/ML, Full-stack software engineering, cybersecurity, and cutting-edge digital disruption.', 'Laptop', '#0052FF'),
('auto', 'Automobile Engineering', 'AU', 'Next-gen mobility, EV powertrain innovations, engine diagnostics, vehicle dynamics, and aerodynamics.', 'Car', '#00D2FF'),
('civil', 'Civil Engineering', 'CV', 'Sustainable smart infrastructure, structural modeling, green construction technology, and CAD simulations.', 'Building2', '#0035AD'),
('ece', 'Electronics & Communication', 'EC', 'Embedded robotics, VLSI, IoT telemetry, circuit architecture, and high-frequency communication systems.', 'Cpu', '#0043D9')
on conflict (id) do nothing;

insert into public.programs (id, name, department_id, department_name, category, description, rules, date, time, venue, max_participants, participation_type, min_team_size, max_team_size, registration_open, coordinator_name, coordinator_phone, prize_pool) values
('hack-26', 'CodeStorm: 24-Hour Hackathon', 'cse', 'Computer Science & Engineering', 'Coding', 'Build real-world AI, Web3, or Cloud solutions solving high-impact social and industrial challenges.', ARRAY['Teams must build their solutions on-site', 'All code must be original and pushed to GitHub during the fest', 'Mentors will evaluate innovation, architecture, and pitch'], 'Day 1 & Day 2', '10:00 AM', 'Advanced Computing Lab (Lab 402)', 100, 'Team', 2, 4, true, 'Prof. Alex Mercer', '+91 98401 23456', '₹35,000 + Internship Opportunities'),
('bug-hunter', 'Zero-Day: Reverse Code Hunt', 'cse', 'Computer Science & Engineering', 'Technical Event', 'Spot vulnerabilities, analyze memory leaks, solve algorithmic puzzles, and optimize flawed enterprise codebases under extreme time pressure.', ARRAY['Individual participation only', 'Standard IDEs and compilers provided', 'No external internet access during competition'], 'Day 1', '02:00 PM', 'Software Lab 2', 60, 'Individual', 1, 1, true, 'Dr. Sarah Connor', '+91 98401 23457', '₹15,000 + Trophy'),
('ai-prompt', 'Prompt Matrix: Generative AI Challenge', 'cse', 'Computer Science & Engineering', 'Innovation Challenge', 'Harness LLMs, multi-agent frameworks, and multimodal AI pipelines to synthesize end-to-end applications within 90 minutes.', ARRAY['Individual or pair participation', 'API credits and sandboxes provided', 'Judged on workflow design, prompt precision, and visual output'], 'Day 2', '11:00 AM', 'Seminar Hall Alpha', 80, 'Individual', 1, 2, true, 'Prof. Kevin Flynn', '+91 98401 23458', '₹20,000 + Swag Kits'),

('cad-auto', 'AeroDyn: 3D Vehicle CAD Modeling', 'auto', 'Automobile Engineering', 'CAD/Design', 'Design aerodynamic chassis, spoiler geometries, and crash-resilient monocoques using SolidWorks / CATIA.', ARRAY['Software licenses provided in CAD center', 'Design constraints revealed at start', 'Judged on CFD drag coefficient and structural elegance'], 'Day 1', '10:30 AM', 'CAD/CAM Simulation Center', 50, 'Individual', 1, 1, true, 'Prof. Victor Vance', '+91 98402 34567', '₹18,000 + Certificate'),
('ev-design', 'VoltRush: EV Powertrain Challenge', 'auto', 'Automobile Engineering', 'Innovation Challenge', 'Prototype high-efficiency Battery Management Systems (BMS), thermal throttling circuits, and regenerative braking setups.', ARRAY['Teams of 2 to 4 students', 'Working hardware prototype or detailed simulation allowed', 'Safety standards compliance mandatory'], 'Day 2', '01:30 PM', 'Automobile Dynamics Workshop', 40, 'Team', 2, 4, true, 'Dr. Dominic Toretto', '+91 98402 34568', '₹25,000 + Industry Mentorship'),
('pit-stop', 'TurboTeq: Engine Assembly & Diagnostic Relay', 'auto', 'Automobile Engineering', 'Technical Event', 'Time-trial engine teardown, injector timing adjustment, sensor calibration, and rapid troubleshooting on live testbeds.', ARRAY['Safety goggles and boots required', 'Tools provided on workbench', 'Fastest accurate turnaround wins'], 'Day 1', '03:00 PM', 'Internal Combustion Testing Bay', 30, 'Team', 2, 3, true, 'Er. Marcus Brody', '+91 98402 34569', '₹15,000 + Trophy'),

('bridge-craft', 'TrussMaster: Bridge Load Stress Analysis', 'civil', 'Civil Engineering', 'Technical Event', 'Design and construct ultra-lightweight balsa wood and composite truss bridges, tested to ultimate destruction under hydraulic load cells.', ARRAY['All raw construction materials supplied on-site', 'Dimensions must adhere to competition handbook', 'Max load-to-weight ratio determines winners'], 'Day 1', '11:00 AM', 'Structures & Materials Lab', 60, 'Team', 2, 3, true, 'Prof. Elena Rostova', '+91 98403 45678', '₹20,000 + Medals'),
('smart-city', 'UrbanPulse: Smart City GIS & BIM Summit', 'civil', 'Civil Engineering', 'Paper Presentation', 'Present research proposals on resilient urban water management, carbon-neutral concrete composites, and sensor-driven traffic grids.', ARRAY['Slide decks limited to 12 slides and 8 minutes presentation', 'Q&A session with industry jury', 'Original research only'], 'Day 2', '10:00 AM', 'Auditorium Block C', 50, 'Individual', 1, 2, true, 'Dr. Arthur Pendelton', '+91 98403 45679', '₹15,000 + Certificate of Merit'),
('survey-pro', 'GeoSpatial Pro: Total Station Relay', 'civil', 'Civil Engineering', 'Technical Event', 'High-precision topographic mapping, contour levelling, and boundary triangulation under real outdoor field conditions.', ARRAY['Instruments provided: Leica Total Stations and Optical Levels', 'Time limit: 60 minutes', 'Error margin penalized in scoring'], 'Day 1', '02:00 PM', 'College Central Field Grounds', 40, 'Team', 2, 3, true, 'Er. Maya Lin', '+91 98403 45680', '₹12,000 + Gear Kits'),

('circuit-matrix', 'SiliconClash: High-Speed Breadboard & PCB Clash', 'ece', 'Electronics & Communication', 'Circuit Challenge', 'Debug tricky analog/digital circuits, identify blown ICs, calculate resonant filters, and wire multi-stage amplifiers under the clock.', ARRAY['Standard oscilloscopes, function generators, and multimeters provided', 'Strictly no unauthorized schematics', 'Accuracy and soldering hygiene evaluated'], 'Day 1', '11:30 AM', 'Integrated Circuits & VLSI Lab', 50, 'Individual', 1, 1, true, 'Prof. Nikola Vance', '+91 98404 56789', '₹16,000 + Trophy'),
('iot-summit', 'RoboPulse: Autonomous Line-Follower & Bot Arena', 'ece', 'Electronics & Communication', 'Technical Event', 'Autonomous micro-robots conquering intricate obstacle courses, dynamic color tracks, and RF signal interference mazes.', ARRAY['Robot dimensions must not exceed 25cm x 25cm x 20cm', 'Battery voltage strictly capped at 12V', 'Automated timing gates calculate rankings'], 'Day 2', '11:00 AM', 'Indoor Sports Complex Arena', 70, 'Team', 2, 4, true, 'Dr. Hedy Lamarr', '+91 98404 56790', '₹30,000 + Shields'),
('drone-arena', 'SkyStream: FPV Micro-Drone Precision Nav', 'ece', 'Electronics & Communication', 'Innovation Challenge', 'Piloting and autonomous telemetry challenge navigating obstacle rings, lidar beacons, and altitude holding zones.', ARRAY['Micro-drones only (sub-250g)', 'Fail-safe kill switch required', 'Judged on lap timing and maneuver accuracy'], 'Day 2', '02:30 PM', 'Outdoor Open Quadrangle', 40, 'Individual', 1, 2, true, 'Prof. Alan Turing', '+91 98404 56791', '₹22,000 + FPV Goggles')
on conflict (id) do nothing;
