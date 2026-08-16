import React from 'react';
import { MapPin, Navigation, Train, Bus, Plane, Phone, Mail, ExternalLink, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const HowToReachPage: React.FC = () => {
  const transitOptions = [
    {
      icon: <Train className="h-6 w-6 text-brand-500" />,
      title: 'By Train / Metro',
      primary: 'City Central Railway Junction (SBC / YPR)',
      details: 'Distance: 8.2 km (~20-25 mins via Metro or Uber/Ola). Take Purple/Green Metro Line directly to the College Tech Station.',
    },
    {
      icon: <Bus className="h-6 w-6 text-brand-500" />,
      title: 'By Bus',
      primary: 'Express Bus Terminus / Campus Highway Stop',
      details: 'Frequent city buses (Routes 365, 500D, 201R) drop directly in front of Main Campus Gate 1 & Gate 2.',
    },
    {
      icon: <Plane className="h-6 w-6 text-brand-500" />,
      title: 'By Air',
      primary: 'Kempegowda International Airport (BLR)',
      details: 'Distance: 32 km. Vayu Vajra Airport Shuttle Bus (KIAS-8) connects directly to the outer ring road junction near campus.',
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-mono font-medium">
            <Navigation className="h-3.5 w-3.5" />
            <span>CAMPUS LOCATION & TRANSIT</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-slate-950">
            How to Reach Us
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Complete transit instructions and venue directions to ensure seamless arrival for all participating college contingents.
          </p>
        </div>

        {/* Top Grid: Campus Card + Map Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          {/* Left Campus Details */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <MapPin className="h-6 w-6" />
              </div>

              <div>
                <span className="text-xs font-mono text-brand-600 uppercase font-semibold">
                  Official Venue
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
                  Technology Campus
                </h2>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Department of Engineering & Research</p>
                <p>Auditorium Block & Innovation Quadrangle</p>
                <p>Technology Highway, Electronic Corridor</p>
                <p className="font-mono text-slate-700">Bengaluru, Karnataka - 560064, India</p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-500" />
                  <span>Gates Open: 07:30 AM (Both Days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Free Designated Parking for Registered Vehicles</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <a
                href="https://maps.google.com/?q=Bengaluru+Tech+Campus"
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <Button
                  variant="primary"
                  size="md"
                  className="w-full font-bold"
                  rightIcon={<ExternalLink className="h-4 w-4 ml-1" />}
                >
                  Open in Google Maps →
                </Button>
              </a>

              <a
                href="tel:+919876543212"
                className="inline-flex items-center justify-center gap-2 py-2 text-xs font-mono text-slate-600 hover:text-brand-600 transition"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Transit Helpdesk: +91 98765 43212</span>
              </a>
            </div>
          </div>

          {/* Right Live Map Embed / Stylized Map View */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative min-h-[380px] bg-slate-900">
            <iframe
              title="Campus Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.88653909205!2d77.49085449774697!3d12.953959988188177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1708000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Transit Cards Breakdown */}
        <div className="mb-16">
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mb-8 text-center">
            Transit & Transportation Routes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transitOptions.map((t, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm hover:border-brand-500 hover:shadow-lg transition space-y-4"
              >
                <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                  {t.icon}
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-slate-950">{t.title}</h4>
                  <p className="text-xs font-semibold text-brand-600 mt-1">{t.primary}</p>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Accommodation & Support Box */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs text-brand-400 uppercase tracking-wider">
              OUTSTATION STUDENT ACCOMMODATION
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Need hostel accommodation during the fest?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Subsidized campus guest rooms and student hostel suites are available for outstation teams registering before March 20, 2026. Reach out to our hospitality committee to reserve rooms.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="mailto:hospitality@venovation26.edu"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Hospitality Team</span>
              </a>
              <a
                href="tel:+919876543213"
                className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white font-mono"
              >
                <Phone className="h-4 w-4 text-brand-400" />
                <span>+91 98765 43213</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
