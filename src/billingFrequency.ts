import type { BillingFrequency } from './quoteTemplateContext';

export const BILLING_FREQUENCY_ORDER: readonly BillingFrequency[] = [
  'one_time',
  'weekly',
  'biweekly',
  'monthly',
  'quarterly',
  'per_six_months',
  'annually',
  'per_two_years',
  'per_three_years',
  'per_four_years',
  'per_five_years',
] as const;

export const BILLING_FREQUENCY_LABELS: Readonly<Record<BillingFrequency, string>> = {
  one_time: 'One-time',
  weekly: 'Weekly',
  biweekly: 'Every 2 weeks',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  per_six_months: 'Every 6 months',
  annually: 'Annually',
  per_two_years: 'Every 2 years',
  per_three_years: 'Every 3 years',
  per_four_years: 'Every 4 years',
  per_five_years: 'Every 5 years',
} as const;
