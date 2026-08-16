export type DepartmentCode = 'CS' | 'AU' | 'CV' | 'EC' | string;

export interface Department {
  id: string;
  name: string;
  code: DepartmentCode;
  description: string;
  icon: string; // Lucide icon name
  color: string;
  programCount?: number;
}

export type EventCategory =
  | 'Technical Event'
  | 'Coding'
  | 'Quiz'
  | 'Project Exhibition'
  | 'Workshop'
  | 'Gaming'
  | 'Innovation Challenge'
  | 'Paper Presentation'
  | 'CAD/Design'
  | 'Circuit Challenge';

export interface Program {
  id: string;
  name: string;
  department_id: string;
  department_name: string;
  category: EventCategory | string;
  description: string;
  rules: string[];
  date: string;
  time: string;
  venue: string;
  max_participants: number;
  current_registrations?: number;
  participation_type: 'Individual' | 'Team';
  min_team_size: number;
  max_team_size: number;
  registration_open: boolean;
  coordinator_name: string;
  coordinator_phone: string;
  prize_pool: string;
  created_at?: string;
}

export interface Registration {
  id?: string;
  registration_id: string;
  full_name: string;
  gender: 'Male' | 'Female' | 'Other' | string;
  date_of_birth?: string;
  phone: string;
  email: string;
  address: string;
  district?: string;
  state?: string;
  pincode: string;
  college_name: string;
  department: string;
  course?: string;
  semester?: string;
  selected_department_id: string;
  program_id: string;
  program_name: string;
  category: string;
  participation_type: 'Individual' | 'Team';
  team_name?: string;
  team_leader?: string;
  team_members?: string[];
  status: 'Confirmed' | 'Pending' | 'Waitlisted' | 'Cancelled';
  created_at: string;
}

export interface AdminUser {
  email: string;
  role: 'admin' | 'superadmin';
  name: string;
}

export interface StatsOverview {
  totalRegistrations: number;
  automobileRegistrations: number;
  civilRegistrations: number;
  computerScienceRegistrations: number;
  electronicsRegistrations: number;
  totalPrograms: number;
  todayRegistrations: number;
  totalColleges: number;
}
