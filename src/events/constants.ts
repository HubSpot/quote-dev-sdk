export const QUOTE_FEATURE = {
  ACCEPTANCE: 'acceptance',
  PAYMENTS: 'payments',
} as const;

export const QUOTE_EVENT = {
  ACCEPTANCE: 'quote:acceptance',
  PAYMENTS: 'quote:payments',
  CONTROL_ACCEPTANCE: 'quote:control:acceptance',
  CONTROL_PAYMENTS: 'quote:control:payments',
} as const;
