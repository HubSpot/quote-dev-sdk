export type CrmPropertyValue = unknown;

export interface QuoteProperties {
  hs_acceptance_method?: string;
  hs_allowed_payment_methods?: string[];
  hs_billing_enabled?: boolean;
  hs_change_effective_date?: string;
  hs_change_prorating?: boolean;
  hs_clickwrap_accepted_by?: string;
  hs_collection_process?: string;
  hs_comments?: string;
  hs_contract_effective_start_date?: string;
  hs_contract_effective_start_date_type?: string;
  hs_contract_effective_start_delayed_by_days?: string;
  hs_contract_effective_start_delayed_by_months?: string;
  hs_cover_letter?: string;
  hs_currency?: string;
  hs_deal_closing_agent_enabled?: boolean;
  hs_enabled_automated_taxes?: boolean;
  hs_esign_verification_method?: string;
  hs_esign_reassignment_enabled?: boolean;
  hs_executive_summary?: string;
  hs_expiration_date?: string;
  hs_language?: string;
  hs_last_published_date?: string;
  hs_locale?: string;
  hs_locked?: boolean;
  hs_net_payment_terms?: number;
  hs_payment_enabled?: boolean;
  hs_public_url_key?: string;
  hs_purchase_order_editability?: string;
  hs_purchase_order_number?: string;
  hs_quote_amount?: number;
  hs_quote_link?: string;
  hs_quote_number?: string;
  hs_sender_company_address?: string;
  hs_sender_company_city?: string;
  hs_sender_company_country?: string;
  hs_sender_company_name?: string;
  hs_sender_company_state?: string;
  hs_sender_company_zip?: string;
  hs_sender_email?: string;
  hs_sender_firstname?: string;
  hs_sender_image_url?: string;
  hs_sender_lastname?: string;
  hs_sender_phone?: string;
  hs_slug?: string;
  hs_status?: string;
  hs_tax_total?: number;
  hs_tcv?: number;
  hs_terms?: string;
  hs_test_mode?: boolean;
  hs_timezone?: string;
  hs_title?: string;
  hs_total_discount?: number;
  hs_type?: string;
  hs_uses_company_address_for_billing_address?: boolean;
  hs_bill_to_details_editability?: string;
  hs_buyer_billing_address?: string;
  hs_buyer_billing_address2?: string;
  hs_buyer_billing_city?: string;
  hs_buyer_billing_country?: string;
  hs_buyer_billing_country_code?: string;
  hs_buyer_billing_state?: string;
  hs_buyer_billing_zip?: string;
  hs_buyer_tax_id_editability?: string;
  hs_sold_to_details_editability?: string;
  [key: string]: CrmPropertyValue | undefined;
}

export interface LineItemProperties {
  id?: number;
  hs_object_id?: number;
  name?: string;
  description?: string;
  amount?: number;
  price?: number;
  quantity?: number;
  discount?: number;
  hs_billing_start_delay_days?: number;
  hs_billing_start_delay_months?: number;
  hs_billing_start_delay_type?: string;
  hs_discount_percentage?: number;
  hs_effective_unit_price?: number;
  hs_line_item_currency_code?: string;
  hs_position_on_quote?: number;
  hs_pre_discount_amount?: number;
  hs_pricing_model?: string;
  hs_product_id?: number;
  hs_product_type?: string;
  hs_ramp_key?: string;
  hs_recurring_billing_end_date?: string | number;
  hs_recurring_billing_number_of_payments?: number;
  hs_recurring_billing_period?: string;
  hs_recurring_billing_start_date?: string;
  hs_recurring_billing_terms?: string;
  hs_sku?: string;
  hs_tax_amount?: number;
  hs_tax_label?: string;
  hs_tax_rate?: number;
  hs_tax_rate_group_id?: string;
  hs_tcv?: number;
  hs_term_in_months?: number;
  hs_tier_amount?: number;
  hs_tier_prices?: string;
  hs_tier_ranges?: string;
  hs_total_discount?: number;
  hs_use_prorating?: boolean;
  hs_url?: string;
  recurringbillingfrequency?: string;
  [key: string]: CrmPropertyValue | undefined;
}

export interface ContactProperties {
  email?: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  [key: string]: CrmPropertyValue | undefined;
}

export interface CompanyProperties {
  name?: string;
  domain?: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  [key: string]: CrmPropertyValue | undefined;
}

export interface DealProperties {
  dealname?: string;
  amount?: number;
  closedate?: string;
  pipeline?: string;
  dealstage?: string;
  [key: string]: CrmPropertyValue | undefined;
}

export interface QuoteDocumentProperties {
  hs_name?: string;
  hs_order?: number;
  hs_content_module_id?: string;
  hs_include_for_signing?: boolean;
  hs_default_hosting_url?: string;
  hs_file_extension?: string;
  [key: string]: CrmPropertyValue | undefined;
}

export interface SignerProperties {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
}

export interface QuoteTemplateContext {
  quote: QuoteProperties;
  deal: DealProperties;
  lineItems: LineItemProperties[];
  buyerContacts: ContactProperties[];
  buyerCompany: CompanyProperties;
  billingContact: ContactProperties;
  billingCompany: CompanyProperties;
  quoteDocuments: QuoteDocumentProperties[];
  signers: SignerProperties[];
  counterSigners: SignerProperties[];
}
