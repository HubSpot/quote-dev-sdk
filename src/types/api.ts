export type AcceptanceMethod = 'clickwrap' | 'esignature' | 'print_and_sign';

export type PaymentStatus = 'PAID' | 'PROCESSING' | 'PENDING';

export type QuoteFeature =
  | 'acceptance'
  | 'payments'
  | 'totals'
  | 'pdf'
  | 'buyerDetails';

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

export interface QuotePdfData {
  canReportPdfStale: boolean;
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

export interface BuyerTaxId {
  type: string;
  number: string;
}

export interface BuyerBillingCompany {
  createdByBuyer: boolean;
  companyId: number | null;
  companyName: string | null;
  address: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
}

export interface BuyerBillingInfo {
  billingAddress: string | null;
  billingAddress2: string | null;
  billingCity: string | null;
  billingState: string | null;
  billingPostalCode: string | null;
  billingCountry: string | null;
  billingContactFirstName: string | null;
  billingContactLastName: string | null;
  billingContactEmail: string | null;
  usesCompanyAddressForBillingAddress: boolean;
  billingCompany: BuyerBillingCompany | null;
}

export interface BuyerSoldToCompany {
  companyId: number;
  companyName: string;
  address: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  createdByBuyer: boolean;
}

export interface BuyerDetailsData {
  canSubmit: boolean;
  values: {
    billingInfo: BuyerBillingInfo | null;
    soldToCompany: BuyerSoldToCompany | null;
    buyerTaxIds: BuyerTaxId[] | null;
    purchaseOrderNumber: string | null;
  };
}

export interface BuyerBillingInfoInput {
  usesCompanyAddressForBillingAddress: boolean;
  billingContactFirstName: string | null;
  billingContactLastName: string | null;
  billingContactEmail: string | null;
  billingAddress: string | null;
  billingAddress2: string | null;
  billingCity: string | null;
  billingState: string | null;
  billingPostalCode: string | null;
  billingCountry: string | null;
  billingCompany?: {
    companyId?: number;
    companyName?: string | null;
    address?: string | null;
    address2?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    country?: string | null;
  } | null;
}

export interface BuyerSoldToCompanyInput {
  companyId?: number;
  companyName?: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface BuyerDetailsInput {
  billingInfoRequest?: BuyerBillingInfoInput;
  purchaseOrderNumber?: string;
  buyerTaxIds?: BuyerTaxId[];
  soldToCompanyRequest?: BuyerSoldToCompanyInput;
}

export interface TaxType {
  label: string;
  name: string;
}

export interface BuyerDetailsRules {
  purchaseOrderNumber: { maxLength: number; pattern: RegExp };
  buyerTaxIdNumber: { maxLength: number; pattern: RegExp; maxCount: number };
  billingContactEmail: { pattern: RegExp };
}

export interface QuoteConfig {
  taxTypes?: TaxType[];
  buyerDetailsRules?: BuyerDetailsRules;
}
