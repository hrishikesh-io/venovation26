import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  User,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Users,
  Building,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { storageService } from '../lib/storage';
import { Department, Program, Registration } from '../types';
import { Button } from '../components/ui/Button';

export const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState<Department[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Student Details
    fullName: '',
    gender: 'Male',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    district: '',
    state: '',
    pincode: '',

    // College Details
    collegeName: '',
    studentDepartment: '',
    course: 'B.Tech / B.E',
    semester: '3rd Year (Sem 5/6)',

    // Event Selection
    selectedDepartmentId: searchParams.get('dept') || 'cse',
    selectedProgramId: searchParams.get('prog') || '',
    participationType: 'Individual' as 'Individual' | 'Team',

    // Team Details
    teamName: '',
    teamLeader: '',
    teamMember2: '',
    teamMember3: '',
    teamMember4: '',
  });

  useEffect(() => {
    async function loadData() {
      const [depts, progs] = await Promise.all([
        storageService.getDepartments(),
        storageService.getPrograms(),
      ]);
      setDepartments(depts);
      setPrograms(progs);

      // Pre-select program from query or default
      const deptFromQuery = searchParams.get('dept');
      const progFromQuery = searchParams.get('prog');

      const targetDept = deptFromQuery || (depts[0]?.id ?? 'cse');
      const filteredProgs = progs.filter((p) => p.department_id === targetDept);

      let targetProgId = progFromQuery || '';
      if (!targetProgId && filteredProgs.length > 0) {
        targetProgId = filteredProgs[0].id;
      }

      const selectedProgObj = progs.find((p) => p.id === targetProgId);

      setFormData((prev) => ({
        ...prev,
        selectedDepartmentId: targetDept,
        selectedProgramId: targetProgId,
        participationType: selectedProgObj?.participation_type || 'Individual',
        teamLeader: prev.fullName,
      }));

      setLoading(false);
    }
    loadData();
  }, [searchParams]);

  // Current active programs for the selected fest department
  const currentDeptPrograms = programs.filter(
    (p) => p.department_id === formData.selectedDepartmentId
  );

  // Currently selected program details
  const currentProgram = programs.find((p) => p.id === formData.selectedProgramId);

  // Handle department change
  const handleDepartmentChange = (deptId: string) => {
    const deptProgs = programs.filter((p) => p.department_id === deptId);
    const newProgId = deptProgs[0]?.id || '';
    const newProgObj = deptProgs[0];

    setFormData((prev) => ({
      ...prev,
      selectedDepartmentId: deptId,
      selectedProgramId: newProgId,
      participationType: newProgObj?.participation_type || 'Individual',
    }));
    setErrorMessage(null);
  };

  // Handle program change
  const handleProgramChange = (progId: string) => {
    const prog = programs.find((p) => p.id === progId);
    setFormData((prev) => ({
      ...prev,
      selectedProgramId: progId,
      participationType: prog ? prog.participation_type : 'Individual',
    }));
    setErrorMessage(null);
  };

  // Validation
  const validateForm = (): string | null => {
    // 1. Required text fields
    if (!formData.fullName.trim()) return 'Please enter your Full Name.';
    if (!formData.email.trim()) return 'Please enter your Email Address.';
    if (!formData.phone.trim()) return 'Please enter your Phone Number.';
    if (!formData.address.trim()) return 'Please enter your Address.';
    if (!formData.pincode.trim()) return 'Please enter your Pincode.';
    if (!formData.collegeName.trim()) return 'Please enter your College Name.';
    if (!formData.studentDepartment.trim()) return 'Please enter your College Department.';
    if (!formData.selectedProgramId) return 'Please select a program/event to register.';

    // 2. Email format regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      return 'Please enter a valid email address (e.g. name@domain.com).';
    }

    // 3. Phone validation (10 digits)
    const phoneClean = formData.phone.replace(/\D/g, '');
    if (phoneClean.length < 10) {
      return 'Please enter a valid 10-digit mobile phone number.';
    }

    // 4. Pincode validation (6 digits)
    const pinClean = formData.pincode.replace(/\D/g, '');
    if (pinClean.length !== 6) {
      return 'Please enter a valid 6-digit postal pincode.';
    }

    // 5. Team validation if applicable
    if (formData.participationType === 'Team') {
      if (!formData.teamName.trim()) return 'Please enter a Team Name.';
      if (!formData.teamMember2.trim()) return 'Please provide at least Team Member 2 details.';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);

    try {
      const selectedDept = departments.find((d) => d.id === formData.selectedDepartmentId);
      const selectedProg = programs.find((p) => p.id === formData.selectedProgramId);

      const teamMembersList: string[] = [];
      if (formData.teamMember2.trim()) teamMembersList.push(formData.teamMember2.trim());
      if (formData.teamMember3.trim()) teamMembersList.push(formData.teamMember3.trim());
      if (formData.teamMember4.trim()) teamMembersList.push(formData.teamMember4.trim());

      const payload: Omit<Registration, 'registration_id' | 'created_at' | 'status'> = {
        full_name: formData.fullName.trim(),
        gender: formData.gender,
        date_of_birth: formData.dateOfBirth || undefined,
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        address: formData.address.trim(),
        district: formData.district.trim() || undefined,
        state: formData.state.trim() || undefined,
        pincode: formData.pincode.trim(),

        college_name: formData.collegeName.trim(),
        department: formData.studentDepartment.trim(),
        course: formData.course,
        semester: formData.semester,

        selected_department_id: formData.selectedDepartmentId,
        program_id: formData.selectedProgramId,
        program_name: selectedProg ? selectedProg.name : formData.selectedProgramId,
        category: selectedProg ? selectedProg.category : 'Technical Event',
        participation_type: formData.participationType,

        team_name: formData.participationType === 'Team' ? formData.teamName.trim() : undefined,
        team_leader: formData.participationType === 'Team' ? (formData.teamLeader.trim() || formData.fullName.trim()) : undefined,
        team_members: formData.participationType === 'Team' ? teamMembersList : undefined,
      };

      const result = await storageService.createRegistration(payload);

      if (!result.success || !result.registration) {
        setErrorMessage(result.message || 'Failed to submit registration. Please verify details.');
        setSubmitting(false);
        window.scrollTo({ top: 300, behavior: 'smooth' });
        return;
      }

      // Store current registration in session for receipt display
      sessionStorage.setItem('latest_registration_pass', JSON.stringify(result.registration));

      // Navigate to success page
      navigate(`/registration-success?id=${result.registration.registration_id}`);
    } catch (err: unknown) {
      console.error('Registration submit error:', err);
      setErrorMessage('An unexpected error occurred while processing registration. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#08090E] min-h-screen text-white bg-tech-grid">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Single Line Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/25 text-red-400 text-xs font-mono font-medium">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>OFFICIAL FEST REGISTRATION PORTAL</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white whitespace-nowrap">
            Register for VENOVATION 26
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Complete the form below to lock your seat. An instant digital registration pass with a verified QR code will be generated.
          </p>
        </div>

        {/* Error Alert Message */}
        {errorMessage && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-300 flex items-start gap-3 animate-in fade-in duration-200 shadow-sm">
            <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-white">Validation Error</h4>
              <p className="text-xs sm:text-sm mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Main Form Box */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-[#0F1322] border border-slate-800 shadow-2xl overflow-hidden"
        >
          {/* SECTION 1: STUDENT DETAILS */}
          <div className="p-6 sm:p-10 border-b border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/25 flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-amber-400 uppercase">STEP 01</span>
                <h3 className="font-display text-xl font-bold text-white">Student Details</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value, teamLeader: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Gender <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm cursor-pointer"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Pincode <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="6-digit PIN"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm placeholder:text-slate-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Residential / College Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Street name, locality, door number"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  District
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pathanamthitta / Ernakulam"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  State
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kerala / Tamil Nadu"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: COLLEGE DETAILS */}
          <div className="p-6 sm:p-10 border-b border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/25 flex items-center justify-center">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-amber-400 uppercase">STEP 02</span>
                <h3 className="font-display text-xl font-bold text-white">College &amp; Academic Details</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  College / Institute Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Govt. Polytechnic College Vennikulam / NIT"
                  value={formData.collegeName}
                  onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Student Department / Branch <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Computer Science / Automobile"
                  value={formData.studentDepartment}
                  onChange={(e) => setFormData({ ...formData, studentDepartment: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Degree / Course
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm cursor-pointer"
                >
                  <option value="B.Tech / B.E">B.Tech / B.E</option>
                  <option value="Diploma / Polytechnic">Diploma / Polytechnic</option>
                  <option value="M.Tech / M.E">M.Tech / M.E</option>
                  <option value="BCA / MCA">BCA / MCA</option>
                  <option value="B.Sc / M.Sc">B.Sc / M.Sc</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Semester / Year
                </label>
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm cursor-pointer"
                >
                  <option value="1st Year (Sem 1/2)">1st Year (Sem 1/2)</option>
                  <option value="2nd Year (Sem 3/4)">2nd Year (Sem 3/4)</option>
                  <option value="3rd Year (Sem 5/6)">3rd Year (Sem 5/6)</option>
                  <option value="4th Year (Sem 7/8)">4th Year (Sem 7/8)</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 3: EVENT SELECTION */}
          <div className="p-6 sm:p-10 border-b border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/25 flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-blue-400 uppercase">STEP 03</span>
                <h3 className="font-display text-xl font-bold text-white">Fest Event Selection</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Select Department Stream <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.selectedDepartmentId}
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm font-medium cursor-pointer"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Select Program / Event <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.selectedProgramId}
                  onChange={(e) => handleProgramChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-amber-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm font-medium cursor-pointer"
                >
                  {currentDeptPrograms.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Program Snapshot Box */}
            {currentProgram && (
              <div className="p-4 rounded-2xl bg-[#14192D] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="font-bold text-white text-sm">{currentProgram.name}</div>
                  <div className="text-slate-400">
                    {currentProgram.date} &bull; {currentProgram.time} &bull; {currentProgram.venue}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 font-mono font-semibold text-blue-400">
                    Format: {currentProgram.participation_type}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 font-mono font-semibold text-amber-400">
                    {currentProgram.prize_pool.split('+')[0]}
                  </span>
                </div>
              </div>
            )}

            {/* Participation Type Switcher */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Participation Mode
              </label>
              <div className="grid grid-cols-2 gap-3 max-w-sm">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, participationType: 'Individual' })}
                  className={`py-2.5 px-4 rounded-xl text-xs font-semibold border transition ${
                    formData.participationType === 'Individual'
                      ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white border-amber-400/50 shadow-md shadow-red-500/20'
                      : 'bg-[#14192D] text-slate-300 border-slate-700 hover:text-white'
                  }`}
                >
                  Individual
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, participationType: 'Team' })}
                  className={`py-2.5 px-4 rounded-xl text-xs font-semibold border transition ${
                    formData.participationType === 'Team'
                      ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white border-amber-400/50 shadow-md shadow-red-500/20'
                      : 'bg-[#14192D] text-slate-300 border-slate-700 hover:text-white'
                  }`}
                >
                  Team Participation
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 4: TEAM DETAILS (CONDITIONAL) */}
          {formData.participationType === 'Team' && (
            <div className="p-6 sm:p-10 border-b border-slate-800 bg-[#0C101C] space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-md">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase">TEAM ROSTER</span>
                  <h3 className="font-display text-xl font-bold text-white">Team &amp; Squad Details</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Team / Squad Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ApexInnovators"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Team Leader (Primary Contact) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Leader name"
                    value={formData.teamLeader || formData.fullName}
                    onChange={(e) => setFormData({ ...formData, teamLeader: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm font-medium placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Team Member 2 Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name of 2nd member"
                    value={formData.teamMember2}
                    onChange={(e) => setFormData({ ...formData, teamMember2: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Team Member 3 Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Full name of 3rd member"
                    value={formData.teamMember3}
                    onChange={(e) => setFormData({ ...formData, teamMember3: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm placeholder:text-slate-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Team Member 4 Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Full name of 4th member"
                    value={formData.teamMember4}
                    onChange={(e) => setFormData({ ...formData, teamMember4: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#14192D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm placeholder:text-slate-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SUBMISSION & CTA FOOTER */}
          <div className="p-6 sm:p-10 bg-[#0C101C] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Free registration &bull; Verified encrypted record</span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={submitting}
              disabled={submitting}
              className="w-full sm:w-auto font-bold px-8 shadow-xl shadow-red-500/25 bg-gradient-to-r from-red-600 via-amber-500 to-blue-600 hover:brightness-110 text-white"
              rightIcon={<ArrowRight className="h-4 w-4 ml-1" />}
            >
              {submitting ? 'Confirming Registration...' : 'Complete Registration'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
