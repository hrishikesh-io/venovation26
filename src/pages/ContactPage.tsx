import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Instagram, Linkedin, Twitter, CheckCircle2, UserCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const coordinators = [
    {
      role: 'Staff Convenor & Faculty Lead',
      name: 'Dr. Ramesh Sundaram',
      dept: 'Dean of Student Affairs',
      phone: '+91 98400 11223',
      email: 'ramesh.sundaram@venovation26.edu',
    },
    {
      role: 'Head Student Coordinator',
      name: 'Aditya Verma',
      dept: 'President, Student Council',
      phone: '+91 98765 43210',
      email: 'aditya.v@venovation26.edu',
    },
    {
      role: 'Technical Events Lead',
      name: 'Sanjana Krishnan',
      dept: 'Secretary, Computing Society',
      phone: '+91 98765 43211',
      email: 'sanjana.k@venovation26.edu',
    },
    {
      role: 'Hospitality & Logistics Lead',
      name: 'Nikhil Rathi',
      dept: 'Coordinator, Outstation Logistics',
      phone: '+91 98765 43213',
      email: 'hospitality@venovation26.edu',
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-mono font-medium">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>CONNECT WITH VENOVATION COMMITTEE</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-slate-950">
            Contact Us
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Have questions regarding events, team eligibility, sponsorships, or hostel accommodations? We are here to help.
          </p>
        </div>

        {/* 4 Coordinators Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {coordinators.map((c, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-sm hover:border-brand-400 hover:shadow-lg transition space-y-3"
            >
              <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-semibold text-brand-600 uppercase">
                  {c.role}
                </span>
                <h3 className="font-display text-lg font-bold text-slate-950 mt-0.5">
                  {c.name}
                </h3>
                <p className="text-xs text-slate-500">{c.dept}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs font-mono text-slate-600">
                <a
                  href={`tel:${c.phone}`}
                  className="flex items-center gap-2 text-slate-700 hover:text-brand-600 transition"
                >
                  <Phone className="h-3.5 w-3.5 text-brand-500 shrink-0" />
                  <span className="truncate">{c.phone}</span>
                </a>
                <a
                  href={`mailto:${c.email}`}
                  className="flex items-center gap-2 text-slate-700 hover:text-brand-600 transition"
                >
                  <Mail className="h-3.5 w-3.5 text-brand-500 shrink-0" />
                  <span className="truncate">{c.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Split Section: Query Form & Campus Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Query Form */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 shadow-sm">
            <h3 className="font-display text-2xl font-extrabold text-slate-950 mb-2">
              Send an Inquiry
            </h3>
            <p className="text-slate-600 text-sm mb-6">
              Fill out the form below and our student coordination team will reply within 4 hours.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
                <h4 className="font-display text-xl font-bold text-emerald-950">Inquiry Sent Successfully!</h4>
                <p className="text-sm text-emerald-700">
                  Thank you for reaching out. We have logged your request and a coordinator will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-emerald-800 underline mt-2"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@college.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm bg-white"
                    >
                      <option value="General Inquiry">General Fest Inquiry</option>
                      <option value="Event Rules & Clarifications">Event Rules & Clarifications</option>
                      <option value="Accommodation Request">Accommodation / Hostel Request</option>
                      <option value="Sponsorship & Stalls">Sponsorship & Brand Stalls</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Type your questions or special requirements here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full font-bold"
                  rightIcon={<Send className="h-4 w-4 ml-1" />}
                >
                  Submit Message
                </Button>
              </form>
            )}
          </div>

          {/* Direct Helpdesk Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-slate-950 text-white p-8 shadow-xl border border-slate-800 space-y-6">
              <div>
                <span className="font-mono text-xs text-brand-400 uppercase tracking-wider">
                  OFFICIAL VENUE DESK
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  Central Secretariat
                </h3>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-brand-400 shrink-0 mt-0.5" />
                  <span>Student Activities Center, Main Campus Block, Bengaluru - 560064</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-brand-400 shrink-0" />
                  <a href="mailto:info@venovation26.edu" className="hover:text-white transition">
                    info@venovation26.edu
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-brand-400 shrink-0" />
                  <a href="tel:+919876543210" className="hover:text-white transition font-mono">
                    +91 98765 43210 / 11
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase block mb-3">
                  Follow Fest Broadcasts
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-brand-500 transition"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-brand-500 transition"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-brand-500 transition"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
