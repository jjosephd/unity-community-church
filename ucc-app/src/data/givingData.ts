/**
 * Static data configuration for the Giving page
 * All UI text, options, and default values are centralized here
 */

import type { Fund, FrequencyOption, GiftType } from '../types/giving';

// ============================================
// Fund Options
// ============================================

export const funds: Fund[] = [
  {
    id: 'tithes',
    name: 'Tithes & Offerings',
    description: 'General church operations and ministry support',
    isDefault: true,
  },
  {
    id: 'building',
    name: 'Building Fund',
    description: 'Facility maintenance and improvements',
  },
  {
    id: 'missions',
    name: 'Missions',
    description: 'Supporting local and global mission work',
  },
  {
    id: 'youth',
    name: 'Youth Ministry',
    description: 'Youth programs and activities',
  },
  {
    id: 'benevolence',
    name: 'Benevolence Fund',
    description: 'Helping those in need within our community',
  },
  {
    id: 'special',
    name: 'Special Projects',
    description: 'Current church initiatives and special events',
  },
];

// ============================================
// Frequency Options
// ============================================

export const frequencyOptions: FrequencyOption[] = [
  {
    value: 'weekly',
    label: 'Every week',
    description: 'Gives consistently each week',
  },
  {
    value: 'biweekly',
    label: 'Every 2 weeks',
    description: 'Aligns with bi-weekly pay schedules',
  },
  {
    value: 'monthly',
    label: 'Every month',
    description: 'Once per month on selected date',
  },
  {
    value: 'semi-monthly',
    label: '1st & 15th monthly',
    description: 'Twice per month giving',
  },
];

// ============================================
// Gift Type Options
// ============================================

export const giftTypeOptions: {
  value: GiftType;
  label: string;
  icon: string;
}[] = [
  {
    value: 'one-time',
    label: 'Give one time',
    icon: 'gift',
  },
  {
    value: 'recurring',
    label: 'Set up recurring',
    icon: 'repeat',
  },
];

// ============================================
// Default Form Values
// ============================================

export const defaultGivingFormValues = {
  giftType: 'one-time' as const,
  frequency: undefined,
  startDate: new Date(),
  funds: [
    {
      fundId: 'tithes',
      amount: 0,
    },
  ],
};

// ============================================
// UI Text / Copy
// ============================================

export const givingPageContent = {
  hero: {
    title: 'Give with Joy',
    subtitle: 'Your generosity makes a difference',
    description:
      'Every gift, no matter the size, helps us continue our mission to serve our community and spread love. Thank you for your faithful support.',
  },
  form: {
    giftTypeLabel: 'How would you like to give?',
    frequencyLabel: 'Frequency',
    startDateLabel: 'Starting',
    fundLabel: 'Fund',
    addFundButton: '+ Add another fund',
    nextButton: 'Next',
    backButton: 'Back',
    amountPlaceholder: 'Enter amount',
  },
  summary: {
    title: 'Review Your Gift',
    giftTypeLabel: 'Gift Type',
    frequencyLabel: 'Frequency',
    startDateLabel: 'Starting',
    totalLabel: 'Total',
    confirmButton: 'Continue to Payment',
    editButton: 'Edit',
  },
};
