import * as XLSX from 'xlsx';
import { Registration } from '../types';

/**
 * Clean data format for tabular export
 */
export function formatRegistrationsForExport(registrations: Registration[]) {
  return registrations.map((r, index) => ({
    'S.No': index + 1,
    'Registration ID': r.registration_id,
    'Full Name': r.full_name,
    'Gender': r.gender,
    'Email Address': r.email,
    'Phone Number': r.phone,
    'College Name': r.college_name,
    'Student Department': r.department,
    'Course / Branch': r.course || 'N/A',
    'Semester / Year': r.semester || 'N/A',
    'Registered Department': r.selected_department_id.toUpperCase(),
    'Program / Event': r.program_name,
    'Event Category': r.category,
    'Participation Type': r.participation_type,
    'Team Name': r.team_name || 'N/A',
    'Team Leader': r.team_leader || 'N/A',
    'Team Members': r.team_members && r.team_members.length > 0 ? r.team_members.join(', ') : 'N/A',
    'Address': r.address,
    'District': r.district || 'N/A',
    'State': r.state || 'N/A',
    'Pincode': r.pincode,
    'Status': r.status,
    'Registration Date': new Date(r.created_at).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    }),
  }));
}

/**
 * Export Registrations to Excel (.xlsx)
 */
export function exportToExcel(
  registrations: Registration[], 
  filenamePrefix: string = 'VENOVATION26-Registrations'
) {
  const formattedData = formatRegistrationsForExport(registrations);
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  
  // Set nice column widths
  const colWidths = [
    { wch: 6 },  // S.No
    { wch: 18 }, // Reg ID
    { wch: 22 }, // Full Name
    { wch: 10 }, // Gender
    { wch: 28 }, // Email
    { wch: 15 }, // Phone
    { wch: 30 }, // College
    { wch: 20 }, // Dept
    { wch: 16 }, // Course
    { wch: 12 }, // Semester
    { wch: 15 }, // Reg Dept
    { wch: 32 }, // Program
    { wch: 20 }, // Category
    { wch: 16 }, // Type
    { wch: 20 }, // Team Name
    { wch: 20 }, // Team Leader
    { wch: 30 }, // Team Members
    { wch: 25 }, // Address
    { wch: 15 }, // District
    { wch: 15 }, // State
    { wch: 10 }, // Pincode
    { wch: 12 }, // Status
    { wch: 20 }, // Date
  ];
  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

  const timestamp = new Date().toISOString().split('T')[0];
  const fullFilename = `${filenamePrefix}_${timestamp}.xlsx`;
  XLSX.writeFile(workbook, fullFilename);
}

/**
 * Export Registrations to CSV
 */
export function exportToCSV(
  registrations: Registration[], 
  filenamePrefix: string = 'VENOVATION26-Registrations'
) {
  const formattedData = formatRegistrationsForExport(registrations);
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const csvContent = XLSX.utils.sheet_to_csv(worksheet);

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const timestamp = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `${filenamePrefix}_${timestamp}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
