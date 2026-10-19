export const QUOTE_FEATURE = {
  ACCEPTANCE: 'acceptance',
  PAYMENTS: 'payments',
  TOTALS: 'totals',
  PDF: 'pdf',
} as const;

export const QUOTE_EVENT = {
  ACCEPTANCE: 'quote:acceptance',
  PAYMENTS: 'quote:payments',
  TOTALS: 'quote:totals',
  PDF: 'quote:pdf',
  CONTROL_ACCEPTANCE: 'quote:control:acceptance',
  CONTROL_PAYMENTS: 'quote:control:payments',
} as const;

export const QUOTE_ACTION = {
  RECALCULATE_TOTALS: 'recalculateTotals',
  REPORT_PDF_STALE: 'reportPdfStale',
} as const;
