export const QUOTE_FEATURE = {
  ACCEPTANCE: 'acceptance',
  PAYMENTS: 'payments',
  TOTALS: 'totals',
  PDF: 'pdf',
  BUYER_DETAILS: 'buyerDetails',
} as const;

export const QUOTE_EVENT = {
  ACCEPTANCE: 'quote:acceptance',
  PAYMENTS: 'quote:payments',
  TOTALS: 'quote:totals',
  PDF: 'quote:pdf',
  PDF_SIGNAL_RESOLVED: 'quote:pdf-signal-resolved',
  BUYER_DETAILS: 'quote:buyerDetails',
  CONTROL_ACCEPTANCE: 'quote:control:acceptance',
  CONTROL_PAYMENTS: 'quote:control:payments',
} as const;

export const QUOTE_ACTION = {
  RECALCULATE_TOTALS: 'recalculateTotals',
  REPORT_PDF_STALE: 'reportPdfStale',
  SUBMIT_BUYER_DETAILS: 'submitBuyerDetails',
} as const;

export const PDF_SIGNAL_ATTR = 'data-hs-pdf-signal';
export const PDF_SIGNAL_NAME_ATTR = 'data-hs-pdf-signal-name';
