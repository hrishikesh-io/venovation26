# VENOVATION 26 — Innovation Beyond Limits
### National College Technology & Innovation Festival Portal

A modern, responsive, full-featured web application and administrative command console built for **VENOVATION 26**.

---

## ⚡ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React Icons
- **Routing**: React Router DOM v6
- **Database & Auth**: Supabase JS Client + Instant Local/Hybrid Fallback Storage Engine
- **Visuals & QR**: Canvas Confetti, QRCode SVG Generator
- **Exporting**: Excel (`xlsx`) and Custom Tabular CSV Generators

---

## 🚀 Quick Start (Running Locally)

1. Open your terminal in this directory:
   ```bash
   cd "C:\Users\HRISHIKESH\.gemini\antigravity\scratch\venovation26"
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser at:
   ```
   http://localhost:3000
   ```

---

## 🔐 Admin Dashboard Access

- **Admin Login Route**: `/admin/login`
- **Admin Dashboard**: `/admin`
- **Default Demo Credentials**:
  - **Email**: `admin@venovation26.com`
  - **Password**: `venovation2026`
  *(A 1-click "Auto-fill" button is also present on the login screen for quick review)*

---

## 🗄️ Connecting Live Supabase Database (Optional)

The application comes pre-packaged with an active **hybrid storage engine** that works immediately without any setup. 

To link your live Supabase cloud instance:
1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in Supabase and run the SQL code from [`supabase_schema.sql`](./supabase_schema.sql).
3. Copy your project credentials into `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
   ```
4. Restart `npm run dev`. The system will automatically detect the Supabase connection and display `Supabase Live` in the Admin Dashboard.

---

## 🗺️ Route Directory

### Public Pages
- `/` — Homepage (Hero, Stats, About, Departments, Featured Events, Schedule teaser, Venue Preview)
- `/about` — About Fest, Mission, 4 Pillars of Excellence, Participation Guidelines
- `/departments` — 4 Engineering Streams (CSE, Automobile, Civil, Electronics)
- `/programs` — Dynamic Programs Directory with Real-time Search, Stream Tabs & Category Filters
- `/programs/:id` — Detailed Event Specifications, Rules, Schedule, Coordinator Contacts & Direct Register CTA
- `/schedule` — Day-by-Day Timeline Schedule with Stream and Date Switchers
- `/how-to-reach` — Campus Location, Embedded Google Maps, Nearest Train/Bus/Airport transit guide
- `/contact` — Event Coordinators, Helpdesk, FAQs, and Inquiry submission form
- `/register` — Full-featured Registration with Student, College, Event & Team details
- `/registration-success` — Official Digital Entry Pass, Unique `VEN26-XX-0000` ID, Verified QR Code, Print & PDF receipt download

### Admin Console (Protected)
- `/admin/login` — Secure Admin Authentication
- `/admin` — Central Command Metrics, Real-time Department Breakdown Gauges & Quick Actions
- `/admin/registrations` — Searchable & Filterable Registrations Directory with CSV & Excel Export
- `/admin/programs` — Program CRUD: Add/Edit/Delete programs, Toggle Registration Status & Max Quotas
- `/admin/departments` — Stream Customization (Codes, Descriptions, Icons)

---

## 📄 License & Ownership

© 2026 VENOVATION 26. Built with precision for technology innovators.
