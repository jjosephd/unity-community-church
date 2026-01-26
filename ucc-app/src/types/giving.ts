/**
 * Type definitions for the Giving page
 * These types support the modular giving form components
 */

import { z } from 'zod';

// ============================================
// Enums and Union Types
// ============================================

/**
 * Type of gift - one-time or recurring
 */
export type GiftType = 'one-time' | 'recurring';

/**
 * Frequency options for recurring gifts
 */
export type Frequency = 'weekly' | 'biweekly' | 'monthly' | 'semi-monthly';

/**
 * Payment provider options (for future use)
 */
export type PaymentProvider = 'givelify' | 'cashapp';

// ============================================
// Interfaces
// ============================================

/**
 * Fund configuration interface
 */
export interface Fund {
  id: string;
  name: string;
  description?: string;
  isDefault?: boolean;
}

/**
 * Individual fund selection with amount
 */
export interface FundSelection {
  fundId: string;
  amount: number;
}

/**
 * Complete giving form data
 */
export interface GivingFormData {
  giftType: GiftType;
  frequency?: Frequency;
  startDate: Date;
  funds: FundSelection[];
  totalAmount: number;
}

/**
 * Frequency option for UI display
 */
export interface FrequencyOption {
  value: Frequency;
  label: string;
  description?: string;
}

// ============================================
// Zod Validation Schemas
// ============================================

export const fundSelectionSchema = z.object({
  fundId: z.string().min(1, 'Please select a fund'),
  amount: z.number().min(1, 'Amount must be at least $1'),
});

export const givingFormSchema = z
  .object({
    giftType: z.enum(['one-time', 'recurring']),
    frequency: z
      .enum(['weekly', 'biweekly', 'monthly', 'semi-monthly'])
      .optional(),
    startDate: z.date(),
    funds: z.array(fundSelectionSchema).min(1, 'Please add at least one fund'),
  })
  .refine(
    (data) => {
      // If recurring, frequency is required
      if (data.giftType === 'recurring' && !data.frequency) {
        return false;
      }
      return true;
    },
    {
      message: 'Please select a frequency for recurring gifts',
      path: ['frequency'],
    },
  );

export type GivingFormInput = z.infer<typeof givingFormSchema>;
