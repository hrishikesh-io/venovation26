import { DepartmentCode } from '../types';

/**
 * Generates a unique, human-readable registration ID formatted as:
 * VEN26-[DEPT_CODE]-[4-DIGIT-NUM]
 * e.g. VEN26-CS-0042
 */
export function generateRegistrationId(
  deptCode: DepartmentCode = 'GEN',
  existingRegistrationsCount: number = 0
): string {
  const cleanCode = (deptCode || 'GEN').toUpperCase().slice(0, 2);
  const sequence = (existingRegistrationsCount + 1).toString().padStart(4, '0');
  return `VEN26-${cleanCode}-${sequence}`;
}
