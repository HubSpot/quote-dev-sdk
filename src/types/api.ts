export type AcceptanceMethod = 'clickwrap' | 'esignature' | 'print_and_sign';

export type PaymentStatus = 'PAID' | 'PROCESSING' | 'PENDING';

export type QuoteFeature = 'acceptance' | 'payments';

export interface QuoteSigner {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  timestamp: number | null;
  signerType: 'signer' | 'counter';
}

export interface MarkedSignedBy {
  firstName: string;
  lastName: string;
  timestamp: number;
}

export interface AcceptanceData {
  acceptanceMethod: AcceptanceMethod | null;
  accepted: boolean;
  signers: QuoteSigner[];
  markedSignedBy?: MarkedSignedBy;
}

export interface PaymentData {
  paymentsEnabled: boolean;
  status: PaymentStatus | null;
}

export interface ControlState {
  disabled: boolean;
  reason: string | null;
}

export interface DisableOptions {
  reason?: string | null;
}

export interface FeatureControl {
  isDisabled: boolean;
  disabledReason: string | null;
  disable: (options?: DisableOptions) => ControlState;
  enable: () => ControlState;
}

export interface QuoteHookResult<T> {
  loading: boolean;
  error: boolean;
  data: T | null;
}
