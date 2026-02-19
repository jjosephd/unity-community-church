/**
 * Utilities for handling dates from Sanity CMS.
 *
 * Sanity date fields (YYYY-MM-DD) are strings without timezone info.
 * Parsing them with `new Date(string)` treats them as UTC midnight,
 * which results in the previous day when displayed in local timezones
 * with negative offsets (like EST).
 */
import { format as dateFnsFormat } from 'date-fns';

/**
 * Parses a "YYYY-MM-DD" string into a local Date object (midnight local time).
 *
 * @param dateString The date string from Sanity (YYYY-MM-DD)
 * @returns A Date object at local midnight, or null if input is invalid
 */
export function parseLocalDate(
  dateString: string | null | undefined,
): Date | null {
  if (!dateString) return null;

  // Split YYYY-MM-DD
  const parts = dateString.split('-');
  if (parts.length !== 3) return null;

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
  const day = parseInt(parts[2], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;

  return new Date(year, month, day);
}

/**
 * Helper to consistently format a local date string from Sanity.
 *
 * @param dateString The date string from Sanity
 * @param formatStr The date-fns format string
 * @param fallback Fallback text if date is invalid
 */
export function formatLocalDate(
  dateString: string | null | undefined,
  formatStr: string,
  fallback: string = '',
): string {
  const date = parseLocalDate(dateString);
  if (!date) return fallback;
  return dateFnsFormat(date, formatStr);
}
