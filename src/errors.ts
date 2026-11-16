export const QUOTE_ERROR_CODE = {
  RATE_LIMITED: 'RATE_LIMITED',
  EDIT_LIMIT_EXCEEDED: 'EDIT_LIMIT_EXCEEDED',
  VALIDATION: 'VALIDATION',
  GENERIC: 'GENERIC',
} as const;

export type QuoteErrorCode =
  (typeof QUOTE_ERROR_CODE)[keyof typeof QUOTE_ERROR_CODE];

export interface QuoteErrorInit {
  code: QuoteErrorCode;
  message: string;
  subCategory?: string;
  correlationId?: string;
  cause?: unknown;
}

export class QuoteError extends Error {
  readonly code: QuoteErrorCode;
  readonly subCategory?: string;
  readonly correlationId?: string;

  constructor(init: QuoteErrorInit) {
    super(init.message);
    this.name = 'QuoteError';
    this.code = init.code;
    this.subCategory = init.subCategory;
    this.correlationId = init.correlationId;
    if (init.cause !== undefined) {
      (this as { cause?: unknown }).cause = init.cause;
    }
  }
}

export const isQuoteError = (e: unknown): e is QuoteError =>
  e instanceof Error &&
  (e as { name?: string }).name === 'QuoteError' &&
  typeof (e as { code?: unknown }).code === 'string';
